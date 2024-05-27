import React, { useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from "react-native";
import { DOMAIN, TOKEN } from "../config/const";
import ProcessString from "../config/processstring";
import Colors from "../asset/styles/color";
import axios from "axios";
import Entypo from "react-native-vector-icons/Entypo";
import Icon from "react-native-vector-icons/FontAwesome5";
import LinearGradient from "react-native-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import MessageProps from "../components/messageprops";
import LottieView from "lottie-react-native";

const ChatScreen = ({ route, navigation }) => {
  const friend = route.params;
  const friendEmail = friend.item.Info.Email;
  const [listMessages, setListMessages] = useState([]);
  const [testMess, setTestMess] = useState([{ time: "", content: "" }]);
  const [listTimes, setListTimes] = useState([]);
  const [msgIndex, setMsgIndex] = useState(0);
  const [message, setMessage] = useState("");
  const websocket = new WebSocket("ws://192.168.1.101:8080/ws");
  const [loading, setLoading] = useState(true);
  const [visableProps, setVisableProps] = useState(false);
  const [content, setContent] = useState("");
  const flatListRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
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
      setListMessages((prevMessages) => [
        ...prevMessages,
        jsonData.SenderEmail == friendEmail
          ? jsonData.Content
          : "^@" + jsonData.Content,
      ]);
    };

    websocket.onerror = (error) => {
      console.log("WebSocket error:", error);
    };

    websocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    getMessageByEmail();
    // Cleanup on unmount
    return () => {
      websocket.close();
    };
  }, []);

  // Auto Scroll to Last Message after send new message
  const scrollToEnd = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };
  const DeleteMessage = () => {
    axios
      .delete(`${DOMAIN}/delete-message/${TOKEN.GetToken()}/${time}`)
      .then((response) => {
        LongPressToggle();
        Alert.alert("Tin nhắn đã được xóa");
        getMessageByEmail();
      })
      .catch((error) => console.log(error));
  };
  // Get ALL message by email after join conversation
  const getMessageByEmail = () => {
    axios
      .get(
        `${DOMAIN}/get-all-message-by-email/${TOKEN.GetToken()}/${
          friend.item.Info.Email
        }`
      )
      .then((response) => {
        console.log(response.data);
        response.data.map((msg) => {
          setListMessages((preMessage) => [
            ...preMessage,
            msg.SenderEmail !== friendEmail ? "^@" + msg.Content : msg.Content,
          ]);
          setListTimes((preTime) => [...preTime, msg.Since]);
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };
  // Send Message
  const sendMessage = () => {
    if (websocket && message) {
      data = {
        case: 1,
        token: TOKEN.GetToken(),
        content: message,
        email: friend.item.Info.Email,
      };
      websocket.send(JSON.stringify(data));

      setMessage("");
    }
  };

  //Process Long Press Event
  const LongPressToggle = (item, index) => {
    msg = typeof item == "string" ? item.replace("^@", "") : item;
    time =
      typeof listTimes[index] == "string"
        ? listTimes[index].replace(" ", "_")
        : listTimes[index];
    setContent(msg);
    setMsgIndex(time);
    setVisableProps(!visableProps);
  };

  return (
    <ImageBackground
      resizeMode="cover"
      style={{ height: "100%" }}
      source={require("../asset/images/design/chat_bg.jpeg")}
    >
      <View style={styles.header}>
        <View style={styles.yourfriend}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="chevron-left" size={30} color={Colors._purple} />
          </TouchableOpacity>
          <Text style={styles.textHeader}>{friend.item.Info.Name}</Text>
        </View>
        <View style={styles.options}>
          <TouchableOpacity style={styles.btn}>
            <Ionicons name="call" size={25} color={Colors._purple} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Entypo name="menu" size={30} color={Colors._purple} />
          </TouchableOpacity>
        </View>
      </View>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: 100 }}
          size="large"
          color={Colors._blue}
          // source={require("../asset/templates/loading.json")}
        />
      ) : (
        <SafeAreaView style={styles.container}>
          <FlatList
            ref={flatListRef}
            style={styles.chat}
            data={listMessages}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) =>
              item !== null ? (
                <TouchableHighlight
                  underlayColor="transparent"
                  onLongPress={() => LongPressToggle(item, index)}
                  style={styles.boxchat}
                >
                  <LinearGradient
                    style={[
                      styles.basemessage,

                      item
                        ? item.indexOf("^@") == 0
                          ? styles.yourmessage
                          : styles.friendmessage
                        : styles.nullmessage,
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={
                      item.indexOf("^@") == 0
                        ? [Colors._blue, Colors._purple]
                        : [Colors._darkblue, Colors._skyblue]
                    }
                  >
                    <Text style={styles.text}>
                      {item ? item.replace("^@", "") : ""}
                    </Text>
                  </LinearGradient>
                </TouchableHighlight>
              ) : (
                <></>
              )
            }
          />
          <View style={styles.inputContainer}>
            <TouchableOpacity>
              <Entypo name="documents" color={Colors._black} size={30} />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Soạn tin nhắn"
              placeholderTextColor={Colors._black}
            />

            <TouchableHighlight
              style={styles.btn_send}
              underlayColor={Colors._green}
              onPress={() => {
                sendMessage();
                scrollToEnd();
              }}
            >
              <Entypo name="paper-plane" size={30} color={Colors._purple} />
            </TouchableHighlight>
          </View>
          <MessageProps
            visible={visableProps}
            content={content}
            onClose={LongPressToggle}
            time={msgIndex}
            deleteMsg={DeleteMessage}
          />
        </SafeAreaView>
      )}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: Colors._dash,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  yourfriend: {
    width: "70%",
    alignItems: "center",
    flexDirection: "row",
  },
  options: {
    width: "20%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  textHeader: {
    marginLeft: 20,
    fontWeight: "bold",
    fontSize: 16,
    color: Colors._black,
  },
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  input: {
    width: "75%",
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: Colors._white,
    borderEndEndRadius: 10,
    padding: 10,
    color: Colors._black,
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: "row",
    backgroundColor: Colors._dash,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  chat: {
    paddingHorizontal: 15,
  },
  boxchat: {
    width: "100%",
  },
  basemessage: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginVertical: 2,
    width: 220,
  },
  friendmessage: {
    borderBottomRightRadius: 20,
    color: Colors._black,
  },
  yourmessage: {
    marginLeft: 130,
    color: Colors._white,
    textAlign: "right",
    borderBottomLeftRadius: 20,
  },
  nullmessage: {
    backgroundColor: "transparent",
  },
  btn_send: {
    // backgroundColor: Colors._blue,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: Colors._white,
    fontWeight: "bold",
    fontSize: 15,
  },
});

export default ChatScreen;
