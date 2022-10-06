/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 验证手机号
 * @param {string} str 账号-手机号
 * @returns {Boolean} 通过校验为true, 否则为false
 */
export function validMobile(str) {
  return /^1[3-9]\d{9}$/.test(str)
}
