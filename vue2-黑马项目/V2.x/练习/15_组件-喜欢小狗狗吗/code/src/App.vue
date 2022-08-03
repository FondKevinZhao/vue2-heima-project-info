<template>
  <div>
    <!-- 4. 使用组件-运行后会替换成组件内原生标签显示在原地 -->
    <Dog></Dog>
    <Dog></Dog>
    <Dog></Dog>
  </div>
</template>

<script>
// 目标: 组件基础使用4步(喜欢狗狗吗?) = 复用
// 1. 创建组件(.vue文件)-标签样式和js
// 2. 引入Dog组件对象
import Dog from './components/Dog.vue'
export default {
  // 3. 局部注册组件
  components: {
    Dog
  }
}
</script>

<style scoped>

</style>