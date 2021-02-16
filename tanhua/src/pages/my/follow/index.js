/* 
1 互相关注-喜欢-粉丝 关系
  1 当前登录用户 A  
    A在用户B的详情页面中  点击了 "喜欢"  A->B
  2 同时 在 用户B 看起来 A 就是 B 的粉丝
  3 如果 A喜欢了B  同时 B喜欢了A  就会在 互相关注 页面中出现 
 */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import CustormerBar from "./components/CustormerBar";
import FollowEach from "./followEach";
import Ifollow from "./Ifollow";
import FollowMe from "./followMe";
import { MY_LIKELIST } from "../../../utils/pathMap";
import request from "../../../utils/request";

class index extends Component {
  state = {
    // 互相关注
    likeeachlist: [],
    // 喜欢
    ilikelist: [],
    // 粉丝 
    likemelist: []
  }
  componentDidMount() {
    this.getList();
  }

  // 获取喜欢相关的数据
  getList = async () => {
    const res = await request.privateGet(MY_LIKELIST);

    const likeeachlist = res.data.likeeachlist;
    const ilikelist = res.data.ilikelist;
    const likemelist = res.data.likemelist;
    this.setState({ likeeachlist, ilikelist, likemelist });

  }
  render() {
    const { likeeachlist, ilikelist, likemelist } = this.state;
    const index = this.props.route.params || 0;
    return <ScrollableTabView
      initialPage={index}
      renderTabBar={() => < CustormerBar />}
    >
      <FollowEach getList={this.getList} likeeachlist={likeeachlist} tabLabel='互相关注'></FollowEach>
      <Ifollow getList={this.getList} ilikelist={ilikelist} tabLabel='喜欢'></Ifollow>
      <FollowMe getList={this.getList} likemelist={likemelist} tabLabel='粉丝'></FollowMe>

    </ScrollableTabView>
  }
}

export default index;