import os
import torch
import numpy as np
from PIL import Image
from rembg import remove
from torchvision.models import mobilenet_v2
import torchvision.transforms as transforms
import torch.nn as nn

class DeepSetsLSTMClassifier(nn.Module):
    def __init__(self, input_dim, hidden_dim, dropout=0.2):
        super(DeepSetsLSTMClassifier, self).__init__()

        # Set bidirectional=True to make the LSTM bi-directional
        self.lstm = nn.LSTM(input_dim, hidden_dim, batch_first=True, bidirectional=True)
        # The hidden_dim will now be doubled since it's bi-directional
        self.rho = nn.Sequential(
            nn.Linear(hidden_dim * 2, hidden_dim),  # Multiply hidden_dim by 2
            nn.ReLU(),
            nn.BatchNorm1d(hidden_dim),
            nn.LayerNorm(hidden_dim),
            nn.Dropout(dropout)

        )

        # Change the final layer to have 1 output for binary classification
        self.fc = nn.Linear(hidden_dim, 1)

    def forward(self, x, mask=None):
        """
        Forward pass for the DeepSets model with LSTM

        Args:
            x: Input tensor of shape (batch_size, max_set_size, input_dim)
            mask: Boolean mask of shape (batch_size, max_set_size) indicating valid elements

        Returns:
            Tensor of shape (batch_size, 1) containing the logit for binary classification
        """
        batch_size, max_set_size, _ = x.shape

        # LSTM processing each element in the set
        lstm_out, _ = self.lstm(x)

        # If a mask is provided, apply it to the LSTM output
        if mask is not None:
            mask = mask.unsqueeze(-1)  # Expand mask dimension to match output shape
            lstm_out = lstm_out * mask

        # Aggregating the set elements by summing across the set
        x_aggregated = torch.sum(lstm_out, dim=1)

        # Pass through the rho network for final features
        x = self.rho(x_aggregated)

        # Output a single logit for binary classification
        x = self.fc(x)

        return x


def load_and_preprocess_image(image_path):
    """
    Load image, remove background, and preprocess for embedding generation

    Args:
        image_path (str): Path to the input image

    Returns:
        Preprocessed PIL Image with transparent/removed background
    """
    # Read the original image
    input_image = Image.open(image_path)

    # Remove background
    output_image = remove(input_image)

    return output_image


def generate_mobilenet_embedding(image):
    """
    Generate embedding for an image using MobileNetV2

    Args:
        image (PIL Image): Preprocessed image

    Returns:
        numpy array embedding
    """
    # Load pre-trained MobileNetV2
    model = mobilenet_v2(pretrained=True)

    # Remove the final classification layer
    embedding_model = torch.nn.Sequential(*list(model.features.children()))
    embedding_model.eval()

    # Preprocessing transform
    transform = transforms.Compose([
        transforms.Resize(224),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
    ])

    # Preprocess image
    input_tensor = transform(image).unsqueeze(0)

    # Generate embedding
    with torch.no_grad():
        features = embedding_model(input_tensor)
        embedding = torch.nn.functional.adaptive_avg_pool2d(features, 1).squeeze()

    return embedding.numpy()


def process_image_set(image_folder_path):
    """
    Process all images in a folder to generate embedding sets

    Args:
        image_folder_path (str): Path to folder containing images

    Returns:
        List of embedding sets and corresponding labels
    """
    embedding_sets = []
    labels = []

    # Assume folder structure:
    # image_folder_path/class1/img1.jpg, image_folder_path/class2/img1.jpg
    for class_label, class_name in enumerate(os.listdir(image_folder_path)):
        class_path = os.path.join(image_folder_path, class_name)

        # Skip if not a directory
        if not os.path.isdir(class_path):
            continue

        # Process images in this class
        class_embeddings = []
        for image_name in os.listdir(class_path):
            image_path = os.path.join(class_path, image_name)

            try:
                # Remove background
                bg_removed_image = load_and_preprocess_image(image_path)

                # Generate embedding
                embedding = generate_mobilenet_embedding(bg_removed_image)
                class_embeddings.append(embedding)

            except Exception as e:
                print(f"Error processing {image_path}: {e}")

        # Add embeddings for this class
        if class_embeddings:
            embedding_sets.append(class_embeddings)
            labels.append(class_label)

    return embedding_sets, labels

def process_image_set_from_supabase(user_id):
    """
    Process all images for a user stored in Supabase to generate embedding sets.

    Args:
        user_id (str): The user ID to fetch images from Supabase.

    Returns:
        List of embedding sets and corresponding labels.
    """
    embedding_sets = []
    labels = []

    # Fetch list of images for this user
    bucket_name = f"{user_id}"  # Assuming bucket naming convention
    try:
        response = supabase.storage.from_(bucket_name).list()
        if not response:
            raise ValueError("No images found for the user.")

        # Process each image
        class_embeddings = []
        for image_info in response:
            image_name = image_info["name"]

            try:
                # Download image
                image_data = supabase.storage.from_(bucket_name).download(image_name)

                # Open image using PIL
                image = Image.open(BytesIO(image_data))

                # Remove background and preprocess
                bg_removed_image = load_and_preprocess_image(image)

                # Generate embedding
                embedding = generate_mobilenet_embedding(bg_removed_image)
                class_embeddings.append(embedding)

            except Exception as e:
                print(f"Error processing {image_name} from bucket {bucket_name}: {e}")

        # Assign a label for this user (if labels are used, this can be extended)
        if class_embeddings:
            embedding_sets.append(class_embeddings)
            labels.append(user_id)  # Replace with a proper class label if needed

    except Exception as e:
        print(f"Error fetching images from Supabase: {e}")

    return embedding_sets, labels

def predict_with_model(model_path, embedding_sets):
    """
    Predict labels using pre-trained model

    Args:
        model_path (str): Path to saved .pt model
        embedding_sets (list): List of embedding sets

    Returns:
        Numpy array of predictions
    """
    # Load the entire model
    # model = torch.load(model_path)
    model = torch.load(model_path, map_location=torch.device('cpu'))

    model.eval()

    # Determine max set size and input dimension
    max_set_size = max(len(embedding_set) for embedding_set in embedding_sets)
    input_dim = embedding_sets[0][0].shape[0]

    # Prepare input tensor
    input_tensor = torch.zeros((len(embedding_sets), max_set_size, input_dim))
    mask_tensor = torch.zeros((len(embedding_sets), max_set_size), dtype=torch.bool)

    # Fill input tensor and mask
    for i, embedding_set in enumerate(embedding_sets):
        for j, embedding in enumerate(embedding_set):
            input_tensor[i, j] = torch.from_numpy(embedding).float()
            mask_tensor[i, j] = True

    # Predict
    with torch.no_grad():
        output = model(input_tensor, mask_tensor)
        predictions = torch.round(torch.sigmoid(output)).squeeze().numpy()

    return predictions


# Main execution
if __name__ == "__main__":
    # Paths
    image_folder_path = "imgees"  # Folder containing class subfolders
    model_path = "model.pt"
    

    # Process images and generate embedding sets
    embedding_sets, true_labels = process_image_set_from_supabase(user_id)

    # Predict
    predictions = predict_with_model(model_path, embedding_sets)

    # Print results
    print("Predictions:", predictions)
    print("True Labels:", true_labels)