import React, { useState } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import axios from "axios";
import { DOMAIN, TOKEN } from "../../config/const";
import Colors from "../../asset/styles/color";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";

const ImageSetting = () => {
  const [imageUri, setImageUri] = useState(null);

  const requestPermission = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: "Camera Permission",
            message: "App needs camera permission to select images",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Camera permission granted");
        } else {
          console.log("Camera permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const selectImage = () => {
    requestPermission();
    launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.assets && response.assets.length > 0) {
        const source = response.assets[0].uri;
        setImageUri(source);
      }
    });
  };

  const uploadImage = async () => {
    if (!imageUri) {
      console.log("No image selected");
      return;
    }
    const formData = new FormData();
    formData.append("token", TOKEN.GetToken());
    formData.append("avatar", {
      uri: imageUri,
      type: "image/jpg",
      name: "img1.jpg",
    });
    console.log(formData);
    try {
      const response = await axios.putForm(`${DOMAIN}/update-avatar`, formData);
      console.log("Image uploaded successfully: ", response.data);
      Alert.alert("Thay đổi ảnh đại diện thành công");
    } catch (error) {
      console.log("Image upload failed: ", error.response.data);
    }
  };

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ color: "#ccc" }}>
        Bạn sẽ thấy sự thay đổi ở lần đăng nhập tiếp theo
      </Text>
      <View style={styles.borderImage}>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
      <View style={styles.option}>
        <AntDesign name="minus" color="gray" size={50} />
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: Colors._blue }]}
          onPress={selectImage}
        >
          <Entypo name="camera" size={20} color={Colors._white} />
          <Text style={styles.text}>Chụp ảnh mới</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: Colors._blue }]}
          onPress={selectImage}
        >
          <Entypo name="upload" size={20} color={Colors._white} />
          <Text style={styles.text}>Tải ảnh từ thiết bị</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, { backgroundColor: Colors._pink }]}
          onPress={uploadImage}
        >
          <Entypo name="image" size={20} color={Colors._white} />
          <Text style={styles.text}>Lưu thay đổi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default ImageSetting;

const styles = StyleSheet.create({
  option: {
    backgroundColor: Colors._white,
    width: "100%",
    height: "100%",
    alignItems: "center",
    borderRadius: 30,
    shadowColor: Colors._black,
    elevation: 5,
  },
  btn: {
    width: 300,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
    marginTop: 10,
    flexDirection: "row",
    shadowColor: Colors._white,
    elevation: 2,
  },
  text: {
    color: Colors._white,
    fontWeight: "bold",
    fontSize: 14,
    marginLeft: 10,
  },
  borderImage: {
    marginVertical: 30,
    width: 300,
    height: 300,
    borderRadius: 500,
    borderColor: Colors._blue,
    borderWidth: 3,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
