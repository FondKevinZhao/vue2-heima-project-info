/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * 判断是否是外链
 * @param {string} path
 * @returns {Boolean} true是外链, false不是外链
 */
export function isExternal(path) {
  // 匹配https:或者 http:
  // 匹配mailto: (在网页中发送邮件)
  // 匹配tel:
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}
