import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
  TouchableHighlight,
} from "react-native";
import { DOMAIN, TOKEN } from "../config/const";
import { sha256 } from "react-native-sha256";
import axios from "axios";
import Colors from "../asset/styles/color";
import Entypo from "react-native-vector-icons/Entypo";
export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const ValidModel = () => {
    let error = {};
    if (!email) {
      error.email = "Email không được để trống!";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      error.email = "Email không hợp lệ!";
    }
    if (!password) {
      error.password = "Mật khẩu không được để trống!";
    } else if (password.length < 8) {
      error.password = "Mật khẩu cần tối thiểu 8 ký tự!";
    }
    if (password && !confirmPassword) {
      error.confirm = "Xin vui lòng nhập lại mật khẩu!";
    } else if (confirmPassword !== password) {
      error.confirm = "Mật khẩu được nhập lại không đúng!";
    }
    setError(error);
    setIsFormValid(Object.keys(error).length === 0);
  };

  const handleSignup = async () => {
    if (isFormValid) {
      // hash password and make request
      console.log("Signup Account");
      console.log(email);
      console.log(password);
      axios
        .post(`${DOMAIN}/register`, {
          username: email,
          password: await sha256(password),
        })
        .then((response) => {
          r = response.data;
          console.log("response:", r);
          Alert.alert("message", r.message);
          navigation.navigate("LoginScreen");
          // Alert.alert("Đăng ký tài khoản thành công")
        })
        .catch((err) => {
          r = err;
          console.log("Error:", r.response.data);
        });
    }
  };

  useEffect(() => {
    ValidModel();
    console.log(sha256(password));
  }, [email, password, confirmPassword]);

  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../asset/images/design/bg_start.jpeg")}
      style={{ alignItems: "center", padding: 15, height: "110%" }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={[styles.logo, { borderRadius: 10 }]}
          source={require("../asset/images/logo/image.png")}
        />
        {/* <Text style={styles.text}>Chat App</Text> */}
      </View>
      <Text style={styles.title}>Đăng ký</Text>

      {/* LOGIN FORM */}
      <View style={styles.form}>
        <View style={styles.box}>
          <View style={styles.box_input}>
            <Entypo name="mail" color={Colors._black} size={20} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="gray"
              value={email}
              onChangeText={(value) => setEmail(value)}
            />
          </View>
          {isSubmit && <Text style={styles.error}>{error.email}</Text>}
        </View>
        <View style={styles.box}>
          <View style={styles.box_input}>
            <Entypo name="key" color={Colors._black} size={20} />
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              placeholderTextColor="gray"
              value={password}
              onChangeText={(value) => setPassword(value)}
            />
          </View>
          {isSubmit && <Text style={styles.error}>{error.password}</Text>}
        </View>
        <View style={styles.box}>
          <View style={styles.box_input}>
            <Entypo name="key" color={Colors._black} size={20} />
            <TextInput
              style={styles.input}
              placeholder="Nhập lại mật khẩu"
              placeholderTextColor="gray"
              value={confirmPassword}
              onChangeText={(value) => setConfirmPassword(value)}
            />
          </View>
          {isSubmit && <Text style={styles.error}>{error.confirm}</Text>}
        </View>
      </View>
      <TouchableHighlight
        underlayColor={Colors._yellow}
        style={styles.btn}
        onPress={() => {
          setIsSubmit(true);
          handleSignup();
        }}
      >
        <Text style={styles.text}>Đăng ký</Text>
      </TouchableHighlight>
      <View
        style={{
          borderBottomColor: Colors._white,
          borderBottomWidth: 1,
          width: "80%",
          alignItems: "center",
          height: 40,
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            color: Colors._white,
            textShadowColor: Colors._black,
            textShadowOffset: { width: 0.5, height: 0.5 },
            textShadowRadius: 1,
          }}
        >
          Đăng nhập bằng phương thức khác ?
        </Text>
      </View>

      <View style={styles.list_logo}>
        <TouchableOpacity>
          <Image
            style={styles.logo}
            source={require("../asset/images/logo/facebook.png")}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            style={styles.logo}
            source={require("../asset/images/logo/google.png")}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomColor: Colors._white,
          borderBottomWidth: 1,
          width: "80%",
          alignItems: "center",
          height: 40,
          marginVertical: 10,
        }}
      >
        <Text
          style={{
            color: Colors._white,
            textShadowColor: Colors._black,
            textShadowOffset: { width: 0.5, height: 0.5 },
            textShadowRadius: 1,
          }}
        >
          Bạn đã có tài khoản ?
        </Text>
      </View>
      <TouchableHighlight
        underlayColor={Colors._yellow}
        style={styles.btn}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        <Text style={styles.text}>Đăng nhập</Text>
      </TouchableHighlight>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  list_logo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "50%",
    marginTop: 30,
  },
  logo: {
    width: 60,
    height: 60,
  },
  title: {
    color: Colors._white,
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 20,
    textShadowColor: Colors._black,
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
    textAlign: "center",
  },
  text: {
    color: Colors._black,
    fontSize: 16,
    fontWeight: "bold",
  },
  btn: {
    width: "90%",
    backgroundColor: Colors._dash,
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontWeight: "bold",
    shadowColor: Colors._black,
    elevation: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  box: {
    height: 80,
    width: "100%",
    justifyContent: "space-evenly",
  },
  box_input: {
    backgroundColor: Colors._white,
    width: "90%",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    shadowColor: Colors._black,
    elevation: 10,
  },
  input: {
    width: "100%",
    color: Colors._black,
    fontWeight: "bold",
  },
  form: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
    borderRadius: 20,
  },
  error: {
    color: Colors._red,
    fontSize: 12,
  },
});
