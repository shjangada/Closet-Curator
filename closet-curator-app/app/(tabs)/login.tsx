import { StyleSheet, Image, Platform, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '../../supabase';


export default function LoginScreen() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      Alert.alert('Error', error.message);
    } else {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) {
          console.error('Error fetching user:', error);
          return;
        }
        console.log('Logged-in user:', user);
        Alert.alert('Welcome '+user?.email);
    }
  };

  return (
    <View style={styles.loginScreenContainer}>
      <View style={styles.loginScreenContent}>
        <Text style={styles.loginText}>
          Login
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
        <TouchableOpacity onPress={handleLogin}>
          <View style={styles.signInButton}>
            <Text style={styles.titleText2}>
              Sign In
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: '#0c0b32',
    height: "100%",
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
  },
  passwordTextBox: {
    backgroundColor: "white",
    height: 30,
    borderRadius: 6,
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