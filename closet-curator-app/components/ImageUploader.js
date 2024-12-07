import React, { useState } from 'react';
import { View, Button, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { supabase } from './supabaseClient'; // Adjust the path as needed

const ImageUploader = ({ userId }) => {
  const [imageUri, setImageUri] = useState(null);

  const selectImage = async () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  const uploadImage = async () => {
    if (!imageUri) return;

    const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const userFolder = `users/${userId}/`; // Designated folder for the user

    const response = await fetch(imageUri);
    const blob = await response.blob();

    const { data, error } = await supabase.storage
      .from('your-bucket-name')
      .upload(`${userFolder}${fileName}`, blob, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.log('Error uploading image: ', error.message);
    } else {
      console.log('Image uploaded successfully: ', data.Key);
    }
  };

  return (
    <View>
      <Button title="Select Image" onPress={selectImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={{ width: 100, height: 100 }} />}
      <Button title="Upload Image" onPress={uploadImage} />
    </View>
  );
};

export default ImageUploader;
