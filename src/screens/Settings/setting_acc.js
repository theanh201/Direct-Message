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
import CheckModal from "../../components/check";
export default function SettingAccout({ navigation }) {
  const [visableChangePassword, setVissableChangePassword] = useState(false);
  const [visableChangeEmail, setVissableChangeEmail] = useState(false);
  const [visableChangeName, setVissableChangeName] = useState(false);
  const [visableDeleteAcc, setVissableDeleteAcc] = useState(false);
  // new info
  const [newName, setNewName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [delPassword, setDelPassword] = useState("");
  const [delEmail, setDelEmail] = useState("");

  // Alert
  const [visableAlertChangeName, setVisableAlertChangeName] = useState(false);
  const [visableAlertChangePassword, setVisableAlertChangePassword] =
    useState(false);
  const [visableAlertChangeEmail, setVisableAlertChangeEmail] = useState(false);
  const [visableAlertDelAcc, setVisableAlertDelAcc] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const ToggleCheck = () => {
    setShowCheck(!showCheck);
  };
  // Toggle
  const onToggleChangeName = () =>
    setVisableAlertChangeName(!visableAlertChangeName);
  const onToggleChangePassword = () =>
    setVisableAlertChangePassword(!visableAlertChangePassword);
  const onToggleChangeEmail = () =>
    setVisableAlertChangeEmail(!visableAlertChangeEmail);
  const onToggleDelAcc = () => setVisableAlertDelAcc(!visableAlertDelAcc);
  // Handle Event
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
        ToggleCheck();
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
        setVisableAlertChangePassword(false);
        setVissableChangePassword(false);
        ToggleCheck();
      })
      .catch((error) => console.log(error.response.data));
  };

  const handleChangeEmail = () => {
    let formData = new FormData();
    formData.append("token", TOKEN.GetToken());
    formData.append("email", newEmail);
    axios
      .putForm(`${DOMAIN}/update-email`, formData)
      .then((response) => {
        console.log(response.data);
        setVisableAlertChangeEmail(false);
        setVissableChangeEmail(false);
        ToggleCheck();
      })
      .catch((error) => console.log(error.response.data));
  };

  const handleDeleteAccout = async () => {
    axios
      .delete(
        `${DOMAIN}/delete-self/${delEmail}/${delPassword}/${TOKEN.GetToken()}`
      )
      .then((response) => {
        console.log(response);
        setVisableAlertDelAcc(false);
        setVisseDelAcc(false);
        ToggleCheck();
      })
      .catch((error) => console.log(error));
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
            <Image
              style={{ width: 50, height: 50 }}
              source={{ uri: defaultTemplate.avatar }}
            />
            <View>
              <Text style={styles.text}>Thông tin cá nhân</Text>
              <Text style={styles.text}>Đào Đức Huy</Text>
            </View>
          </View>
        </TouchableOpacity>
        {/* EMAIL INFO */}
        <TouchableOpacity style={[{ paddingHorizontal: 25 }, styles.box]}>
          <Entypo name="mail" color={Colors._black} size={30} />

          <View style={{ marginLeft: 10 }}>
            <Text style={styles.text}>Địa chỉ Email</Text>
            <Text style={styles.text}>huymobile5979@gmail.com</Text>
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
            <TouchableOpacity
              style={styles.btn_confirm}
              onPress={() =>
                setVisableAlertChangePassword(!visableAlertChangeEmail)
              }
            >
              <Text style={styles.text_confirm}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        )}
        <AwsomeAleart
          title="Xác nhận đổi mật khẩu"
          message="Bạn có chắc muốn đổỉ mật khẩu?"
          visible={visableAlertChangePassword}
          onClose={onToggleChangePassword}
          onConfirm={handleChangePassword}
        />

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
                value={newEmail}
                onChangeText={(value) => setNewEmail(value)}
                style={styles.input}
                placeholder="Nhập email mới"
                placeholderTextColor={Colors._black}
              />
            </View>
            <TouchableOpacity
              onPress={handleChangeEmail}
              style={styles.btn_confirm}
            >
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
            <TouchableOpacity
              style={styles.btn_confirm}
              onPress={() => setVisableAlertDelAcc(!visableAlertDelAcc)}
            >
              <Text style={styles.text_confirm}>Xác nhận</Text>
            </TouchableOpacity>
          </View>
        )}
        <AwsomeAleart
          title="Xác nhận đổi xóa tài khoản"
          message="Bạn có chắc muốn xóa tài khoản?"
          visible={visableAlertDelAcc}
          onClose={onToggleDelAcc}
          onConfirm={handleDeleteAccout}
        />
      </View>
      <CheckModal
        message="Chúc mừng"
        title="Thực hiện thành công"
        visable={showCheck}
        onClose={ToggleCheck}
      />
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
