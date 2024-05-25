// MMM.           .MMM
// MMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMM      ________________________________________
// MMMMMMMMMMMMMMMMMMMMM    |                                        |
// MMMMMMMMMMMMMMMMMMMMMMM   |       Đây là file TEST chức năng        |
// MMMMMMMMMMMMMMMMMMMMMMMM   |_   _____________________________________|
// MMMM::- -:::::::- -::MMMM    |/
// MM~:~   ~:::::~   ~:~MM
// .. MMMMM::. .:::+:::. .::MMMMM ..
// .MM::::: ._. :::::MM.
//   MMMM;:::::;MMMM
// -MM        MMMMMMM
// M+ .::::. +MMMMMM
// MMMMMMM .:::::.
// MMM .:::.

import { View, Text, Button } from "react-native";
import React, { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from "../asset/styles/color";
import { USECACHE } from "../config/cache";

export default function Test() {
  const getAllCacheData = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const result = await AsyncStorage.multiGet(keys);
      //    convert to an object
      const data = result.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
      console.log(data);
    } catch (error) {
      console.error("Error when fetch data");
    }
  };

  getMultipleKeys = async (key1, key2) => {
    let values;
    try {
      values = await AsyncStorage.multiGet([key1, key2]);
      const data = values.reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  setStringValue = async (key, value) => {
    USECACHE.SetData(key, value);
  };
  getStringValue = async (key) => {
    USECACHE.GetData(key).then((data) => console.log(data));
  };

  removeValue = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      console.log(done);
    } catch (e) {
      console.log(e);
    }
  };

  // useEffect(() => {
  //   getAllCacheData().then((data) => {
  //     console.log(data);
  //   });
  // });
  return (
    <View>
      <Button title="Get Cache" onPress={() => getStringValue("token")} />
      <Button title="Get ALL Cache" onPress={() => getAllCacheData()} />
      <Button
        title="Get Multi Cache by Key"
        onPress={() => getMultipleKeys("key", "token")}
      />

      <Button
        title="Set Cache"
        onPress={() => setStringValue("hello", "world")}
        color={Colors._green}
      />
      <Button
        title="Delete Cache"
        onPress={() => removeValue("key2")}
        color={Colors._red}
      />
    </View>
  );
}
