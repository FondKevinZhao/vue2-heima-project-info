<template>
  <div>
    <div>
      <p>商品清单如下: </p>
      <ul>
        <li v-for="(obj, index) in goodsList"
        :key="index">
         {{ obj.shopName }} {{ obj.price }} / 份
        </li>
      </ul>
    </div>

    <div>
      <p>请选择要购买的商品: </p>
      <Food v-for="(obj, index) in goodsList"
      :key="index"
      :ind="index"
      :gName="obj.shopName"
      :gCount="obj.count"
      @addEvent="addEFn"
      @subEvent="subEFn"
      ></Food>
    </div>

    <div>
      <br>
      总价为: {{ allPrice }}
    </div>
  </div>
</template>

<script>
// 目标: 买好吃的
// 1. 准备数据, 从md里复制过来
// 2. 铺设li展示商品
// 3. 准备Food.vue组件
// 4. 在App.vue里引入使用组件
// 5. 循环使用组件, 分发内容展示
// 6. +号事件和相应的逻辑
// 7. -号事件和相应的逻辑
// 8. 计算属性, 统计当前总价
import Food from './components/Food'
export default {
  data() {
    return {
      goodsList: [
        {
          shopName: "可比克薯片",
          price: 5.5,
          count: 0,
        },
        {
          shopName: "草莓酱",
          price: 3.5,
          count: 0,
        },
        {
          shopName: "红烧肉",
          price: 55,
          count: 0,
        },
        {
          shopName: "方便面",
          price: 12,
          count: 0,
        },
      ],
    };
  },
  computed: {
    allPrice(){
      return this.goodsList.reduce((sum, obj) => {
        return sum += obj.price * obj.count
      }, 0)
    }
  },
  methods: {
    // 修改数量+1
    addEFn(index){
      this.goodsList[index].count++
      // 对象是引用类型, 所有用到此对象的地方都会直接被影响(跟数组的v-for更新无关系)
    },
    // 修改数量-1
    subEFn(index){
      let obj = this.goodsList[index]
      if (obj.count > 0) {
        obj.count--
      }
    }
  },
  components: {
    Food
  }
};
</script>

<style scoped>
</style>