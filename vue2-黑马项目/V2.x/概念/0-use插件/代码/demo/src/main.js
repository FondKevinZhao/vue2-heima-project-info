import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from '@/utils/request'

const obj = {
  install (Vue) {
    Vue.filter('count', val => {
      return val * 2
    })
  }
}

Vue.use(obj)
// 总结: Vue.use() 给Vue插件注册, 执行传入对象的install方法-在方法内执行一些配置代码
// 问题: 为何axios不能写成Vue.use(axios)
// 练习: 请基于axios, 封装一个插件, 让它可以用Vue.use
Vue.use(request)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
