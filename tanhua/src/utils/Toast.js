import React from "react";
import { ActivityIndicator } from "react-native";
import {Toast,Theme  } from "teaset";

/**
 * 啊哈！这里就是那个转圈圈的地方了
 */
let customKey = null;

// 显示转圈圈
Toast.showLoading=(text)=> {
  if (customKey) return;
  customKey = Toast.show({
    // 转圈圈里面的文本
    text,
    // ActivityIndicator 就是那个转圈圈的
    icon: <ActivityIndicator size='large' color={Theme.toastIconTintColor} />,
    position: 'center',
    duration: 100000,
  });
}

// 隐藏转圈圈
Toast.hideLoading=()=> {
  if (!customKey) return;
  Toast.hide(customKey);
  customKey = null;
}

export default Toast;

// ————————————————————————————————————————————————————————————————————————
// 在index.js中的代码
// constructor() {
//   super();
//   // 在react-native中想要看到一些弹窗提示，把调试关掉ctrl + m
//   // 后面一个是弹窗显示时长
//   Toast.message('Taooo', 10000);
// }
//Toast.message("验证码不正确",2000,"center");