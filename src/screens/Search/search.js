import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Modal,
  Viewmodal,
  Alert,
  TouchableHighlight,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import Colors from "../../asset/styles/color";
import { ValidateEmail, DOMAIN, TOKEN } from "../../config/const";
import axios from "axios";
import defaultTemplate from "../../config/config";
import LottieView from "lottie-react-native";
import FastImage from "react-native-fast-image";
export default function SearchScreen({ navigation }) {
  const [searchString, setSearchString] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [pageNumber, setPageNumber] = useState(0);
  const defaultImage = defaultTemplate.avatar;

  const item = ({ item }) => (
    <View style={styles.friendContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <FastImage
          style={styles.img}
          source={{
            uri: item.Avatar
              ? `${DOMAIN}/get-avatar/${TOKEN.GetToken()}/${item.Avatar}`
              : defaultImage,
            priority: FastImage.priority.normal,
          }}
        />
        <View style={styles.info}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
            {item.Name}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
            {item.Email}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => addFriendRequest(item.Email)}
      >
        <Entypo name="add-user" size={20} color={Colors._blue} />
      </TouchableOpacity>
    </View>
  );
  function isEmail(value) {
    if (/\S+@\S+\.\S+/.test(value)) {
      return true;
    }
    return false;
  }

  const searchUser = () => {
    setLoading(true);
    setSearchResult([]);
    console.log("Searching for: " + searchString);
    //Search for email
    if (isEmail(searchString)) {
      axios
        .get(`${DOMAIN}/get-by-email/${TOKEN.GetToken()}/${searchString}`)
        .then((emailResult) => {
          setSearchResult(emailResult.data);
          console.log(searchResult);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    //Search for name
    else {
      axios
        .get(
          `${DOMAIN}/get-by-name/${TOKEN.GetToken()}/${searchString}/${pageNumber}`
        )
        .then((nameResult) => {
          setSearchResult(nameResult.data);
          console.log(nameResult.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(searchResult);
    setLoading(false);
  };
  // PAGING
  const FooterComponent = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setPageNumber(pageNumber - 1);
            searchUser();
          }}
        >
          <AntDesign name="caretleft" color={Colors._white} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn}>
          <Text
            style={{ fontSize: 18, color: Colors._white, fontWeight: "bold" }}
          >
            {pageNumber + 1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            setPageNumber(pageNumber + 1);
            searchUser();
          }}
        >
          <AntDesign name="caretright" color={Colors._white} size={20} />
        </TouchableOpacity>
      </View>
    );
  };

  const addFriendRequest = async (email) => {
    console.log(email);
    console.log(TOKEN.GetToken());
    try {
      let response = await axios.get(
        `${DOMAIN}/get-prekey-bundle/${TOKEN.GetToken()}/${email}`
      );
      console.log(response.data);
      // Processing encryption here
      let form = new FormData();
      form.append("toEmail", email);
      // Hard code ek for testing
      form.append(
        "ek",
        "7fb26648cca726f2cce63eda8e92e220684d0200f08d7076a3a4beec121af720"
      );
      form.append(
        "opkUsed",
        response.data.Opk.length === 64
          ? response.data.Opk
          : "0000000000000000000000000000000000000000000000000000000000000000"
      );
      form.append("token", TOKEN.GetToken());
      response = await axios.postForm(`${DOMAIN}/add-friend-request`, form);

      Alert.alert("Đã gửi lời mời kết bạn");
    } catch (err) {
      Alert.alert(`Hãy chờ ${email} xác nhận lời mời kết bạn`);
    }
    setModalVisible(false);
  };
  return (
    <View>
      {/* SEARCH INPUT */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: Colors._blue,
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 15,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={Colors._white} />
        </TouchableOpacity>
        <TextInput
          style={{
            width: "60%",
            borderRadius: 10,
            backgroundColor: Colors._white,
            height: 40,
            padding: 10,
            color: Colors._black,
            fontWeight: "bold",
          }}
          placeholder="Tìm kiếm bạn bè"
          placeholderTextColor={Colors._black}
          value={searchString}
          onChangeText={(text) => {
            setSearchString(text);
          }}
        />
        <TouchableHighlight
          underlayColor={Colors._yellow}
          style={{
            backgroundColor: Colors._white,
            height: 40,
            padding: 10,
            borderRadius: 10,
          }}
          onPress={() => searchUser()}
        >
          <Text style={styles.text}>Tìm kiếm</Text>
        </TouchableHighlight>
      </View>

      {/* RENDER SEARCH RESULT */}
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 200 }}
          size="large"
          color={Colors._blue}
        />
      ) : searchResult.length > 0 ? (
        <FlatList
          style={{ paddingHorizontal: 15, paddingTop: 15 }}
          data={searchResult}
          renderItem={item}
          keyExtractor={(item, index) => index}
          ListFooterComponent={FooterComponent}
        />
      ) : (
        <View style={{ alignItems: "center", marginTop: 150 }}>
          <Text style={styles.text}>Chưa có kết quả Tìm kiếm</Text>
          <LottieView
            style={{
              flex: 1,
              width: 300,
              height: 300,
            }}
            source={require("../../asset/templates/search.json")}
            autoPlay
            loop
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  friendContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Colors._white,
    shadowColor: Colors._black,
    elevation: 2,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 100,
    marginRight: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors._secondary,
  },
  dob: {
    fontSize: 12,
    color: Colors._black,
  },
  text: {
    color: Colors._black,
    fontSize: 14,
    fontWeight: "bold",
    maxWidth: 220,
  },
  footer: {
    padding: 15,
    height: 150,
    backgroundColor: Colors._white,
    alignItems: "center",
    borderRadius: 10,
    shadowColor: Colors._black,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  btn: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    marginHorizontal: 10,
    backgroundColor: Colors._darkblue,
  },
});
