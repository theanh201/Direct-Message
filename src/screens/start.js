import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from "react-native";
import React from "react";
import Colors from "../asset/styles/color";
import axios from "axios";
import { sha256 } from "react-native-sha256";
import { DOMAIN, TOKEN } from "../config/const";
export default function StartScreen({ navigation }) {
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
      <Text style={styles.title}>
        Kết nối với bạn bè một cách dễ dàng và nhanh chóng
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.replace("LoginScreen")}
      >
        <Text style={styles.text}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.replace("SignupScreen")}
      >
        <Text style={styles.text}>Đăng ký</Text>
      </TouchableOpacity>
      <View
        style={{
          borderBottomColor: Colors._white,
          borderBottomWidth: 1,
          width: "80%",
          alignItems: "center",
          height: 100,
        }}
      >
        <Text style={{ color: Colors._white, marginTop: 50 }}>hoặc</Text>
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
        <TouchableOpacity
          onPress={async () => {
            axios
              .post(`${DOMAIN}/login`, {
                username: "UserText@gmail.com",
                password: await sha256("Python5979"),
              })
              .then((response) => {
                r = response.data;
                TOKEN.SetToken(r.token, r.timeout);
                navigation.navigate("HomeScreen");
              })
              .catch((err) => {
                r = err;
                console.log("error:", r);
              });
          }}
        >
          <Image
            style={styles.logo}
            source={require("../asset/images/logo/test.png")}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  list_logo: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 30,
  },
  logo: {
    width: 60,
    height: 60,
    marginHorizontal: 10,
  },
  title: {
    color: Colors._white,
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 100,
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
});
