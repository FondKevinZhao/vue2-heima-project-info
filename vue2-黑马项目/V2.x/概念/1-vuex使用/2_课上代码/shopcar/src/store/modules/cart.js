// 购物车模块
import axios from 'axios'
const cartModule = {
    namespaced: true,
    state() {
        return {
            goodsList: []
        }
    },
    mutations: {
        setGoodsList(state, newList) {
            state.goodsList = newList
        }
    },
    actions: {
        async asyncGetGoodsList(store) {
            const url = `https://www.escook.cn/api/cart`
            // 发送异步请求
            const res = await axios({ url: url });
            store.commit('setGoodsList', res.data.list) // 提交mutation修改state中的数据
        }
    },
    getters: {
        allCount(state) {
            return state.goodsList.reduce((sum, obj) => {
                if (obj.goods_state === true) { // 选中商品才累加数量
                    sum += obj.goods_count;
                }
                return sum;
            }, 0)
        },
        allPrice(state) {
            return state.goodsList.reduce((sum, obj) => {
                if (obj.goods_state) {
                    sum += obj.goods_count * obj.goods_price
                }
                return sum;
            }, 0)
        }
    }
}
export default cartModule