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
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Closet Curator</Text>
      <Image
          source={require('@/assets/images/Closet-Curator-Logo.png')}
          style={styles.logo}        
      />
      <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/login')}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupButton}  onPress={() => router.push('/signup')}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#0c0b32',
    justifyContent: 'center',
    display: "flex",
    paddingTop: 50,
    gap: 10,
    height: '100%',
  },
  welcomeText: {
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 20,
  },
  appName: {
    color: 'white',
    fontSize: 28,
  },
  logo: {
    width: 300,
    height: undefined,
    aspectRatio: 1,
    marginBottom: 30,
  },
  loginButton: {
    width: '90%',
    padding: 12,
    backgroundColor: '#a292be', 
    borderRadius: 20,
    alignItems: 'center',

  },
  signupButton: {
    width: '90%',
    padding: 12,
    // margin: 10,
    backgroundColor: '#a292be', 
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
  },
});
