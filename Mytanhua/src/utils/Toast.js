import React from 'react';
import {ActivityIndicator} from 'react-native';
import {Toast, Theme} from 'teaset';

let customKey = null;

Toast.showLoading = (text) => {
  if (customKey) {
    return;
  }
  customKey = Toast.show({
    text,
    //一个菊花样式的等待
    icon: <ActivityIndicator size="large" color="white" />,
    //显示的位置
    position: 'center',
    //显示的时长
    duration: 10000,
  });
};

Toast.hideLoading = () => {
  if (!customKey) {
    return;
  }
  Toast.hide(customKey);
  customKey = null;
};

export default Toast;

// ————————————————————————————————————————————————————————————————————————
// 在index.js中的代码
// constructor() {
//   super();
//   // 在react-native中想要看到一些弹窗提示，把调试关掉ctrl + m
//   // 后面一个是弹窗显示时长
//   Toast.message('Taooo', 10000);
// }
