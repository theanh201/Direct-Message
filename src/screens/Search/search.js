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
export default function SearchScreen({ navigation }) {
  const [searchString, setSearchString] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  let pageNumber = 0;
  const defaultImage = defaultTemplate.avatar;
  const item = ({ item }) => (
    <View style={styles.friendContainer}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={styles.img}
          source={{
            uri: item.Avatar
              ? `${DOMAIN}/get-avatar/${TOKEN.GetToken()}/${item.Avatar}`
              : defaultImage,
          }}
        />
        <View style={styles.info}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
            Tên: {item.Name}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>
            Email: {item.Email}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={() => addFriendRequest(item.Email)}>
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
          console.log(searchResult.length);
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
          console.log(searchResult.length);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    console.log(searchResult);
    setLoading(false);
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
      console.log(response.data);
      Alert.alert("Đã gửi lời mời kết bạn");
    } catch (err) {
      console.error(err.response.data);
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

      {/* <Modal
        style={{ alignItems: "center" }}
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View
          style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderRadius: 10,
              alignContent: "center",
              width: "90%",
            }}
          >
            <Image
              style={{ height: "30%", width: "100%", borderRadius: 10 }}
              source={{
                uri: `${DOMAIN}/get-background/${TOKEN.GetToken()}`,
              }}
            />
            <View style={{ alignItems: "center", top: -50 }}>
              <Image
                style={{
                  height: 100,
                  width: 100,
                  borderColor: "gray",
                  borderWidth: 2,
                  borderRadius: 360,
                }}
                source={{
                  uri: `${DOMAIN}/get-avatar/${TOKEN.GetToken()}/${avatar}`,
                }}
              />
              <Text style={{ fontSize: 25 }}>{name}</Text>
              <Text>Email: {email}</Text>
            </View>
            <View
              style={{
                bottom: 5,
                paddingHorizontal: 5,
                position: "absolute",
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => addFriendRequest(email)}
                style={{
                  backgroundColor: "green",
                  borderRadius: 5,
                  alignItems: "center",
                  marginBottom: 5,
                }}
              >
                <Text style={{ fontSize: 20, padding: 5 }}>AddFriend</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
                style={{
                  backgroundColor: "red",
                  borderRadius: 5,
                  alignItems: "center",
                }}
              >
                <Text style={{ fontSize: 20, padding: 5 }}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}

      {/* RENDER SEARCH RESULT */}
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 200 }}
          size="large"
          color={Colors._blue}
        />
      ) : searchResult.length > 0 ? (
        <FlatList
          style={{ padding: 15 }}
          data={searchResult}
          renderItem={item}
          keyExtractor={(item) => item.email}
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
});
