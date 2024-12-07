// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { supabase } from '../supabase';
import { ImageUploader } from '../components/ImageUploader';

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <ImageUploader userId={supabase.auth.getUser()} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

export default HomeScreen;
