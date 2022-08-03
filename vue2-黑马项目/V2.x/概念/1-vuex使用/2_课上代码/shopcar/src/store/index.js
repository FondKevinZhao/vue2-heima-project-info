import Vue from 'vue'
import Vuex from 'vuex'
import cartModule from './modules/cart'
import userModule from './modules/user'
Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        user: userModule,
        cart: cartModule
    }
})
export default store