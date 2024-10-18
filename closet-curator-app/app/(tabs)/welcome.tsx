import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View, Text, TouchableOpacity } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from 'expo-router'; // Import useRouter



export default function WelcomeScreen() {
  const router = useRouter(); 

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.welcomeText}>Welcome to Closet Curator</ThemedText>
      <Image
          source={require('@/assets/images/Closet-Curator-Logo.png')}
          style={styles.logo}
        resizeMode="contain"
      />
      <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/login')}>
        <ThemedText style={styles.buttonText}>Log In</ThemedText>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupButton}>
        <ThemedText style={styles.buttonText}>Sign Up</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0c0b32',
  },
  welcomeText: {
    color: 'white',
    fontSize: 50,
  },
  appName: {
    color: 'white',
    fontSize: 28,
    marginVertical: 10,
  },
  logo: {
    width: '20%', 
    marginVertical: 20,
  },
  loginButton: {
    width: 400,
    padding: 20,
    margin: 10,
    backgroundColor: '#a292be', 
    borderRadius: 20,
    alignItems: 'center',
  },
  signupButton: {
    width: 400,
    padding: 20,
    margin: 10,
    backgroundColor: '#a292be', 
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 30,
  },
});
