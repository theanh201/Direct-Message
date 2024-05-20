import { View, Text, TouchableOpacity, TextInput, StyleSheet,FlatList, Image, ActivityIndicator, Modal, Alert } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Colors from '../../asset/styles/color'
import { ValidateEmail, DOMAIN, TOKEN } from '../../config/const'
import axios from 'axios'
import { Button, Overlay, Icon } from '@rneui/themed';

export default function SearchScreen({navigation}) {
  const [searchString, setSearchString] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [page, setPage] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [background, setBackground] = useState("");

  const modal = (name, email, background, avatar) =>{
    setModalVisible(true);
    setName(name);
    setAvatar(avatar);
    setBackground(background);
    setEmail(email);
  };
  const item = ({item}) => (
    <View style={styles.friendContainer}>
      <Image style={styles.img} source={{uri:`${DOMAIN}/get-avatar/${TOKEN.GetToken()}/${item.avatar}`}}/>
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.dob}>{item.email}</Text>
      </View>
      <TouchableOpacity onPress={()=> modal(item.name, item.email, item.background, item.avatar)}>
        <AntDesign name="plus" size={25} color={Colors._black}/>
      </TouchableOpacity>
    </View>
  );
  const searchUser = async (searchString, page) => {
    if(page<0){
      return;
    }
    setPage(page);
    setLoading(true);
    let list = [];
    if(ValidateEmail(searchString)){
      try{
        const response = await axios.get(`${DOMAIN}/get-by-email/${TOKEN.GetToken()}/${searchString}`);
        if(response.data.Email.length !== 0){
          const data = {
            email: response.data.Email,
            name: response.data.Name,
            avatar: response.data.Avatar,
            background: response.data.Background,
          };
          list.push(data);
        }
      }catch(err){
        console.error('Error fetching data:', err);
      }
    }else{
      try{
        const response = await axios.get(`${DOMAIN}/get-by-name/${TOKEN.GetToken()}/${searchString}/${page}`);
        for (const user of response.data) {
          const data = {
            email: user.Email,
            name: user.Name,
            avatar: user.Avatar,
            background: user.Background,
          };
          list.push(data);
        }
      }catch(err){
        console.error('Error fetching data:', err);
      }
    }
    setSearchResult(list);
    setLoading(false);
  }
  const addFriendRequest = async (email) => {
    try{
      let response = await axios.get(`${DOMAIN}/get-prekey-bundle/${TOKEN.GetToken()}/${email}`);
      console.log(response.data);
      // Processing encryption here
      let form = new FormData();
      form.append("toEmail", email);
      // Hard code ek for testing
      form.append("ek", "7fb26648cca726f2cce63eda8e92e220684d0200f08d7076a3a4beec121af720");
      form.append("opkUsed", (response.data.Opk.length === 64 ? response.data.Opk :"0000000000000000000000000000000000000000000000000000000000000000"));
      form.append("token", TOKEN.GetToken());
      response = await axios.postForm(`${DOMAIN}/add-friend-request`, form);
      console.log(response.data);
      Alert.alert(response.data);
    }catch(err){
      console.error(err.response.data);
      Alert.alert(err.response.data);
    }
    setModalVisible(false);
  }
  return (
    <View>
      <View style={{flexDirection:"row",justifyContent:"space-between",backgroundColor:Colors._secondary, paddingHorizontal:10, paddingVertical:10, alignItems:"center"}}>
        <TouchableOpacity onPress={()=>navigation.navigate("HomeScreen")}>
          <AntDesign name="arrowleft" size={20} color={Colors._white} style={{marginRight:5}}/>
        </TouchableOpacity>
        <TextInput style={{width:'85%',borderRadius:10,backgroundColor:Colors._white, paddingHorizontal:15}} placeholder="Tìm kiếm" onChangeText={text=>{setPage(0);setSearchString(text);}}/>
        <TouchableOpacity onPress={()=>{searchUser(searchString, page);}}>
          <AntDesign name='search1' size={20} color={Colors._white} style={{marginLeft:5}}/>
        </TouchableOpacity>
      </View>
      <Modal
        style={{alignItems:'center'}}
        animationType="fade"
        transparent={true}
        visible={modalVisible}>
        <View style={{alignItems:"center", justifyContent:"center", flex:1}}>
          <View style={{backgroundColor:"white", borderWidth:1, borderRadius:10, alignContent:"center", width:"90%"}}>
            <Image style={{height:"30%", width:"100%", borderRadius:10}} source={{uri:`${DOMAIN}/get-background/${TOKEN.GetToken()}/${background}`}}/>
            <View style={{alignItems:'center', top:-50}}>
              <Image style={{height:100, width:100, borderColor:"gray", borderWidth:2, borderRadius:360}} source={{uri:`${DOMAIN}/get-avatar/${TOKEN.GetToken()}/${avatar}`}}/>
              <Text style={{fontSize:25}}>{name}</Text>
              <Text>Email: {email}</Text>
            </View>
            <View style={{bottom:5, paddingHorizontal:5, position:"absolute", width:"100%"}}>
              <TouchableOpacity onPress={() => addFriendRequest(email)} style={{backgroundColor:"green", borderRadius:5, alignItems:"center", marginBottom:5}}>
                <Text style={{fontSize:20, padding:5}}>AddFriend</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {setModalVisible(false)}} style={{backgroundColor:"red", borderRadius:5, alignItems:"center"}}>
                <Text style={{fontSize:20, padding:5}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      {/* if loading */}
      {loading ? (<ActivityIndicator size="large" color="#0000ff" />) : 
      // if result not empty
      searchResult.length > 0 ? (
        <FlatList
          style={{height:"90%"}}
          data={searchResult}
          renderItem={item}
          keyExtractor={item => item.email}
          ListFooterComponent={() =>{
            if (searchResult.length > 9){
              return(
                <View style={{alignItems:"center", flexDirection:"row", justifyContent:'center'}}>
                  <TouchableOpacity onPress={()=>{searchUser(searchString, page-1);}}>
                    <AntDesign name="arrowleft" size={25} color={Colors._black}/>
                  </TouchableOpacity>
                  <Text style={{fontSize:23, paddingHorizontal:"15%"}}>{page+1}</Text>
                  <TouchableOpacity onPress={()=>{searchUser(searchString, page+1);}}>
                    <AntDesign name="arrowright" size={25} color={Colors._black}/>
                  </TouchableOpacity>
                </View>
              );
            }
            return(null);
          }}
        />
      ) : (
        <View style={{alignItems:"center"}}><Text>No result</Text></View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
    padding:15
  },
  friendContainer: {
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor:Colors._white,
    shadowColor:Colors._black,
    elevation:2
  },
  img:{
    width:60,
    height:60,
    borderRadius:10
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors._secondary,
  },
  dob:{
    fontSize: 12,
    color: Colors._black
  }
});