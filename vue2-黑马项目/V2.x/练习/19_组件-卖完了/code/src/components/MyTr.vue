<template>
  <tr>
    <td>
      <input type="number" v-model.number="goodsObj.count"/>
    </td>
    <td>
      <span>{{ goodsObj.goodsName }}</span>
    </td>
    <td v-if="goodsObj.count === 0 || goodsObj.count === ''">
      <span>卖光了!!!</span>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    goodsObj: Object // 重要: 
    // 1. 遍历数组里对象, 拿到的是对象"内存地址"
    // 2. 传递赋值, 传递的还是"内存地址"
    // obj变量和goodsObj变量指的都是数组里的那个对象
    // 对象是引用类型的
    // 子组件里修改对象里属性
    // goodsObj = {} // 这叫修改变量本身的值 x不行
    // 改对象里的属性不算
  }
};
</script>

<style>
</style>