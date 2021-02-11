/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
/**如何关闭所有的黄色警示框 */
console.ignoredYellowBox = [
  'Warning: BackAndroid is deprecated. Please use BackHandler instead.',
  'source.uri should not be an empty string',
  'Invalid props.style key',
];
console.disableYellowBox = true; // 关闭全部黄色警告

AppRegistry.registerComponent(appName, () => App);
