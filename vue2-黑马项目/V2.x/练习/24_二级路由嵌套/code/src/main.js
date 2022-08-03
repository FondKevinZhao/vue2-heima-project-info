import Vue from 'vue'
import App from './App.vue'
import Home from '@/views/Home'
import Category from '@/views/Category'
import Order from '@/views/Order'
import My from '@/views/My'
import VueRouter from 'vue-router'
import SportHome from '@/views/Second/SportHome'
import MySport from '@/views/Second/MySport'
import YouSport from '@/views/Second/YouSport'
Vue.use(VueRouter) // 注册全局组件RouterLink, RouterView
const routes = [
  {
    path: '/', // 网页打开默认路由路径是"/"
    redirect: '/home' // 强制修改url上路径路径为/home
  },
  {
    path: '/home',
    component: Home,
    redirect: "/home/sport_home",
    children: [
      {
        path: 'sport_home',
        component: SportHome
      },
      {
        path: 'my_sport',
        component: MySport
      },
      {
        path: 'you_sport',
        component: YouSport
      }
    ]
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


// 目标: 二级路由切换
// 1. 创建二级路由.vue文件页面
// 2. 路由规则里配置children ->重点: 在哪个上级路由下
// 3. 配置二级路由挂载点router-view ->重点: 上级路由页面.vue文件中
// 4. Home.vue中, 配置二级路由声明式导航链接
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
