import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
// 一级页面引入
import UIRouter from '@/views/UIRouter'
import Contacts from '@/views/Contacts'
import About from '@/views/About'
// 二级页面引入
import AllContacts from '@/views/Second/AllContacts'
import Alice from '@/views/Second/Alice'
import Bob from '@/views/Second/Bob'
// 三级页面引入
import Blog from '@/views/Third/Blog'
import Fix from '@/views/Third/Fix'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/ui_router'
  },
  {
    path: '/ui_router',
    component: UIRouter
  },
  {
    path: '/contacts',
    component: Contacts,
    redirect: '/contacts/all_contacts',
    children: [
      {
        path: 'all_contacts',
        component: AllContacts
      },
      {
        path: 'alice',
        component: Alice
      },
      {
        path: 'bob',
        component: Bob,
        redirect: '/contacts/bob/blog',
        // 三级路由规则
        children: [ 
          {
            path: 'blog',
            component: Blog
          },
          {
            path: 'fix',
            component: Fix
          }
        ]
      }
    ]
  },
  {
    path: '/about',
    component: About
  }
]
const router = new VueRouter({
  routes
})
Vue.config.productionTip = false



// 目标: 三级路由嵌套
// 一. 先完成一级路由切换
// 1. 3个一级页面.vue文件和内容
// 2. 使用vue-router的7步
// 3. 一级路由 - 声明式导航

// 二. 二级路由切换
// 1. 3个二级页面.vue文件和内容
// 2. 在哪个1级路由配置下写children -> 组件关系对应好
// 3. 在哪个1级路由页面中, router-view二级挂载点
// 4. 二级路由 - 声明式导航

// 三. 三级路由切换
// 1. 2个三级页面.vue文件和内容
// 2. 在上级路由配置下写children -> 路由路径和组件映射关系
// 3. 在那个2级页面中, router-view挂载三级页面
// 4. 三级路由 = 声明式导航

// 随机显示按钮切换路由功能

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
