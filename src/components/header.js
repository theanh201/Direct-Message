import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableWithoutFeedbackBase,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Colors from "../asset/styles/color";
import Entypo from "react-native-vector-icons/Entypo";

// Thành phần Header xuất hiện trong hầu hết các màn hình
export default function HeaderComponent({ navigation }) {
  const [optionVisible, setOptionVisible] = React.useState(false);

  const toggleOptionVisible = () => {
    setOptionVisible(!optionVisible);
  };
  return (
    <TouchableWithoutFeedback>
      <View style={styles.header}>
        <AntDesign name="search1" size={24} color={Colors._white} />
        <TouchableOpacity
          style={styles.searchInput}
          onPress={() => navigation.navigate("SearchScreen")}
        >
          <Text style={styles.txt_input}>Tìm kiếm</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleOptionVisible}>
          <Entypo name="plus" size={24} color={Colors._white} />
        </TouchableOpacity>
        {optionVisible && (
          <View style={styles.header_options}>
            <TouchableOpacity style={styles.option_fn}>
              <AntDesign name="adduser" color={Colors._black} size={14} />
              <Text style={styles.txt_input}>Thêm bạn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option_fn}>
              <AntDesign name="addusergroup" color={Colors._black} size={14} />
              <Text style={styles.txt_input}>Tạo nhóm</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}
const styles = StyleSheet.create({
  // style cho header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: Colors._blue,
    position: "relative",
    overflow: "visible",
  },
  // style cho thanh tìm kiếm
  searchInput: {
    width: "80%",
    marginHorizontal: 10,
    fontSize: 16,
    backgroundColor: Colors._white,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  txt_input: {
    color: Colors._black,
    fontSize: 14,
    fontWeight: "500",
  },
  header_options: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: Colors._white,

    shadowColor: Colors._black,
    elevation: 10,
    width: "40%",
    borderRadius: 5,
  },
  option_fn: {
    width: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors._black,
    borderWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
