import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
// import { supabase } from '../../supabase';
import { supabase } from '../../supabase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      Alert.alert('Error', error.message);
    } else {
      // navigation.navigate('Home');
    }
  };

  return (
    <View style={styles.loginScreenContainer}>
      <View style={styles.loginScreenContent}>
        <Text style={styles.loginText}>Login</Text>
        <View style={styles.loginBox}>
          <Text style={styles.titleText}>Email</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.emailTextBox}
            keyboardType="email-address"
            placeholder="Enter your email"
            placeholderTextColor="#888"
          />
          <Text style={styles.titleText}>Password</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            style={styles.passwordTextBox}
            secureTextEntry
            placeholder="Enter your password"
            placeholderTextColor="#888"
          />
          <TouchableOpacity onPress={handleLogin}>
            <View style={styles.signInButton}>
              <Text style={styles.titleText2}>Sign In</Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.signupText}>
            Don't have an account?{' '}
            <Text
              style={styles.signupLink}
              // onPress={() => navigation.navigate('SignUp')}
              >
              Sign Up
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginScreenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loginScreenContent: {
    width: '90%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 5,
  },
  loginText: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginBox: {
    marginTop: 10,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  emailTextBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordTextBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  signInButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  titleText2: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
  signupLink: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
