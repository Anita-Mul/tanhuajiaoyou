import React, { Component } from 'react';
import { View, TouchableOpacity, Text, ImageBackground, Image } from 'react-native';
import request from "../../../../utils/request";
import { FRIENDS_QUESTIONSECTION, BASE_URI ,FRIENDS_QUESTIONANS} from "../../../../utils/pathMap";
import THNav from "../../../../components/THNav";
import { pxToDp } from '../../../../utils/stylesKits';
import { inject, observer } from 'mobx-react';
import LinearGradient from "react-native-linear-gradient";
// qid: 1
// type: "初级"
// title: "初级灵魂题"
// star: 2
// imgpath: "/upload/questions/1.png"
// status: 0
// count: 3
// sort_no: 1
// istested: true
// islock: false

@inject("UserStore")
@observer
class Index extends Component {
  titles = {
    "初级": require("../../../../res/leve1.png"),
    "中级": require("../../../../res/leve2.png"),
    "高级": require("../../../../res/leve3.png")
  }
  ansList=[];
  state = {
    // 测试题问卷列表数据
    questionList: [
      // {
      //   "qsid": 1,
      //   "question_title": "未来生活的幸福指数，跟物质和精神哪个关系更 大？",
      //   "answers": [
      //     {
      //       "qsid": 1,
      //       "ans_title": "跟物质关系更大",
      //       "ans_No": "A"
      //     },
      //     {
      //       "qsid": 1,
      //       "ans_title": "跟精神关系更大",
      //       "ans_No": "B"
      //     }
      //   ]
      // }
    ],
    currentIndex: 0
  }
  componentDidMount() {
    this.getList();
  }
  // 获取测试题问卷
  getList = async () => {
    const url = FRIENDS_QUESTIONSECTION.replace(":id", this.props.route.params.qid);
    const res = await request.privateGet(url);
    this.setState({ questionList: res.data });
  }
  getFont = (number) => {
    let numCn = "";
    switch (number) {
      case 1:
        numCn = "一"
        break;
      case 2:
        numCn = "二"
        break;
      case 3:
        numCn = "三"
        break;
      case 4:
        numCn = "四"
        break;
      default:
        numCn = number;
        break;
    }
    return numCn;
  }
  // 选择了答案
  chooeseAns=async (ans)=>{
    const {currentIndex,questionList}=this.state;
    this.ansList.push(ans);
    if(currentIndex>=questionList.length-1){
      // 最后一题了 
      const url=FRIENDS_QUESTIONANS.replace(":id",this.props.route.params.qid);
      const answers=this.ansList.join(",");
      const res=await request.privatePost(url,{answers}); 
      // console.log(res);
      this.props.navigation.navigate("TestResult",res.data);
      
    // "abstract": 80,
    // "content": "感性动物，更加在乎恋爱中双方的感受。 对生活有着相同的感触，也许经历不同，但你们都知道物质才是生活的基础，没有面包的爱情也许不会幸福； 爱情中，希望得到彼此更多的爱。 也许你都经历过生活的坎坷，所以你们都希望有一个安安稳稳的未来生活，两个孩子一只狗，一个温馨的家是你们的归属。 希望在细节上给与对方最大的关怀，从生活的点点滴滴去珍爱对方。 属于爱情中的”奉献者“，期望对方比自己更快乐。 对生活有着更长远的打算，也许当下苦一点，并不会对你们造成多少伤害，你们期许的是一个更好的未来。 在日常生活中，都知道自己想要什么不想要什么，所以很少会冲动消费。 对命运这种事情，有着难得一致的认同感，都认为有些感情早已安排妥当，只是静静的等待我们去发现。 对人对事对物，都可以极大程度的包容，这使你们未来沟通起来会更加顺畅。",
    // "currentUser": {
    //   "Distance": 0,
    //   "address": "广州市天河区珠吉路58号",
    //   "age": 23,
    //   "amount": null,
    //   "birthday": "1995-03-07T16: 00: 00.000Z",
    //   "city": "广州",
    //   "email": null,
    //   "gender": "男",
    //   "guid": null,
    //   "header": "/upload/18665711978.png",
    //   "id": 7,
    //   "lat": 23.12933,
    //   "lng": 113.42782,
    //   "login_time": "2020-06-10T10: 57: 34.000Z",
    //   "marry": "单身",
    //   "mobile": "18665711978",
    //   "nick_name": "一叶知秋",
    //   "status": 0,
    //   "vcode": "888888",
    //   "xueli": "本科"
    // },
    // "extroversion": 75,
    // "judgment": 90,
    // "qid": 1,
    // "rational": 88
  
    }else{
      this.setState({ currentIndex: currentIndex+1 });
    }
  }
  render() {
    const { currentIndex, questionList } = this.state;
    const question = this.props.route.params;
    const user = this.props.UserStore.user;
    if (!questionList[currentIndex]) return <></>;
    return (
      <View style={{ flex: 1, backgroundColor: "#fff", position: "relative" }}>
        <THNav title={question.title} />
        <ImageBackground
          source={require("../../../../res/qabg.png")}
          style={{ width: "100%", height: "100%" }}
        >

          {/* 1.0 两侧图标 开始 */}
          <View style={{ marginTop: pxToDp(60), flexDirection: 'row', justifyContent: "space-between" }}>
            <ImageBackground
              style={{
                width: pxToDp(66), height: pxToDp(52), justifyContent: 'center', alignItems: "flex-end"
              }}
              source={require("../../../../res/qatext.png")}
            >
              <Image source={{ uri: BASE_URI + user.header }}
                style={{ width: pxToDp(50), height: pxToDp(50), borderRadius: pxToDp(25) }}
              />
            </ImageBackground>
            <ImageBackground
              style={{
                width: pxToDp(66), height: pxToDp(52), justifyContent: 'center', alignItems: "flex-end"
              }}
              source={this.titles[question.type]}
            >
            </ImageBackground>
          </View>
          {/* 1.0 两侧图标 结束 */}

          {/* 2.0  测试题 开始 */}
          <View style={{
            position: "absolute", width: "80%", top: pxToDp(60),
            alignSelf: 'center', alignItems: 'center'
          }}>
            <View>
              <Text style={{ color: "#fff", fontSize: pxToDp(26), fontWeight: "bold" }} >第{this.getFont(currentIndex + 1)}题</Text>
              <Text style={{ color: "#ffffff9a", textAlign: 'center' }} >({currentIndex + 1}/{questionList.length})</Text>
            </View>

            <Text style={{
              marginTop: pxToDp(30), fontSize: pxToDp(14), color: "#fff", fontWeight: "bold"

            }}>{questionList[currentIndex].question_title}</Text>

            {/* 3.0 答案 开始 */}

            <View style={{ width: "100%" }}>
              {questionList[currentIndex].answers.map((v, i) => <TouchableOpacity 
              onPress={this.chooeseAns.bind(this,v.ans_No)}
              key={i}
              style={{ marginTop: pxToDp(10) }}>
                <LinearGradient
                  style={{ height: pxToDp(40), borderRadius: pxToDp(6), alignItems: 'center', justifyContent: 'center' }}
                  colors={["#6f45f3", "#6f45f31a"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}

                >
                  <Text style={{ color: "#fff" }}>{v.ans_title}</Text>
                </LinearGradient>
              </TouchableOpacity>)}

            </View>
            {/* 3.0 答案 结束 */}
          </View>
          {/* 2.0  测试题 结束 */}
        </ImageBackground>
      </View>
    );
  }
}
export default Index;