import { View, Text, StatusBar } from "react-native";
import React from "react";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "./src/screens/splash";
import HomeScreen from "./src/screens/home/home";
import LoginScreen from "./src/screens/login";
import SignupScreen from "./src/screens/signup";
import CallScreen from "./src/screens/home/call";
import Colors from "./src/asset/styles/color";
import PersonalScreen from "./src/screens/Profile/personal";
import SettingScreen from "./src/screens/Profile/setting";
import FriendRequest from "./src/screens/Profile/friendRequest";
import Txt from "./src/screens/test";
import SearchScreen from "./src/screens/Search/search";
import StartScreen from "./src/screens/start";
import ChatScreen from "./src/screens/chatting";
import ImageSetting from "./src/screens/Settings/setting_image";
import BackgroundSetting from "./src/screens/Settings/setting_bg";
import SettingInfo from "./src/screens/Settings/setting_info";
import SettingAccout from "./src/screens/Settings/setting_acc";
import SettingTheme from "./src/screens/Settings/setting_theme";
const myStack = createNativeStackNavigator();
export default function App() {
  return (
    <>
      <StatusBar backgroundColor={Colors._secondary} />
      <NavigationContainer>
        <myStack.Navigator headerMode="none">
          <myStack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <myStack.Screen
            name="StartScreen"
            component={StartScreen}
            options={{ headerShown: false }}
          />
          <myStack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <myStack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{ headerShown: false }}
          />
          <myStack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <myStack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{}}
          />
          <myStack.Screen
            name="PersonalScreen"
            component={PersonalScreen}
            options={{ headerShown: false }}
          />
          <myStack.Screen
            name="SettingScreen"
            component={SettingScreen}
            options={{ headerShown: false }}
          />
          <myStack.Screen
            name="Txt"
            component={Txt}
            options={{ headerShown: false }}
          />
          <myStack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{ headerShown: false }}
          />
          <myStack.Screen
            name="FriendRequest"
            component={FriendRequest}
            options={{ title: "Lời mời kết bạn", headerTitleAlign: "center" }}
          />
          <myStack.Screen
            name="ImageSetting"
            component={ImageSetting}
            options={{
              title: "Thay đổi ảnh đại diện",
              headerTitleAlign: "center",
            }}
          />
          <myStack.Screen
            name="BackgroundSetting"
            component={BackgroundSetting}
            options={{
              title: "Thay đổi ảnh bìa",
              headerTitleAlign: "center",
            }}
          />
          <myStack.Screen
            name="SettingInfo"
            component={SettingInfo}
            options={{
              title: "Thông tin cá nhân",
              headerTitleAlign: "center",
            }}
          />
          <myStack.Screen
            name="SettingAccout"
            component={SettingAccout}
            options={{
              title: "Tài khoản và bảo mật",
              headerTitleAlign: "center",
            }}
          />
          <myStack.Screen
            name="SettingTheme"
            component={SettingTheme}
            options={{
              title: "Cài đặt chung",
              headerTitleAlign: "center",
            }}
          />
        </myStack.Navigator>
      </NavigationContainer>
    </>
  );
}
