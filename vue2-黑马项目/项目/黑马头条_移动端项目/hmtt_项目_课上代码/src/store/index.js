import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    userPhoto: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.bq233.com%2Fkanqq%2Fpic%2Fupload%2F2018%2F0807%2F1533622762937587.jpg&refer=http%3A%2F%2Fimg.bq233.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641525704&t=153cb0981835604e6e59e4009251aedd' // 头像地址(默认值)
  },
  mutations: {
    // 编码风格, mutations最好大写(区分)
    SET_USERPHOTO (state, value) {
      state.userPhoto = value
    }
  },
  actions: {
  },
  modules: {
  }
})
