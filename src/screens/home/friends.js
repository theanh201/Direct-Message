import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import Colors from '../../asset/styles/color';
import Feather from 'react-native-vector-icons/Feather';
import { DOMAIN, TOKEN } from '../../config/const';
import { SafeAreaView } from 'react-native-safe-area-context';

function RenderList({list}){
  if(list.length>0){
    return(
      <FlatList
        data={list}
        renderItem={({item})=>(
          <View style={styles.friendContainer}>
              <Image style={styles.img} source={{uri:`${DOMAIN}/get-avatar/${TOKEN.GetToken()}/${item.avatar}`}}/>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.dob}>{item.since}</Text>
              </View>
              <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'20%'}}>
                <TouchableOpacity>
                  <Feather name='phone-call' size={20} color={Colors._green}/>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Feather name='message-circle' size={20} color={Colors._secondary}/>
                </TouchableOpacity>
              </View>
          </View>
        )}
      />
    );
  }
  return(<Text>You have no friend</Text>)
}

const MyComponent = () => {
  const [friendList, setFriendList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${DOMAIN}/get-friend-list/${TOKEN.GetToken()}`);
      console.log(response.data);
      // Access data from each object and add to the list
      let list = [];
      for (const user of response.data) {
        const friendData = {
          email: user.Info.Email,
          name: user.Info.Name,
          avatar: user.Info.Avatar,
          background: user.Info.Background,
          since: user.Since
        };
        list.push(friendData);
      }
      // console.log(friendList.length);
      setFriendList(list);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? <ActivityIndicator size="large" color="#0000ff" />: <RenderList list={friendList} />}
    </SafeAreaView>
  );
};

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
  info:{
    marginLeft: 10
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

export default MyComponent;
