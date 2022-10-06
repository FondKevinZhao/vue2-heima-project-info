import request from '@/utils/request'

// JSDOC注释, 写代码的时候vscode会给你提示
// 封装工具函数可以用这种注释-必须挨着代码

/**
 * 登录
 * @param {*} data 请求参数
 * @returns Promise对象
 */
export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

/**
 * 获取 - 用户信息
 * @param {*} token token字符串(登录时-由后台返回的)
 * @returns Promise对象
 */
export function getInfo(token) {
  return request({
    url: '/vue-admin-template/user/info',
    method: 'get',
    params: { token }
  })
}

/**
 * 退出登录
 * @returns Promise对象
 */
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
