import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例(service里面带前缀基地址和超时时间)
const service = axios.create({
  // 知识点1: nodejs+webpack下的环境变量
  // process.env -> nodejs环境下的内置全局变量(任意处使用)
  // 效果: 获取敲击命令, 执行时的 "环境变量"
  // yarn dev(开发环境启动)-> process.env上会被nodejs+webpack挂载.env.development文件里的变量值到这里
  // yarn build:prod(打包准备放入生产环境) -> process.env上会被挂载.env.production文件里的变量值到这里
  // 作用: 根据敲击的命令, 自动加载对应不同的环境变量, 开发时是一个基地址, 上线时是一个基地址
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // 网络请求5秒后还没得到响应, 则判定超时, 报错
})

// 请求拦截器
service.interceptors.request.use(
  config => { // 发送请求之前, 对配置对象最后修改
    if (store.getters.token) { // 如果有token, 携带上
      config.headers['X-Token'] = getToken() // key叫X-Token, value是token(带在请求头里)
    }
    return config
  },
  error => { // 请求之前报错执行这里
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => { // 响应成功2xx, 3xx
    const res = response.data // 提取响应数据

    // http状态虽然正确, 但是逻辑错误在code中表示(20000成功, 不是20000则失败)
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 其他错误码的判断, 给出提示
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => { // 用户点击确认, 清除vuex的token
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => { // 响应状态码4xx, 5xx进入这里
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
