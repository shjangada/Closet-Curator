import React, { useState } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Modal, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

interface CategoryButtonProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ label, isSelected, onPress }) => (
  <TouchableOpacity 
    style={[styles.categoryButton, isSelected && styles.categoryButtonSelected]} 
    onPress={onPress}
  >
    <Text style={styles.categoryButtonText}>{label}</Text>
  </TouchableOpacity>
);

const CategoryModal = ({ visible, onClose }) => {
  const [selectedCategories, setSelectedCategories] = useState({
    casual: true,
    formal: false,
    rainy: false,
    sunny: true,
  });

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setUploadedImage(result.assets[0].uri); // Use the uploaded image URI
    }
  };

  const toggleCategory = (category: keyof typeof selectedCategories) => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.titleText}>Adam's Closet</Text>
          
          <View style={styles.clothingContainer}>
            {uploadedImage ? (
              <TouchableOpacity onPress={pickImage}>
                <Image 
                  source={{ uri: uploadedImage }}
                  style={styles.clothingImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.uploadPrompt} onPress={pickImage}>
                <Text style={styles.uploadPromptText}>Upload an Image</Text>
              </TouchableOpacity>
            )}
          </View>

          {uploadedImage && (
            <View style={styles.categoryContainer}>
              <View style={styles.categoryRow}>
                <CategoryButton 
                  label="Casual" 
                  isSelected={selectedCategories.casual}
                  onPress={() => toggleCategory('casual')}
                />
                <CategoryButton 
                  label="Formal" 
                  isSelected={selectedCategories.formal}
                  onPress={() => toggleCategory('formal')}
                />
              </View>
              
              <View style={styles.categoryRow}>
                <CategoryButton 
                  label="For Rainy Weather" 
                  isSelected={selectedCategories.rainy}
                  onPress={() => toggleCategory('rainy')}
                />
                <CategoryButton 
                  label="For Sunny Weather" 
                  isSelected={selectedCategories.sunny}
                  onPress={() => toggleCategory('sunny')}
                />
              </View>
            </View>
          )}

          <TouchableOpacity 
            style={[styles.addButton, !uploadedImage && styles.disabledButton]} 
            onPress={onClose}
            disabled={!uploadedImage}
          >
            <Text style={styles.addButtonText}>Add Item</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default function ClosetScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adam's Closet</Text>

      <TouchableOpacity style={styles.uploadButton} onPress={() => setModalVisible(true)}>
        <Image source={require('@/assets/images/upload.png')} style={styles.uploadIcon} />
        <Text style={styles.uploadButtonText}>Upload Item</Text>
      </TouchableOpacity>

      <View style={styles.clothingGrid}>
        <Image source={require('@/assets/images/shirt1.webp')} style={styles.clothingItem} resizeMode="contain" />
        <Image source={require('@/assets/images/shirt2.webp')} style={styles.clothingItem} resizeMode="contain" />
        <Image source={require('@/assets/images/pant1.png')} style={styles.clothingItem} resizeMode="contain" />
        <Image source={require('@/assets/images/pant2.webp')} style={styles.clothingItem} resizeMode="contain" />
      </View>

      {/* Category Selection Modal */}
      <CategoryModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  clothingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  clothingItem: {
    width: '50%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0c0b32',
    // paddingTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    marginBottom: 20,
  },
  titleText: {
    color: '#1a1a2e',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  uploadButtonText: {
    color: '#0c0b32',
    fontSize: 18,
  },
  uploadButton: {
    backgroundColor: '#f1f0f4',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
    width: '80%',
    justifyContent: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#e6d5f2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: '80%',
  },
  categoryButton: {
    flex: 1,
    backgroundColor: '#f1f0f4',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#d1b3e8',
  },
  categoryButtonText: {
    color: '#1a1a2e',
    fontSize: 14,
  },
  clothingContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  clothingImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  uploadPrompt: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f0f4',
    padding: 20,
    borderRadius: 10,
    height: 200,
    width: 200,
  },
  uploadPromptText: {
    color: '#1a1a2e',
    fontSize: 16,
    textAlign: 'center',
  },
  categoryContainer: {
    gap: 10,
    marginBottom: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  addButton: {
    backgroundColor: '#1a1a3e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: 'gray',
  },
  uploadIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});
