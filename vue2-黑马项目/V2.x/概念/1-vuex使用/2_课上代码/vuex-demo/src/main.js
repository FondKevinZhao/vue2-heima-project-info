import Vue from 'vue'
import App from './App.vue'
import store from '@/store' // 导入store对象

Vue.config.productionTip = false

new Vue({
  // 6. 注入到Vue实例中(确保组件this.$store使用)
  store,
  render: h => h(App),
}).$mount('#app')
