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
      await AsyncStorage.setItem(key, value);
      console.log("done");
    } catch (e) {
      console.log(e);
    }
  }
  async GetData(key) {
    try {
      this.data = await AsyncStorage.getItem(key);
      return this.data;
    } catch (e) {
      console.log(e);
    }
  }
}
const USECACHE = new UseCache();
export { USECACHE };
