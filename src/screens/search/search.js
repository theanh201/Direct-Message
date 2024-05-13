import { View, Text, TouchableOpacity, TextInput, StyleSheet,FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Colors from '../../asset/styles/color'
import { ValidateEmail, DOMAIN, TOKEN } from '../../config/const'
import axios from 'axios'

export default function SearchScreen({navigation}) {
  const [searchString, setSearchString] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [page, setPage] = useState(0);

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
        console.log(response.data.Email.length)
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
      {/* if loading */}
      {loading ? (<ActivityIndicator size="large" color="#0000ff" />) : 
      // if result not empty
      searchResult.length > 0 ? (
        <FlatList
          style={{height:"90%"}}
          data={searchResult}
          renderItem={({item})=>(
            <View style={styles.friendContainer}>
              <Image style={styles.img} source={{uri:`${DOMAIN}/get-avatar/${TOKEN.GetToken()}/${item.avatar}`}}/>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.dob}>{item.email}</Text>
              </View>
              <TouchableOpacity>
                <AntDesign name="plus" size={25} color={Colors._black}/>
              </TouchableOpacity>
              <TouchableOpacity>
                <AntDesign name="question" size={25} color={Colors._black}/>
              </TouchableOpacity>
            </View>
          )}
          ListFooterComponent={() =>
            <View style={{alignItems:"center", flexDirection:"row", justifyContent:'center'}}>
              <TouchableOpacity onPress={()=>{searchUser(searchString, page-1);}}>
                <AntDesign name="arrowleft" size={25} color={Colors._black}/>
              </TouchableOpacity>
              <Text style={{fontSize:23, paddingHorizontal:"15%"}}>{page+1}</Text>
              <TouchableOpacity onPress={()=>{searchUser(searchString, page+1);}}>
                <AntDesign name="arrowright" size={25} color={Colors._black}/>
              </TouchableOpacity>
            </View>
          }
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