import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token' // 存储token用的key名

export function getToken() { // 获取token方法-从Cookie里
  return Cookies.get(TokenKey)
}

export function setToken(token) { // 设置token方法
  return Cookies.set(TokenKey, token)
}

export function removeToken() { // 删除token的方法
  return Cookies.remove(TokenKey)
}
