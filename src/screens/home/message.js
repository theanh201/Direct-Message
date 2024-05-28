import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import axios from "axios";
import Colors from "../../asset/styles/color";
import Feather from "react-native-vector-icons/Feather";
import AntDesign from "react-native-vector-icons/AntDesign";
import { DOMAIN, TOKEN } from "../../config/const";
import { SafeAreaView } from "react-native-safe-area-context";
import defaultTemplate from "../../config/config";
import LottieView from "lottie-react-native";
import CheckModal from "../../components/check";
import ProcessString from "../../config/processstring";
import Button from "react-native-really-awesome-button";
import FastImage from "react-native-fast-image";
const MyComponent = ({ navigation }) => {
  const [friendList, setFriendList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCheck, setVisableCheck] = useState(false);
  const [topMessage, setTopMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const websocket = new WebSocket("ws://192.168.1.101:8080/ws");

  const ToggleCheck = () => {
    setVisableCheck(!visibleCheck);
  };

  // const PutNewMessage = () =>{
  //   if (newMessage){
  //     friendList.
  //   }
  // }
  useEffect(() => {
    fetchData();

    websocket.onopen = () => {
      console.log("WebSocket connection opened");
      onl_mess = {
        case: 0,
        token: TOKEN.GetToken(),
      };
      websocket.send(JSON.stringify(onl_mess));
      console.log("Sent online notification to server");
    };

    websocket.onmessage = (event) => {
      jsonData = ProcessString(event.data);
      console.log(jsonData);
      setNewMessage(jsonData.Content);
      // setListMessages((prevMessages) => [...prevMessages, jsonData.Content]);
    };

    websocket.onerror = (error) => {
      console.log("WebSocket error:", error);
    };

    websocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // getMessageByEmail();
    // Cleanup on unmount
    return () => {
      websocket.close();
    };
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${DOMAIN}/get-friend-list/${TOKEN.GetToken()}`
      );
      setFriendList(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
    setLoading(false);
  };
  const handleChat = (item) => {
    navigation.navigate("ChatScreen", { item });
  };
  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <LottieView
          style={{ width: 200, height: 200 }}
          source={require("../../asset/templates/loading3.json")}
          autoPlay
          loop
        />
      ) : friendList ? (
        <View>
          <View
            style={{
              padding: 15,
              backgroundColor: Colors._darkblue,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          >
            <Text style={{ color: Colors._white }}>Các cuộc trò chuyện</Text>
          </View>
          <FlatList
            data={friendList}
            keyExtractor={(item) => item.Info.Email}
            style={{}}
            renderItem={({ item }) => (
              <View style={styles.friend}>
                <FastImage
                  style={styles.img}
                  source={{
                    uri: item.Info.Avatar
                      ? `${DOMAIN}/get-avatar/${TOKEN.GetToken()}/${
                          item.Info.Avatar
                        }`
                      : defaultTemplate.avatar,
                    priority: FastImage.priority.high,
                  }}
                />
                <View style={styles.info}>
                  <Text style={styles.text}>{item.Info.Name}</Text>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => handleChat(item)}
                      style={[styles.btn, { backgroundColor: Colors._blue }]}
                    >
                      <Feather
                        name="message-square"
                        size={20}
                        color={Colors._white}
                      />
                      <Text style={styles.textConfirm}>
                        Tham gia cuộc trò chuyện
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
          <CheckModal
            tittle="Thành công"
            message="Gọi thành công"
            visable={visibleCheck}
            onClose={ToggleCheck}
          />
          <View style={{ height: 50 }}></View>
        </View>
      ) : (
        <Text>Hiện không có bạn bè</Text>
      )}
    </SafeAreaView>
  );
};

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
  friend: {
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
  btn: {
    width: 240,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginHorizontal: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    shadowColor: Colors._black,
    elevation: 5,
  },
  img: {
    width: 60,
    height: 60,
    borderRadius: 60,
    borderColor: Colors._dash,
    borderWidth: 1,
  },
  info: {
    width: "70%",
    alignItems: "center",
    marginLeft: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors._secondary,
  },
  text: {
    fontSize: 14,
    color: Colors._black,
    fontWeight: "bold",
  },
  textConfirm: {
    fontSize: 12,
    color: Colors._white,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default MyComponent;
