import React, { useState } from 'react';
import { StyleSheet, Image, Text, View, TouchableOpacity } from 'react-native';

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

export default function ClosetScreen() {
  const [selectedCategories, setSelectedCategories] = useState({
    casual: true,
    formal: false,
    rainy: false,
    sunny: true,
  });

  const toggleCategory = (category: keyof typeof selectedCategories) => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <View style={styles.screenContainer}>
      <Text style={styles.titleText}>Adam's Closet</Text>
      
      <View style={styles.clothingContainer}>
        <Image 
          source={require('@/assets/images/hoodie.png')} // Update with your actual image path
          style={styles.clothingImage}
          resizeMode="cover"
        />
      </View>

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

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add Item</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  titleText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  clothingContainer: {
    backgroundColor: '#e6e6fa',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  clothingImage: {
    width: 200,
    height: 200,
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
  categoryButton: {
    flex: 1,
    backgroundColor: '#ffffff20',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#ffffff40',
  },
  categoryButtonText: {
    color: 'white',
    fontSize: 14,
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
});