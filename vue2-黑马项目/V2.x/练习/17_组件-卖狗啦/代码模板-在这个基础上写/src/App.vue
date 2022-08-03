<template>
  <div>
    <Dog></Dog>
    <Dog></Dog>
    <Dog></Dog>
    <Dog></Dog>
    <Dog></Dog>
    <Dog></Dog>
  </div>
</template>

<script>
// 目标: 点击名字-变随机背景颜色
// 1. p标签绑定点击事件
// 2. 定义产生随机颜色字符串方法
// 3. 点击触发, 产生随机颜色
// 4. 定义data里变量接收随机颜色字符串, 使用到模板标签动态style属性中
import Dog from './components/Dog.vue'
export default {
  components: {
    Dog
  }
}
</script>

<style scoped>

</style>