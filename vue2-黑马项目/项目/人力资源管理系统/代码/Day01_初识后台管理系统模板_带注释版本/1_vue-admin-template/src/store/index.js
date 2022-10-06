import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

// store是唯一的一个数据仓库(管家)
// 复习知识点1: store里包含5大核心配置项(概念) - 定义
// state -> 定义变量
// mutations -> 定义方法(形参1是state, 唯一可以修改state值的地方) -> devTool工具检测到
// actions -> 定义方法(形参1是store, 异步操作来修改state, 但是也要提交到mutations)
// getters -> vuex里计算属性 -> 计算返回值
// modules -> 集中式管理太多, 可以分散到多个模块分别管理(但是最后都要挂载到根store上)

// 知识点2: 每个moudles对象里还是包含这5个核心概念, 还能继续嵌套管理

// 知识点3: vuex里的东西, 如何在vue组件页面/js文件里进行使用
// 类1: 根store里的(不分模块的时候)
// 直接使用
// 映射使用

// 类2: 分模块(不开命名空间)
// 注意: 只影响state的取值方式
// mutations和actions和getters还像以前一样使用

// 类3: 分模块(开命名空间)
// 使用时, 要带模块名(命名空间名)

const store = new Vuex.Store({
  modules: { // vuex分模块: key模块名, value模块配置对象
    app, // 侧边栏对象, 设备型号
    settings, // 侧边栏有logo? 头部是否固定定位
    user // token, name, 等用户信息
  },
  getters // 根上的(方便逻辑页面直接访问, getters内部帮我去映射每个模块里state)
})

export default store
