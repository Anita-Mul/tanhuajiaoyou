import axios from "axios";
//导出路径 BASE_URI 是接口基地址
import { BASE_URI } from "./pathMap";
import Toast from "./Toast";
//引入mobx
import RootStore from "../mobx";

/**
 * 这个是向后台发送request请求的
 */
const instance = axios.create({
  //设置接口基地址
  baseURL: BASE_URI
})
 
// 添加请求拦截器
// 意思就是一向后台请求数据，就显示那个转圈圈
instance.interceptors.request.use(function (config) {
  Toast.showLoading("请求中");
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 停止那个转圈圈
  // 只返回response里面的data数据就可以了，剩下的都没有用
  Toast.hideLoading();
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});
export default {
  /**
   * 如果要用的时候: request.post(ACCOUNT_LOGIN, {phone: phoneNumber})
   */
  get: instance.get,
  post: instance.post,
  /**
   * 把下面的post代码改了一下
   */
  privateGet: (url, data = {}, options = {}) => {
    const token = RootStore.token;
    const headers = options.headers || {};
    return instance.get(url, {
      ...options,
      params:data,
      headers: {
        "Authorization": `Bearer ${token}`,
        ...headers
      }
    })
  },

  // post 自动带上token token是用户唯一的编号，在全局变量mobx中
  // 之后如果携带token都可以携带这个方法
  // return request.privatePost(ACCOUNT_CHECKHEADIMAGE, formData, {
  //   headers: {
  //     "Content-Type": "multipart/form-data"
  //     // 后面的东西写到了request.js的代码中
  //   }
  // })
  privatePost: (url, data = {}, options = {}) => {
    const token = RootStore.token;
    const headers = options.headers || {};
    return instance.post(url, data, {
      // 万一optinon有另外的配置，就放在这里喽
      ...options,
      headers: {
        "Authorization": `Bearer ${token}`,
        ...headers
      }
    })
  }
}