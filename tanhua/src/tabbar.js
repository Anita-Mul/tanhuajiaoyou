import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import Svg from "react-native-svg-uri";
import { friend, selectedFriend, group, selectedGroup, message, selectedMessage, my, selectedMy } from "./res/fonts/iconSvg";
import Friend from "./pages/friend/home";
import Group from "./pages/group/home";
import Message from "./pages/message/home";
import My from "./pages/my/home";
import request from "./utils/request";
import { MY_INFO } from "./utils/pathMap";
import { inject, observer } from 'mobx-react';
import JMessage from './utils/JMessage';
@inject("UserStore")
@observer
class Index extends Component {
  async componentDidMount() {
    // 1 发送请求获取当前的用户信息
    const res=await request.privateGet(MY_INFO);
    // console.log(res);
    // 2 用户信息 存入到mobx中 
    this.props.UserStore.setUser(res.data);

    // 3 进行极光登录
    await JMessage.login(res.data.guid,res.data.mobile)
  }

  state = {
    //创建一个页面需要元素的数组
    pages: [
      {
        selected: "friend",
        title: "交友",
        // 未选中的样式
        renderIcon: () => <Svg width="20" height="20" svgXmlData={friend} />,
        // 选中之后的样式
        renderSelectedIcon: () => <Svg width="20" height="20" svgXmlData={selectedFriend} />,
        onPress: () => this.setState({ selectedTab: 'friend' }),
        component: <Friend />
      },
      {
        selected: "group",
        title: "圈子",
        renderIcon: () => <Svg width="20" height="20" svgXmlData={group} />,
        renderSelectedIcon: () => <Svg width="20" height="20" svgXmlData={selectedGroup} />,
        onPress: () => this.setState({ selectedTab: 'group' }),
        component: <Group />
      },
      {
        selected: "message",
        title: "消息",
        renderIcon: () => <Svg width="20" height="20" svgXmlData={message} />,
        renderSelectedIcon: () => <Svg width="20" height="20" svgXmlData={selectedMessage} />,
        onPress: () => this.setState({ selectedTab: 'message' }),
        component: <Message />
      },
      {
        selected: "my",
        title: "我的",
        renderIcon: () => <Svg width="20" height="20" svgXmlData={my} />,
        renderSelectedIcon: () => <Svg width="20" height="20" svgXmlData={selectedMy} />,
        onPress: () => this.setState({ selectedTab: 'my' }),
        component: <My />
      }
    ]
  }
  constructor(props){
    super(props);
    // selectedTab: "group",
    let selectedTab="my";
    if(this.props.route.params&&this.props.route.params.pagename){
      selectedTab=this.props.route.params.pagename;
    }
    this.state.selectedTab=selectedTab;

  }
  render() {
    // seletedTab是目前要选中的页面
    const { selectedTab, pages } = this.state;
    return (
      /**
       * 千万不要忘记flex=1，否则就会不显示
       * 循环生成下面导航栏的四个
       * 记住key={i} 
       */
      <View style={{ flex: 1,backgroundColor:"#fff" }}>
        <TabNavigator>
          {pages.map((v, i) => <TabNavigator.Item key={i}
            selected={selectedTab === v.selected}
            title={v.title}
            renderIcon={v.renderIcon}
            renderSelectedIcon={v.renderSelectedIcon}
            onPress={v.onPress}
            //选中以后字体的颜色，就是下面文字的颜色
            selectedTitleStyle={{color:"#c863b5"}}
            tabStyle={{
              backgroundColor:"#eee", justifyContent:"center"
            }}
          >
            {v.component}
          </TabNavigator.Item>)}
        </TabNavigator>
      </View>
    );
  }
}
export default Index;