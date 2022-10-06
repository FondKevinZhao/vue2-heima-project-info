import Vue from 'vue'

import 'normalize.css/normalize.css' // 把浏览器默认的css样式重置掉

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入elementUI组件样式
import locale from 'element-ui/lib/locale/lang/en' // lang i18n - 语言包(对象里key和value->标签里显示内容)
// 语言包-js文件-对象记录了不同语言内的文字内容
// 这些语言包, 只影响element-ui内置的组件内置的值
// 我们在views页面写的内容(固定的不会受到语言包的影响-后面最后一天我教你如何给自己逻辑页面内容做多语言)

import '@/styles/index.scss' // styles文件夹下所有样式

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon -> 执行icon/index.js里代码 (内部无导出, 我只是为了导入这个目标代码, 让它参与到webpack打包最后在浏览器页面上运行而已)
import '@/permission' // 控制路由权限的

if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
// mock(拦截ajax请求, 返回模拟数据)
// 文档: http://mockjs.com/
// 项目分为2种情况
// 后端写好了(有接口)
// 不使用mock, 而是直接ajax->请求后端接口->拿到开发数据铺设页面

// 后端还没写(无接口)
// 细分2种情况
// (1): "没有"和后台沟通好, 返回数据的字段名, 字段数量, 无法使用mock, 先随便编点固定数据
// (2): 页面数量, 模块划分, 字段名字都已经确定了, 我们可以选择使用mock, 来设置模拟数据格式, 将来后台有接口了, 我无需改变前端逻辑代码, 直接替换接口请求即可

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
