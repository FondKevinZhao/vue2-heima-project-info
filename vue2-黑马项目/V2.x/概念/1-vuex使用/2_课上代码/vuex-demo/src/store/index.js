// 目标: 创建store仓库对象
// 1. 下载vuex: 终端命令(yarn add vuex)
// 2. 引入vuex
import Vue from 'vue'
import Vuex from 'vuex'
// 3. 注册
Vue.use(Vuex)
// 4. 实例化store对象
const store = new Vuex.Store({
    state: {
        count: 100 // 库存
    },
    mutations: {
		addCount (state, value) { // 负责增加库存的管家
			state.count += value
		},
        subCount (state, value) { // 负责减少库存的管家
            state.count -= value
        },
        setCount (state, value) { // 负责直接修改库存的管家
            state.count = value;
        }
	},
    actions: {
        asyncAddCount(store, num){
            setTimeout(() => { // 1秒后, 异步提交给add的mutations
                store.commit('addCount', num)
            }, 1000)
        },
        asyncSubCount(store, num) {
            setTimeout(() => { // 1秒后, 异步提交给sub的mutations
                store.commit('subCount', num)
            }, 1000)
        }
    }
})
// 5. 导出store对象
export default store
