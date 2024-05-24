import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import React from "react";
import Colors from "../../asset/styles/color";
import Entypo from "react-native-vector-icons/Entypo";
export default function SettingAccout() {
  return (
    <View style={{ padding: 15 }}>
      <View>
        <Text style={styles.title}>Tài khoản</Text>
        <TouchableOpacity>
          <View style={styles.box}>
            <Image />
            <View>
              <Text style={styles.text}>Thông tin cá nhân</Text>
              <Text style={styles.text}>Đào Đức Huy</Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.box}>
            <Entypo name="edit" color={Colors._black} size={20} />
            <View>
              <Text style={styles.text}>Đổi tên</Text>
              <TextInput value="Huy" />
            </View>
            <Entypo name="chevron-down" size={20} color={Colors._blue} />
          </View>
        </TouchableOpacity>
        <View style={styles.box}>
          <Entypo name="phone" color={Colors._black} size={20} />
          <View>
            <Text style={styles.text}>Số điện thoại</Text>
            <Text style={styles.text}>0912786313</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.box}>
          <Entypo name="mail" color={Colors._black} size={20} />

          <View>
            <Text style={styles.text}>Địa chỉ Email</Text>
            <Text style={styles.text}>huymobile5979@gmail.com</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View>
        <Text style={styles.title}>Bảo mật</Text>

        <TouchableOpacity>
          <View style={styles.box_content}>
            <View style={styles.content}>
              <Entypo name="lock" color={Colors._black} size={20} />

              <Text style={styles.text}>Đổi mật khẩu</Text>
            </View>
            <Entypo name="chevron-down" size={20} color={Colors._blue} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.box_content}>
            <View style={styles.content}>
              <Entypo name="mail" color={Colors._black} size={20} />

              <Text style={styles.text}>Đổi email</Text>
            </View>
            <Entypo name="chevron-down" size={20} color={Colors._blue} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity>
          <View style={styles.box_content}>
            <View style={styles.content}>
              <Entypo name="trash" color={Colors._black} size={20} />

              <Text style={styles.text}>Xóa tài khoản</Text>
            </View>
            <Entypo name="chevron-down" size={20} color={Colors._blue} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    color: Colors._blue,
    fontWeight: "bold",
  },
  text: {
    color: Colors._black,
    fontWeight: "bold",
    marginLeft: 10,
  },
  box_content: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    backgroundColor: Colors._white,
    marginVertical: 5,
    shadowColor: Colors._black,
    elevation: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  box: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: Colors._white,
    marginVertical: 5,
    shadowColor: Colors._black,
    elevation: 5,
    borderRadius: 10,
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
  },
});
