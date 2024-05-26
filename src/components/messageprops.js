// MMM.           .MMM
// MMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMM       ________________________________________
// MMMMMMMMMMMMMMMMMMMMM    |                                        |
// MMMMMMMMMMMMMMMMMMMMMMM   |    Hiển thị các tùy chỉnh tin nhắn     |
// MMMMMMMMMMMMMMMMMMMMMMMM   |   khi Long Press                       |
// MMMM::- -:::::::- -::MMMM   |_   ____________________________________|
// MM~:~   ~:::::~   ~:~MM       |/
// .. MMMMM::. .:::+:::. .::MMMMM ..
// .MM::::: ._. :::::MM.
//   MMMM;:::::;MMMM
// -MM        MMMMMMM
// M+ .::::. +MMMMMM
// MMMMMMM .:::::.
// MMM .:::.

import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Feather from "react-native-vector-icons/Feather";
import Entypo from "react-native-vector-icons/Entypo";
import Colors from "../asset/styles/color";
export default function MessageProps({
  visible,
  onClose,
  time,
  content,
  sender,
}) {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable onPress={onClose} style={styles.overlay}>
        <View style={styles.icons}>
          <Text style={styles.text}>{content}</Text>
        </View>
        <View style={styles.props}>
          <Entypo name="minus" size={25} color={Colors._purple} />
          <View style={styles.props_list}>
            <TouchableOpacity style={styles.btn}>
              <Entypo name="trash" size={25} color={Colors._purple} />
              <Text style={styles.text}>Xóa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Feather name="delete" size={25} color={Colors._purple} />
              <Text style={styles.text}>Thu hồi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Feather name="copy" size={25} color={Colors._purple} />
              <Text style={styles.text}>Sao chép</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
              <Entypo name="forward" size={25} color={Colors._purple} />
              <Text style={styles.text}>Chuyển tiếp</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  icons: {
    backgroundColor: Colors._white,
    padding: 20,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
  },
  props: {
    backgroundColor: Colors._white,
    paddingTop: 10,
    paddingHorizontal: 15,
    borderTopLeftRadius: 20,
    alignItems: "center",
    borderTopRightRadius: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  props_list: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 14,
    color: Colors._black,
  },
  btn: {
    alignItems: "center",
    justifyContent: "space-center",
    width: 90,
    height: 80,
  },
});
