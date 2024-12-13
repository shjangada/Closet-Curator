import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { supabase } from '../supabase';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';  // Import FileSystem
import { Session, User } from '@supabase/supabase-js';

const HomeScreen = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [userId, setUserId] = useState(null);
  const [images, setImages] = useState(null);

  useEffect(() => {
    loadImages();

    // Fetch current user on component mount
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();  // Correct usage
        if (error) {
          console.error('Error fetching user:', error);
        } else {
          // Access the user ID from data.user
          if (data && data.user) {
            setUserId(data.user.id);  // Get the user ID from the response
          }
        }
      } catch (err) {
        console.error('Error during user fetch:', err);
      }
    };

    fetchUser();

    // Listen for auth state changes (sign in / sign out)
    // const { data: authListener } = 
    supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session && session.user) {
          setUserId(session.user.id);  // Update user ID on sign-in
        } else {
          setUserId(null);  // Clear user ID on sign-out
        }
      }
    );

    // // Cleanup listener on component unmount
    // return () => {
    //   supabase.removeSubscription(authListener);
    // };
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
  
      const img = result.assets[0];
  
      const filePath = `${userId}/${new Date().getTime()}.${img.uri.split('.').pop()}`;
      const contentType = `image/${img.uri.split('.').pop()}`;
  
      // Upload directly to Supabase storage
      const { data, error } = await supabase.storage
        .from('image-bucket')
        .upload(filePath, { uri: img.uri }, { contentType });
  
      if (error) {
        console.error('Error uploading image:', error);
      } else {
        console.log('Image uploaded successfully:', data);
        await updateImageList();
      }
    }
  };
  
  const loadImages = async () => {
    const { data } = await supabase.storage.from('files').list(userId);
    if (data) {
      setImages(data);
      console.log(data);
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
  },
});

export default HomeScreen;