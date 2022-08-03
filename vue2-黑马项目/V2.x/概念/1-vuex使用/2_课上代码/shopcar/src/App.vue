<template>
  <div>
    <MyHeader title="购物车案例"></MyHeader>
    <div class="main">
      <MyGoods v-for="obj in list" :key="obj.id"
      :gObj="obj"
      ></MyGoods>
    </div>
    <MyFooter @changeAll="allFn" :arr="list"></MyFooter>
  </div>
</template>

<script>
import MyHeader from './components/MyHeader'
import MyGoods from './components/MyGoods'
import MyFooter from './components/MyFooter'
import { mapState, mapActions } from 'vuex'
export default {
  components: {
    MyHeader,
    MyGoods,
    MyFooter
  },
  computed: {
    // ...mapState({list: 'goodsList'}) // 本地属性名list, 映射vuex里的goodsList变量值
    // 方式1: 直接用
    // list(){ // 这个list就是组件内普通的计算属性名
    //     return this.$store.state.cart.goodsList 
    // }.
    // 方式2: 映射方式改变
    ...mapState({'list': state => state.cart.goodsList})
  },
  created(){
    this.asyncGetGoodsList()
  },
  methods: {
    ...mapActions('cart', ['asyncGetGoodsList']),
    allFn(bool){
      this.list.forEach(obj => obj.goods_state = bool)
    }
  }
}
</script>

<style scoped>
  .main{
    padding-top: 45px;
    padding-bottom: 50px;
  }
</style>