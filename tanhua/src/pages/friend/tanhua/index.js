import React, { Component } from 'react';
import { TouchableOpacity, View, Text, ImageBackground, StyleSheet, Image } from 'react-native';
import THNav from "../../../components/THNav";
import Swiper from "react-native-deck-swiper";
import request from "../../../utils/request";
import { FRIENDS_CARDS, BASE_URI, FRIENDS_LIKE } from "../../../utils/pathMap";
import IconFont from "../../../components/IconFont";
import { pxToDp } from "../../../utils/stylesKits";
import { Toast } from "teaset";
/**
 * 可以扒拉图片的那张页面
 * 就是从数据库中一批一批的调取数据
 */
class Index extends Component {
  params = {
    page: 1,
    // 如果直接设置pagesize，划拉5张之后就完啦，得实现分页
    // 当所有图片都滑动完毕之后，会触发onSwipedAll事件
    pagesize: 5
  }
  // 总页数
  // 获取的时候是分页获取，里面参数有总共有几页（就是有几批数据）
  totalPages = 5;
  state = {
    // 当前被操作的数组的索引
    currentIndex: 0,
    cards: [
      // id: 8
      // header: "/upload/13828459782.png"
      // nick_name: "雾霭朦胧"
      // age: 21
      // gender: "女"
      // marry: "未婚"
      // xueli: "大专"
      // dist: 0
    ]
  }

  constructor() {
    super();
    // 使用滑动效果，得先设置这个，在下面就可以直接使用了
    this.swiperRef = React.createRef();
  }
  componentDidMount() {
    this.getFriendsCards();
  }

  // 获取要渲染的数据
  getFriendsCards = async () => {
    const res = await request.privateGet(FRIENDS_CARDS, this.params);
    this.totalPages = res.pages;
    // 做一个新旧数据的拼接
    this.setState({ cards: [...this.state.cards, ...res.data] });
  }

  // 设置用户喜欢或者不喜欢
  setLike = async (type) => {
    /* 
    1 如何通过js的方式来swiper滑动
      swiper的Ref 来实现 获取到swiper的ref => swipeLeft()
    2 根据滑动方向或者 参数 来构造数据 将他们发送到后台
      1 先知道当前被操作的数组的元素-索引
     */

    //  this.swiperRef.swipeLeft();
    //  this.swiperRef.swipeRight();
    // console.log(this.state.currentIndex);
    this.sendLike(type);
    if (type === "dislike") {
      // 设置左右滑动
      this.swiperRef.swipeLeft()
    } else {
      this.swiperRef.swipeRight();
    }
  }


  // 发送喜欢或者不喜欢
  sendLike = async (type) => {
    // 找到当前图片的id
    const id = this.state.cards[this.state.currentIndex].id;
    // FRIENDS_LIKE '/friends/like/:id/:type'
    const url = FRIENDS_LIKE.replace(":id", id).replace(":type", type);
    const res = await request.privateGet(url);
    /**
     * 弹窗提示：喜欢成功 / 不喜欢
     */
    Toast.message(res.data, 1000, "center");
  }

  // 图片滑动完毕就会触发
  onSwipedAll = () => {
    /* 
    1 一定有下一页的数据 ?
    2 简单的判断即可
     */
    if (this.params.page >= this.totalPages) {
      Toast.message("没有下一页数据", 1000, "center")
      return;
    } else {
      this.params.page++;
      this.getFriendsCards();
    }
  }
  render() {
    const { cards, currentIndex } = this.state;
    // if (!cards[currentIndex]) {
    //   return <></>
    // }
    return (
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <THNav title="探花" />
        <ImageBackground
          // 给背景图片的高度
          style={{ height: "60%" }}
          // 背景图片实际的高度
          imageStyle={{ height: "100%" }}
          source={require("../../../res/testsoul_bg.png")}
        >
          {/* 判断这张卡片是否存在 */}
          {cards[currentIndex]?<Swiper  
            // 可以让这个组件重新渲染
            key={Date.now()}
            
            ref={ref => this.swiperRef = ref}
            // 是一个数组，里面可以循环显示卡片上的文字
            // 是通过renderCard来实现循环显示的
            cards={cards}
            renderCard={(card) => {
              return (
                <View style={styles.card} >
                  <Image source={{ uri: BASE_URI + card.header }}
                    style={{ width: "100%", height: "80%" }}
                  />
                  {/* 网友信息 开始 */}
                  <View style={{ flex: 1, alignItems: "center", justifyContent: "space-around" }} >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                      <Text style={{ color: "#555" }} >{card.nick_name}</Text>
                      <IconFont style={{ fontSize: pxToDp(18), color: card.gender === "女" ? "#b564bf" : "red" }}
                        name={card.gender === "女" ? "icontanhuanv" : "icontanhuanan"} />
                      <Text style={{ color: "#555" }} >{card.age}岁</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ color: "#555" }} >{card.marry}</Text>
                      <Text style={{ color: "#555" }} >|</Text>
                      <Text style={{ color: "#555" }} >{card.xueli}</Text>
                      <Text style={{ color: "#555" }} >|</Text>
                      <Text style={{ color: "#555" }} >{card.agediff < 10 ? "年龄相仿" : "有点代沟"}</Text>
                    </View>
                  </View>
                  {/* 网友信息 结束 */}
                </View>
              )
            }}
            // 滑动之后会触发的事件
            onSwiped={() => { this.setState({ currentIndex:this.state.currentIndex+1  }) }}
            // 当所有图片都滑动完毕之后会触发的事件
            onSwipedAll={this.onSwipedAll}
            // 如果是手动划拉，就会触发这两个事件
            onSwipedLeft={this.sendLike.bind(this, "dislike")}
            onSwipedRight={this.sendLike.bind(this, "like")}
            // 一打开，默认显示第几个元素
            cardIndex={currentIndex}
            // 背景颜色改成透明色
            backgroundColor={'transparent'}
            cardVerticalMargin={0}
            // 显示多少层
            stackSize={3}>
          </Swiper>:<></>}
        </ImageBackground>

        {/* 两个小图标 */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "60%",
            alignSelf: "center",
            marginTop: pxToDp(40)
          }}
        >
          <TouchableOpacity
            onPress={this.setLike.bind(this, "dislike")}
            style={{
              backgroundColor: "#ebc869", width: pxToDp(60),
              height: pxToDp(60), borderRadius: pxToDp(30), alignItems: "center", justifyContent: "center"
            }}
          >
            <IconFont style={{ fontSize: pxToDp(30), color: "#fff" }} name="iconbuxihuan" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.setLike.bind(this, "like")}
            style={{
              backgroundColor: "#fd5213", width: pxToDp(60),
              height: pxToDp(60), borderRadius: pxToDp(30), alignItems: "center", justifyContent: "center"
            }}
          >
            <IconFont style={{ fontSize: pxToDp(30), color: "#fff" }} name="iconxihuan" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({

  card: {
    height: "60%",
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    backgroundColor: "white"
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  }
});

export default Index;