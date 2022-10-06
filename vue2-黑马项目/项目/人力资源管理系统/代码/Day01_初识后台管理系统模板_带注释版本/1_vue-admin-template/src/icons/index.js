import Vue from 'vue' // 引入Vue
import SvgIcon from '@/components/SvgIcon'// 用div/svg+use, 来渲染图标组件

// 全局注册svg-icon组件
Vue.component('svg-icon', SvgIcon)

// 特别难(了解)-不用硬读
// require: commonJS规范里引入的语法
// require.context() 自动导入文件夹下的一切方法
// require.context('./svg', false, /\.svg$/) 导入svg文件夹下的所有以.svg结尾的文件->代码环境中
// false代表如果里面有子目录, 不管
const req = require.context('./svg', false, /\.svg$/)
// 返回了一个函数->webpackContext
// 知识点1: 函数(方法)也是对象可以点属性和方法
// 知识点2: map里可以直接写function也可以放一个变量(函数体)
const requireAll = requireContext => {
  console.log(requireContext.keys()) // ['./dashboard.svg', './example.svg', './eye-open.svg', './eye.svg', './form.svg', './link.svg', './nested.svg', './password.svg', './table.svg', './tree.svg', './user.svg']
  // requireContext.keys().map() -> 遍历每个svg文件的路径
  // 函数式编程: 把一个回调函数体, 直接放到map里执行了->req函数webpackContext
  return requireContext.keys().map(requireContext) // 遍历的同时,用req函数内webpack的require引入svg文件到项目工程里
}
requireAll(req)


// 这块代码意思可以看这里: https://juejin.cn/post/6844903517564436493#heading-9
