import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { pxToDp } from "../../../utils/stylesKits";
import SvgUri from "react-native-svg-uri";
import { male, female } from "../../../res/fonts/iconSvg";
import { Input } from "react-native-elements";
import DatePicker from "react-native-datepicker";
import Geo from "../../../utils/Geo";
import Picker from 'react-native-picker';
import CityJson from "../../../res/citys.json";
import THButton from "../../../components/THButton";
import Toast from "../../../utils/Toast";
import ImagePicker from 'react-native-image-crop-picker';
import { Overlay } from "teaset";
import { inject, observer } from "mobx-react";
import request from '../../../utils/request';
import { ACCOUNT_CHECKHEADIMAGE, ACCOUNT_REGINFO } from '../../../utils/pathMap';
import JMessage from "../../../utils/JMessage";
@inject("RootStore")
@observer
class Index extends Component {
  state = {
    // 昵称
    nickname: "",
    // 性别 
    gender: "男",
    // 生日
    birthday: "",
    // 城市
    city: "",
    // 头像
    header: "",
    // 经度
    lng: "",
    // 纬度
    lat: "",
    // 详细的地址
    address: ""
  }
  /**
   * 当一开始加载的时候，就获取它的地址
   */
  async componentDidMount() {

    const res = await Geo.getCityByLocation();
    console.log(res);
    const address = res.regeocode.formatted_address;
    const city = res.regeocode.addressComponent.city.replace("市", "");
    /**
     * 获得它的经度和纬度
     */
    const lng = res.regeocode.addressComponent.streetNumber.location.split(",")[0];
    const lat = res.regeocode.addressComponent.streetNumber.location.split(",")[1];
    this.setState({ address, city, lng, lat });

  }
  // 选择性别
  chooeseGender = (gender) => {
    this.setState({ gender });
  }
  // 选择城市
  showCityPicker = () => {
    Picker.init({
      // pickerData 要显示哪些数据 全国城市数据?
      // 在src那个文件夹下有JSON文件，需要的话，自己改一改就可以了
      pickerData: CityJson,
      // 默认选择哪个数据
      // selectedValue: ["河北", "唐山"],
      selectedValue: ["北京", "北京"],
      // 这三个分别是省、市、区是否显示
      wheelFlex: [1, 1, 0], // 显示省和市
      pickerConfirmBtnText: "确定",
      pickerCancelBtnText: "取消",
      pickerTitleText: "选择城市",
      onPickerConfirm: data => {
          // data =  [广东，广州，天河]
          this.setState(
          {
            city: data[1]
          }
        );
      }
    });
    Picker.show();
  }

  // 点击了 设置头像按钮
  chooeseHeadImg = async () => {
    /* 
    1 校验 用户的昵称 生日 当前地址 city
    2 使用图片裁剪插件 react-native-image-crop-picker 可以选择图片，上传图片
      审核图片的动态效果
    3 将选择好的图片 上传到 后台 
      1 rn中想要显示gif动态图 需要做一些配置 
    4 用户的昵称 生日 当前地址 .. 头像的地址  提交到后台 -> 完成 信息填写
    5 成功 
      1 执行 极光注册 极光的登录
      2 跳转到交友-首页 
     */
    const { nickname, birthday, city } = this.state;

    if (!nickname || !birthday || !city) {
      /**
       * 最简单的massage提示就可以了，这个sad是带一个悲伤的小图标
       */
      Toast.sad("昵称或者生日或者城市不合法", 2000, "center");
      return;
    }

    // 获取到 选中后的图片
    const image = await ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    });


    // 定义这个的目的就是可以让这个组件有显示和隐藏的效果
    let overlayViewRef = null;

    // 显示审核中 效果，就是那个扫描仪gif图
    // 也是一个类似遮罩层的东西
    let overlayView = (
      <Overlay.View
        style={{ flex: 1, backgroundColor: "#000" }}
        modal={true}
        overlayOpacity={0}
        ref={v => overlayViewRef = v}
      >
        <View style={{
          marginTop: pxToDp(30),
          alignSelf: "center",
          width: pxToDp(334),
          height: pxToDp(334),
          position: "relative",
          justifyContent: 'center',
          alignItems: "center"
        }}>
          <Image style={{
            width: "100%", height: "100%",
            position: 'absolute', left: 0, top: 0, zIndex: 100
          }} source={require("../../../res/scan.gif")} />
          <Image source={{ uri: image.path }} style={{ width: "60%", height: "60%" }} />
        </View>
      </Overlay.View>
    );
    Overlay.show(overlayView);

    // 上传头像
    const res0 = await this.uploadHeadImg(image);

    console.log(res0);
    // 是否上传头像成功，如果上传头像成功，后台会有一个返回值
    if (res0.code !== "10000") {
      // 失败
      return;
    }

    // 构造参数 完善个人信息
    // state
    //header是头像
    let params = this.state;
    params.header = res0.data.headImgPath;
    console.log(params);

    const res1 = await request.privatePost(ACCOUNT_REGINFO, params);
    // console.log(res1);
    if (res1.code !== "10000") {
      // 完善信息失败
      console.log(res1);
      return;
    }

    // 注册极光  用户名 this.props.RootStore.userId 密码:默认 用户的手机号码
    const res2 = await this.jgBusiness(this.props.RootStore.userId, this.props.RootStore.mobile);
    // console.log(res2);

    // 做什么 ??
    // 1 关闭 审核的浮层
    overlayViewRef.close();
    // 2 给出用户一个提示
    Toast.smile("恭喜 操作成功", 2000, "center");
    // 3 跳转页面 交友页面  在登录页面 用户的判断 新旧用户的判断
    setTimeout(() => {
      // this.props.navigation.navigate("Tabbar");
      this.props.navigation.reset({
        routes: [{ name: "Tabbar" }]
      })
    }, 2000);

  }
  // 上传头像
  uploadHeadImg = (image) => {
    // 构造参数 发送到后台 完成 头像上传
    // 需要使用formdata对象来传递图片
    // formata是表单提交的一个对象，可以去查一下
    let formData = new FormData();
    // key值是headPhoto
    formData.append("headPhoto", {
      // 本地图片的地址
      uri: image.path,
      // 图片的类型
      type: image.mime,
      // 图片的名称 file:///store/com/pic/dsf/d343.jpg
      name: image.path.split("/").pop(),
    });
    // 因为 我们打开了 调式模式  调试工具 对网络拦截处理 导致一些请求失败
    // 不要打开任何调试工具 只使用控制台即可 
    // 执行头像上传
    // 这个privatePost方法，是在request中有的
    return request.privatePost(ACCOUNT_CHECKHEADIMAGE, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
        // 后面的东西写到了request.js的代码中
      }
    })
  }

  // 执行极光注册
  jgBusiness = (username, password) => {
    // 在 App 里面 进行极光的初始化
    return JMessage.register(username, password);
  }

  render() {
    const { gender, nickname, birthday, city } = this.state;
    const dateNow = new Date();
    // 获取当前的日期
    // 如果在字符串里面使用函数就是这样使用
    const currentDate = `${dateNow.getFullYear()}-${dateNow.getMonth() + 1}-${dateNow.getDate()}`;
    return (
      <View style={{ backgroundColor: "#fff", flex: 1, padding: pxToDp(20) }}>
        {/* 1.0 标题 开始 */}
        <Text style={{ fontSize: pxToDp(20), color: "#666", fontWeight: "bold" }} >填写资料</Text>
        <Text style={{ fontSize: pxToDp(20), color: "#666", fontWeight: "bold" }} >提升我的魅力</Text>
        {/* 1.0 标题 结束 */}
        
        {/* 2.0 性别 开始 */}
        {/* 需要实现的功能，Svg图像，点击设置背景为红色，同时设置属性值 */}
        <View style={{ marginTop: pxToDp(20) }}>
          <View style={{ justifyContent: "space-around", width: "60%", flexDirection: "row", alignSelf: "center" }}>
            {/* 记住这里的background的写法，就不用写{}这个符号了 */}
            <TouchableOpacity onPress={this.chooeseGender.bind(this, "男")} style={{
              width: pxToDp(60), height: pxToDp(60), borderRadius: pxToDp(30),
              backgroundColor: gender === "男" ? "red" : "#eee",
              justifyContent: 'center', alignItems: 'center'
            }} >
              {/* 这是svg，需要react-native-svg-uri */}
              <SvgUri svgXmlData={male} width="36" height="36" />
            </TouchableOpacity>
            <TouchableOpacity onPress={this.chooeseGender.bind(this, "女")} style={{
              width: pxToDp(60), height: pxToDp(60), borderRadius: pxToDp(30),
              backgroundColor: gender === "女" ? "red" : "#eee",
              justifyContent: 'center', alignItems: 'center'
            }} >
              <SvgUri svgXmlData={female} width="36" height="36" />
            </TouchableOpacity>
          </View>
        </View>
        {/* 2.0 性别 结束 */}
        
        {/* 3.0 昵称 开始 */}
        {/* 需要react-native-elements */}
        <View>
          <Input
            value={nickname}
            placeholder="设置昵称"
            onChangeText={(nickname) => this.setState({ nickname })}
          />
        </View>
        {/* 3.0 昵称 结束 */}

        {/* 4.0 日期 开始 */}
        {/* 有设置生日的功能：react-native-datepicker */}
        <View>
          <DatePicker
            // 更改点击之后的选择日期样式，滚动式，不填是方框形
            androidMode="spinner"
            style={{ width: "100%" }}
            // 设置文本框的值
            date={birthday}
            mode="date"
            placeholder="设置生日"
            format="YYYY-MM-DD"
            minDate="1900-01-01"
            // 这个函数可以获取当前时间
            maxDate={currentDate}
            // 设置下面的确定和取消按钮
            confirmBtnText="确定"
            cancelBtnText="取消"
            customStyles={{
              dateIcon: {
                // 表示不需要那个小日历图标
                display: "none"
              },
              dateInput: {
                marginLeft: pxToDp(10),
                borderWidth: 0,
                borderBottomWidth: pxToDp(1.1),
                // 让里面的文字左边对齐
                alignItems: "flex-start",
                paddingLeft: pxToDp(4)
              },
              placeholderText: {
                //设置里面的文字的样式
                fontSize: pxToDp(18),
                color: "#afafaf"
              }

            }}
            // 当里面的内容改变时需要调用的函数
            onDateChange={(birthday) => { this.setState({ birthday }) }}
          />
        </View>
        {/* 4.0 日期 结束 */}
        {/* 5.0 地址 开始 */}
        <View style={{ marginTop: pxToDp(20) }} >
          <TouchableOpacity onPress={this.showCityPicker}>
            <Input
              value={"当前定位:" + city}
              inputStyle={{ color: "#666" }}
              // 如何设置输入框点击事件，首先disable={true}，之后在外面添加点击事件
              disabled={true}
            />
          </TouchableOpacity>
        </View>
        {/* 5.0 地址 结束 */}

        {/* 6.0 选择头像 开始 */}
        {/* 使用高德地图实现自动定位 react-native-amap-geolocation */}
        <View>
          <THButton
            onPress={this.chooeseHeadImg}
            style={{
              height: pxToDp(40),
              borderRadius: pxToDp(20),
              alignSelf: 'center'
            }}
          >设置头像</THButton>
        </View>
        {/* 6.0 选择头像 结束 */}
      </View>
    );
  }
}
export default Index;