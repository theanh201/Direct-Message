import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../asset/styles/color";
import SwitchUser from "react-native-vector-icons/MaterialCommunityIcons";
import Entypo from "react-native-vector-icons/Entypo";
import PersonalScreen from "../Profile/personal";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function UserScreen({ navigation }) {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 15,
          alignItems: "center",
          backgroundColor: Colors._white,
          borderBottomColor: Colors._dash,
          borderBottomWidth: 1,
        }}
      >
        <TouchableOpacity
          style={styles.profile}
          onPress={() => navigation.navigate("PersonalScreen")}
        >
          <Image
            style={{ width: 50, height: 50, borderRadius: 20 }}
            source={require("../../asset/images/design/avt.jpg")}
          />
          <View style={{ marginHorizontal: 10 }}>
            <Text style={styles.text}>Đào Đức Huy</Text>
            <Text style={styles.text}>Xem trang cá nhân</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <SwitchUser name="account-switch" size={25} color={Colors._blue} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.profile_box}>
        <View style={styles.profile_content}>
          <Entypo name="lock" size={24} color={Colors._blue} />
          <Text style={styles.text}>Tài khoản và bảo mật</Text>
        </View>
        <Entypo name="chevron-right" size={24} color={Colors._blue} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.profile_box}>
        <View style={styles.profile_content}>
          <Entypo name="shield" size={24} color={Colors._blue} />
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
});
