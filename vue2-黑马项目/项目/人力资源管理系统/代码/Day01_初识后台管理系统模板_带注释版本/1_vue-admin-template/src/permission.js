import router from './router' // 我们自己new的router路由对象(相当于this.$router)
import store from './store' // new出来store对象(相当于this.$store)
import { Message } from 'element-ui' // 消息顶部提示框
import NProgress from 'nprogress' // 进度条(浏览器顶部-路由切换的时候显示)
// 知识点1: 如果想看包的作用, 最好就是去npmjs.com网站
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title' // 设置浏览器标题的处理函数

NProgress.configure({ showSpinner: false }) // 右侧的进度环
// 知识点2: 分析代码思路
// (1): 先找官方文档, 读一读
// (2): 在自己改改试一试, 分析分析, 改改, 打印打印....
// (3): 百度/问别人
// (4): 先放放, 不影响核心逻辑, 最后联想上下文(变量在哪里用过-在当前页面搜索/放大镜全局搜索), 再猜

const whiteList = ['/login'] // 白名单(无token能够看到的页面路由路径)

// 全局路由-前置守卫
router.beforeEach(async(to, from, next) => {
  // to: 要去的下一个路由页面的 路由对象(路由规则数组里)
  // 开启进度条(针对路由切换页面有进度条, ajax请求无进度条)
  NProgress.start()

  // 知识点: 给浏览器上面标签栏上的标题设置文字(类似index.html中title标签作用)
  // title标签静态的, document.title可以在js代码运行时候动态修改
  // to.meta.title, 拿到router/index.js里路由规则对象中提前存放的标题文字
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) { // 有token(已登录)
    if (to.path === '/login') { // 已登录了还想去跳到登录页
      next({ path: '/' }) // 重新强制给你打回到首页
      NProgress.done() // 进度条关闭
    } else { // 已登录不去登录页(正常页面)
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) { // 有用户信息->放行
        next() // 这个才是放行->让路由页面跳转
      } else {
        try {
          // 已登录(有token), 但是无用户信息, 调用actions里请求拿到用户名字等
          // 添加到vuex里
          await store.dispatch('user/getInfo')
          // 等待网络请求成功, 放行到下一个正文页面

          next()
        } catch (error) {
          // 比如token过期, 上面await后请求就报错
          // remove token and go to login page to re-login
          // 重置token(删除)
          await store.dispatch('user/resetToken')
          // 给用户一个提示框
          Message.error(error || 'Has Error')
          // 打回到登录页面(token过期, 回去重新登录)
          // 给登录页面进行路由跳转传参(把本来要去的页面to.path地址传给登录页面)
          // 登录后不会去首页, 而是去到刚才没过去的那个未遂的页面上
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else { // 无token
    if (whiteList.indexOf(to.path) !== -1) { // 在白名单里(例如:登录/login), 放行
      // includes()判断存在返回true
      // indexOf()查找下标
      next()
    } else {
      // 无token(没登录), 还想去正常的页面, 打回到登录页面来
      // 知识点: next()里有路径, 就会再次发生一次路由跳转, 路由守卫会从头再重新执行一遍
      // 点击登录, 如果有redierct跳转到未遂地址(回到刚才页面)
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
// 先读, 后仿写, 写多了, 自己拿到需求根据目标再写

// 全局路由-后置守卫(路由跳转完成, 再触发()里函数体)
router.afterEach(() => {
  // 进度条关闭
  NProgress.done()
})

// 心理准备: 拿到一个半截项目 1天-1个月你会非常痛苦
// 挺过来, 看看. 熟悉了, 就非常轻松....
