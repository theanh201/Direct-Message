import AsyncStorage from "@react-native-async-storage/async-storage";
const DOMAIN = "http://192.168.0.104:8080";
const ValidateEmail = (email) => {
  // Email validation regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

class Token {
  // when open app read token from storage
  async TokenReadFromStorage() {
    // clear all data
    // await AsyncStorage.clear();
    try {
      const jsonData = await AsyncStorage.getItem("token");
      this.data = JSON.parse(jsonData);
    } catch (err) {
      console.log = err;
    }
  }
  // Only use this in login
  async SetToken(token, timeout) {
    let data = {
      token: token,
      timeout: timeout,
    };
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem("token", jsonData);
      this.data = data;
    } catch (err) {
      console.log(err);
    }
  }
  GetToken() {
    if (this.data === null) {
      return null;
    }
    return this.data.token;
  }
  GetTimeout() {
    if (this.data === null) {
      return null;
    }
    return this.data.timeout;
  }
}
const TOKEN = new Token();

function ConvertStringToDatetime(str) {
  // Use Date.parse() for basic parsing, handling potential errors
  try {
    const parsedDate = new Date(Date.parse(str));
    return parsedDate;
  } catch (error) {
    throw new Error(
      "Invalid date string format. Please use YYYY-MM-DD HH:MM:SS"
    );
  }
}
function DateIsAfterCurrent(str) {
  const currentDate = new Date();
  const parsedDate = ConvertStringToDatetime(str);
  // Compare timestamps for precise comparison
  return parsedDate.getTime() > currentDate.getTime();
}
export { DOMAIN, ValidateEmail, TOKEN, DateIsAfterCurrent };
