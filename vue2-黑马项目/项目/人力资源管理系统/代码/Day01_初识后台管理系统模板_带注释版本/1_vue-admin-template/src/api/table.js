import request from '@/utils/request' // 导入请求函数

/**
 * 获取 - 表格 - 数据列表
 * @param {*} params 参数 
 * @returns Promise对象
 */
export function getList(params) { 
  // 知识点1: axios函数调用, 在原地返回一个Promise对象(内部包裹ajax请求)
  // 知识点2: return后面值, 会返回到当前函数getList调用的地方(可通过放大镜查找)
  // 调用axios指定请求的地址和方式, 发起请求
  return request({ 
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  })
}

