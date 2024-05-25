import { View, Text, Modal, StyleSheet } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native";
import Colors from "../asset/styles/color";
export default function CheckModal({ tittle, message, visable, onClose }) {
  useEffect(() => {
    if (visable) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [visable, onClose]);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visable}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <AntDesign name="checkcircle" size={40} color={Colors._green} />
          <Text style={styles.message}>{tittle}</Text>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: 250,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  message: {
    fontSize: 16,
    color: Colors._black,
    fontWeight: "bold",
    textAlign: "center",
  },
});
