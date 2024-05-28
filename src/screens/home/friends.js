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
  Modal,
  Alert,
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
import FastImage from "react-native-fast-image";
import * as ZIM from 'zego-zim-react-native'; import * as ZPNs from 'zego-zpns-react-native';
import ZegoUIKitPrebuiltCallService, { ZegoCallInvitationDialog, ZegoUIKitPrebuiltCallWaitingScreen, ZegoUIKitPrebuiltCallInCallScreen, ZegoSendCallInvitationButton, } from '@zegocloud/zego-uikit-prebuilt-call-rn';
const MyComponent = ({ navigation }) => {
  const [friendList, setFriendList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCheck, setVisableCheck] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [background, setBackground] = useState("");
  const [avatar, setAvatar] = useState("");

  const userID = 'default';
  const userName = 'default';

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
  const reloadList = () => (
    <View style={{alignItems:"center"}}>
      <TouchableOpacity onPress={fetchData}>
        <Text style={{fontSize:20}}>Click to reload</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        style={{alignItems:'center'}}
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
        <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
          <View style={{backgroundColor:"white", borderWidth:1, borderRadius:10, alignContent:"center", width:"90%"}}>
            <FastImage
                style={{height:"30%", width:"100%", borderRadius:10}}
                source={{
                  uri: avatar
                    ? `${DOMAIN}/get-background/${TOKEN.GetToken()}/${background}`
                    : defaultTemplate.avatar,
                  priority: FastImage.priority.high,
                }}
              />
            <View style={{alignItems:'center', top:-50}}>
              <FastImage
                style={{height:100, width:100, borderColor:"gray", borderWidth:2, borderRadius:360}}
                source={{
                  uri: avatar
                    ? `${DOMAIN}/get-avatar/${TOKEN.GetToken()}/${avatar}`
                    : defaultTemplate.avatar,
                  priority: FastImage.priority.high,
                }}
              />
              <Text style={{fontSize:25}}>{name}</Text>
              <Text>Email: {email}</Text>
            </View>
            <View style={{bottom:5, paddingHorizontal:5, position:"absolute", width:"100%"}}>
              <TouchableOpacity onPress={() => {setModalVisible(false)}} style={{backgroundColor:"green", borderRadius:5, alignItems:"center", marginBottom:5}}>
                <Text style={{fontSize:20, padding:5}}>Exit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={async () => {
                try{
                  const resp = await axios.delete(`${DOMAIN}/unfriend/${TOKEN.GetToken()}/${email}`)
                  console.log(resp.data);
                  Alert.alert(resp.data["message"]);
                }catch(err){
                  console.log(err.data);
                }
                fetchData();
                setModalVisible(false);
                }} style={{backgroundColor:"red", borderRadius:5, alignItems:"center"}}>
                <Text style={{fontSize:20, padding:5}}>Unfriend</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
            ListFooterComponent={reloadList}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.friend} onPress={() => {
                setAvatar(item.Info.Avatar);
                setBackground(item.Info.Background);
                setEmail(item.Info.Email);
                setName(item.Info.Name);
                setModalVisible(true);
              }}>
                <FastImage
                  style={styles.img}
                  source={{
                    uri: item.Info.Avatar
                      ? `${DOMAIN}/get-avatar/${TOKEN.GetToken()}/${
                          item.Info.Avatar
                        }`
                      : defaultTemplate.avatar,
                    priority: FastImage.priority.normal,
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
                    <ZegoSendCallInvitationButton
                    invitees={[{userID: item.Info.Email, userName: item.Info.Email}]}
                    isVideoCall={true}
                    resourceID={"chatApp"}
                    width={100}
                    backgroundColor={Colors._green}
                    borderRadius={10}
                    />
                    {/* <TouchableOpacity
                      style={[styles.btn, { backgroundColor: Colors._green }]}
                      onPress={ToggleCheck}
                    >
                      <Feather
                        name="phone-call"
                        size={20}
                        color={Colors._white}
                      />
                      <Text style={styles.textConfirm}>Gọi điện</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                      onPress={() => handleChat(item)}
                      style={[styles.btn, { backgroundColor: Colors._blue }]}
                    >
                      <Feather
                        name="message-square"
                        size={20}
                        color={Colors._white}
                      />
                      <Text style={styles.textConfirm}>Nhắn tin</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
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
        <View>
          <Text style={styles.text}>Hiện không có bạn bè</Text>
          <View style={{alignItems:"center"}}>
            <TouchableOpacity onPress={fetchData}>
              <Text style={{fontSize:20}}>Click to reload</Text>
            </TouchableOpacity>
          </View>
        </View>
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
