// import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, Text, View, TextInput, TouchableOpacity } from 'react-native';

// import { Collapsible } from '@/components/Collapsible';
// import { ExternalLink } from '@/components/ExternalLink';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import { TouchableOpacity } from 'react-native-gesture-handler';

// const validateEmail = (email) => {
//   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return regex.test(email);
// };

export default function SignUpScreen() {
  return (
    <View style={styles.loginScreenContainer}>
      <View style={styles.loginScreenContent}>
        <Text style={styles.loginText}>
          Sign Up
        </Text>
        <View style={styles.loginBox}>
          <Text style={styles.titleText}>Email</Text>
          <TextInput
          onChangeText={() => {}}
          style={styles.emailTextBox}
        />
        <Text style={styles.titleText}>Password</Text>
        <TextInput
        onChangeText={() => {}}
        style={styles.passwordTextBox}
        secureTextEntry={true}
        />
        <Text style={styles.titleText}>Confirm Password</Text>
          <TextInput
          onChangeText={() => {}}
          style={styles.passwordTextBox}
          secureTextEntry={true}
        />
        <TouchableOpacity>
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
