import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'
// import Layout from '@/views/Layout'
// import Home from '@/views/Home'
// import User from '@/views/User'
// import Search from '@/views/Search'
// import SearchResult from '@/views/Search/SearchResult'
// import ArticleDetail from '@/views/ArticleDetail'
// import UserEdit from '@/views/User/UserEdit'
// import Chat from '@/views/Chat'
import { getToken } from '@/utils/token.js'

// 总结:
// 路由懒加载: 为了让第一个页面, 加载的app.js小一点, 打开网页快一点
// 思路: 把组件对应js, 分成若干个.js, 路由切换到哪个页面, 才去加载对应的.js文件
// 原因: webpack分析入口时, 发现router里上来就import所有页面, 所以直接打包进app.js->很大
// 解决: 当路由路径匹配规则时, 才现去import引入对应的组件js文件
// webpackChunName注释语法, 给生成的js文件起名字
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home' // 默认显示layout和layout下首页
  },
  {
    path: '/login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/Login'),
    // 路由独享守卫
    beforeEnter (to, from, next) {
      if (getToken()?.length > 0) {
        // next(false)
        // 问题: 你手动修改url路由路径, next(false)会给你跳转回form页面
        // 产生一次历史记录, 导致你的返回按钮, $router.back()失效
        // 返回登录页, 回不去

        // 解决:
        // 1. 想要进登录页不留在原地了, 而是返回首页
        next('/layout/home')
        // 2. 移动端App也没有地址栏, 不必特别纠结返回按钮
      } else {
        next() // 其他情况通通放行
      }
    }
  },
  {
    path: '/layout',
    component: () => import(/* webpackChunkName: "Layout" */ '@/views/Layout'),
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "Home" */ '@/views/Home'),
        meta: {
          scrollT: 0 // 保存首页离开时, 滚动条位置
        }
      },
      {
        path: 'user',
        component: () => import(/* webpackChunkName: "User" */ '@/views/User')
      }
    ]
  },
  {
    path: '/search',
    component: () => import(/* webpackChunkName: "Search" */ '@/views/Search')
  },
  { // 搜索结果页
    path: '/search_result/:kw',
    component: () => import(/* webpackChunkName: "SearchResult" */ '@/views/Search/SearchResult')
  },
  { // 文章详情页
    path: '/detail',
    component: () => import(/* webpackChunkName: "Detail" */ '@/views/ArticleDetail')
  },
  { // 用户编辑页面
    path: '/user_edit',
    component: () => import(/* webpackChunkName: "UserEdit" */ '@/views/User/UserEdit')
  },
  {
    // 聊天页面
    path: '/chat',
    component: () => import(/* webpackChunkName: "Chat" */ '@/views/Chat')
  }
]

const router = new VueRouter({
  routes
})

// 路由 - 全局前置守卫(在路由发生真正跳转之前, 执行此函数)
// 此函数可以决定路由是否跳转/取消/强制中断切换到别的路由
// router.beforeEach((to, from, next) => {
//   // 需求: 如果你已经登录了, 不要切换到登录页面
//   if (getToken()?.length > 0 && to.path === '/login') {
//     // 想要进登录页不留在原地了, 而是返回首页
//     next('/layout/home')
//   } else {
//     next() // 其他情况通通放行
//   }
// })

export default router
