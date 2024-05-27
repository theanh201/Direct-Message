// MMM.           .MMM
// MMMMMMMMMMMMMMMMMMM
// MMMMMMMMMMMMMMMMMMM      ________________________________________
// MMMMMMMMMMMMMMMMMMMMM    |                                        |
// MMMMMMMMMMMMMMMMMMMMMMM   |       Sử dụng Cache Tin Nhắn            |
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

import { View, Text } from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

class UseCache {
  async SetData(key, value) {
    try {
      jsonData = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonData);
      console.log("done");
    } catch (e) {
      console.log(e);
    }
  }
  async GetData(key) {
    try {
      const jsonData = await AsyncStorage.getItem(key);
      // console.log(JSON.parse(jsonData));
      return jsonData != null ? JSON.parse(jsonData) : null;
    } catch (e) {
      console.log(e);
    }
  }
  async MergeData(key, value) {}
  async GetAllData() {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(keys);
      const data = values.reduce((acc, [key, value]) => {
        acc[key] = value;
        console.log(data);
        return acc;
      }, {});
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  async ClearALlData() {
    await AsyncStorage.ClearALlData();
    console.log("Clear cache before success!");
  }
}
const USECACHE = new UseCache();
export { USECACHE };
