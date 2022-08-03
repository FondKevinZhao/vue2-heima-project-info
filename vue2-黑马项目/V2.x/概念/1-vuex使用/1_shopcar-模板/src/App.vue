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
export default {
  components: {
    MyHeader,
    MyGoods,
    MyFooter
  },
  data(){
    return {
      list: [] // 商品数据
    }
  },
  created(){
    this.$axios({
      url: "/api/cart"
    }).then(res => {
      console.log(res);
      this.list = res.data.list
    })
  },
  methods: {
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