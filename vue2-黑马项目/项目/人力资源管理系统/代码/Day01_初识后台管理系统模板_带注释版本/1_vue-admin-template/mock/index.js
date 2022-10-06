// 使用位置: 此文件在main.js使用(上线环境触发)
const Mock = require('mockjs') // 此包能实现mockjs相关功能
const { param2Obj } = require('./utils') // 引入参数转对象方法

const user = require('./user') // 引入user相关模拟数据对象
const table = require('./table') // 引入table相关模拟数据对象

const mocks = [ // 把user和table导出的数组里的对象合并到mocks数组里
  ...user,
  ...table
]

function mockXHR() {
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send // 把send方法赋予给proxy_send代理发送的方法
  Mock.XHR.prototype.send = function() { // 设置send请求的过程
    if (this.custom.xhr) { // 如果支持xhr
      this.custom.xhr.withCredentials = this.withCredentials || false // 跨域请求是否携带cookie(ajax在发起请求默认会带着浏览器里的cookie, 如果跨域请设置此字段为true才会带cookie)

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType // 接收响应数据的类型
      }
    }
    this.proxy_send(...arguments) // 发送请求
  }

  function XHR2ExpressReqWrap(respond) { // xhr2版本方法
    // respond对应user/table导出的对象的response方法体
    return function(options) {
      let result = null
      if (respond instanceof Function) { // 如果传入的是方法
        const { body, type, url } = options // 提取请求参数
        // https://expressjs.com/en/4x/api.html#req
        result = respond({ // 调用user/table里response方法拿到返回值
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        })
      } else {
        result = respond // 如果respond不是方法, 判定为结果
      }
      return Mock.mock(result) // 返回数据(Mock.mock返回的数据和result一样)
    }
  }

  for (const i of mocks) { // 遍历每个mock, 使用Mock.mock()注册每个接口和数据模板
    // 参数1: 要拦截的url地址, 参数2: 拦截的方式(不传默认get), 参数3: 自己实现返回数据过程
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
  }
}

module.exports = {
  mocks,
  mockXHR
}

