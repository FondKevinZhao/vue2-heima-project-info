// 使用位置: 此文件在vue.config.js使用(开发环境-模拟数据)
// 核心思想, 接口变化, 会重新注销接口, 然后重新注册

const chokidar = require('chokidar') // 监听文件变化的模块
const bodyParser = require('body-parser') // 解析请求体参数
const chalk = require('chalk') // 控制台带颜色打印
const path = require('path') // 路径处理
const Mock = require('mockjs') // mockjs模拟数据核心包

const mockDir = path.join(process.cwd(), 'mock') // 当前执行node命令时候的文件夹地址, 拼接到mock文件夹 -> 返回mock文件夹地址

// 注册路由
function registerRoutes(app) {
  let mockLastIndex
  const { mocks } = require('./index.js') // 引入mocks接口(user和table里)
  const mocksForServer = mocks.map(route => { // route是user/table里模拟接口对象
    return responseFake(route.url, route.type, route.response) // 传入url请求方式和封装的返回数据的方法, 处理下, 然后返回接口对象
  })
  for (const mock of mocksForServer) {
    app[mock.type](mock.url, mock.response) // 给服务器对象绑定接口类似app.get('地址', 执行函数里面返回数据)
    mockLastIndex = app._router.stack.length // 路由接口的长度
  }
  const mockRoutesLength = Object.keys(mocksForServer).length // 统计接口长度
  return {
    mockRoutesLength: mockRoutesLength, // 返回接口长度
    mockStartIndex: mockLastIndex - mockRoutesLength // 返回接口开始位置
  }
}

// 注销路由
function unregisterRoutes() {
  // require.cache: 模块在需要时缓存在此对象中。 通过从此对象中删除键值，下一次 require 将重新加载模块
  Object.keys(require.cache).forEach(i => {
    if (i.includes(mockDir)) { // 如果之前从user.js/table.js引入过
      delete require.cache[require.resolve(i)] // 删除缓存, 重新引入对应的js
    }
  })
}

// for mock server->返回伪造的响应
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${process.env.VUE_APP_BASE_API}${url}`), // 返回拼接前置基地址
    type: type || 'get',
    response(req, res) {
      console.log('request invoke:' + req.path)
      res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond)) // 返回json字符串数据
    }
  }
}

module.exports = app => {
  // parse app.body
  // https://expressjs.com/en/4x/api.html#req.body
  app.use(bodyParser.json()) // 解析body体里json字符串转对象注入到req.body里
  app.use(bodyParser.urlencoded({ // 解析body体里key=value查询字符串注入到req.body里
    extended: true
  }))

  const mockRoutes = registerRoutes(app) // 注册路由
  var mockRoutesLength = mockRoutes.mockRoutesLength
  var mockStartIndex = mockRoutes.mockStartIndex

  // watch files, hot reload mock server
  chokidar.watch(mockDir, { // 监听文件夹里文件变化
    ignored: /mock-server/, // 忽略mock-server自己
    ignoreInitial: true // 匹配路由发出更新事件 change/add
  }).on('all', (event, path) => { // 所有文件监听后
    if (event === 'change' || event === 'add') {
      try { // 如果上面文件发生变化/新增, 则移除现有所有接口
        // remove mock routes stack
        app._router.stack.splice(mockStartIndex, mockRoutesLength)

        // clear routes cache - 先清除所有接口
        unregisterRoutes()

        const mockRoutes = registerRoutes(app) // 重新注册接口
        mockRoutesLength = mockRoutes.mockRoutesLength
        mockStartIndex = mockRoutes.mockStartIndex

        console.log(chalk.magentaBright(`\n > Mock Server hot reload success! changed  ${path}`))
      } catch (error) {
        console.log(chalk.redBright(error))
      }
    }
  })
}
