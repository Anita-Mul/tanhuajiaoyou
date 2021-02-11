# 探花交友 - 项目

![pink flowers](medias/tulips-3339416__340.jpg)

## 模块介绍

- 交友
- 圈子
- 消息
- 个人中心
- 其他



## 框架搭建

1. 创建项目

   ```js
   npx react-native init tanhuajiaoyou
   ```

2. 使用 [react-navigation](https://reactnavigation.org/) 搭建页面路由

3. 新建登录页面



# [接口文档](http://157.122.54.189:9089/swagger.html)

```js
http://157.122.54.189:9089/swagger.html
```



# 登录页面

## 填写手机号码

<img src="medias/01-登录1-1591233326384.png" alt="01-登录1" style="zoom:55%;" />





### 实现步骤

1. 完成静态页面布局

   1. 用到的组件有
      1. StatusBar
      2. Image
      3. Input([react-native-elements]())
      4. Icon([react-native-vector-icons/FontAwesome5]())
      5. [react-native-linear-gradient](https://www.npmjs.com/package/react-native-linear-gradient)
      6. [Teaset](https://github.com/rilyu/teaset/blob/HEAD/docs/cn/README.md)

2. 实现功能

   1. `px`单位转`dp`单位

   2. 填写手机号码

   3. 校验手机号码

      ```js
      export default {
        validatePhone(phone) {
          const reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
          return reg.test(phone)
        }
      }
      ```

   4. 获取验证码

   5. 切换到 验证码页面

3. 其他

   1. [接口地址](http://157.122.54.189:9089/swagger.html)

      ```
      http://157.122.54.189:9089/swagger.html
      ```

   2. 接口路径映射

      ```js
      
      /**
       * 接口基地址
       */
      export const BASE_URI = "http://157.122.54.189:9089";
      
      /**
       *  登录 获取验证码  
       */
      export const ACCOUNT_LOGIN = '/user/login';// 登录  
      /**
       *  新用户信息注册
       */
      export const ACCOUNT_REGINFO = '/user/loginReginfo'; // 新用户信息注册
      /**
       *  检查验证码
       */
      export const ACCOUNT_VALIDATEVCODE = '/user/loginVerification';// 检查验证码
      /**
       * 审核头像
       */
      export const ACCOUNT_CHECKHEADIMAGE = '/user/loginReginfo/head';  //审核头像
      /**
       * 审核头像
       */
      export const USER_INFO = '/my/userinfo';  //审核头像
      
      
      /**
       * 最近来访
       */
      export const FRIENDS_VISITORS = '/friends/visitors'; // 最近来访
      /**
       * 最近来访
       */
      export const FRIENDS_TODAYBEST = '/friends/todayBest'; // 最近来访
      /**
       * 推荐朋友 
       */
      export const FRIENDS_RECOMMEND = '/friends/recommendation'; // 推荐朋友 
      /**
       * 探花-左滑右滑-数据 
       */
      export const FRIENDS_CARDS = '/friends/cards'; // 探花-左滑右滑-数据 
      /**
       * 探花-喜欢和不喜欢 
       */
      export const FRIENDS_LIKE = '/friends/like/:id/:type'; // 探花-喜欢和不喜欢 
      /**
       * 搜附近
       */
      export const FRIENDS_SEARCH = '/friends/search'; // 搜附近
      /**
       * 测灵魂-问卷列表
       */
      export const FRIENDS_QUESTIONS = '/friends/questions'; // 测灵魂-问卷列表
      /**
       * 测灵魂 测试题
       */
      export const FRIENDS_QUESTIONSECTION = '/friends/questionSection/:id'// 测灵魂 测试题
      /**
       * 测灵魂-提交问卷获得鉴定单信息
       */
      export const FRIENDS_QUESTIONANS = '/friends/questionsAns/:id';// 测灵魂-提交问卷获得鉴定单信息
      /**
       * 朋友信息（点击朋友进入）;
       */
      export const FRIENDS_PERSONALINFO = '/friends/personalInfo/:id'; // 朋友信息（点击朋友进入）;
      
      
      // 圈子接口(QZ)
      /**
       *  推荐动态
       */
      export const QZ_TJDT = '/qz/recommend';   // 推荐动态
      /**
       *  最新动态
       */
      export const QZ_ZXDT = '/qz/newtrends';   // 最新动态
      /**
       * 单条动态评论
       */
      export const QZ_DT_PL = '/qz/comment/:id'; //单条动态评论
      /**
       *  动态-点赞&取消点赞
       */
      export const QZ_DT_DZ = '/qz/star/:id'; // 动态-点赞&取消点赞
      /**
       *  动态-喜欢&取消喜欢
       */
      export const QZ_DT_XH = '/qz/like/:id'; // 动态-喜欢&取消喜欢
      /**
       *  动态-不感兴趣
       */
      export const QZ_DT_BGXQ = '/qz/noInterest/:id'; // 动态-不感兴趣
      /**
       * 评论-点赞
       */
      export const QZ_DT_PL_DZ = '/qz/comments/star/:id'; //评论-点赞
      /**
       * 评论-提交
       */
      export const QZ_DT_PL_TJ = '/qz/comments/submit/:id'; //评论-提交
      /**
       * 动态-图片-上传
       */
      export const QZ_IMG_UPLOAD = '/qz/trends/image/upload';  //动态-图片-上传
      /**
       *   动态发布
       */
      export const QZ_DT_PUBLISH = '/qz/trend/submit'; //  动态发布
      
      /**
       * 我的信息
       */
      export const MY_INFO = '/my/userinfo'; //我的信息
      
      /**
       * 我的动态
       */
      export const MY_TRENDS = '/my/trends';
      /**
       * 互相喜欢，喜欢，粉丝 - 统计
       */
      export const MY_COUNTS = '/my/counts';
      /**
       * 个人信息保存
       */
      export const MY_SUBMITUSERINFO = '/my/submitUserInfo';
      /**
       * 喜欢列表数据接口
       */
      export const MY_LIKELIST = '/my/likelist'; 
      ```

      

   


## 填写验证码

<img src="medias/02-登录2-1591235469477.png" alt="02-登录2" style="zoom:50%;" />



### 实现步骤

1. 实现验证码静态页面
   1. 用到的组件有
      1. [react-native-confirmation-code-field](https://www.npmjs.com/package/react-native-confirmation-code-field)
2. 实现功能
   1. 获取验证码
   2. 校验验证码
   3. 跳转到完善信息页面
   4. 跳转到交友页面





# 完善个人信息页面

<img src="medias/image-20200607161353070.png" alt="image-20200607161353070" style="zoom:67%;" />



## 审核中的动态效果

<img src="medias/scan.gif" alt="scan" style="zoom:50%;" />



## 实现步骤

1. 完成静态页面

   1. 用到的组件有
      1. react-native-svg-uri
      2. react-native-datepicker
      3. react-native-picker
      4. react-native-image-crop-picker
      5. teaset 的 overlay

2. 完成功能

   1. 选择性别 

   2. 填写昵称

   3. 选择生日

   4. 自动定位和手动选择定位

   5. 设置头像

      1. 上传头像的接口地址和参数说明

         ```js
         ACCOUNT_CHECKHEADIMAGE // 接口地址
         ```

      2. 参数说明

         1. 需要使用formdata对象来传递图片 
         2. key为 "headPhoto"
         3. value 值为对象 `{uri,type,name}`

      3. 请求头设置

         1. 需要设置 `"Content-Type": "multipart/form-data"`
         2. 需要携带token `Authorization: Bearer...`

3. 其他

   1. mobx 来共享数据 如 手机号码 , token  和 用户 id

   2. 使用 高德地图来实现 获取定位

   3. 封装 request 实现自动携带 token

   4. 注册 极光用户






# tabbar结构

<img src="medias/06-交友.png" alt="06-交友" style="zoom:50%;" />

## 实现步骤

1. 分析
   1. tabbar结构上,存放着四个页面(模块),分别是  **交友,圈子,消息,我的**
2. 用到的组件
   1. react-native-tab-navigator 
   2. react-native-svg-uri







# 完善和优化已有权限和token业务

1. 在 `成功登录` 后
   1. 将用户信息存储到 mobx中
   2. 将用户信息存储到 本地缓存中  `AsyncStorage`
2. 在 `nav` 页面  对用户做权限校验
3. 在 `App` 中 将 本地存储中的用户数据 赋值到 mobx 中
4. 在 `tabbar`页面进行极光登录





# 交友-首页

<img src="medias/06-交友-1591781246221.png" alt="06-交友" style="zoom:50%;" />



## 实现步骤

1. 功能点

   1. 静态布局
   2. 顶部图片吸顶效果 `react-native-image-header-scroll-view`
   3. 访客模块
   4. 今日佳人模块
   5. rn中使用普通的iconfont字体
   6. 筛选功能
   7. 推荐列表

   

## 列表数据和筛选功能

<img src="medias/07-交友-筛选.png" alt="07-交友-筛选" style="zoom:50%;" />

---

1. [用到的接口](http://157.122.54.189:9089/swagger.html#/friends/get_friends_recommendation) 
2. 业务
   1. 获取数据渲染推荐列表
   2. 点击 `筛选` 时  , 使用 teaset的弹出层实现 筛选界面的弹出
   3. 根据需求构造 `筛选界面`的组件功能
   4. 点击 `确认` 时 将筛选的结果返回到父页面,继而加载新的数据









# 探花页面

> 左滑右滑来切换 用户

<img src="medias/image-20200613145433714.png" alt="image-20200613145433714" style="zoom:50%;" />

## 业务

1. 封装顶部tabbar

2. 加载数据实现渲染用户

3. 使用组件实现左滑右滑实现对用户的喜欢和不喜欢

4. 点击不同的按钮实现 对用户的喜欢和不喜欢

5. 用到的接口

   1. [获取需要滑动的数据](http://157.122.54.189:9089/swagger.html#/friends/get_friends_cards)
   2. [喜欢和不喜欢](http://157.122.54.189:9089/swagger.html#/friends/get_friends_like__id___type_)

6. 用到的组件

   1. react-native-deck-swiper




# 搜附近

<img src="medias/10-搜附近.png" alt="10-搜附近" style="zoom:50%;" />

## 业务

1. 实现静态布局
2. 获取附近好友 和 动态渲染附近好友
3. 点击筛选按钮 进行筛选数据
4. 用到的接口
   1. [搜索附近](http://157.122.54.189:9089/swagger.html#/friends/get_friends_search)

## 点击筛选

<img src="medias/11-搜附近-筛选.png" alt="11-搜附近-筛选" style="zoom: 50%;" />





# 测灵魂

<img src="medias/12-测灵魂-初级.png" alt="12-测灵魂-初级" style="zoom:75%;" />

## 业务

1. 实现静态布局
2. 滑动效果也是使用之前的swiper组件来实现的
3. 点击开始测试后 会跳转到下一页 **测试题页面**
4. 接口
   1. [获取 不同级别的测试题目](http://157.122.54.189:9089/swagger.html#/friends/get_friends_questions)



## 开始答卷

<img src="medias/15-测灵魂-题目.png" alt="15-测灵魂-题目" style="zoom:75%;" />

### 业务

1. 将上一个页面的问卷信息 传递到当前页面 (如 标题等)
2. 根据问卷id发送请求 获取问卷题目
3. 点击答案时 收集答案结果
4. 点击最后一道题的答案时 , 将答案数组发送到后台 生成分析结果
5. 将分析结果 传递到下一个页面 - 测灵魂结果页面
6. 用到的接口
   1. [根据题目等级获取问卷试题](http://157.122.54.189:9089/swagger.html#/friends/get_friends_questionSection__id_)
   2. [提交答案](http://157.122.54.189:9089/swagger.html#/friends/post_friends_questionsAns__id_)



## 测试结果

<img src="medias/16-测灵魂-结果.png" alt="16-测灵魂-结果" style="zoom:75%;" />



### 业务

1. 完成数据渲染
2. 点击 `继续测试` 重新进行测试





# 用户详情

<img src="medias/17-用户详情.png" alt="17-用户详情" style="zoom:75%;" />

## 业务

1. 获取数据动态渲染

2. 顶部大图轮播

3. 用户动态图片点击放大

4. 滚动分页加载数据

   1. 对 `HeaderImageScrollView`绑定 `onScroll` 事件
   2. 事件源中获取 一些距离数据
      1. `nativeEvent.contentSize.height`  列表内容的高度
      2. `nativeEvent.layoutMeasurement.height` 可视区域的高度
      3. `nativeEvent.contentOffset.y` 滚动条距离顶部的高度 

5. 点击 `喜欢`  通过极光通讯给当前用户发送一条信息

   1. 建议使用新用户来完成聊天相关的功能操作
   2. 需要在`tabbar`组件中进行极光登录

6. 点击 `聊一下`  跳转到  `聊天页面`

7. 用到的组件

   1. [react-native-image-zoom-viewer](https://www.npmjs.com/package/react-native-image-zoom-viewer)
   2. teaset的carousel 

8. 用到的接口

   1. [获取朋友详情](http://157.122.54.189:9089/swagger.html#/friends/get_friends_personalInfo__id_)

      







# 聊天界面

<img src="medias/18-聊天面板.png" alt="18-聊天面板" style="zoom: 67%;" />





## 业务

1. 显示聊天界面
   1. [aurora-imui-react-native](https://github.com/jpush/aurora-imui/blob/master/README_zh.md)
2. 获取极光历史消息
3. 设置发送者和接受者位置显示
4. 发送文字 (配合极光发送文字)
5. 发送图片(配合极光发送图片)
6. 接收消息显示文字和图片
7. 关键api
   1. `constructNormalMessage` 创建信息体的构造函数
   2. `getHistoryMessage` 获取历史聊天数据
   3. `onSendText` 发送文本消息
   4. `onSendGalleryFiles` 发送图片消息







# 圈子-首页

<img src="medias/19-圈子首页.png" alt="19-圈子首页" style="zoom:50%;" />

## 业务

1. 使用组件 [react-native-scrollable-tab-view](https://www.npmjs.com/package/react-native-scrollable-tab-view) 搭建基本结构
2. 创建 **推荐** 和 **最新** 页面





# 圈子-推荐

<img src="medias/19-圈子首页-1592471107512.png" alt="19-圈子首页" style="zoom:75%;" />

## 业务

1. 获取 `圈子-推荐`数据

2. 使用  `FlatList` 循环显示内容

   1. 使用到 [moment.js](http://momentjs.cn) 日期库 

3. 实现  `分页加载功能`

4. 实现  `点击图片-放大显示` 功能

5. 实现 `点赞` 功能

   1. 同时也需要通过极光发送一条 **点赞消息**

6. 实现 `喜欢` 功能

7. 实现  `不感兴趣` 功能

   <img src="medias/image-20200618202006602.png" alt="image-20200618202006602" style="zoom:50%;" />

8. 实现 `评论` 功能

9. 实现  `跳转到发布页面` 功能

10. 用到的接口

    1. [推荐动态数据](http://api-tanhua-web.itheima.net/swagger.html#/qz/get_qz_recommend)

    2. [点赞-取消点赞](http://api-tanhua-web.itheima.net/swagger.html#/qz/get_qz_star__id_)

    3. [喜欢-取消喜欢](http://api-tanhua-web.itheima.net/swagger.html#/qz/get_qz_like__id_)

    4. [不感兴趣](http://api-tanhua-web.itheima.net/swagger.html#/qz/get_qz_noInterest__id_)

    5. [评论列表](http://api-tanhua-web.itheima.net/swagger.html#/qz/get_qz_comment__id_)

    6. [评论点赞](http://api-tanhua-web.itheima.net/swagger.html#/qz/get_qz_comments_star__id_)

    7. [评论-提交](http://api-tanhua-web.itheima.net/swagger.html#/qz/commentsSubmit)




# 评论列表

<img src="medias/image-20200619104316458.png" alt="image-20200619104316458" style="zoom:67%;" />

## 业务

1. 获取评论列表数据
2. 渲染页面
3. 实现评论点赞
4. 实现发表评论
5. 滚动分页
6. 点击放大图片
7. 用到的接口
   1. [获取评论列表](http://157.122.54.189:9089/swagger.html#/qz/get_qz_comment__id_)
   2. [评论-点赞](http://157.122.54.189:9089/swagger.html#/qz/get_qz_comments_star__id_)
   3. [发布评论](http://157.122.54.189:9089/swagger.html#/qz/commentsSubmit)









# 发布动态

<img src="medias/image-20200620112709815.png" alt="image-20200620112709815" style="zoom:67%;" />

## 业务

1. 完成静态页面

2. 实现输入框功能

3. 实现点击获取当前定位功能

4. 实现选取拍照和选取图片功能

   1. [react-native-image-picker 图片选择工具](https://github.com/react-native-community/react-native-image-picker)

5. 实现输入表情功能

6. 完成发布和返回上一页功能

7. 用到的接口

   1. [发动态](http://157.122.54.189:9089/swagger.html#/qz/trendSubmit)

   2. [图片上传](http://157.122.54.189:9089/swagger.html#/qz/qztrendsimageupload)

      ```js
      headers:{  'Content-type': 'multipart/form-data;charset=utf-8'}
      
      FormData {
      	key:"images",
          value:{
          uri:"file://storage...."
          name:"xxx.png",
          type:"application/octet-stream"
      	}
      }
      ```

      









### 输入表情功能

<img src="medias/image-20200620170736848.png" alt="image-20200620170736848" style="zoom: 67%;" />



# 圈子-最新

<img src="medias/20-圈子-最新.png" alt="20-圈子-最新" style="zoom:75%;" />





# 消息-首页

<img src="medias/image-20200624154713022.png" alt="image-20200624154713022" style="zoom:67%;" />



1. 实现顶部导航栏结构
2. 实现头部 四个菜单结构
3. 分析头部四个菜单的业务逻辑
4. [极光实现获取会话消息](https://github.com/jpush/jmessage-react-plugin/blob/master/document/API.md#getconversations)
5. 点击会话跳转到聊天页面





# 我的-首页

<img src="medias/image-20200624184620176.png" alt="image-20200624184620176" style="zoom:67%;" />

1. 搭建基本结构
2. 获取 `关注 喜欢 粉丝 数量`
3. 点击链接 跳转到不同的页面
4. 下拉刷新统计数据效果
   1. [scrollview](https://reactnative.cn/docs/scrollview#refreshcontrol)
5. 用到的接口
   1. [互相喜欢，喜欢，粉丝 - 统计](http://157.122.54.189:9089/swagger.html#/my/get_my_counts)





# 互相关注-喜欢-粉丝

<img src="medias/image-20200626102741697.png" alt="image-20200626102741697" style="zoom:67%;" />

1. 使用[react-native-scrollable-tab-view](https://www.npmjs.com/package/react-native-scrollable-tab-view)搭建页面结构
2. 发送请求获取数据
3. 用到的接口
   1. [关注-喜欢-粉丝](http://157.122.54.189:9089/swagger.html#/my/get_my_likelist)
   2. 搜索框中输入内容进行筛选过滤
   3. 点击按钮 实现功能





# 我的动态

<img src="medias/image-20200629083851513.png" alt="image-20200629083851513" style="zoom:67%;" />

## 业务

1. 发送请求获取数据
2. 渲染页面
3. 用到的接口
   1. [我的动态](http://157.122.54.189:9089/swagger.html#/my/get_my_trends)







# 谁看过我

<img src="medias/image-20200629090940114.png" alt="image-20200629090940114" style="zoom:67%;" />

## 业务

1. 发送请求获取数据
2. 用到的接口
   1. [最近来访](http://157.122.54.189:9089/swagger.html#/friends/get_friends_visitors)







# 修改个人信息

<img src="medias/image-20200629161218326.png" alt="image-20200629161218326" style="zoom:67%;" />

## 业务

1. 获取数据动态渲染
2. 修改用户信息
3. 用到的接口
   1. [修改信息](http://157.122.54.189:9089/swagger.html#/my/submitUserInfo)





# 通用设置

<img src="medias/image-20200629190751501.png" alt="image-20200629190751501" style="zoom:67%;" />

## 业务

1. 实现静态布局
2. 实现退出登录功能
   1. 清除缓存
   2. 清除mobx中的用户数据
   3. 退出极光登录
   4. 跳转回登录页面









# 

