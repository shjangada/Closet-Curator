from flask import Flask, request, jsonify
import torch
import json
from datetime import datetime
import os
from RunFinal import *
app = Flask(__name__)
MODEL_PATH = "model.pt"
model = None

# Create a directory to store predictions if it doesn't exist
PREDICTIONS_DIR = "saved_predictions"
os.makedirs(PREDICTIONS_DIR, exist_ok=True)


@app.before_first_request
def load_model():
    global model
    try:
        print("Model loaded successfully!")
    except Exception as e:
        print(f"Error loading model: {e}")


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    user_id = data.get("userID")
    if not user_id:
        return jsonify({"error": "UserID is required"}), 400

    try:
        embedding_sets, true_labels = process_image_set_from_supabase(user_id)
        model_path = "model.pt"
        predictions = predict_with_model(model_path, embedding_sets)

        # Save predictions to a file
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = os.path.join(PREDICTIONS_DIR, f"prediction_{user_id}_{timestamp}.json")

        prediction_data = {
            "user_id": user_id,
            "timestamp": timestamp,
            "predictions": predictions,
            "true_labels": true_labels
        }

        with open(filename, 'w') as f:
            json.dump(prediction_data, f, indent=4)

        return jsonify({
            "predictions": predictions,
            "true_labels": true_labels
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/process-image", methods=["POST"])
def process_image():
    if not model:
        return jsonify({"error": "Model not loaded"}), 500

    try:
        if "image" not in request.files:
            return jsonify({"error": "No image provided"}), 400

        image = request.files["image"]

        output = predict_with_model(model_path, embedding_sets)

        # Save image prediction
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = os.path.join(PREDICTIONS_DIR, f"image_prediction_{timestamp}.json")

        prediction_data = {
            "timestamp": timestamp,
            "output": output
        }

        with open(filename, 'w') as f:
            json.dump(prediction_data, f, indent=4)

        return jsonify({"status": "success", "output": output})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)