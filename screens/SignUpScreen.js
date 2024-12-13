// screens/SignUpScreen.js
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { supabase } from '../supabase';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Account created!');
      navigation.navigate('signup');
    }
  };

  return (
    <View style={styles.signupScreenContainer}>
      <View style={styles.signupScreenContent}>
        <Text style={styles.signupText}>
          Sign Up
        </Text>
        <View style={styles.signupBox}>
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
};

const styles = StyleSheet.create({
  signupScreenContainer: {
    paddingTop: 200,
    flexDirection: "column",
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
  signupText: {
    color: "white",
    fontSize: 25,
    marginBottom: 20,
  },
  emailTextBox: {
    paddingLeft: 10,
    backgroundColor: "white",
    height: 30,
    borderRadius: 6,
  },
  passwordTextBox: {
    paddingLeft: 10,
    backgroundColor: "white",
    height: 30,
    borderRadius: 6,
  },
  signupScreenContent: {
    width: "80%",
    gap: 10,
  },
  signupBox: {
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

export default SignUpScreen;
