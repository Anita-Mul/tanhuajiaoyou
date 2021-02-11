# [react-navigation](https://www.npmjs.com/package/react-navigation)

> 页面跳转和转场动画

1. 安装

   ```js
   yarn add react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view  @react-navigation/stack @react-navigation/native
   ```

2. 代码

   ```react
   import * as React from 'react';
   import { Button, View, Text } from 'react-native';
   import { NavigationContainer } from '@react-navigation/native';
   import { createStackNavigator } from '@react-navigation/stack';
   
   function HomeScreen({ navigation }) {
     return (
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>Home Screen</Text>
         <Button
           title="Go to Details"
           onPress={() => navigation.navigate('Details')}
         />
       </View>
     );
   }
   
   function DetailsScreen() {
     return (
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
         <Text>Details Screen</Text>
       </View>
     );
   }
   
   const Stack = createStackNavigator();
   
   function App() {
     return (
       <NavigationContainer>
         <Stack.Navigator initialRouteName="Home">
           <Stack.Screen name="Home" component={HomeScreen} />
           <Stack.Screen name="Details" component={DetailsScreen} />
         </Stack.Navigator>
       </NavigationContainer>
     );
   }
   
   export default App;
   
   ```

## 其他

1. 跳转页面

   [类组件](https://reactnavigation.org/docs/navigation-context)

   ```jsx
   import { NavigationContext } from '@react-navigation/native';
   
   class SomeComponent extends React.Component {
     static contextType = NavigationContext;
   
     render() {
       // We can access navigation object via context
       const navigation = this.context;
     }
   }
   ```

   函数组件

   ```jsx
   import * as React from 'react';
   import { Button } from 'react-native';
   import { useNavigation } from '@react-navigation/native';
   function MyBackButton() {
     const navigation = useNavigation();
     return (
       <Button
         title="Back"
         onPress={() => {
           navigation.goBack();
         }}
       />
     );
   }
   ```
   

# [react-native-svg-uri](https://www.npmjs.com/package/react-native-svg-uri)

> rn中使用svg技术

1. 下载

   ```js
   yarn  add  react-native-svg-uri react-native-svg
   ```

2. 代码

   ```jsx
   import React, { Component } from 'react';
   import { View, Text } from 'react-native';
   import SvgUri from 'react-native-svg-uri';
   class Index extends Component {
     render() {
       return (
         <View>
           <SvgUri width="23" height="23" svgXmlData={'<svg t="1568188030646"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7085" width="64" height="64"><path d="M515.3 597.2c-72.6 0-140.8-28.3-192.2-79.6-51.3-51.3-79.6-119.6-79.6-192.2s28.3-140.8 79.6-192.2 119.6-79.6 192.2-79.6 140.8 28.3 192.2 79.6 79.6 119.6 79.6 192.2-28.3 140.8-79.6 192.2c-51.4 51.3-119.6 79.6-192.2 79.6z m0-503.5c-61.9 0-120.1 24.1-163.9 67.9s-67.9 102-67.9 163.9 24.1 120.1 67.9 163.9c43.8 43.8 102 67.9 163.9 67.9 61.9 0 120.1-24.1 163.9-67.9 43.8-43.8 67.9-102 67.9-163.9 0-61.9-24.1-120.1-67.9-163.9-43.8-43.8-102-67.9-163.9-67.9zM994.9 915.6H62.3l3.8-23.3c12.4-75 51.3-143.9 109.6-194 59-50.6 134-78.5 211.3-78.5h283.1c77.3 0 152.3 27.9 211.3 78.5 58.3 50 97.2 118.9 109.6 194l3.9 23.3z m-884.4-40h836.2c-14.4-56.7-46.2-108.2-91.3-146.9-51.7-44.3-117.5-68.7-185.2-68.7H387c-67.7 0-133.5 24.4-185.2 68.8-45.1 38.7-77 90.2-91.3 146.8z" p-id="7086" fill="#999999"></path><path d="M448.1 640L513 841l80-201zM437.7 345c-12.1 0-21.9-9.9-21.9-21.9V269c0-12.1 9.9-21.9 21.9-21.9 12.1 0 21.9 9.9 21.9 21.9v54.1c0.1 12-9.8 21.9-21.9 21.9zM573.2 345c-12.1 0-21.9-9.9-21.9-21.9V269c0-12.1 9.9-21.9 21.9-21.9 12.1 0 21.9 9.9 21.9 21.9v54.1c0.1 12-9.8 21.9-21.9 21.9z" p-id="7087" fill="#999999" ></path></svg>'} />
         </View>
       );
     }
   }
   export default Index;
   ```

   

# [react-native-tab-navigator](https://www.npmjs.com/package/react-native-tab-navigator)

> 底部导航栏

1. 下载

   ```js
   yarn add react-native-tab-navigator
   ```

2. 代码

   要有 SvgUri 和 Friend 等其他依赖

   ```jsx
   import React, { Component } from 'react';
   import { View, Text,StyleSheet } from 'react-native';
   import SvgUri from 'react-native-svg-uri';
   import Friend from "./pages/friend";
   import Group from "./pages/group";
   import Message from "./pages/message";
   import My from "./pages/my";
   import TabNavigator from 'react-native-tab-navigator';
   import SvgData from "./res/svg";
   const dataSource = [
     {
       icon: SvgData.friend,
       selectedIcon: SvgData.selectdFriend,
       tabPage: 'Friend',
       tabName: '交友',
       badge: 0,
       component: Friend
     },
     {
       icon: SvgData.group,
       selectedIcon:  SvgData.selectdGroup,
       tabPage: 'Group',
       tabName: '圈子',
       badge: 0,
       component: Group
     },
     {
       icon: SvgData.message,
       selectedIcon:SvgData.selectdMessage,
       tabPage: 'Message',
       tabName: '消息',
       badge: 5,
       component: Message
     },
     {
       icon: SvgData.my,
       selectedIcon: SvgData.selectdMy,
       tabPage: 'My',
       tabName: '我的',
       badge: 0,
       component: My
     }
   
   ];
   
   class Index extends Component {
     state = {
       selectedTab: "Friend"
     }
     render() {
       return (
         <View style={{ flex: 1, backgroundColor: '#F5FCFF' }}>
           <TabNavigator   >
             {dataSource.map((v, i) => {
               return (
                 <TabNavigator.Item
                   key={i}
                   selected={this.state.selectedTab === v.tabPage}
                   title={v.tabName}
                   tabStyle={stylesheet.tab}
                   titleStyle={{ color: '#999999' }}
                   selectedTitleStyle={{ color: '#c863b5' }}
                   renderIcon={() => <SvgUri width="23" height="23" svgXmlData={v.icon} />}
                   renderSelectedIcon={() => <SvgUri width="23" height="23" svgXmlData={v.selectedIcon} />}
                   badgeText={v.badge}
                   onPress={() => this.setState({ selectedTab: v.tabPage })}>
                   <v.component  />
                 </TabNavigator.Item>
               )
             })}
           </TabNavigator>
         </View>
       )
     }
   }
   const stylesheet = StyleSheet.create({
     tab: {
       justifyContent: "center"
     },
     tabIcon: {
       color: "#999",
       width: 23,
       height: 23
     }
   })
   export default Index;
   ```






# [react-native-element](https://react-native-elements.github.io/react-native-elements/docs/getting_started.html)

> 一套ui库 内置常用组件

1. 下载

   需要使用到图标 因此也需要安装 `react-native-vector-icons`

   ```js
   yarn add react-native-elements react-native-vector-icons
   ```

2. 引入和使用

   ```jsx
   import { Icon } from 'react-native-elements'
   
   <Icon
     name='rowing' />
   ```

3. [react-native-vector-icons](https://github.com/oblador/react-native-vector-icons) 的其他使用

   1. 编辑 `android/app/build.gradle` 

   2. 添加以下配置

      ```jsx
      project.ext.vectoricons = [
          iconFontNames: [ 'MaterialIcons.ttf', 'EvilIcons.ttf' ] // Name of the font files you want to copy
      ]
      
      apply from: "../../node_modules/react-native-vector-icons/fonts.gradle"
      ```

   3. 重启项目

   4. 添加代码 如

      ```jsx
      import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
      
      const icon = <FontAwesome5 name={'comments'} />;
      ```





# [react-native-linear-gradient](https://www.npmjs.com/package/react-native-linear-gradient)

> 渐变容器

1. 下载

   ```js
   yarn add react-native-linear-gradient
   ```

2. 简单使用

   ```jsx
   import LinearGradient from 'react-native-linear-gradient';
    
   <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
     <Text style={styles.buttonText}>
       Sign in with Facebook
     </Text>
   </LinearGradient>
   
   var styles = StyleSheet.create({
     linearGradient: {
       flex: 1,
       paddingLeft: 15,
       paddingRight: 15,
       borderRadius: 5
     },
     buttonText: {
       fontSize: 18,
       fontFamily: 'Gill Sans',
       textAlign: 'center',
       margin: 10,
       color: '#ffffff',
       backgroundColor: 'transparent',
     },
   });
   ```





# [react-native-confirmation-code-field](https://www.npmjs.com/package/react-native-confirmation-code-field)

> 验证码输入框

1. 下载

   ```js
   yarn add react-native-confirmation-code-field
   ```

2. 代码

   ```jsx
   import React, {useState} from 'react';
   import {SafeAreaView, Text, StyleSheet} from 'react-native';
    
   import {
     CodeField,
     Cursor,
     useBlurOnFulfill,
     useClearByFocusCell,
   } from 'react-native-confirmation-code-field';
    
   const styles = StyleSheet.create({
     root: {flex: 1, padding: 20},
     title: {textAlign: 'center', fontSize: 30},
     codeFiledRoot: {marginTop: 20},
     cell: {
       width: 40,
       height: 40,
       lineHeight: 38,
       fontSize: 24,
       borderWidth: 2,
       borderColor: '#00000030',
       textAlign: 'center',
     },
     focusCell: {
       borderColor: '#000',
     },
   });
    
   const CELL_COUNT = 6;
    
   const App = () => {
     const [value, setValue] = useState('');
     const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
     const [props, getCellOnLayoutHandler] = useClearByFocusCell({
       value,
       setValue,
     });
    
     return (
       <SafeAreaView style={styles.root}>
         <Text style={styles.title}>Verification</Text>
         <CodeField
           ref={ref}
           {...props}
           value={value}
           onChangeText={setValue}
           cellCount={CELL_COUNT}
           rootStyle={styles.codeFiledRoot}
           keyboardType="number-pad"
           textContentType="oneTimeCode"
           renderCell={({index, symbol, isFocused}) => (
             <Text
               key={index}
               style={[styles.cell, isFocused && styles.focusCell]}
               onLayout={getCellOnLayoutHandler(index)}>
               {symbol || (isFocused ? <Cursor /> : null)}
             </Text>
           )}
         />
       </SafeAreaView>
     );
   };
    
   export default App;
   ```




# [axios](https://github.com/axios/axios)

> 流行的异步请求库

1. 下载

   ```js
   yarn add axios
   ```



# [Teaset](https://github.com/rilyu/teaset/blob/HEAD/docs/cn/README.md)

> React Native UI 组件库, 超过 20 个纯 JS(ES6) 组件, 专注于内容展示和操作控制

1. 下载

   ```js
   yarn add teaset
   ```










# svg

> 因为在rn中 使用普通的字体图标是没有多种颜色的如

![image-20200605103850857](medias/image-20200605103850857.png)

1. 下载依赖

   ```js
   yarn add react-native-svg react-native-svg-uri
   ```

2. 复制 示例demo中svg源代码

   ![image-20200605104237256](medias/image-20200605104237256.png)

3.  代码中使用

   ```jsx
   import SvgUri from 'react-native-svg-uri';
   const female='<svg ......';
   
    <SvgUri width="23" height="23" svgXmlData={female} />
   ```

   

   

   

# iconfont字体图标

1. 在字体图标网站上下载 字体 

2. 然后拷贝 ttf后缀的文件到 `android\app\src\main\assets\fonts`中  如果没有`assets`文件夹可以新建一个

3. 然后 给 `Text` 标签 设置

   ![image-20200605105305029](medias/image-20200605105305029.png)

   ```jsx
    <Text style={{ fontFamily: "iconfont", color: "red" }} >{'\ue82b'}</Text>
   ```
   
4. 然后记得重启项目





#  [react-native-datepicker](https://www.npmjs.com/package/react-native-datepicker)

> 日期选择框

1. 安装

   ```js
   yarn add  react-native-datepicker 
   ```

2. 引入

   ```js
   import DatePicker from 'react-native-datepicker';
   ```

3. 使用

   ```react
    <DatePicker
                 style={{ width: Styleskits.screen.width - 50 }} 
                 mode="date"
                 placeholder="设置生日"
                 format="YYYY-MM-DD"
                 confirmBtnText="Confirm"
                 cancelBtnText="Cancel"
                 iconComponent={<Icon name="angle-down"   />}
                 androidMode="spinner"
                 customStyles={{
                   dateInput: {
                     borderWidth: 0,
                     borderBottomWidth: 1.1,
                     alignItems:"flex-start",
                     paddingLeft:6,
                     textAlign:"left"
                   },
                   placeholderText:{
                     fontSize:18,
                     color:"#afafaf"
                   }
                 }}
                 onDateChange={(date) => { this.setState({ birthday: date }) }}
        />
   ```




# 使用 [react-native-amap-geolocation](https://github.com/qiuxiang/react-native-amap-geolocation)

> 高德地图组件
>
> 分别使用了两个功能，一个是AndroidSDK和一个web服务

1. [申请 高度地图的key](https://lbs.amap.com/api/android-location-sdk/guide/create-project/get-key)

2. 下载依赖

   ```js
   yarn add  react-native-amap-geolocation
   ```

7. 配置文件

   1. 编辑 `android/settings.gradle`，设置项目路径：
   
      ```diff
      + include ':react-native-amap-geolocation'
      + project(':react-native-amap-geolocation').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-amap-geolocation/lib/android')
      ```
   
   2. 编辑 `android/app/build.gradle`，新增依赖：
   
      ```diff
      dependencies {
      +   implementation project(':react-native-amap-geolocation')
      }
      ```
   
   3. 编辑 `MainApplication.java`：
   
      ```diff
      + import cn.qiuxiang.react.geolocation.AMapGeolocationPackage;
      
      public class MainApplication extends Application implements ReactApplication {
        @Override
              protected List<ReactPackage> getPackages() {
                @SuppressWarnings("UnnecessaryLocalVariable")
                List<ReactPackage> packages = new PackageList(this).getPackages();
                // Packages that cannot be autolinked yet can be added manually here, for example:
      +         packages.add(new AMapGeolocationPackage());
                return packages;
              }
      }
      ```
   
4. 代码

   ```js
   
   import { PermissionsAndroid, Platform } from "react-native";
   import { init, Geolocation } from "react-native-amap-geolocation";
   import axios from "axios";
   class Geo {
     async initGeo() {
       if (Platform.OS === "android") {
         await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
       }
       await init({
         ios: "e8b092f4b23cef186bd1c4fdd975bf38",
         android: "e8b092f4b23cef186bd1c4fdd975bf38"
       });
       return Promise.resolve();
     }
     async getCurrentPosition() {
       return new Promise((resolve, reject) => {
         console.log("开始定位");
         Geolocation.getCurrentPosition(({ coords }) => {
           resolve(coords);
         }, reject);
       })
     }
     async getCityByLocation() {
       const { longitude, latitude } = await this.getCurrentPosition();
       const res = await axios.get("https://restapi.amap.com/v3/geocode/regeo", {
         params: { location: `${longitude},${latitude}`, key: "83e9dd6dfc3ad5925fc228c14eb3b4d6", }
       });
       return Promise.resolve(res.data);
     }
   }
   
   
   export default new Geo();
   ```



#  [react-native-picker](https://www.npmjs.com/package/react-native-picker)

> 自定义picker

1. 安装

   ```
   yarn add react-native-picker
   ```

2. 代码

   ```react
   import Picker from 'react-native-picker';
       Picker.init({
         pickerData: CityJson,
         selectedValue: ["北京", "北京"],
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
   ```
   
   
   
   







# 使用 [react-native-image-crop-picker](https://www.npmjs.com/package/react-native-image-crop-picker)

> 图片裁切组件

1. 安装

   ```
   yarn add  react-native-image-crop-picker 
   ```

2. 使用

   ```react
   import ImagePicker from 'react-native-image-crop-picker';
   
       ImagePicker.openPicker({
         width: 300,
         height: 400,
         cropping: true
       }).then(image => {
         console.log(image);
       });
   ```



# [jmessage-react-plugin](https://github.com/jpush/jmessage-react-plugin)

> 极光推送 react-native 版本

## [开通服务](https://www.jiguang.cn)

1. 首先 需要我们自己先在极光上注册账号 开通服务,拿到对应的密钥

## 简单使用

1. 安装依赖

   ```js
   yarn add jmessage-react-plugin jcore-react-native
   ```

2. 配置

   1. `android\app\src\main\AndroidManifest.xml` 加入以下代码

      ```xml
            <activity android:name="com.facebook.react.devsupport.DevSettingsActivity" />
            <!-- 极光的配置 -->
            <meta-data android:name="JPUSH_CHANNEL" android:value="${APP_CHANNEL}" />
            <meta-data android:name="JPUSH_APPKEY" android:value="${JPUSH_APPKEY}" />
            <!-- 极光的配置 -->
          </application>
      ```

   2. `android\app\build.gradle` 加入以下代码和按需修改

      ```js
      android {
          compileSdkVersion rootProject.ext.compileSdkVersion
      
          compileOptions {
              sourceCompatibility JavaVersion.VERSION_1_8
              targetCompatibility JavaVersion.VERSION_1_8
          }
      
          defaultConfig {
              applicationId "com.awesomeproject22"
              minSdkVersion rootProject.ext.minSdkVersion
              targetSdkVersion rootProject.ext.targetSdkVersion
              versionCode 1
              versionName "1.0"
              multiDexEnabled true // 新增的
              manifestPlaceholders = [
              JPUSH_APPKEY: "c0c08d3d8babc318fe25bb0c",	//在此替换你的APPKey
              APP_CHANNEL: "developer-default"		//应用渠道号
              ]
          }
      ```

      ---

      ```js
      dependencies {
          implementation fileTree(dir: "libs", include: ["*.jar"])
          implementation "com.facebook.react:react-native:+"  // From node_modules
          compile project(':jmessage-react-plugin') // 新增的
          compile project(':jcore-react-native')  // 新增的
          if (enableHermes) {
              def hermesPath = "../../node_modules/hermes-engine/android/";
              debugImplementation files(hermesPath + "hermes-debug.aar")
              releaseImplementation files(hermesPath + "hermes-release.aar")
          } else {
              implementation jscFlavor
          }
      }
      ```

   3. 根目录下新建文件和添加以下配置 `react-native.config.js`

      ```js
      module.exports = {
        dependencies: {
          'jmessage-react-plugin': {
            platforms: {
              android: {
                packageInstance: 'new JMessageReactPackage(false)'
              }
            }
          },
        }
      };
      ```

   4.  `android\settings.gradle` 加入如下配置

      ```js
      include ':jmessage-react-plugin'
      project(':jmessage-react-plugin').projectDir = new File(rootProject.projectDir, '../node_modules/jmessage-react-plugin/android')
      include ':jcore-react-native'
      project(':jcore-react-native').projectDir = new File(rootProject.projectDir, '../node_modules/jcore-react-native/android')
      ```

3. 在 根组件中进行测试 `App.js`

   ```react
   import React from 'react';
   import { View, Text } from "react-native";
   import JMessage from "jmessage-react-plugin";
   class App extends React.Component {
     componentDidMount() {
       JMessage.init({
         'appkey': 'c0c08d3d8babc318fe25bb0c',
         'isOpenMessageRoaming': true,
         'isProduction': false,
         'channel': '' 
       })
   
       JMessage.login({
         username: "18665711956",
         password: "18665711956"
       }, (res) => {
         console.log("登录成功");
         console.log(res);
       }, (err) => {
         console.log("登录失败");
         console.log(err);
       })
   
     }
     render() {
       return (
         <View>
           <Text>goods</Text>
         </View>
       );
     }
   }
   export default App;
   ```
   
   
   







# [react-native-image-header-scroll-view](https://www.npmjs.com/package/react-native-image-header-scroll-view)

> 顶部吸顶效果
>

1. 下载

   ```js
   yarn add react-native-image-header-scroll-view 
   ```

   

# 小技巧

## 关闭黄色警告

```jsx
console.ignoredYellowBox = ['Warning: BackAndroid is deprecated. Please use BackHandler instead.','source.uri should not be an empty string','Invalid props.style key'];
 
console.disableYellowBox = true // 关闭全部黄色警告
```





# [react-native-deck-swiper](https://www.npmjs.com/package/react-native-deck-swiper)

> 类似轮播图的滑动组件

1. 下载

   ```js
   yarn add react-native-view-overflow  react-native-deck-swiper
   ```

2. 示例demo

   ```jsx
   import Swiper from "react-native-deck-swiper";
   
   render () {
       <View style={styles.container}>
           <Swiper
               cards={['DO', 'MORE', 'OF', 'WHAT', 'MAKES', 'YOU', 'HAPPY']}
               renderCard={(card) => {
                   return (
                       <View style={styles.card}>
                           <Text style={styles.text}>{card}</Text>
                       </View>
                   )
               }}
               onSwiped={(cardIndex) => {console.log(cardIndex)}}
               onSwipedAll={() => {console.log('onSwipedAll')}}
               cardIndex={0}
               backgroundColor={'#4FD0E9'}
               stackSize= {3}>
               <Button
                   onPress={() => {console.log('oulala')}}
                   title="Press me">
                   You can press me
               </Button>
           </Swiper>
       </View>
   }
   
   const styles = StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: "#F5FCFF"
     },
     card: {
       flex: 1,
       borderRadius: 4,
       borderWidth: 2,
       borderColor: "#E8E8E8",
       justifyContent: "center",
       backgroundColor: "white"
     },
     text: {
       textAlign: "center",
       fontSize: 50,
       backgroundColor: "transparent"
     }
   });
   ```


# [react-native-image-zoom-viewer](https://www.npmjs.com/package/react-native-image-zoom-viewer)  

> 图片缩放组件

1. 下载

   ```
   yarn add react-native-image-zoom-viewer
   ```

2. 代码

   ```jsx
   import { Modal } from 'react-native';
   import ImageViewer from 'react-native-image-zoom-viewer';
   
   const images = [{
     // Simplest usage.
     url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
   
     // width: number
     // height: number
     // Optional, if you know the image size, you can set the optimization performance
   
     // You can pass props to <Image />.
     props: {
       // headers: ...
     }
   }, {
     url: '',
     props: {
       // Or you can set source directory.
       source: require('../background.png')
     }
   }]
   
   export default class App extends React.Component {
     render: function() {
     return (
       <Modal visible={true} transparent={true}>
         <ImageViewer imageUrls={images} />
       </Modal>
     )
   }
   }
   ```




# [aurora-imui-react-native](https://github.com/jpush/aurora-imui/blob/master/README_zh.md)

> Aurora IMUI 是个通用的即时通讯（IM）UI 库，不特定于任何 IM SDK。
>
> 本 UI 库提供了消息列表、输入视图等常用组件，支持常见的消息类型：文字、图片、语音、视频等。默认包含多套界面风格，也能根据自己的需要自定义。



1. 安装

   ```js
   yarn  add  aurora-imui-react-native  react-native-fs
   ```

2. 配置 `引入 Package`

   > MainApplication.java

   ```js
   import cn.jiguang.imui.messagelist.ReactIMUIPackage; // 新增的
   
   @Override
           protected List<ReactPackage> getPackages() {
             @SuppressWarnings("UnnecessaryLocalVariable")
             List<ReactPackage> packages = new PackageList(this).getPackages();
              packages.add(new AMapGeolocationPackage());
              packages.add(new ReactIMUIPackage()); // 新增的
             return packages;
           }
   ```

3. `android\settings.gradle` 添加配置

   ```js
   include ':app', ':aurora-imui-react-native'
   project(':aurora-imui-react-native').projectDir = new File(rootProject.projectDir, '../node_modules/aurora-imui-react-native/ReactNative/android')
   ```

4. `android\app\build.gradle` 添加配置

   ```js
   dependencies {
   	...
       implementation project(':aurora-imui-react-native')
   ```

5. `android\app\src\main\AndroidManifest.xml` 

   ```xml
   <manifest 
    xmlns:tools="http://schemas.android.com/tools" // 这里是新添加的
   >
       <application
         android:allowBackup="false"
         tools:replace="android:allowBackup" // 这里是新添加的
         >
   ```

6. [实例demo](https://github.com/jpush/aurora-imui/blob/master/ReactNative/sample/App.js)



# [react-native-scrollable-tab-view](https://www.npmjs.com/package/react-native-scrollable-tab-view)

> 顶部tab栏

## 使用

1. 安装依赖

   ```
   yarn add   react-native-scrollable-tab-view @react-native-community/viewpager
   ```

2. 使用

   > 标签最外层必须为 `ScrollableTabView`

   ```jsx
     
   import React from 'react';
   import {
     Text,
   } from 'react-native';
   
   import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
   
   export default () => {
     return <ScrollableTabView
       style={{ marginTop: 20 }}
       initialPage={1}
       renderTabBar={() => <DefaultTabBar />}
     >
       <Text tabLabel='Tab #1'>My</Text>
       <Text tabLabel='Tab #2'>favorite</Text>
       <Text tabLabel='Tab #3'>project</Text>
     </ScrollableTabView>;
   }
   ```





# [moment](http://momentjs.cn/)

> 流行的日期库

1. 下载

   ```js
   yarn add moment   
   ```

2. 设置语言

   ```js
   import moment from "moment";
   import 'moment/locale/zh-cn';
   moment.locale('zh-cn');

   export default moment;
   ```
   



# [react-native-image-picker 图片选择工具](https://github.com/react-native-community/react-native-image-picker)

1. 安装

   ```js
   yarn add react-native-image-picker
   ```

3. 代码

   ```jsx
   import ImagePicker from 'react-native-image-picker';
   
   // More info on all the options is below in the API Reference... just some common use cases shown here
   const options = {
     title: 'Select Avatar',
     customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
     storageOptions: {
       skipBackup: true,
       path: 'images',
     },
   };
   
   /**
    * The first arg is the options object for customization (it can also be null or omitted for default options),
    * The second arg is the callback which sends object: response (more info in the API Reference)
    */
   ImagePicker.showImagePicker(options, (response) => {
     console.log('Response = ', response);
   
     if (response.didCancel) {
       console.log('User cancelled image picker');
     } else if (response.error) {
       console.log('ImagePicker Error: ', response.error);
     } else if (response.customButton) {
       console.log('User tapped custom button: ', response.customButton);
     } else {
       const source = { uri: response.uri };
   
       // You can also display the image using data:
       // const source = { uri: 'data:image/jpeg;base64,' + response.data };
   
       this.setState({
         avatarSource: source,
       });
     }
   });
   ```
