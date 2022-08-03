import Vue from 'vue'
import App from './App.vue'
import Home from '@/views/Home'
import Category from '@/views/Category'
import Order from '@/views/Order'
import My from '@/views/My'
import VueRouter from 'vue-router'
Vue.use(VueRouter) // 注册全局组件RouterLink, RouterView
const routes = [
  {
    path: '/', // 网页打开默认路由路径是"/"
    redierct: '/home' // 强制修改url上路径路径为/home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/my',
    component: My
  }
]
const router = new VueRouter({
  routes
})

Vue.config.productionTip = false


// 目标: 一级路由切换
// 1. 准备4个.vue文件 - 4个页面
// 2. 开始使用vue-router
// (1): 下载vue-router (yarn add vue-router / npm i vue-router)
// (2): main.js中, 引入VueRouter函数对象
// (3): Vue.use(VueRouter) 注册全局2个组件 - RouterLink / RouterView
// (4): 定义规则数组
// (5): 生成路由对象
// (6): 在 new Vue中传入路由对象
// (7): 设置router-view, 用于显示切换组件
// 3. App.vue里设置声明式导航
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
