import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router'; // Import useRouter
import Logo from '@/assets/images/Closet-Curator-Logo.png'
import Login from './login'; // Assuming you have login.tsx
import Signup from './signup'; // Assuming you have signup.tsx

const WelcomeScreen = ({setActiveTab}) => {
  // const [activeTab, setActiveTab] = useState('home'); // Default to 'home'
  // const router = useRouter();

  // Render content based on active tab
  // const renderContent = () => {
  //   switch (activeTab) {
  //     case 'home':
  //       return (
  //         <View style={styles.buttonWrapper}>
  //           <Text style={styles.welcomeText}>Welcome to Closet Curator</Text>
  //           <TouchableOpacity
  //             style={styles.loginButton}
  //             onPress={() => setActiveTab('login')}
  //           >
  //             <Text style={styles.buttonText}>Log In</Text>
  //           </TouchableOpacity>
  //           <TouchableOpacity
  //             style={styles.signupButton}
  //             onPress={() => setActiveTab('signup')}
  //           >
  //             <Text style={styles.buttonText}>Sign Up</Text>
  //           </TouchableOpacity>
  //         </View>
  //       );
  //     case 'login':
  //       return <Login />; // Render Login component
  //     case 'signup':
  //       return <Signup />; // Render Signup component
  //     default:
  //       return (
          
  //       );
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image 
        source={Logo}
        style={styles.logo}
      />

        <View style={styles.buttonWrapper}>
            <Text style={styles.welcomeText}>Welcome to Closet Curator</Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => setActiveTab('login')}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupButton}
              onPress={() => setActiveTab('signup')}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
      {/* {renderContent()} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#0c0b32',
    display: 'flex',
    paddingTop: 50,
    gap: 10,
    marginTop: 130,
  },
  logo: {
    width: 150,  // Adjust the width of the logo
    height: 150, // Adjust the height of the logo
    marginBottom: 20, // Give space between the logo and text
  },
  welcomeText: {
    color: 'white',
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonWrapper: {
    width: '90%',
    alignItems: 'center',
  },
  loginButton: {
    padding: 12,
    paddingRight: 100,
    paddingLeft: 100,
    backgroundColor: '#a292be',
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  signupButton: {
    padding: 12,
    paddingRight: 90,
    paddingLeft: 90,
    backgroundColor: '#a292be',
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
  },
});

export default WelcomeScreen;
