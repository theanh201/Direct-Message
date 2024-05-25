import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  Text,
  View,
} from "react-native";
import { DOMAIN, TOKEN } from "../config/const";
import ProcessString from "../config/processstring";
import Colors from "../asset/styles/color";
import axios from "axios";
const ChatScreen = ({ route }) => {
  const friend = route.params;
  const [listMessages, setListMessages] = useState([]);
  const [message, setMessage] = useState("");
  const websocket = new WebSocket("ws://192.168.1.101:8080/ws");

  useEffect(() => {
    // Initialize WebSocket connection
    console.log(listMessages);
    websocket.onopen = () => {
      console.log("WebSocket connection opened");
      onl_mess = {
        case: 0,
        token: TOKEN.GetToken(),
      };
      websocket.send(JSON.stringify(onl_mess));
      console.log("Sent online notification to server");
      getAllMessage();
    };

    websocket.onmessage = (event) => {
      jsonData = ProcessString(event.data);

      setListMessages((prevMessages) => [...prevMessages, jsonData.Content]);
    };

    websocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    websocket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Cleanup on unmount
    return () => {
      websocket.close();
    };
  }, []);

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

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        style={styles.chat}
        data={listMessages}
        renderItem={({ item }) => (
          <View style={styles.boxchat}>
            <Text
              style={[
                styles.basemessage,
                item
                  ? item.indexOf("^") == 0
                    ? styles.yourmessage
                    : styles.friendmessage
                  : styles.nullmessage,
              ]}
            >
              {item ? item.replace("^", "") : ""}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          placeholderTextColor={Colors._black}
        />

        <Button title="Send" onPress={sendMessage} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginRight: 10,
    color: Colors._black,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  chat: {},
  boxchat: {
    width: "100%",
  },
  basemessage: {
    maxWidth: 250,
    padding: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: Colors._white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginVertical: 2,
  },
  friendmessage: {
    borderBottomRightRadius: 20,
    backgroundColor: Colors._blue,
  },
  yourmessage: {
    marginLeft: 100,

    textAlign: "right",
    borderBottomLeftRadius: 20,
    backgroundColor: Colors._green,
  },
  nullmessage: {
    backgroundColor: "transparent",
  },
});

export default ChatScreen;
