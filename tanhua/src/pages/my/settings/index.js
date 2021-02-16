import JMessage from "../../../utils/JMessage";
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import THNav from "../../../components/THNav";
import { ListItem } from "react-native-elements";
import { inject, observer } from 'mobx-react';
import { pxToDp } from '../../../utils/stylesKits';
import { ActionSheet } from "teaset";
import Toast from "../../../utils/Toast";
@inject("RootStore")
@inject("UserStore")
@observer
class Index extends Component {

  // 点击了退出按钮
  logout = async () => {
    /* 
    1 弹出窗口询问用户是否确定退出
    2 确定
    3 清除本地的缓存数据
    4 mobx user 
    5 mobx token
    6 极光执行 退出
    7 提示用户 退出成功了
    8 重新跳转到 登录页面 
     */

    const tmplogout = async () => {
      console.log("执行退出");
      // 清除缓存
      await AsyncStorage.removeItem("userinfo");
      // 清除用户数据
      this.props.UserStore.clearUser();
      // 清除token数据 
      this.props.RootStore.clearUserInfo();
      // 极光退出
      JMessage.logout();

      Toast.smile("退出成功", 2000);

      setTimeout(() => {
        this.props.navigation.navigate("Login");
      }, 2000);
    }

    const opts = [
      { title: "退出", onPress: tmplogout }
    ]
    ActionSheet.show(opts, { title: "取消" });
  }
  render() {
    const user = this.props.UserStore.user;
    return (
      <View>
        <THNav title="通用设置" />
        <View>
          <ListItem
            title="设置陌生人问题"
            titleStyle={{ color: "#666" }}
            chevron
            bottomDivider
          />
          <ListItem
            title="通知设置"
            titleStyle={{ color: "#666" }}
            chevron
            bottomDivider
          />
          <ListItem
            title="黑名单"
            titleStyle={{ color: "#666" }}
            chevron
            bottomDivider
          />
          <ListItem
            title="修改手机号"
            titleStyle={{ color: "#666" }}
            chevron
            bottomDivider
            rightTitle={user.mobile}
            rightTitleStyle={{ fontSize: pxToDp(15) }}
          />
        </View>

        <View
          style={{ marginTop: pxToDp(30) }}
        >
          <TouchableOpacity
            onPress={this.logout}
            style={{
              width: "80%", alignSelf: "center",
              alignItems: "center", justifyContent: "center",
              height: pxToDp(40), borderRadius: pxToDp(20), backgroundColor: "#e26a83"
            }}
          ><Text style={{ color: "#fff" }}>退出登录</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default Index;