import React, { Component } from 'react';
import { View, Text ,Image} from 'react-native';
import request from "../../../../utils/request";
import { FRIENDS_VISITORS ,BASE_URI} from "../../../../utils/pathMap";
import { pxToDp } from '../../../../utils/stylesKits';
/**
 * 访客模块
 */
class Index extends Component {

  state = {
    visitors: [
// 访客的信息对象数组，如果要获得有多少访客来访，就是length
//       {
//         target_uid: 7
// uid: 8
// nick_name: "雾霭朦胧"
// age: 21
// xueli: "大专"
// marry: "未婚"
// gender: "女"
// Distance: 0
// header: "/upload/13828459782.png"
// agediff: -2
// fateValue: 82
//       }
    ]
  }

  // 生命周期方法，一挂载上去就执行
  async componentDidMount() {
    // get请求而已 必须要带上 token
    const res = await request.privateGet(FRIENDS_VISITORS);
    this.setState({ visitors:res.data  });
  }
  render() {
    const {visitors}=this.state;
    return (
      <View style={{
        paddingLeft:pxToDp(5),paddingRight:pxToDp(5),
        flexDirection:"row",marginTop:pxToDp(20),alignItems:"center"}} >
        <Text style={{flex:1,color:"#777",fontSize:pxToDp(15)}}>最近有{visitors.length}人来访,快去查看...</Text>
        {/* 利用map显示来访者的头像 */}
        <View style={{flexDirection:"row",flex:1,alignItems:"center",justifyContent:"space-around"}} >
         {
           // 记住map的时候，得加key，
           visitors.map((v,i)=><Image key={i} style={{width:pxToDp(50),height:pxToDp(50),
            borderRadius:pxToDp(25)
          }} 
          // 路径得加上接口的统一前缀
          source={{uri:BASE_URI+v.header}}
          />)
         } 
         <Text style={{fontSize:pxToDp(20),color:"#777"}}>&gt;</Text>
        </View>
      </View>
    );
  }
}
export default Index;