import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { startTransition, useEffect, useRef, useState } from "react";
import Colors from "../../asset/styles/color";
import Entypo from "react-native-vector-icons/Entypo";
import { launchImageLibrary } from "react-native-image-picker";
import { launchCamera } from "react-native-image-picker";
import axios from "axios";
import { TOKEN, DOMAIN } from "../../config/const";
import defaultTemplate from "../../config/config";
import FastImage from "react-native-fast-image";
import { USECACHE } from "../../config/cache";
export default function PersonalScreen({ navigation }) {
  const [expanded, setExpanded] = useState(false);
  const [numLines, setNumLines] = useState(0);
  const [myInfo, setMyInfo] = useState({});
  const fetchInfo = async () => {
    info = await USECACHE.GetData("info");
    setMyInfo(info);
  };
  useEffect(() => {
    console.log("Token for acc: " + TOKEN.GetToken());
    fetchInfo();
  }, []);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const openImagePicker = () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        //wallpapers.com/images/featured/ubuntu-z6rtxbp6rijb53hx.jpg
        https: console.log("Image picker error: ", response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
      }
    });
  };

  handleCameraLaunch = () => {
    const options = {
      mediaType: "photo",
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled camera");
      } else if (response.error) {
        console.log("Camera Error: ", response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        console.log(imageUri);
      }
    });
  };

  return (
    <>
      <ImageBackground
        source={{
          uri: myInfo.Background
            ? `${DOMAIN}/get-background/${TOKEN.GetToken()}/${
                myInfo.Background
              }`
            : defaultTemplate.background,
          priority: FastImage.priority.high,
        }}
        style={styles.personal_bg}
      >
        <TouchableOpacity
          style={styles.personal_update_avatar}
          onPress={handleCameraLaunch}
        >
          <FastImage
            source={{
              uri: myInfo.Avatar
                ? `${DOMAIN}/get-avatar/${TOKEN.GetToken()}/${myInfo.Avatar}`
                : defaultTemplate.avatar,
              priority: FastImage.priority.high,
            }}
            style={styles.personal_avatar}
          />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 15,
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.goBack()}
          >
            <Entypo name="chevron-left" color={Colors._white} size={24} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate("SettingScreen")}
          >
            <Entypo
              name="dots-three-horizontal"
              color={Colors._white}
              size={24}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <View
        style={{
          paddingTop: 80,
          paddingHorizontal: 15,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Text style={styles.text}>{myInfo.Name}</Text>
        <TouchableOpacity
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
          }}
          onPress={() => {
            navigation.navigate("Txt");
          }}
        >
          <Entypo name="pencil" color={Colors._yellow} size={16} />
          <Text style={styles.personal_text}>
            Cập nhật giới thiệu về bản thân
          </Text>
        </TouchableOpacity>
        {/* <View
          style={{
            backgroundColor: Colors._white,
            width: "100%",
            padding: 20,
            margin: 20,
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            borderRadius: 10,
          }}
        >
          <Text style={styles.personal_text}>Viết nhật ký</Text>
          <Entypo name="folder-images" size={24} color={Colors._yellow} />
        </View> */}
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  personal_bg: {
    width: "100%",
    height: 200,
    position: "relative",
  },
  personal_update_avatar: {
    position: "absolute",
    bottom: -70,
    left: "32%",
  },
  personal_avatar: {
    width: 140,
    height: 140,
    borderRadius: 100,

    borderWidth: 4,
    borderColor: Colors._white,
  },
  personal_text: {
    fontSize: 12,
    color: Colors._black,
    fontWeight: "500",
  },
  btn: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  story_item: {
    width: 350,
    height: "auto",
    backgroundColor: Colors._white,
    padding: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  txt_date: {
    fontSize: 10,
  },
  txt_content: {
    marginVertical: 10,
    lineHeight: 20,
    color: Colors._black,
  },
  story_img: {
    marginTop: 10,
    width: 160,
    height: 160,
    borderRadius: 10,
  },
  text: {
    color: Colors._black,
    fontWeight: "bold",
    fontSize: 16,
  },
  showMore: {
    color: "blue",
    marginTop: 5,
  },
});
