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
} from "react-native";
import axios from "axios";
import Colors from "../../asset/styles/color";
import Feather from "react-native-vector-icons/Feather";
import { DOMAIN, TOKEN } from "../../config/const";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "@rneui/base";
import { configureLayoutAnimationBatch } from "react-native-reanimated/lib/typescript/reanimated2/core";
import defaultImage from "../../config/config";

export default function FriendRequest({ navigation }) {
  const [request, setRequest] = useState([]);
  const [loading, setLoading] = useState(true);
  let token = TOKEN.GetToken();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${DOMAIN}/get-friend-request/${TOKEN.GetToken()}`
      );
      console.log(response.data);
      let list = [];
      for (let user of response.data) {
        const entry = {
          email: user.From.Email,
          name: user.From.Name,
          avatar: user.From.Avatar,
          background: user.From.Background,
          ek: user.Ek,
          ik: user.Ik,
          opkUsed: user.OpkUsed,
        };
        list.push(entry);
      }
      if (list) {
        setRequest(list);
        console.log(request);
      }
    } catch (err) {}
    setLoading(false);
  };
  return (
    <SafeAreaView>
      {loading ? (
        <ActivityIndicator size="large" color={Colors._blue} />
      ) : request === null ? (
        <FlatList
          style={{ padding: 15 }}
          data={request}
          renderItem={({ item }) => (
            <View style={styles.friendContainer}>
              <Image
                style={styles.img}
                source={{
                  uri: item.avatar ? item.avatar : defaultImage,
                }}
              />
              <View style={styles.info}>
                <Text style={styles.text}>{item.name}</Text>
                <Text style={styles.text}>{item.email}</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "20%",
                }}
              >
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      let form = new FormData();
                      form.append("token", TOKEN.GetToken());
                      form.append("email", item.email);
                      const response = await axios.postForm(
                        `${DOMAIN}/reject-friend-request`,
                        form
                      );
                      console.log(response.data);
                      setRequest(request.filter((i) => i.email !== item.email));
                    } catch (err) {
                      console.log(err);
                      Alert.alert(err.response.data);
                    }
                  }}
                >
                  <Feather name="x" size={30} color={Colors._red} />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={async () => {
                    try {
                      let form = new FormData();
                      form.append("token", TOKEN.GetToken());
                      form.append("email", item.email);
                      const response = await axios.postForm(
                        `${DOMAIN}/accept-friend-request`,
                        form
                      );
                      console.log(response.data);
                      setRequest(request.filter((i) => i.email !== item.email));
                    } catch (err) {
                      console.log(err);
                      Alert.alert(err.response.data);
                    }
                  }}
                >
                  <Feather name="check" size={30} color={Colors._green} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={{ marginTop: 100, alignItems: "center" }}>
          <Text style={styles.text}>Hiện không có lời mời kết bạn</Text>
        </View>
      )}
    </SafeAreaView>
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
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  info: {
    marginLeft: 10,
  },
  text: {
    color: Colors._black,
    fontSize: 14,
    fontWeight: "bold",
  },
});
