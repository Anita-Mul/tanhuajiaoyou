import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import request from "../../../../utils/request";
import { pxToDp } from "../../../../utils/stylesKits";
// 获取那张美女图的BASE_URI
import { FRIENDS_TODAYBEST, BASE_URI } from "../../../../utils/pathMap";
import IconFont from "../../../../components/IconFont";
class Index extends Component {
  state = {
    perfectGirl: {
      //       id: 16
      // header: "/upload/13828459788.jpg"
      // nick_name: "若只如初见っ"
      // gender: "女"
      // age: 23
      // marry: "单身"
      // xueli: "大专"
      // dist: 246.1
      // agediff: 0
      // fateValue: 78
    }
  }
  /**
   * 今日丽人模块，从数据中获取热度排行榜
   */
  async componentDidMount() {
    const res = await request.privateGet(FRIENDS_TODAYBEST);
    this.setState({ perfectGirl: res.data[0] });
  }
  render() {
    const { perfectGirl } = this.state;
    return (
      <View style={{ flexDirection: "row" }}>
        {/* 左边图片 开始 */}
        <View style={{ position: "relative" }} >
          <Image
            style={{ width: pxToDp(120), height: pxToDp(120) }}
            source={{ uri: BASE_URI + perfectGirl.header }} />
          <View
            style={{
              width: pxToDp(80), height: pxToDp(30), backgroundColor: "#b564bf",
              justifyContent: "center", alignItems: "center", borderRadius: pxToDp(10),
              position: "absolute", left: 0, bottom: pxToDp(10)
            }}
          >
            <Text style={{ color: "#fff", fontSize: pxToDp(16) }}>今日佳人</Text>
          </View>
        </View>
        {/* 左边图片 结束 */}
        {/* 右边内容 开始 */}
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View style={{ flex: 2, justifyContent: "space-around" }} >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ color: "#555" }} >{perfectGirl.nick_name}</Text>
              {/* 如果是在style中的不用加{} */}
              <IconFont style={{ fontSize: pxToDp(18), color: perfectGirl.gender === "女" ? "#b564bf" : "red" }}
                name={perfectGirl.gender === "女" ? "icontanhuanv" : "icontanhuanan"} />
              <Text style={{ color: "#555" }} >{perfectGirl.age}岁</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "#555" }} >{perfectGirl.marry}</Text>
              <Text style={{ color: "#555" }} >|</Text>
              <Text style={{ color: "#555" }} >{perfectGirl.xueli}</Text>
              <Text style={{ color: "#555" }} >|</Text>
              <Text style={{ color: "#555" }} >{perfectGirl.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
            </View>
          </View>
          <View style={{ flex: 1,alignItems:"center",justifyContent:"center" }}>
            <View style={{position:"relative",alignItems:"center",justifyContent:"center"}}>
              <IconFont name="iconxihuan" style={{ fontSize: pxToDp(50), color: "red" }} />
              <Text style={{position:"absolute",color:"#fff",fontSize:pxToDp(13),fontWeight:"bold"}} >{perfectGirl.fateValue}</Text>
            </View>
            <Text style={{color:"red",fontSize:pxToDp(13)}} >缘分值</Text>
          </View>
        </View>
        {/* 右边内容 结束 */}
      </View>
    );
  }
}
export default Index;