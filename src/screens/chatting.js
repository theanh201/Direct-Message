import React, { useEffect, useState } from "react";
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

const ChatScreen = ({ route, navigation }) => {
  const friend = route.params;
  const friendEmail = friend.item.Info.Email;
  const [listMessages, setListMessages] = useState([]);
  const [testMess, setTestMess] = useState([{ time: "", content: "" }]);
  const [listTimes, setListTimes] = useState([]);
  const [message, setMessage] = useState("");
  const websocket = new WebSocket("ws://192.168.1.101:8080/ws");

  const [textWidths, setTextWidths] = useState({});
  const [visableProps, setVisableProps] = useState(false);
  const [content, setContent] = useState("");
  const [layout, setLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });
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
      setListMessages((prevMessages) => [...prevMessages, jsonData.Content]);
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
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
  const getMessageByEmail = () => {
    axios
      .get(
        `${DOMAIN}/get-all-message-by-email/${TOKEN.GetToken()}/${
          friend.item.Info.Email
        }`
      )
      .then((response) => {
        response.data.map((msg) => {
          setListMessages((preMessage) => [
            ...preMessage,
            msg.SenderEmail !== friendEmail ? "^" + msg.Content : msg.Content,
          ]);
          setTestMess((preMess) => [
            ...preMess,
            { time: msg.Since, content: msg.Content },
          ]);
        });
      })
      .catch((error) => console.log(error));
  };
  const getAllMessage = () => {
    axios
      .get(`${DOMAIN}/get-all-message/${TOKEN.GetToken()}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response.data));
  };

  const sendMessage = () => {
    if (websocket) {
      data = {
        case: 1,
        token: TOKEN.GetToken(),
        content: message,
        email: friend.item.Info.Email,
      };
      websocket.send(JSON.stringify(data));
      const myMessage = "^" + data.content;
      setListMessages((preMessage) => [...preMessage, myMessage]);
      console.log(listMessages);
      setMessage("");
    }
  };
  // websocket.onmessage = (event) => {
  //   const newMess = event.data;
  //   console.log(newMess);
  //   setListMessages((preMessage) => [...preMessage, newMess]);
  //   console.log("Message from server:", messages);
  // };
  // };

  // const fetchMessage=()=>{
  //   axios.get(`${DOMAIN}/get-all-message-after-time/${TOKEN.GetToken()}/2024-05-03 20:57:28")
  // }

  //Process Text Width
  const LongPressToggle = (item) => {
    setContent(item);
    setVisableProps(!visableProps);
  };
  const handleLayout = (event) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setLayout({ x, y, width, height });
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
      <SafeAreaView style={styles.container}>
        <FlatList
          style={styles.chat}
          data={listMessages}
          renderItem={({ item }) =>
            item !== null ? (
              <TouchableHighlight
                underlayColor="transparent"
                onLongPress={() => LongPressToggle(item)}
                style={styles.boxchat}
                onLayout={handleLayout}
              >
                <LinearGradient
                  style={[
                    styles.basemessage,

                    item
                      ? item.indexOf("^") == 0
                        ? styles.yourmessage
                        : styles.friendmessage
                      : styles.nullmessage,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  colors={
                    item.indexOf("^") == 0
                      ? [Colors._blue, Colors._purple]
                      : [Colors._darkblue, Colors._skyblue]
                  }
                >
                  <Text style={styles.text}>
                    {item ? item.replace("^", "") : ""}
                  </Text>
                </LinearGradient>
              </TouchableHighlight>
            ) : (
              <></>
            )
          }
          keyExtractor={(item, index) => index.toString()}
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
            onPress={sendMessage}
          >
            <Entypo name="paper-plane" size={30} color={Colors._purple} />
          </TouchableHighlight>
        </View>
        <MessageProps
          visible={visableProps}
          content={content}
          onClose={LongPressToggle}
        />
      </SafeAreaView>
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
