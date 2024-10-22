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
import { DOMAIN, TOKEN, ValidateEmail } from "../config/const";
import { sha256 } from "react-native-sha256";
import axios from "axios";
import Colors from "../asset/styles/color";
import Entypo from "react-native-vector-icons/Entypo";
import Button, { ThemedButton } from "react-native-really-awesome-button";
import { USECACHE } from "../config/cache";
import * as ZIM from 'zego-zim-react-native'; import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, { ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen, ZegoSendCallInvitationButton, } from '@zegocloud/zego-uikit-prebuilt-call-rn';
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
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
    setError(error);
    setIsFormValid(Object.keys(error).length === 0);
  };

  const fetchUserData = () => {
    axios
      .get(`${DOMAIN}/get-self-info/${TOKEN.GetToken()}`)
      .then((response) => {
        console.log(response.data);
        USECACHE.SetData("info", response.data);
      })
      .catch((error) => console.log(error));
  };
  const fetchUserFriends = () => {
    axios
      .get(`${DOMAIN}/get-friend-list/${TOKEN.GetToken()}`)
      .then((response) => {
        listFriends = response.data;
        listFriends.map((item) => {
          USECACHE.SetData(item.Info.Email, {
            Avatar: item.Info.Avatar,
            Background: item.Info.Background,
            Name: item.Info.Name,
            Since: item.Since,
          });
        });
      })
      .catch((e) => console.log(e));
  };
    // 2105949447,
    // "1da962453e140c11829e6b93d19172832038aef94b1324f1357a7066111790c3",
    // `${email}`, // thi no la nhuw the dayok 
    // `${email}`,
    const onUserLogin = () => {
        ZegoUIKitPrebuiltCallService.init(
        2105949447, 
        "1da962453e140c11829e6b93d19172832038aef94b1324f1357a7066111790c3",
        `${email}`, 
        `${email}`,
        [ZIM, ZPNs],
        {
            ringtoneConfig: {
                incomingCallFileName: 'zego_incoming.mp3',
                outgoingCallFileName: 'zego_outgoing.mp3',
            },
            notifyWhenAppRunningInBackgroundOrQuit: true,
            androidNotificationConfig: {
                channelID: "ZegoUIKit",
                channelName: "ZegoUIKit",
            },
        }
      );
      // console.log(`${email}`);
    }
  const handleLogin = async () => {
    // Basic email and password validation
    // If form valid => handleLogin
    if (isFormValid) {
      axios
        .post(`${DOMAIN}/login`, {
          username: email,
          password: await sha256(password),
        })
        .then(async (response) => {
          r = response.data;
          console.log("Token receive:", r);
          await TOKEN.SetToken(r.token, r.timeout);
          console.log("Data Loading...");
          // onUserLogin();
          fetchUserData();
          fetchUserFriends();
          // fetchUserMessage();
          navigation.replace("HomeScreen");
        })
        .catch((err) => {
          console.log("error:", err.response.data);
          Alert.alert("error:", err.response.data);
        });
    }
    // hash password and make request
  };

  useEffect(() => {
    ValidModel();
  }, [email, password]);
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
      <Text style={styles.title}>Đăng nhập</Text>

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
          {isSubmit && <Text style={styles.err}>{error.email}</Text>}
        </View>
        <View style={styles.box}>
          <View style={styles.box_input}>
            <Entypo name="key" color={Colors._black} size={20} />
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              placeholder="Mật khẩu"
              placeholderTextColor="gray"
              value={password}
              onChangeText={(value) => setPassword(value)}
            />
          </View>
          {isSubmit && <Text style={styles.err}>{error.password}</Text>}
        </View>
      </View>
      <TouchableHighlight
        underlayColor={Colors._yellow}
        style={[styles.btn, { opacity: isFormValid ? 1 : 0.7 }]}
        onPress={() => {
          setIsSubmit(true);
          handleLogin();
        }}
      >
        <Text style={styles.text}>Đăng nhập</Text>
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
          Bạn chưa có tài khoản ?
        </Text>
      </View>
      <TouchableHighlight
        underlayColor={Colors._yellow}
        style={styles.btn}
        onPress={() => navigation.replace("SignupScreen")}
      >
        <Text style={styles.text}>Đăng ký</Text>
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
    marginVertical: 50,
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
    width: "100%",
    height: 80,
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
  err: {
    color: Colors._red,
    fontSize: 12,
  },
});