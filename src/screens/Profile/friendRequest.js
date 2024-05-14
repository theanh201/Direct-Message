import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import axios from 'axios';
import Colors from '../../asset/styles/color';
import Feather from 'react-native-vector-icons/Feather';
import { DOMAIN, TOKEN } from '../../config/const';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@rneui/base';
import { configureLayoutAnimationBatch } from 'react-native-reanimated/lib/typescript/reanimated2/core';

function RenderList({list}){
  return(
    <FlatList
    data={list}
    renderItem={({item})=>(
      <View style={styles.friendContainer}>
          <Image style={styles.img} source={{uri:`${DOMAIN}/get-avatar/${TOKEN.GetToken()}/${item.avatar}`}}/>
          <View style={styles.info}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.dob}>{item.email}</Text>
          </View>
          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', width:'20%'}}>
            <TouchableOpacity>
              <Feather name='x' size={20} color={Colors._yellow}/>
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name='check' size={20} color={Colors._secondary}/>
            </TouchableOpacity>
          </View>
      </View>
    )}
  />
  );
}
export default function FriendRequest({navigation}){
  const [request, setRequest] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try{
      const response = await axios.get(`${DOMAIN}/get-friend-request/${TOKEN.GetToken()}`);
      console.log(response.data);
      let list = [];
      for (const user of response.data) {
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
      setRequest(list);
    }catch(err){
      console.error(err);
    }
    setLoading(false);
  };
  return(
    <SafeAreaView>
      {loading ? <ActivityIndicator size="large" color="#0000ff" /> : <RenderList list={request}/>}
    </SafeAreaView>
  );
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
