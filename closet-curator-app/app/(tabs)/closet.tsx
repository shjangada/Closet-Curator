import { StyleSheet, Image, View, TouchableOpacity, Modal, Text, Button } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router'; // Import useRouter
import { useState } from 'react';


const MyModal = ({ visible, onClose }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text>Upload Image Here!</Text>
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};


export default function ClosetScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };


  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Adam's Closet</ThemedText>

      <TouchableOpacity style={styles.uploadButton} onPress={openModal}>
        <Image source={require('@/assets/images/upload.png')} style={styles.uploadIcon} />
        <ThemedText style={styles.uploadButtonText}>Upload Item</ThemedText>
      </TouchableOpacity>

      <MyModal visible={modalVisible} onClose={closeModal}/>

      <View style={styles.clothingGrid}>
        <Image source={require('@/assets/images/shirt1.webp')} style={styles.clothingItem} resizeMode="contain" />
        <Image source={require('@/assets/images/shirt2.webp')} style={styles.clothingItem} resizeMode="contain" />
        <Image source={require('@/assets/images/pant1.png')} style={styles.clothingItem} resizeMode="contain" />
        <Image source={require('@/assets/images/pant2.webp')} style={styles.clothingItem} resizeMode="contain" />
      </View>

      <View style={styles.navBar}></View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0c0b32',
    paddingTop: 20,
  },
  title: {
    color: 'white',
    fontSize: 28,
    marginBottom: 20,
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
  uploadIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  uploadButtonText: {
    color: '#0c0b32',
    fontSize: 18,
  },
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
  navBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 50,
    backgroundColor: '#c5a1d5',
  },
});
