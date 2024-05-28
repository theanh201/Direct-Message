import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import Colors from "../../asset/styles/color";
import SwitchUser from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import PersonalScreen from "../Profile/personal";
import AwsomeAleart from "../../components/awsome_aleart";
import { USECACHE } from "../../config/cache";
import { DOMAIN, TOKEN } from "../../config/const";
import FastImage from "react-native-fast-image";
import axios from "axios";
import defaultTemplate from "../../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function UserScreen({ navigation }) {
  const [modalVisable, setModalVisable] = useState(false);
  const [myInfo, setMyInfo] = useState({});
  const fetchInfo = async () => {
    // bug need help
    // info = await USECACHE.GetData("info");
    try{
      const info = await axios.get(`${DOMAIN}/get-self-info/${TOKEN.GetToken()}`)
      setMyInfo(info.data);
    }catch(e){
      console.error(e);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);
  const onToggleAleart = () => {
    setModalVisable(!modalVisable);
  };
  const onConfirm = async () => {
    try {
      await AsyncStorage.clear();
    } catch (e) {
      // clear error
      console.error(e);
    }
    navigation.replace("LoginScreen");
  };
  return (
    <View style={{ alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 15,
          alignItems: "center",
          backgroundColor: Colors._white,
          borderBottomColor: Colors._dash,
          borderBottomWidth: 1,
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={styles.profile}
          onPress={() => navigation.navigate("PersonalScreen")}
        >
          <View>
            <FastImage
              style={{ width: 50, height: 50, borderRadius: 50 }}
              source={{
                uri: myInfo
                  ? `${DOMAIN}/get-avatar/${TOKEN.GetToken()}/${myInfo.Avatar}`
                  : defaultTemplate.avatar,
                priority: FastImage.priority.high,
              }}
            />
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <Text style={styles.text}>{myInfo.Name}</Text>
            <Text style={styles.text}>Xem trang cá nhân</Text>
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity>
          <SwitchUser name="account-switch" size={25} color={Colors._blue} />
        </TouchableOpacity> */}
      </View>

      <TouchableOpacity
        style={styles.profile_box}
        onPress={() => navigation.navigate("SettingAccout")}
      >
        <View style={styles.profile_content}>
          <Entypo name="lock" size={24} color={Colors._blue} />
          <Text style={styles.text}>Tài khoản và bảo mật</Text>
        </View>
        <Entypo name="chevron-right" size={24} color={Colors._blue} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.profile_box}
        onPress={() => navigation.navigate("FriendRequest")}
      >
        <View style={styles.profile_content}>
          <Entypo name="add-user" size={24} color={Colors._blue} />
          <Text style={styles.text}>Lời mời kết bạn</Text>
        </View>
        <Entypo name="chevron-right" size={24} color={Colors._blue} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.logout} onPress={onToggleAleart}>
        <Text style={styles.logout_text}>Đăng xuất</Text>
      </TouchableOpacity>
      <AwsomeAleart
        title="Xác nhận"
        message="Bạn có chắc muốn đăng xuất?"
        visible={modalVisable}
        onClose={onToggleAleart}
        onConfirm={onConfirm}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  profile: {
    flexDirection: "row",
  },
  profile_box: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors._white,
    width: "100%",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: Colors._dash,
  },
  profile_content: {
    flexDirection: "row",
  },
  text: {
    color: Colors._black,
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "bold",
  },
  logout: {
    backgroundColor: Colors._red,
    width: 300,
    padding: 10,
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
  },
  logout_text: {
    color: Colors._white,
    fontWeight: "bold",
    fontSize: 14,
  },
});
