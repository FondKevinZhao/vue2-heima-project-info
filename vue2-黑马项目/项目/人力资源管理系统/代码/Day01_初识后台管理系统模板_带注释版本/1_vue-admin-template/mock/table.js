const Mock = require('mockjs')

const data = Mock.mock({ // 返回模拟数据对象的格式
  'items|30': [{ // 字段叫items, 值要30个, 值为对象
    id: '@id', // @id代表随机id, 不是id字符, 所以@必须加
    title: '@sentence(10, 20)', // sentence句子, 返回10-20个字符的随机一句话
    'status|1': ['published', 'draft', 'deleted'], // status字段返回1个值, 数组随机取一个
    author: 'name', // 作者都是'name'字符串, 这个具体字符
    display_time: '@datetime', // 随机日期
    pageviews: '@integer(300, 5000)' // 随机证书300到5000
  }]
})
// data已经是返回的真实的模拟数据了

module.exports = [
  {
    url: '/vue-admin-template/table/list', // 监听url(准备拦截它)
    type: 'get', // 请求方式
    response: config => { // 返回响应数据
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items // 返回全部模拟数据
        }
      }
    }
  }
]
