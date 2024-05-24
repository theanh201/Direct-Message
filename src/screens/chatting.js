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
import Colors from "../asset/styles/color";
const ChatScreen = ({ route }) => {
  const friend = route.params;
  const [listMessages, setListMessages] = useState([]);
  const [message, setMessage] = useState("");
  const websocket = new WebSocket("ws://192.168.1.101:8080/ws");
  useEffect(() => {
    // Initialize WebSocket connection
    console.log("Chat with:");
    console.log(friend.item.Info.Name);
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
      console.log(event.data);
    };
    //   const newMessage = event.data;
    //   setMessages(prevMessages => [...prevMessages, newMessage]);
    //   console.log('Message from server:', newMessage);
    // };

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

  const sendMessage = () => {
    if (websocket) {
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
        data={message}
        renderItem={({ item }) => <Text style={styles.message}>{item}</Text>}
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginRight: 10,
    color: Colors._black,
  },
  message: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    color: Colors._black,
  },
});

export default ChatScreen;
