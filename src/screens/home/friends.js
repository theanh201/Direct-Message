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
import Button from "react-native-really-awesome-button";
const MyComponent = ({ navigation }) => {
  const [friendList, setFriendList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCheck, setVisableCheck] = useState(false);
  const ToggleCheck = () => {
    setVisableCheck(!visibleCheck);
  };
  useEffect(() => {
    fetchData();
    console.log("FriendList:");
    console.log(friendList);
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
          <FlatList
            data={friendList}
            style={{}}
            renderItem={({ item }) => (
              <View style={styles.friend}>
                <Image
                  style={styles.img}
                  source={{
                    uri: item.Info.Avatar
                      ? `${DOMAIN}/get-avatar/${TOKEN.GetToken()}/${
                          item.Info.Avatar
                        }`
                      : defaultTemplate.avatar,
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
                      style={[styles.btn, { backgroundColor: Colors._green }]}
                      onPress={ToggleCheck}
                    >
                      <Feather
                        name="phone-call"
                        size={20}
                        color={Colors._white}
                      />
                      <Text style={styles.textConfirm}>Gọi điện</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleChat(item)}
                      style={[styles.btn, { backgroundColor: Colors._blue }]}
                    >
                      <Feather
                        name="message-square"
                        size={20}
                        color={Colors._white}
                      />
                      <Text style={styles.textConfirm}>Nhắm tin</Text>
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
    width: 100,
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
