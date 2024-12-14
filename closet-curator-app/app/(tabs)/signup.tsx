// import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../supabase';
import React, { useState } from 'react';


export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = async () => {

    if (confirmPassword != password) {
      Alert.alert("Passwords don't match!");
      return;
    }

    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Account created!');
    }
  };

  return (
    <View style={styles.loginScreenContainer}>
      <View style={styles.loginScreenContent}>
        <Text style={styles.loginText}>
          Sign Up
        </Text>
        <View style={styles.loginBox}>
          <Text style={styles.titleText}>Email</Text>
          <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.emailTextBox}
          keyboardType="email-address"
        />

        <Text style={styles.titleText}>Password</Text>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.passwordTextBox}
          secureTextEntry
        />
        <Text style={styles.titleText}>Confirm Password</Text>
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
          style={styles.passwordTextBox}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleSignUp}>
          <View style={styles.signInButton}>
            <Text style={styles.titleText2}>
              Sign Up
            </Text>
          </View>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginScreenContainer: {
    height: "100%",
    // paddingTop: 200,
    flexDirection: "column",
    backgroundColor: '#0c0b32',
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    color: "white",
    fontSize: 15,
    
  },
  titleText2: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    
  },
  loginText: {
    color: "white",
    fontSize: 25,
    marginBottom: 20,
  },
  emailTextBox: {
    backgroundColor: "white",
    height: 30,
    borderRadius: 6,
    paddingHorizontal: 5,
  },
  passwordTextBox: {
    backgroundColor: "white",
    height: 30,
    borderRadius: 6,
    paddingHorizontal: 5,
  },
  loginScreenContent: {
    width: "80%",
    gap: 10,

  },
  loginBox: {
    gap: 10,
    borderColor: "#413768",
    borderWidth: 1,
    padding: 10,
  },
  signInButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: "#9F86C0",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    height: 30,
    borderRadius: 6,

  }
});
