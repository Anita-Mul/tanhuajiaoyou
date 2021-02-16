import React, { Component } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, Modal } from 'react-native';
import request from "../../../../utils/request";
import { QZ_ZXDT, BASE_URI, QZ_DT_DZ,  QZ_DT_BGXQ } from "../../../../utils/pathMap";
import IconFont from "../../../../components/IconFont";
import { pxToDp } from "../../../../utils/stylesKits";
import date from "../../../../utils/date";
import Toast from '../../../../utils/Toast';
import JMessage from "../../../../utils/JMessage";
import { inject, observer } from 'mobx-react';
import ImageViewer from 'react-native-image-zoom-viewer';
import { NavigationContext } from "@react-navigation/native";
import Validator from "../../../../utils/validator";
import { EMOTIONS_DATA } from "../../../../components/Emotion/datasource";
@inject("UserStore")
@observer
class Index extends Component {
  static contextType = NavigationContext;
  params = {
    page: 1,
    pagesize: 3
  }
  totalPages = 2;
  isLoading = false;
  state = {
    list: [],
    showAlbum: false,
    imgUrls: [],
    currentIndex: 0
  }
  componentDidMount() {
    this.getList();
  }


  // 渲染富文本内容
  rendeRichText = (text) => {
    const list = Validator.renderRichText(text);
    return list.map((v, i) => {
      if (v.text) {
        return <Text style={{ color: "#666" }} key={i} >{v.text}</Text>
      } else if (v.image) {
        return <Image style={{ width: pxToDp(25), height: pxToDp(25) }} key={i} source={EMOTIONS_DATA[v.image]} />
      } else {
        return <></>;
      }
    })

  }

  // 获取 推荐动态的数据
  getList = async (isNew = false) => {
    const res = await request.privateGet(QZ_ZXDT, this.params);
    console.log(res);
    if (isNew) {
      // 重置数据
      this.setState({ list: res.data });
    } else {
      this.setState({ list: [...this.state.list, ...res.data] });
    }
    this.totalPages = res.pages;
    this.isLoading = false;
  }

  // 滚动条触底事件
  onEndReached = () => {
    /* 
    1 判断还有没有下一页数据
    2 节流阀
     */
    if ((this.params.page >= this.totalPages) || this.isLoading) {
      return;
    } else {
      // 还有下一页数据
      this.isLoading = true;
      this.params.page++;
      this.getList();
    }
  }

  // 点赞
  handleStar = async (item) => {
    /* 
    1 构造点赞参数 发送请求
    2 返回值里 提示 点赞成功还是取消点赞 
    3 点赞成功 =>  通过极光 给发送一条消息 "xxx 点赞了你的动态"
    4 重新发送请求 获取 列表数据-> 渲染
     */
    const url = QZ_DT_DZ.replace(":id", item.tid);
    const res = await request.privateGet(url);
    console.log(res);
    // 点赞成功 还是 取消点赞
    if (res.data.iscancelstar) {
      // 取消点赞
      Toast.smile("取消成功");
    } else {
      // 点赞成功
      Toast.smile("点赞成功");

      const text = `${this.props.UserStore.user.nick_name} 点赞了你的动态`;
      const extras = { user: JSON.stringify(this.props.UserStore.user) };
      JMessage.sendTextMessage(item.guid, text, extras);

    }

    // 重新发送请求 获取数据
    // this.setState({ list: [] });
    this.params.page = 1;
    this.getList(true);
  }


  // 不感兴趣 => 获取动态列表的时候 里面就不会出现当前用户
  noInterest = async (item) => {
    const url = QZ_DT_BGXQ.replace(":id", item.tid);
    const res = await request.privateGet(url);

    Toast.smile("操作成功");

    this.params.page = 1;
    this.getList(true);
  }

  // 点击相册图片放大
  handleShowAlbum = (index, ii) => {
    const imgUrls = this.state.list[index].images.map(v => ({ url: BASE_URI + v.thum_img_path }));
    this.setState({ imgUrls, currentIndex: ii, showAlbum: true });
  }

  // 跳转到评论页面
  goComment = (item) => {
    // this.props.navigation
    this.context.navigate("Comment", item);
  }
  render() {
    const { list, imgUrls, currentIndex, showAlbum } = this.state;
    return (
      <>
        <FlatList
          onEndReached={this.onEndReached}
          onEndReachedThreshold={0.1}
          data={list}
          keyExtractor={v => v.tid + ""}
          renderItem={({ item, index }) => <><View
            key={index}
            style={{ padding: pxToDp(10), borderBottomColor: "#ccc", borderBottomWidth: pxToDp(1) }}
          >
            {/* 2.2.1 用户信息 开始 */}
            <View style={{ flexDirection: "row", alignItems: 'center' }}>
              <View
                style={{ paddingRight: pxToDp(15) }}
              ><Image
                  style={{ width: pxToDp(40), height: pxToDp(40), borderRadius: pxToDp(20) }}
                  source={{ uri: BASE_URI + item.header }} /></View>

              <View style={{ flex: 2, justifyContent: "space-around" }} >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: "#555" }} >{item.nick_name}</Text>
                  <IconFont style={{ marginLeft: pxToDp(5), marginRight: pxToDp(5), fontSize: pxToDp(18), color: item.gender === "女" ? "#b564bf" : "red" }}
                    name={item.gender === "女" ? "icontanhuanv" : "icontanhuanan"} />
                  <Text style={{ color: "#555" }} >{item.age}岁</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ color: "#555", marginRight: pxToDp(5) }} >{item.marry}</Text>
                  <Text style={{ color: "#555", marginRight: pxToDp(5) }} >|</Text>
                  <Text style={{ color: "#555", marginRight: pxToDp(5) }} >{item.xueli}</Text>
                  <Text style={{ color: "#555", marginRight: pxToDp(5) }} >|</Text>
                  <Text style={{ color: "#555", marginRight: pxToDp(5) }} >{item.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
                </View>
              </View>
            </View>
            {/* 2.2.1 用户信息 结束 */}

            {/* 2.3 动态内容 开始 */}
            <View style={{ marginTop: pxToDp(8), flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}>
              {this.rendeRichText(item.content)}
            </View>
            {/* 2.3 动态内容 结束 */}
            {/* 2.4 相册 开始 */}
            <View style={{ flexWrap: "wrap", flexDirection: "row", paddingTop: pxToDp(5), paddingBottom: pxToDp(5) }}>
              {item.images.map((vv, ii) => <TouchableOpacity
                onPress={() => this.handleShowAlbum(index, ii)}
                key={ii}><Image
                  style={{ width: pxToDp(70), height: pxToDp(70), marginRight: pxToDp(5) }}
                  source={{ uri: BASE_URI + vv.thum_img_path }} />
              </TouchableOpacity>
              )}
            </View>
            {/* 2.4 相册 结束 */}
            {/* 2.5 距离时间 开始 */}
            <View style={{ flexDirection: "row", paddingTop: pxToDp(5), paddingBottom: pxToDp(5) }}>
              <View><Text style={{ color: "#666" }} >距离 {item.dist} m</Text></View>
              <View><Text style={{ color: "#666", marginLeft: pxToDp(8) }} >{date(item.create_time).fromNow()}</Text></View>
            </View>
            {/* 2.5 距离时间 结束 */}
            {/* 2.6 3个小图标 开始 */}
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}  >
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={this.handleStar.bind(this, item)}
              >
                <IconFont style={{ color: "#666" }} name="icondianzan-o" /><Text style={{ color: "#666" }} >{item.star_count}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.goComment.bind(this, item)}
                style={{ flexDirection: 'row', alignItems: 'center' }} >
                <IconFont style={{ color: "#666" }} name="iconpinglun" /><Text style={{ color: "#666" }} >{item.comment_count}</Text>
              </TouchableOpacity>
              <TouchableOpacity
              >
              </TouchableOpacity>
            </View>
            {/* 2.6 3个小图标 结束 */}
          </View>
            {(this.params.page >= this.totalPages) && (index === list.length - 1) ? <View
              style={{ height: pxToDp(30), alignItems: 'center', justifyContent: 'center' }}
            ><Text style={{ color: "#666" }} >没有数据</Text></View> : <></>}
          </>
          }

        />
        <Modal visible={showAlbum} transparent={true}>
          <ImageViewer
            onClick={() => this.setState({ showAlbum: false })}
            imageUrls={imgUrls} index={currentIndex} />
        </Modal>
      </>
    );
  }
}
export default Index;