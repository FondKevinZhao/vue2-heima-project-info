import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    // 知识点: js文件中能否使用this.$store?
    // 不能, 因为这个this关键字不是Vue组件对象, 无法查找原型链上$store
    // 但是this.$store为了拿到的是store/index.js导出store对象
    // 解决: 我们直接把store对象导入过来使用, 是同一个store对象
    const token = store.getters.token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const { success, message } = response.data
    if (success) {
      return response.data
    } else {
      Message.error(message) // http状态码2xx, 但是逻辑错误
      return Promise.reject(new Error(message)) // 返回Promise错误的对象, 等同reject() -> 自己根据success字段判断逻辑错误(账号密码错误)
    }
  },
  error => {
    Message.error(error.response.data.message)
    if (error.response && error.response.data && error.response.data.code === 10002) {
      store.commit('user/REMOVE_TOKEN')
      store.commit('user/RESET_STATE')
      router.replace(`/login?redirect=${encodeURIComponent(router.currentRoute.fullPath)}`)
    }
    return Promise.reject(error)
  }
)

export default service
