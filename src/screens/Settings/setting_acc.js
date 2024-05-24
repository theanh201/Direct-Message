import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import Colors from "../../asset/styles/color";
import Entypo from "react-native-vector-icons/Entypo";
import defaultTemplate from "../../config/config";
import { sha256 } from "react-native-sha256";
import { DOMAIN, TOKEN } from "../../config/const";
import axios from "axios";
import AwsomeAleart from "../../components/awsome_aleart";
export default function SettingAccout() {
  const [visableChangePassword, setVissableChangePassword] = useState(false);
  const [visableChangeEmail, setVissableChangeEmail] = useState(false);
  const [visableChangeName, setVissableChangeName] = useState(false);
  const [visableDeleteAcc, setVissableDeleteAcc] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [delPassword, setDelPassword] = useState("");
  const [delEmail, setDelEmail] = useState("");

  // Aleart
  const [visableAlertChangeName, setVisableAlertChangeName] = useState(false);
  const [visableAlertChangePassword, setVisableAlertChangePassword] =
    useState(false);
  // Toggle
  const onToggleChangeName = () =>
    setVisableAlertChangeName(!visableAlertChangeName);

  const handleChangeName = () => {
    let formData = new FormData();
    formData.append("token", TOKEN.GetToken());
    formData.append("name", newName);
    axios
      .putForm(`${DOMAIN}/update-name`, formData)
      .then((response) => {
        console.log(response.data);
        setVisableAlertChangeName(false);
        setVissableChangeName(false);
      })
      .catch((error) => console.log(error.response.data));
  };
  const handleChangePassword = async () => {
    let formData = new FormData();
    formData.append("token", TOKEN.GetToken());
    formData.append("name", await sha256(newName));
    axios
      .putForm(`${DOMAIN}/update-password`, formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error.response.data));
  };

  const handleDeleteAccout = async () => {
    let token = TOKEN.GetToken();
    axios
      .delete(`${DOMAIN}/delete-self/${token}/${delEmail}/${delPassword}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error.response.data));
  };
  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      style={{ paddingHorizontal: 15, paddingBottom: 70 }}
    >
      <View>
        <Text style={styles.title}>Tài khoản</Text>
        <TouchableOpacity>
          <View style={styles.box}>
            <Image source={{ uri: defaultTemplate.avatar }} />
            <View>
              <Text style={styles.text}>Thông tin cá nhân</Text>
              <Text style={styles.text}>Đào Đức Huy</Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* Change UserName */}
        <TouchableHighlight
          style={styles.box_content}
          underlayColor={Colors._blue}
          onPress={() => setVissableChangeName(!visableChangeName)}
        >
          <View style={styles.btn}>
            <View style={styles.content}>
              <Entypo name="edit" color={Colors._black} size={20} />
              <Text style={styles.text}>Đổi tên</Text>
            </View>
            {!visableChangeName && (
              <Entypo name="chevron-down" size={20} color={Colors._blue} />
            )}
            {visableChangeName && (
              <Entypo name="chevron-up" size={20} color={Colors._blue} />
            )}
          </View>
        </TouchableHighlight>
        {visableChangeName && (
          <View style={styles.form}>
            <View style={styles.box_input}>
              <TextInput
                style={styles.input}
                placeholder="Nhập Tên mới"
                value={newName}
                onChangeText={(value) => setNewName(value)}
                placeholderTextColor={Colors._black}
              />
            </View>
            <TouchableOpacity
              onPress={onToggleChangeName}
              style={styles.btn_confirm}
            >
              <Text style={styles.text_confirm}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        )}
        <AwsomeAleart
          title="Xác nhận đổi tên"
          message="Bạn có chắc muốn đổi tên?"
          visible={visableAlertChangeName}
          onClose={onToggleChangeName}
          onConfirm={handleChangeName}
        />
        {/* PHONE */}
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
        {/* Change Password */}
        <TouchableHighlight
          style={styles.box_content}
          underlayColor={Colors._blue}
          onPress={() => setVissableChangePassword(!visableChangePassword)}
        >
          <View style={styles.btn}>
            <View style={styles.content}>
              <Entypo name="lock" color={Colors._black} size={20} />
              <Text style={styles.text}>Đổi mật khẩu</Text>
            </View>
            {!visableChangePassword && (
              <Entypo name="chevron-down" size={20} color={Colors._blue} />
            )}
            {visableChangePassword && (
              <Entypo name="chevron-up" size={20} color={Colors._blue} />
            )}
          </View>
        </TouchableHighlight>
        {visableChangePassword && (
          <View style={styles.form}>
            <View style={styles.box_input}>
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={(value) => setNewPassword(value)}
                placeholder="Nhập mật khẩu mới"
                placeholderTextColor={Colors._black}
              />
            </View>
            <View style={styles.box_input}>
              <TextInput
                value={confirmNewPassword}
                onChangeText={(value) => setConfirmNewPassword(value)}
                style={styles.input}
                placeholder="Nhập lại mật khẩu mới"
                placeholderTextColor={Colors._black}
              />
            </View>
            <TouchableOpacity style={styles.btn_confirm}>
              <Text style={styles.text_confirm}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Change Email */}
        <TouchableHighlight
          style={styles.box_content}
          underlayColor={Colors._blue}
          onPress={() => setVissableChangeEmail(!visableChangeEmail)}
        >
          <View style={styles.btn}>
            <View style={styles.content}>
              <Entypo name="mail" color={Colors._black} size={20} />
              <Text style={styles.text}>Đổi Email</Text>
            </View>
            {!visableChangeEmail && (
              <Entypo name="chevron-down" size={20} color={Colors._blue} />
            )}
            {visableChangeEmail && (
              <Entypo name="chevron-up" size={20} color={Colors._blue} />
            )}
          </View>
        </TouchableHighlight>
        {visableChangeEmail && (
          <View style={styles.form}>
            <View style={styles.box_input}>
              <TextInput
                style={styles.input}
                placeholder="Nhập email mới"
                placeholderTextColor={Colors._black}
              />
            </View>
            <TouchableOpacity style={styles.btn_confirm}>
              <Text style={styles.text_confirm}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* DELETE ACCOUT */}
        <TouchableHighlight
          style={styles.box_content}
          underlayColor={Colors._red}
          onPress={() => setVissableDeleteAcc(!visableDeleteAcc)}
        >
          <View style={styles.btn}>
            <View style={styles.content}>
              <Entypo name="trash" color={Colors._black} size={20} />
              <Text style={styles.text}>Xóa tài khoản</Text>
            </View>
            {!visableDeleteAcc && (
              <Entypo name="chevron-down" size={20} color={Colors._blue} />
            )}
            {visableDeleteAcc && (
              <Entypo name="chevron-up" size={20} color={Colors._blue} />
            )}
          </View>
        </TouchableHighlight>
        {visableDeleteAcc && (
          <View style={styles.form}>
            <View style={styles.box_input}>
              <TextInput
                style={styles.input}
                value={delEmail}
                onChangeText={setDelEmail}
                placeholder="Nhập email"
                placeholderTextColor={Colors._black}
              />
            </View>
            <View style={styles.box_input}>
              <TextInput
                style={styles.input}
                placeholder="Nhập mật khẩu"
                value={delPassword}
                onChangeText={setDelPassword}
                placeholderTextColor={Colors._black}
              />
            </View>
            <TouchableOpacity style={styles.btn_confirm}>
              <Text style={styles.text_confirm}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
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
  btn: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
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
  // FORM
  form: {
    paddingHorizontal: 15,
    alignItems: "center",
  },
  box_input: {
    width: "100%",
    marginVertical: 5,
  },
  text_confirm: {
    color: Colors._white,
    fontSize: 14,
  },
  btn_confirm: {
    backgroundColor: Colors._blue,
    width: "100%",
    padding: 10,
    alignItems: "center",
    marginVertical: 5,
    borderRadius: 10,
  },
  input: {
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: Colors._white,
    color: Colors._black,
  },
});
