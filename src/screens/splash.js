import { View, Text, Image, StyleSheet, ImageBackground } from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../asset/styles/color";
import { TOKEN, DateIsAfterCurrent, DOMAIN } from "../config/const";
import LottieView from "lottie-react-native";

export default function SplashScreen({ navigation }) {
  const SetUpTOKEN = async () => {
    await TOKEN.TokenReadFromStorage();
    let token = TOKEN.GetToken();
    let timeout = TOKEN.GetTimeout();
    // console.log("Token from storage:", token);
    // console.log("Storage's token timeout:", timeout);
    if (token === null || timeout === null || !DateIsAfterCurrent(timeout)) {
      navigation.navigate("StartScreen");
    } else {
      // fetchUserData();
      // fetchUserFriends();
      navigation.navigate("HomeScreen");
    }
  };
  // const SetUpInfo = async()=>{
  //   const userInfo = await USECACHE.GetData("info")

  // }
  // }

  useEffect(() => {
    const timer = setTimeout(() => {
      SetUpTOKEN();
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={[StyleSheet.absoluteFillObject, styles.overlay]}>
      <View>
        <Text>Hello</Text>
      </View>

      <LottieView
        style={{ flex: 1 }}
        source={require("../asset/templates/loading3.json")}
        autoPlay
        loop
      />
    </View>
  );
}
const styles = StyleSheet.create({
  splash_text: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  splash_box: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  splash_primary_txt: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors._primary,
  },
});
