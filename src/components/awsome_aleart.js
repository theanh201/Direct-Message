import { View, Text, Modal, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Colors from "../asset/styles/color";

export default function AwsomeAleart({
  title,
  message,
  visible,
  onClose,
  onConfirm,
}) {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.text}>{message}</Text>
          <View style={styles.list_btn}>
            <TouchableOpacity
              style={[{ backgroundColor: Colors._red }, styles.btn]}
              onPress={onClose}
            >
              <Text style={styles.text_confirm}>Từ chối</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[{ backgroundColor: Colors._green }, styles.btn]}
              onPress={onConfirm}
            >
              <Text style={styles.text_confirm}>Đồng ý</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    width: "100%",
    height: "100%",
  },
  modal: {
    backgroundColor: Colors._white,
    padding: 20,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
  },
  list_btn: {
    width: "100%",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  btn: {
    width: "45%",
    borderRadius: 20,
    padding: 10,
    alignItems: "center",
    shadowColor: Colors._black,
    elevation: 5,
  },
  text: {
    color: Colors._black,
    fontSize: 14,
    fontWeight: "bold",
  },
  text_confirm: {
    color: Colors._white,
    fontSize: 14,
    fontWeight: "bold",
  },
});
