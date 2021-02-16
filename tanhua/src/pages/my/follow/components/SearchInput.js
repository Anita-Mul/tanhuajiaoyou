import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import IconFont from "../../../../components/IconFont";
import { pxToDp } from "../../../../utils/stylesKits";
class Index extends Component {
  render() {
    return (
      <View style={{
        height: pxToDp(40), borderRadius: pxToDp(20), backgroundColor: "#fff",
        position: "relative",...this.props.style
      }}>
        <TextInput 
        value={this.props.value}
        onChangeText={this.props.onChangeText}
        placeholder="搜索用户" style={{paddingLeft:pxToDp(30)}}  />
        <IconFont style={{ position: "absolute", left: pxToDp(10), top: pxToDp(13),color:"#666" }} name="iconsousuo" />
      </View>
    );
  }
}
export default Index;