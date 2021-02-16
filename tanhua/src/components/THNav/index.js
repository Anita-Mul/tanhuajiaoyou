import React, { Component } from 'react';
import { View, Text, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { pxToDp } from "../../utils/stylesKits";
import IconFont from "../IconFont";
import { NavigationContext } from "@react-navigation/native";
/**
 * 这个是那个探花的导航栏
 */
class Index extends Component {
  static contextType = NavigationContext;
  render() {
    // goBack
    return (
      <View>
        {/* 上面的状态栏是透明的 */}
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
        />
        {/* 这个是背景图片的组件 */}
        <ImageBackground source={require("../../res/headbg.png")}
          style={{
            height: pxToDp(60), paddingTop: pxToDp(12), flexDirection: 'row',
            paddingLeft: pxToDp(10), paddingRight: pxToDp(10),
            alignItems: "center", justifyContent: 'space-between'
          }}
        >
          <TouchableOpacity
            /**
             * 组件中点击这个按钮返回，这个是专门的返回
             */
            onPress={this.context.goBack}
            style={{ width: pxToDp(80), flexDirection: "row", alignItems: 'center' }}>
            <IconFont style={{ color: "#fff" }} name="iconfanhui" />
            <Text style={{ color: "#fff" }} >返回</Text>
          </TouchableOpacity>

          <Text style={{ color: "#fff", fontSize: pxToDp(20), fontWeight: "bold" }}>{this.props.title}</Text>

          <Text
            onPress={this.props.onRightPress || function () { }}
            style={{ width: pxToDp(80), color: "#fff", textAlign: "right" }}>{this.props.rightText}</Text>

        </ImageBackground>
      </View>
    );
  }
}
export default Index;