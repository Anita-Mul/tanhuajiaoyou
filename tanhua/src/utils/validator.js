export default {
  /**
   * 校验手机号码（正则表达式）
   * @param {Number} phone 
   */
  validatePhone(phone) {
    const reg = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    return reg.test(phone)
  },
  /**
   * 匹配富文本
   * @param {String} text 富文本内容
   */
  renderRichText(text) {
    //  声明最终要拿到的数组
    const finalList = [];
    //  定义一下正则
    const rule = /(\/\{.+?\})/g;
    // 匹配后的图片字符的数组
    // ["/{fadai}", "/{fanu}", "/{aoman}"]
    const emoArr = text.match(rule);
    if (emoArr === null) {
      finalList.push({ text: text });
    } else {
      // "广东人以后￥￥搞笑￥￥￥￥吃饭"
      // ["广东人以后","","搞笑","","","吃饭"]
      //  ["/{fadai}", "/{fanu}", "/{aoman}"]
      const textArr = text.replace(rule, "￥￥").split("￥￥");//["广东人以后","","搞笑","","","吃饭"]
      while (textArr.length) {
        finalList.push({ text: textArr.shift() });
        if (emoArr.length) {
          finalList.push({ image: emoArr.shift() });
        }
      }
    }
    return finalList;
  }
}

// 应该这样使用
// 导出的是一个对象，里面都是对象的属性
// import validator from '...';
// validator.validatePhone();