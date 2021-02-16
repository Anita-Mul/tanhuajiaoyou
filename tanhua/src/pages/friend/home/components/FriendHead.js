import React, { Component } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import Svg from "react-native-svg-uri";
import {tanhua,near,testSoul  } from "../../../../res/fonts/iconSvg";
import { pxToDp } from '../../../../utils/stylesKits';
import { NavigationContext } from "@react-navigation/native";
/**
 * 这里的是上面的三个小图标
 * 如果是大页面都是在nav里面注册过的，而这个是小组件，是没有在nav里面注册过的
 * 如果是大页面，直接使用this.props.navigation就可以
 * 如果是小组件。就使用this.context.navigate，得提前引入NavigationContext
 *              还得加入static contextType=NavigationContext;
 */
class Index extends Component {
  static contextType=NavigationContext;
  goPage=(page)=>{
    // this.context === this.props.navigation
    this.context.navigate(page);
  }
  render() {
    return (
      <View style={{flexDirection:"row",width:"80%",justifyContent:"space-around"}} >
        <TouchableOpacity
        onPress={()=>this.goPage("TanHua")}
        style={{alignItems:"center"}}
        >
          <View style={{width:pxToDp(70),height:pxToDp(70),borderRadius:pxToDp(35),
          backgroundColor:"red",justifyContent:"center",alignItems:"center"
          }} >
            {/* 图标的颜色是通过fill来表示的 */}
            <Svg width="40" height="40" fill="#fff" svgXmlData={tanhua}  /> 
          </View>
          <Text style={{fontSize:pxToDp(18),marginTop:pxToDp(4),color:"#ffffff9a"}} >探花</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{alignItems:"center"}}
        onPress={()=>this.goPage("Search")}
        >
          <View style={{width:pxToDp(70),height:pxToDp(70),borderRadius:pxToDp(35),
          backgroundColor:"#2db3f8",justifyContent:"center",alignItems:"center"
          }} >
            <Svg width="40" height="40" fill="#fff" svgXmlData={near}  /> 
          </View>
          <Text style={{fontSize:pxToDp(18),marginTop:pxToDp(4),color:"#ffffff9a"}} >搜附近</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{alignItems:"center"}}
        onPress={()=>this.goPage("TestSoul")}
        >
          <View style={{width:pxToDp(70),height:pxToDp(70),borderRadius:pxToDp(35),
          backgroundColor:"#ecc768",justifyContent:"center",alignItems:"center"
          }} >
            <Svg width="40" height="40" fill="#fff" svgXmlData={testSoul}  /> 
          </View>
          <Text style={{fontSize:pxToDp(18),marginTop:pxToDp(4),color:"#ffffff9a"}} >测灵魂</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Index;