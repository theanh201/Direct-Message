import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { DOMAIN, TOKEN,ValidateEmail } from '../config/const';
import { sha256 } from 'react-native-sha256';
import axios from 'axios';


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const goToSignup = () => {
    navigation.navigate('SignupScreen');
  };
  const handleLogin = async () => {
    // Basic email and password validation
    if (!ValidateEmail(email)) {
        Alert.alert('Email không chính xác');
        return;
    }
    if (!email.trim() || !password.trim()) {
      Alert.alert("Xin vui lòng nhập đầy đủ Email và Mật Khẩu");
      return;
    }
    // hash password and make request
    axios.post(`${DOMAIN}/login`, {
      username: email,
      password: await sha256(password)
    })
    .then(response => {
      r = response.data;
      console.log("Token receive:", r);
      Alert.alert("message", r.message);
      TOKEN.SetToken(r.token, r.timeout);
      navigation.navigate('HomeScreen');
    })
    .catch(err => {
      r = err.response.data
      console.log("error:", r);
      Alert.alert("error", r);
    });
  };
  return (
    <View style={styles.container}>
        <Button title="Go to Signup" onPress={goToSignup} />
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
      <Button title="Login" onPress={handleLogin} />
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

export default LoginScreen;
