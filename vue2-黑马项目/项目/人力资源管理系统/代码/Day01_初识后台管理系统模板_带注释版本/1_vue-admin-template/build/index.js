// 通过放大镜查找
// 使用位置: package.json里的scripts里的preview命令
const { run } = require('runjs') // 用于把字符串当做终端命令来执行
const chalk = require('chalk') // 在终端输出带颜色的字符串
const config = require('../vue.config.js') // 引入配置对象
const rawArgv = process.argv.slice(2) // node执行js文件携带的额外参数
const args = rawArgv.join(' ') // 把数组用空格拼接成参数完整字符串
// console.log(args); // --preview
// console.log(process.env.npm_config_preview); // undefined
if (process.env.npm_config_preview || rawArgv.includes('--preview')) {
  const report = rawArgv.includes('--report')

  run(`vue-cli-service build ${args}`) // 终端真正执行的命令, 还是脚手架打包命令带参数

  const port = 9526 // 端口号
  const publicPath = config.publicPath // 打包后index.html如何引入其他资源

  var connect = require('connect') // 类似express, 用于创建服务器对象
  var serveStatic = require('serve-static') // 静态资源访问功能
  const app = connect() // 生成服务器对象

  app.use( // 给服务器设置中间件
    publicPath, // 前置虚拟路径, 请求服务器这个路径才命中这里
    serveStatic('./dist', { // 返回dist下一切给浏览器
      index: ['index.html', '/'] // 默认入口是index.html网页
    })
  )

  app.listen(port, function () { // 设置端口启动服务, 启动成功在控制台打印提示话语
    console.log(chalk.green(`> Preview at  http://localhost:${port}${publicPath}`))
    if (report) { // 如果有报告, 也给个浏览地址
      console.log(chalk.green(`> Report at  http://localhost:${port}${publicPath}report.html`))
    }

  })
} else {
  run(`vue-cli-service build ${args}`) // 如果不包含预览功能, 直接就打包输出dist
}
