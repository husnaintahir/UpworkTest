import AsyncStorage from '@react-native-async-storage/async-storage';

const wrappers = {
  setItem(key, value) {
    AsyncStorage.setItem(key, ''.concat(value));
  },

  getItem(key) {
    return AsyncStorage.getItem(key);
  },

  removeItem(key) {
    return AsyncStorage.removeItem(key);
  },
};

export default class MyStorage {
  user_info = '@user_info';
  theme = '@theme'; 

  setUserToken(info) {
    wrappers.setItem(this.user_info, info);
  }

  getUserToken() {
    return wrappers.getItem(this.user_info);
  }

  removeUserToken() {
    return wrappers.removeItem(this.user_info);
  }

  setTheme(flag) {
    wrappers.setItem(this.theme, flag);
  }

  getTheme() {
    return JSON.parse(wrappers.getItem(this.theme));
  }

  removeTheme() {
    return wrappers.removeItem(this.theme);
  } 
}
