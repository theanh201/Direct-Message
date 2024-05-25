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
  Alert,
  ImageBackground,
} from "react-native";
import axios from "axios";
import Colors from "../../asset/styles/color";
import Feather from "react-native-vector-icons/Feather";
import { DOMAIN, TOKEN } from "../../config/const";
import defaultTemplate from "../../config/config";
import LottieView from "lottie-react-native";
export default function FriendRequest({ navigation }) {
  const [request, setRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${DOMAIN}/get-friend-request/${TOKEN.GetToken()}`
      );
      list = [];
      console.log(response.data);

      for (const user of response.data) {
        // const entry = {
        //   email: user.From.Email,
        //   name: user.From.Name,
        //   avatar: user.From.Avatar,
        //   background: user.From.Background,
        //   ek: user.Ek,
        //   ik: user.Ik,
        //   opkUsed: user.OpkUsed,
        // };
        console.log(user.From);
        list.push(user.From);
      }
      setRequest(list);
      console.log(request);
    } catch (err) {}
    setLoading(false);
  };
  return (
    <ImageBackground
      style={{ height: "100%", alignItems: "center" }}
      resizeMode="cover"
      source={require("../../asset/images/design/bg_main.jpeg")}
    >
      {loading ? (
        <LottieView
          source={require("../../asset/templates/loading3.json")}
          autoPlay
          loop
        />
      ) : request.length != 0 ? (
        // <Text style={styles.text}>{request[0].Email}</Text>
        <FlatList
          style={{ padding: 15 }}
          data={request}
          renderItem={({ item }) => (
            <View style={styles.friendContainer}>
              {/* Avatar */}
              <Image
                style={styles.img}
                source={{
                  uri: item.Avatar
                    ? `${DOMAIN}/get-avatar/${TOKEN.GetToken()}/${item.Avatar}`
                    : defaultTemplate.avatar,
                }}
              />
              {/* Profile */}
              <View style={styles.firendProfile}>
                <View style={styles.info}>
                  <Text style={styles.text}>{item.Name}</Text>
                  {/* 2 Button */}
                  <View style={styles.list_btn}>
                    <TouchableOpacity
                      style={[styles.btn, { backgroundColor: Colors._red }]}
                      onPress={async () => {
                        try {
                          let form = new FormData();
                          form.append("token", TOKEN.GetToken());
                          form.append("email", item.Email);
                          const response = await axios.postForm(
                            `${DOMAIN}/reject-friend-request`,
                            form
                          );
                          console.log(response.data);
                          Alert.alert(
                            "Từ chối lời mời kết bạn của" + item.Name
                          );
                          setRequest(
                            request.filter((i) => i.email !== item.email)
                          );
                        } catch (err) {
                          console.log(err);
                          Alert.alert(err.response.data);
                        }
                      }}
                    >
                      <Text style={styles.textConfirm}>Từ chối</Text>
                      <Feather name="x" size={20} color={Colors._white} />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.btn, { backgroundColor: Colors._green }]}
                      onPress={async () => {
                        try {
                          let form = new FormData();
                          form.append("token", TOKEN.GetToken());
                          form.append("email", item.Email);
                          const response = await axios.postForm(
                            `${DOMAIN}/accept-friend-request`,
                            form
                          );
                          console.log(response.data);
                          Alert.alert(
                            `Bạn và ${item.Name} đã trở thành bạn bè`
                          );
                          setRequest(
                            request.filter((i) => i.email !== item.email)
                          );
                        } catch (err) {
                          console.log(err);
                          Alert.alert(err.response.data);
                        }
                      }}
                    >
                      <Text style={styles.textConfirm}>Chấp nhận</Text>
                      <Feather name="check" size={20} color={Colors._white} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={{ marginTop: 100, alignItems: "center" }}>
          <Text style={styles.textConfirm}>Hiện không có lời mời kết bạn</Text>
          <LottieView
            style={{ marginTop: 50, width: 150, height: 150 }}
            source={require("../../asset/templates/smile.json")}
            autoPlay
          />
          <Image
            style={{ width: 200, height: 200, borderRadius: 20, marginTop: 50 }}
            source={require("../../asset/images/design/nofriend.jpg")}
          />
        </View>
      )}
    </ImageBackground>
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
    borderRadius: 10,
    backgroundColor: Colors._white,
    shadowColor: Colors._black,
    elevation: 2,
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  info: {
    marginLeft: 10,
  },
  firendProfile: {
    alignItems: "center",
    width: "80%",
  },
  textConfirm: {
    color: Colors._white,
    fontWeight: "bold",
    marginRight: 5,
  },
  text: {
    color: Colors._black,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  list_btn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  btn: {
    width: 120,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
    borderRadius: 10,
    shadowColor: Colors._black,
    elevation: 8,
    flexDirection: "row",
  },
});
