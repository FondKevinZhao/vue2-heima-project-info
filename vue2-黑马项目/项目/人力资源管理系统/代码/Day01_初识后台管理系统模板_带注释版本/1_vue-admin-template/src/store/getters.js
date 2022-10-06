// 此文件可以让逻辑页面直接从getters里取值(根getters不用关心模块名)
// 逻辑页面不需要自己一点点的从state里取值
// 知识点1: 当箭头函数, 函数体"只有一段代码"而且"默认把值返回"可以同时省略大括号和return
const getters = {
  // sidebar(state) {
  //   return state.app.sidebar
  // },
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters

// function和箭头函数, 要看this的指向
// 如果你非要让this指向调用者, 必须用function
// 知识点2:
// function函数里this关键字变量值, 指向调用者
// 箭头函数里this关键字值, 指向外层函数作用域this的值
// 旭哥博客: https://lidongxuwork.gitee.io/pages/webFront/javascript/run/this%E6%8C%87%E5%90%91.html#this%E5%85%B3%E9%94%AE%E5%AD%97

// 本地存储3种方式区别?
// https://blog.csdn.net/shenxianhui1995/article/details/93010158
