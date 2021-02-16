import React, { Component } from 'react';
// AsyncStorage是储存到本地缓存中
import { View, Text, Image, StatusBar, StyleSheet,AsyncStorage } from 'react-native';
import { pxToDp } from "../../../utils/stylesKits";
// 输入手机号码的那个框
import { Input } from 'react-native-elements';
// 对手机号码的合法性进行校验的
import validator from "../../../utils/validator";
// 向后台发送请求的
import request from "../../../utils/request";
import { ACCOUNT_LOGIN } from "../../../utils/pathMap";
import THButton from "../../../components/THButton";
import { CodeField, Cursor } from 'react-native-confirmation-code-field';
import Toast from "../../../utils/Toast";
import {ACCOUNT_VALIDATEVCODE  } from "../../../utils/pathMap";
// inject是用来获取数据的 observer是用来监控文件改变的
import {inject,observer  } from "mobx-react";
// 使用RootStore这个全局数据
@inject("RootStore")
@observer
/**
 * 首先：这个页面是登录页面
 */
class Index extends Component {
  // 如果一个变量需要重复使用，应该放在state中
  state = {
    // 手机号码 
    phoneNumber: "18665711978",
    // 手机号码是否合法
    phoneValid: true,
    // 是否显示登录页面 
    showLogin: true,
    // 验证码输入框的值
    vcodeTxt: "",
    // 倒计时按钮的文本
    btnText: "重新获取",
    // 是否在倒计时中
    isCountDowning:false
  }

  // 登录框手机号码输入 
  phoneNumberChangeText = (phoneNumber) => {
    this.setState({ phoneNumber });
  }
  // 手机号码点击 完成
  phoneNumberSubmitEditing = async () => {
    /**
     * 1. 对手机号码的合法性做一下校验
     *  如果不通过，就在下面显示红色的提示
     *  如果通过，将手机号码发到后台对应的接口当中 -> 获取验证码的 axios
     *    (增加一个功能：发送异步请求的时候，显示一个等待框（Teaset）
     *     当请求回来时，等待框自动消失，隐藏掉
     *     如何实现两个自动，可以使用axios的拦截器
     *    )
     *    如果验证码获取成功了，将页面切换成填写验证码的页面
     */
    //  validator.validatePhone
    const { phoneNumber } = this.state;
    const phoneValid = validator.validatePhone(phoneNumber);
    if (!phoneValid) {
      // 没有通过
      this.setState({ phoneValid });
      return;
    }

    const res = await request.post(ACCOUNT_LOGIN, { phone: phoneNumber });
    if (res.code == "10000") {
      // 请求成功，切换页面
      this.setState({ showLogin: false });
      // 开启定时器
      this.countDown();
    } else {

    }

  }

  // 开启获取验证码的定时器
  countDown = () => {
    if(this.state.isCountDowning){
      return;
    }
    

    this.setState({ isCountDowning: true });

    let seconds = 5;
    // 重新获取(5s)
    this.setState({ btnText: `重新获取(${seconds}s)` });
    let timeId = setInterval(() => {
      seconds--;
      this.setState({ btnText: `重新获取(${seconds}s)` });
      if (seconds === 0) {
        clearInterval(timeId);
        this.setState({ btnText: "重新获取",isCountDowning:false });
      }
    }, 1000);
  }

  // 验证码输入完毕事件
  onVcodeSubmitEditing=async()=>{
    /* 
    1 对验证码做校验  长度
    2 将手机号码和验证码 一起发送到后台 
    2.5 
      将用户数据存放到 mobx中，要记住如何设置mobx
    3 返回值 有 isNew  
    4 新用户 -> 完善个人信息的页面 
    5 老用户 -> 交友 - 首页
     */

     const { vcodeTxt,phoneNumber}=this.state;
     if(vcodeTxt.length!=6){
      // ————————————————————————————————————————————————————————————————————————
      // 在index.js中的代码
      // constructor() {
      //   super();
      //   // 在react-native中想要看到一些弹窗提示，把调试关掉ctrl + m
      //   // 后面一个是弹窗显示时长
      //   // 这个就是一个黑框框提示
      //   Toast.message('Taooo', 10000);
      // }
      Toast.message("验证码不正确",2000,"center");
      return;
     }
     
     // 如果有从后台中获取数据，就是异步，就得async和await
     const res=await request.post(ACCOUNT_VALIDATEVCODE,{
       phone:phoneNumber,
       vcode:vcodeTxt
     });

     //res.code == "10000"就是成功获取
     if(res.code!="10000"){
      console.log(res);
       return;
     }
     
    //  存储用户数据到 mobx中
    this.props.RootStore.setUserInfo(phoneNumber,res.data.token,res.data.id);
    //  存储用户数据到 本地缓存中  永久
    AsyncStorage.setItem("userinfo",JSON.stringify({
      mobile:phoneNumber,
      token:res.data.token,
      userId:res.data.id
    }))
     if(res.data.isNew){
      //  新用户 UserInfo
      // 记住是这样跳转路由哦，首先得在nav.js中添加界面
      this.props.navigation.navigate("UserInfo");
 
     }else{
      //  老用户
      //  this.props.navigation.navigate("Tabbar");
      this.props.navigation.reset({
        routes:[{name:"Tabbar"}]
      })
     }
  }

  // 渲染登录页面
  renderLogin = () => {
    const { phoneNumber, phoneValid } = this.state;
    return <View>
      {/* 标题 */}
      <View><Text style={{ fontSize: pxToDp(25), color: "#888", fontWeight: "bold" }}>手机号登录注册</Text></View>
      {/* 输入框 */}
      <View style={{ marginTop: pxToDp(25) }}>
        <Input
          placeholder='请输入手机号码'
          maxLength={11}
          keyboardType="phone-pad"
          value={phoneNumber}
          // 改变里面的字体颜色
          inputStyle={{ color: "#333" }}
          onChangeText={this.phoneNumberChangeText}
          errorMessage={phoneValid ? "" : "手机号码格式不正确"}
          onSubmitEditing={this.phoneNumberSubmitEditing}
          leftIcon={{ type: 'font-awesome', name: 'phone', color: "#ccc", size: pxToDp(20) }}
        />
      </View>
      {/* 渐变按钮  */}
      <View>
        <THButton onPress={this.phoneNumberSubmitEditing} style={{ width: "85%", alignSelf: "center", height: pxToDp(40), borderRadius: pxToDp(20) }}>获取验证码</THButton></View>
    </View>
  }

  // 点击重新获取按钮
  repGetVcode=()=>{
    this.countDown();
  }

  // 渲染填写验证码 页面
  renderVcode = () => {
    const { phoneNumber, vcodeTxt, btnText,isCountDowning } = this.state;
    return <View>
      <View><Text style={{ fontSize: pxToDp(25), color: "#888", fontWeight: "bold" }}>输入6位验证码</Text></View>
      <View style={{ marginTop: pxToDp(10) }}><Text style={{ color: "#888" }}>已发到:+86 {phoneNumber}</Text></View>
      {/* 验证码的输入框 */}
      <View><CodeField
        value={vcodeTxt}
        onChangeText={this.onVcodeChangeText}
        onSubmitEditing={this.onVcodeSubmitEditing}
        cellCount={6}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        renderCell={({ index, symbol, isFocused }) => (
          <Text key={index} style={[styles.cell, isFocused && styles.focusCell]} >{symbol || (isFocused ? <Cursor /> : null)}</Text>
        )}
      /></View>
      <View style={{ marginTop: pxToDp(10) }}><THButton disabled={isCountDowning} onPress={this.repGetVcode} style={{ width: "85%", alignSelf: "center", height: pxToDp(40), borderRadius: pxToDp(20) }}>{btnText}</THButton></View>
    </View>
  }

  // 验证码输入框的值改变事件
  onVcodeChangeText = (vcodeTxt) => {
    this.setState({ vcodeTxt });
  }

  render() {
    const { phoneNumber, phoneValid, showLogin } = this.state;
    return (
      <View>
        {/* 0.0  状态栏 开始 */}
        <StatusBar backgroundColor="transparent" translucent={true} />
        {/* 0.0  状态栏 结束 */}
        {/* 1.0 背景图片 开始 */}
        {/* 200 单位 dp 单位px -> dp单位? */}
        <Image style={{ width: "100%", height: pxToDp(220) }} source={require("../../../res/profileBackground.jpg")} />
        {/* 1.0 背景图片 结束*/}

        {/* 2.0 内容 开始 */}
        <View style={{ padding: pxToDp(20) }}>
          {/* 2.1 登录 开始 */}
          {showLogin ? this.renderLogin() : this.renderVcode()}

          {/* 2.1 登录 结束 */}
        </View>
        {/* 2.0 内容 结束 */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },
  codeFiledRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    textAlign: 'center',
    color: "#7d53ea"
  },
  focusCell: {
    borderColor: '#7d53ea'
  },
});
export default Index;