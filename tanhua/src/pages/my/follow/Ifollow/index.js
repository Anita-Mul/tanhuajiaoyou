import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import SearchInput from "../components/SearchInput";
import { pxToDp } from '../../../../utils/stylesKits';
import IconFont from "../../../../components/IconFont";
import { BASE_URI } from "../../../../utils/pathMap";
class Index extends Component {
  state = {
    txt: ""
  }
  render() {
    console.log(this.props);
    const { txt } = this.state;
    const { ilikelist } = this.props;
    // 筛选后的数组
    const list = ilikelist.filter(v => v.nick_name.includes(txt));
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={{ backgroundColor: "#eee", padding: pxToDp(10) }} >
          <SearchInput onChangeText={txt => this.setState({ txt })} value={this.state.txt} style={{ marginTop: pxToDp(10) }} />
        </View>
        {list.map((user, i) => <View
          key={i}
          style={{
            flexDirection: "row", paddingTop: pxToDp(15),
            paddingBottom: pxToDp(15), paddingRight: pxToDp(15),
            borderBottomColor: "#ccc", borderBottomWidth: pxToDp(1)
          }} >
          {/* 图片 */}
          <View style={{ paddingLeft: pxToDp(15), paddingRight: pxToDp(15) }}>
            <Image style={{
              width: pxToDp(50), height: pxToDp(50),
              borderRadius: pxToDp(25)
            }} source={{ uri: BASE_URI + user.header }} />
          </View>
          {/* 名称 */}
          <View style={{ flex: 2, justifyContent: "space-around" }} >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "#666", fontWeight: "bold", fontSize: pxToDp(17) }} >{user.nick_name}</Text>
              <View style={{ flexDirection: "row", backgroundColor: "#fff", borderRadius: pxToDp(8), paddingLeft: pxToDp(3), paddingRight: pxToDp(3), marginLeft: pxToDp(15) }}>
                <IconFont style={{ fontSize: pxToDp(18), color: user.gender === "女" ? "#b564bf" : "red" }}
                  name={user.gender === "女" ? "icontanhuanv" : "icontanhuanan"} />
                <Text style={{ color: "#555" }} >{user.age}岁</Text>
              </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: 'center' }} >
              <IconFont style={{ color: "#666" }} name="iconlocation" />
              <Text style={{ color: "#666", marginLeft: pxToDp(5) }} >{user.city}</Text>
            </View>
          </View>
          {/* 按钮  */}
          <TouchableOpacity style={{
            alignSelf: "center",
            flexDirection: "row", justifyContent: "space-evenly", alignItems: "center",
            width: pxToDp(80), height: pxToDp(30), borderRadius: pxToDp(3), borderColor: "#ccc", borderWidth: pxToDp(1)
          }} >
            <IconFont style={{ color: "#666" }} name="iconjia" />
            <Text style={{ color: "#666" }}>已关注</Text>
          </TouchableOpacity>
        </View>)}
      </View>
    );
  }
}
export default Index;