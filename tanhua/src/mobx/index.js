import { observable, action } from "mobx";

/**
 * 这个里面是储存全局数据和全局方法的
 */
class RootStore {
  // 手机号码
  @observable mobile = "";
  // @observable mobile = "15915912346";
  // token
  // @observable token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjgsIm5hbWUiOiIxNTkxNTkxMjM0NiIsImlhdCI6MTU5MTYxODcwOCwiZXhwIjoxNjE3NTM4NzA4fQ._WMeRhIU2XOZe1qG1u106tw2Jz57WuWWLLsPVe1oAAA";
  @observable token = "";
  // 用户的唯一id 
  // @observable userId = "159159123461591515495983";
  @observable userId = "";

  @action setUserInfo(mobile, token, userId) {
    this.mobile = mobile;
    this.token = token;
    this.userId = userId;
  }
  // 清除信息
  @action clearUserInfo() {
    this.mobile = "";
    this.token = "";
    this.userId = "";
  }
}

export default new RootStore();