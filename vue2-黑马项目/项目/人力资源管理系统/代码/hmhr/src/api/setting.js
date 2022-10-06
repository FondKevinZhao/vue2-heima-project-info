// 导入axios实例
import request from '@/utils/request'

/**
 * @description 获取所有角色信息
 * @param {*} params  {page, pagesize}
 * @returns
 */
export function getRolesAPI(params) {
  return request({
    url: '/sys/role',
    method: 'GET',
    params: params
  })
}

/**
 * @description 获取公司信息
 * @param {*} companyId
 * @returns
 */
export function getCompanyInfoAPI(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

/**
 * @description: 新增角色
 * @param {*} data {name,description}
 * @return {*}
 */
export function addRoleAPI(data) {
  return request({
    url: '/sys/role',
    method: 'post',
    data
  })
}

/**
 * @description: 获取某一个角色列表
 * @param {*} id
 * @return {*}
 */
export function getRoleIdAPI(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

/**
 * @description: 编辑角色
 * @param {*} data
 * @return {*}
 */
export function updateRoleAPI(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

/**
 * @description: 删除角色
 * @param {*} id 角色id
 * @return {*}
 */
export function deleteRoleAPI(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
