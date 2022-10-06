import request from '@/utils/request'

/**
 * 用户 - 登录
 * @param {*} param0
 * @returns
 */
export function loginAPI(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

/**
 * 用户 - 获取用户资料
 * @description: 获取用户资料
 * @param {*}
 * @return {*}
 */
export function getUserProfileAPI() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}

/**
 * 用户 - 获取头像
 * @description: 获取用户头像
 * @param {*} id 用户id
 * @return {*}
 */
export function getUserPhotoAPI(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
