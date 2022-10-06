import router from './router'
import store from './store'
// 导入进度条插件
import NProgress from 'nprogress'
// 导入进度条样式
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/get-page-title'

// 白名单数组
const whiteList = ['/login', '/404']

// 前置路由守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  // 获取到 token
  const token = store.getters.token

  // 如果存在 token
  if (token) {
    if (to.path === '/login') {
      // 如果存在 token，访问的是登录页面，直接跳转到主页
      next('/')
      NProgress.done()
    } else {
      // 如果存在 token，访问的是其他页面，直接放行
      next()
      if (!store.getters.name) { store.dispatch('user/getUserInfoActions') }
    }
  } else {
    // 如果不存在 token，访问的是白名单内容，直接放行
    if (whiteList.includes(to.path)) {
      next()
    } else {
      // 没有 token，且不是白名单页面，跳转到登录页面
      next('/login')
      NProgress.done()
    }
  }
})

// 后置路由守卫
router.afterEach((to, from) => {
  document.title = getPageTitle(to.meta.title)
  // 隐藏进度条效果
  NProgress.done()
})
