# [第三章 React-native - 基础](https://reactnative.cn) 

主要讲解以下React的基础知识,方便同学们更好的学习项目的知识。

- React Native 介绍
- 文件目录结构
- JSX
- RN样式
- 基本标签
- 插值表达式
- 调试
- 事件
- 生命周期
- mobx

## [React Native 介绍](https://baike.baidu.com/item/react%20native/20307162?fr=aladdin)

![image-20200526120559183](medias/image-20200526120559183.png)

## 文件目录结构

```js
│  App.js           ---   项目的根组件
│  index.js         ---   项目的入口文件     
│  package.json     ---   项目的描述文件         
│  .eslintrc.js     ---   eslint的配置文件            
│  .prettierrc.js   ---   格式化配置文件             
│  android          ---   编译安卓相关       
│  ios              ---   编译ios相关
```

### 老师的vs code的插件

![image-20200526173035552](medias/image-20200526173035552.png)





## JSX

> React中写组件的代码格式 全称是 `JavaScript xml`

```jsx
import React from 'react';
import { View, Text } from 'react-native';

const Index = () => <View>
  <Text>JSX</Text>
</View>

export default Index;
```

## RN样式

> 主要讲解和web开发的不同之处

- flex布局
- 样式继承
- 单位
- 屏幕宽度和高度
- 变换

### flex布局

- 所有容器默认都是`flexbox`
- 并且是纵向排列 也就是 `flex-direction:column`

### 样式继承

背景颜色、字体颜色、字体大小等没有继承

### 单位

- 不能加 `px` 单位 
- 不能加 `vw vh` 等单位
- 可以加百分比单位

### [屏幕宽度和高度](https://reactnative.cn/docs/dimensions#__docusaurus)

```jsx
import {Dimensions } from "react-native";
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
```

### 变换

```jsx
<Text style={{transform:[{translateY:300},{scale:2}]}}>变换</Text>
```



## [标签](https://reactnative.cn/docs/activityindicator)

1. View

2. Text

3. TouchableOpacity 

4. Image

5. ImageBackground

6. TextInput

7. 其他

   1. button
   2. FlatList
   3. ScrollView
   4. StatusBar
   5. TextInput



### View

- 相当于以前`web`中的div
- 不支持设置字体大小,字体颜色等
- 不能直接放文本内容
- 不支持直接绑定点击事件 (一般使用 `TouchableOpacity`  来代替)

### Text

> 文本标签

- 文本标签 可以设置字体颜色、大小等
- 支持绑定点击事件



### TouchableOpacity 

> 可以绑定点击事件的块级标签

- 相当于块级的容器
- 支持绑定点击事件 `onPress`
- 可以设置点击时的透明度  

```jsx
<TouchableOpacity  activeOpacity={0.5}  onPress={this.handleOnPress} ></TouchableOpacity>
```



### Image

> 图片标签

- 渲染本地图片时

  ```jsx
  <Image source={require("../girl.png")}  />
  ```

- 渲染网络图片时,必须加入宽度和高度

  ```jsx
  <Image source={{uri:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1590514654506&di=38fa919d4c78fb776536b922bb94eec3&imgtype=0&src=http%3A%2F%2Fimages.ali213.net%2Fpicfile%2Fpic%2F2013%2F03%2F28%2F927_xgzwl%2520%25281%2529.jpg"}} style={{width:200,height:300}}  />
  ```

- 在 Android 上支持 GIF 和 WebP 格式图片

  按下ctrl + e，将地址复制进去，把下面的一堆都复制进去，只要修改过安卓文件夹下的内容，都需要重启项目，ctrl + c，yarn android

  默认情况下 Android 是不支持 GIF 和 WebP 格式的。你需要在`android/app/build.gradle`文件中根据需要手动添加以下模块：

  ```jsx
  dependencies {
    // 如果你需要支持Android4.0(API level 14)之前的版本
    implementation 'com.facebook.fresco:animated-base-support:1.3.0'
  
    // 如果你需要支持GIF动图
    implementation 'com.facebook.fresco:animated-gif:2.0.0'
  
    // 如果你需要支持WebP格式，包括WebP动图
    implementation 'com.facebook.fresco:animated-webp:2.1.0'
    implementation 'com.facebook.fresco:webpsupport:2.0.0'
  
    // 如果只需要支持WebP格式而不需要动图
    implementation 'com.facebook.fresco:webpsupport:2.0.0'
  }
  ```

### ImageBackground

> 一个可以使用图片当作背景的容器,相当于以前的 `div+背景图片`

```jsx
  <ImageBackground source={...} style={{width: '100%', height: '100%'}}>
    <Text>Inside</Text>
  </ImageBackground>
```



### TextInput

> 输入框组件

- 可以通过 `onChangeText`事件来获取输入框的值

## 语法

1. 插值表达式

2. 组件

3. 状态 state

4. 属性 props

5. 调试

6. 事件

7. 生命周期

   


### 插值表达式
![在这里插入图片描述](https://img-blog.csdnimg.cn/2021020808494350.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuaXRhU3Vu,size_16,color_FFFFFF,t_70)

```jsx
import React from 'react';
import { View, Text } from 'react-native';

const Index = () => <View>
  <Text>{"开心"}</Text>
  <Text>{123}</Text>
</View>

export default Index;
```

### 组件

- 函数组件
  - 没有state (通过hooks可以有)
  - 没有生命周期(通过hooks可以有)
  - 适合简单的场景
- 类组件
  - 适合复杂的场景
  - 有state
  - 有生命周期

#### 函数组件

```jsx
class Index extends Component {
  render() {
    return (
      <View>
        <Btn></Btn>
      </View>
    );
  }
}
// 函数组件
const Btn = () => <Button title="点我" />
```

#### 类组件

```jsx
import React, { Component } from 'react';
import { View, Text } from 'react-native';
class Index extends Component {
  render() {
    return (
      <View>
        <Text>类组件</Text>
      </View>
    );
  }
}
export default Index;
```

### 状态 state
只有类组件才有哦
```jsx
import React, { Component } from 'react';
import { View, Text } from 'react-native';
class Index extends Component {
  // 1 声明state
  state = {
    num: 100
  }
  render() {
    return (
      <View>
        {/* 2 使用state */}
        <Text onPress={this.handlePress} >{this.state.num}</Text>
      </View>
    );
  }
  // 3 修改state
  handlePress = () => {
    this.setState({ num: 1010 });
  }
}
export default Index;
```

### 属性 props

> 父子传递数据的关键

```jsx
import React, { Component } from 'react';
import { View, Text } from 'react-native';
class Index extends Component {
  render() {
    return (
      <View>
        <BigText fontColor="red" >大博妞</BigText>
      </View>
    );
  }
}

class BigText extends Component {
  render() {
    // 通过props来接收父组件传递的数据
    return <Text style={{ color: this.props.fontColor }} >
      {/*  children 其实就是插槽 类似vue中的slot  */}
      {this.props.children}
    </Text>
  }
}


export default Index;
```



### 调试

分为两种方式

2. 使用谷歌浏览器来调试
   1. 使用谷歌浏览器即可
   2. 不能查看标签结构
   3. 不能查看网络请求
   4. 就是ctrl + m
   
3. 使用rn推荐的工具 [react-native-debugger](https://github.com/jhen0409/react-native-debugger)来调试 (**老师推荐使用这种方式**)

   1. 可以查看标签结构
   2. 不能查看网络请求
   3. 使用方法：ctrl + m 点击 stop Debugging
      打开调试工具，重新在手机屏幕上ctrl +  

4. 想要查看网络请求

   1. 找到项目的入口文件 `index.js`

   2. 加入以下代码即可

      ```js
      GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
      ```

      

### 事件

绑定时间需要特别注意 this的指向问题,可以总结为如下的方式

- 使用箭头函数
- 通过bind重新绑定this
- 匿名函数

```jsx
import React, { Component } from 'react';
import { View, Text } from 'react-native';
class Index extends Component {
  state = { num: 100 }
  // 丢失 state
  handlePress1() {
    console.log(this.state);
  }
  // 正常
  handlePress2 = () => {
    console.log(this.state);
  }
  // 正常
  handlePress3() {
    console.log(this.state);
  }
  // 正常
  handlePress4() {
    console.log(this.state);
  }
  // 正常
  render() {
    return (
      <View>
        {/* 导致事件函数中获取不到state */}
        <Text onPress={this.handlePress1} >事件1</Text>
        {/* 正常 */}
        <Text onPress={this.handlePress2} >事件1</Text>
        {/* 正常 */}
        <Text onPress={this.handlePress3.bind(this)} >事件3</Text>
        {/* 正常 */}
        <Text onPress={() => this.handlePress4()} >事件4</Text>
      </View>
    );
  }
}
export default Index;
```

---



### [生命周期](https://zh-hans.reactjs.org/docs/react-component.html#mounting)

> 生命周期指的`react组件`的从创建到销毁的整个过程中会自动触发的函数

[在线图示](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

![image-20200528103625667](medias/image-20200528103625667.png)



#### 主要的生命周期

- *constructor*
  - 组件被实例化的时候出发 一般用做对组件做初始工作,如设置`state`等

- render
  - 组件开始渲染时触发
  - 组件被更新时触发 -  state和props发生改变时触发
- componentDidMount
  - 组件挂载完毕,可以发送异步请求获取数据
- componentWillUnmount
  - 组件被卸载时触发
  - 一般用在清除定时器或者取消订阅等

---



## [mobx ](https://mobx.js.org/README.html)

> react中 全局数据管理库  可以简单的实现数据的跨组件共享 类似 vue中的vuex

![img](medias/flow.png)

### 使用步骤

1. 安装依赖

   - `mobx` 核心库
   -  `mobx-react` 方便在react中使用mobx技术的库
   - `@babel/plugin-proposal-decorators` 让 `rn` 项目支持 `es7` 的装饰器语法的库

   ```js
   yarn add mobx mobx-react @babel/plugin-proposal-decorators
   ```

2. 在 `babel.config.js`添加以下配置

   ```js
     plugins: [
       ['@babel/plugin-proposal-decorators', { 'legacy': true }]
     ]
   ```

3. 新建文件 `mobx\index.js` 用来存放 全局数据 

   ```js
   import { observable, action } from "mobx";
   
   class RootStore {
     // observable 表示数据可监控 表示是全局数据
     @observable name = "hello";
     // action行为 表示 changeName是个可以修改全局共享数据的方法
     @action changeName(name) {
       this.name = name;
     }
   }
   
   export default new RootStore();
   ```

4. 在根组件中挂载

   > 通过 `Provider` 来挂载和传递

   ```jsx
   import React, { Component } from 'react';
   import { View} from 'react-native';
   import rootStore from "./mobx";
   import { Provider} from "mobx-react";
   class Index extends Component {
     // 正常
     render() {
       return (
         <View  >
           <Provider rootStore={rootStore} >
             <Sub1></Sub1>
           </Provider>
         </View>
       );
     }
   }
   ```

5. 其他组件中使用

   ```jsx
   import React, { Component } from 'react';
   import { View, Text } from 'react-native';
   import {inject,observer } from "mobx-react";
   
   @inject("rootStore") // 注入 用来获取 全局数据的
   @observer //  当全局发生改变了  组件的重新渲染 从而显示最新的数据
   class Sub1 extends Component {
     changeName = () => {
      // 修改全局数据   
       this.props.rootStore.changeName(Date.now());
     }
     render() {
       console.log(this);
       return (
         <View><Text onPress={this.changeName}>{this.props.rootStore.name}</Text></View>
       );
     }
   }
   
   export default Index;
   ```

   

