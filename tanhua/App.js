import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import Nav from "./src/nav";
// 是那个定位的
import Geo from "./src/utils/Geo";
// 这个是引入全局数据的mobx
import RootStore from "./src/mobx";
import UserStore from "./src/mobx/userStore";
import { Provider } from "mobx-react";
// 使用极光
import JMessage from "./src/utils/JMessage";
class App extends Component {
  state = {
    isInitGeo: false
  }
  async componentDidMount() {
    // 获取缓存中的用户数据
    const strUserInfo = await AsyncStorage.getItem("userinfo");
    const userinfo = strUserInfo ? JSON.parse(strUserInfo) : {};
    // 判断 有没有token
    if (userinfo.token) {
      // 把缓存中的数据 存一份到mobx中
      RootStore.setUserInfo(userinfo.mobile, userinfo.token, userinfo.userId);
      // 极光初始化
      JMessage.init();
    }
    await Geo.initGeo();
    this.setState({ isInitGeo: true });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* 在这里设置全局变量 */}
        <Provider RootStore={RootStore} UserStore={UserStore} >
          {this.state.isInitGeo ? <Nav></Nav> : <></>}
        </Provider>
      </View>
    );
  }
}
export default App;