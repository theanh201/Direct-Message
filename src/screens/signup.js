import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { DOMAIN, TOKEN, ValidateEmail } from '../config/const';"../config/const.js";
import { sha256 } from 'react-native-sha256';
import axios from 'axios';

const SignupScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const goToLogin = () => {
    navigation.navigate('LoginScreen');
  };
  const handleSignup = () => {
    // Basic email and password validation
    if (!ValidateEmail(email)) {
      Alert.alert('Email không chính xác');
      return;
    }
    if (!email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    // hash password and make request
    sha256(password).then( hash => {
      axios.post(`${DOMAIN}/register`, {
        username: email,
        password: hash
      })
      .then(function (response) {
        r = response.data;
        console.log("response:", r);
        Alert.alert("message", r.message);
        goToLogin();
      })
      .catch(function (error) {
        r = err.response.data
        console.log("error:", r);
        Alert.alert("error", r);
      });
    });
  };

  return (
    <View style={styles.container}>
        <Button title="Go to Login" onPress={goToLogin} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
        value={email}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
        value={password}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        onChangeText={text => setConfirmPassword(text)}
        value={confirmPassword}
      />
      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default SignupScreen;
