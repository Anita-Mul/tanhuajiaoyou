/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {View, Text, Image, StatusBar, ActivityIndicator} from 'react-native';
//import Icon from 'react-native-vector-icons/FontAwesome';
import {Input} from 'react-native-elements';
import validator from '../../../utils/validator';
import request from '../../../utils/request';
import {ACCOUNT_LOGIN} from '../../../utils/pathMap';
import THButton from '../../../components/THButton/index';
import pxToDp from '../../../utils/stylesKits';

class Index extends Component {
  state = {
    // 手机号码
    number: '13653401404',
    //手机号码是否合法
    phoneValid: true,
    // 是否显示登录页面
    showLogin: true,
  };

  // 登录框手机号码输入
  phoneNumberChangeText = (phoneNumber) => {
    this.setState({number: phoneNumber});
  };

  //手机号码点击完成的时候触发
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
    const {number} = this.state;
    const Valid = validator.validatePhone(number);
    if (!Valid) {
      this.setState({phoneValid: Valid});
      return;
    }
    /**
     * 发出一个post请求  第一个参数是路径  第二个是要发送的参数
     */
    const res = await request.post(ACCOUNT_LOGIN, {phone: number});
    //console.log(res);
    if (res.code === '10000') {
      //请求成功

    }
  };

  render() {
    const {number, phoneValid, showLogin} = this.state;
    return (
      <View>
        {/* 登陆开始 */}
        <View>
          <View>
          <Input
            placeholder="INPUT WITH ICON"
            //可以输入的最大长度
            maxLength={11}
            //变成数字的输入框
            keyboardType="phone-pad"
            //添加默认值
            value={number}
            //改变里面的字体颜色
            inputStyle={{color: 'red'}}
            //当输入框里面的内容改变时，会触发的事件
            onChangeText={this.phoneNumberChangeText}
            //错误提示信息
            errorMessage={phoneValid ? '' : '手机号码格式不正确'}
            //当用户点击完成的时候就会触发
            onSubmitEditing={this.phoneNumberSubmitEditing}
            leftIcon={{type: 'font-awesome', name: 'phone'}}
          />
        </View>
          {/* 渐变按钮 */}
          <View>
          <View
            style={{
              width: '85%',
              height: 50,
              alignSelf: 'center',
            }}>
            <THButton
              // onPress={this.phoneNumberSubmitEditing}
              style={{
                width: '85%',
                alignSelf: 'center',
                height: pxToDp(40),
                borderRadius: pxToDp(20),
              }}>
              获取验证码
            </THButton>
          </View>
        </View>
        </View>
        {/* 登录结束 */}
      </View>
    );
  }
}

export default Index;
