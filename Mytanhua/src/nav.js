/* eslint-disable react-native/no-inline-styles */
// 专门用来存放路由结构
import React from 'react';
import {Button, View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './pages/account/login/index';
import Demo from './pages/demo';
import UserInfo from './pages/account/userInfo';

const Stack = createStackNavigator();

function Nav() {
  return (
    <NavigationContainer>
      {/* 去掉顶部的大标题 */}
      <Stack.Navigator headerMode="none" initialRouteName="UserInfo">
      <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="Demo" component={Demo} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Nav;
