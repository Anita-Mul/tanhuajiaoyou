import React, { Component } from 'react';
import { View, Image, Text, StatusBar, TouchableOpacity, ScrollView, RefreshControl } from 'react-native';
import { pxToDp } from '../../../utils/stylesKits';
import IconFont from "../../../components/IconFont";
import { BASE_URI, MY_COUNTS } from "../../../utils/pathMap";
import { inject, observer } from 'mobx-react';
import { ListItem } from "react-native-elements";
import Geo from "../../../utils/Geo";
import request from "../../../utils/request";
import { NavigationContext } from "@react-navigation/native";
@inject("UserStore")
@observer
class Index extends Component {
  // 0: {type: "fanCount", cout: 0}
  // 1: {type: "loveCount", cout: 0}
  // 2: {type: "eachLoveCount", cout: 0}
  static contextType = NavigationContext;
  state = {
    city: "",
    // 粉丝的数量
    fanCount: 0,
    // 喜欢的数量
    loveCount: 0,
    // 相互关注的数量
    eachLoveCount: 0,
    // 控制 加载中的组件的切换显示
    refreshing: false
  }
  componentDidMount() {
    this.getCityByLocation();
    this.getList();
  }
  getCityByLocation = async () => {
    const res = await Geo.getCityByLocation();
    this.setState({ city: res.regeocode.addressComponent.city });
  }
  getList = async () => {
    const res = await request.privateGet(MY_COUNTS);

    const fanCount = res.data[0].cout;
    const loveCount = res.data[1].cout;
    const eachLoveCount = res.data[2].cout;
    this.setState({ fanCount, loveCount, eachLoveCount });

    return Promise.resolve();
  }

  // 下拉刷新事件
  onRefresh = async () => {
    this.setState({ refreshing: true });
    await this.getList();
    this.setState({ refreshing: false });
  }
  render() {
    const user = this.props.UserStore.user;
    const { city, fanCount, loveCount, eachLoveCount, refreshing } = this.state;
    return (
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
        contentContainerStyle={{ flex: 1, backgroundColor: "#ccc" }}>
        <View style={{ height: pxToDp(150), backgroundColor: "#c7689f", position: "relative" }}>
          <StatusBar backgroundColor="transparent" translucent />
          <IconFont onPress={() => this.context.navigate("UserUpdate")} name="iconbianji" style={{ position: "absolute", top: pxToDp(30), right: pxToDp(20), color: "#fff", fontSize: pxToDp(16) }} />
          <TouchableOpacity
            style={{
              flexDirection: "row", paddingTop: pxToDp(15),
              paddingBottom: pxToDp(15), marginTop: pxToDp(40)
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
                <Text style={{ color: "#fff", fontWeight: "bold", fontSize: pxToDp(17) }} >{user.nick_name}</Text>
                <View style={{ flexDirection: "row", backgroundColor: "#fff", borderRadius: pxToDp(8), paddingLeft: pxToDp(3), paddingRight: pxToDp(3), marginLeft: pxToDp(15) }}>
                  <IconFont style={{ fontSize: pxToDp(18), color: user.gender === "女" ? "#b564bf" : "red" }}
                    name={user.gender === "女" ? "icontanhuanv" : "icontanhuanan"} />
                  <Text style={{ color: "#555" }} >{user.age}岁</Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: 'center' }} >
                <IconFont style={{ color: "#fff" }} name="iconlocation" />
                <Text style={{ color: "#fff", marginLeft: pxToDp(5) }} >{city}</Text>
              </View>
            </View>
          </TouchableOpacity>


        </View>

        <View style={{
          height: pxToDp(120), backgroundColor: "#fff", width: "90%", alignSelf: "center", marginTop: pxToDp(-15), borderRadius: pxToDp(8),
          flexDirection: "row"
        }}>
          <TouchableOpacity
            onPress={() => this.context.navigate("Follow", 0)}
            style={{ flex: 1, alignItems: "center", justifyContent: 'center' }} >
            <Text style={{ color: "#666", fontSize: pxToDp(22) }} >{eachLoveCount}</Text>
            <Text style={{ color: "#666", fontSize: pxToDp(16) }} >互相关注</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.context.navigate("Follow", 1)}
            style={{ flex: 1, alignItems: "center", justifyContent: 'center' }} >
            <Text style={{ color: "#666", fontSize: pxToDp(22) }} >{loveCount}</Text>
            <Text style={{ color: "#666", fontSize: pxToDp(16) }} >喜欢</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.context.navigate("Follow", 2)}
            style={{ flex: 1, alignItems: "center", justifyContent: 'center' }} >
            <Text style={{ color: "#666", fontSize: pxToDp(22) }} >{fanCount}</Text>
            <Text style={{ color: "#666", fontSize: pxToDp(16) }} >粉丝</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginTop: pxToDp(15) }}>
          <ListItem
            leftIcon={<IconFont style={{ color: "green", fontSize: pxToDp(20) }} name="icondongtai" />}
            title="我的动态"
            titleStyle={{ color: "#666" }}
            bottomDivider
            chevron
            onPress={() => this.context.navigate("Trends")}
          />
          <ListItem
            leftIcon={<IconFont style={{ color: "red", fontSize: pxToDp(20) }} name="iconshuikanguowo" />}
            title="谁看过我"
            titleStyle={{ color: "#666" }}
            bottomDivider
            chevron
            onPress={() => this.context.navigate("Visitors")}
          />
          <ListItem
            leftIcon={<IconFont style={{ color: "purple", fontSize: pxToDp(20) }} name="iconshezhi" />}
            title="通用设置"
            titleStyle={{ color: "#666" }}
            bottomDivider
            chevron
            onPress={() => this.context.navigate("Settings")}
          />
          <ListItem
            leftIcon={<IconFont style={{ color: "blue", fontSize: pxToDp(20) }} name="iconkefu" />}
            title="客服在线"
            titleStyle={{ color: "#666" }}
            bottomDivider
            chevron
          />
        </View>
      </ScrollView>
    );
  }
}
export default Index;