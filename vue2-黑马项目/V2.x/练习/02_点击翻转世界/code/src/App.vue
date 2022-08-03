<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="btnFn">翻转世界</button>
  </div>
</template>

<script>
// 目标: 点击翻转字符串
// 1. 标签准备好
// 2. 绑定事件
export default {
  data(){
    return {
      message: 'Hello, World'
    }
  },
  methods: {
    btnFn(){
      // 3. 字符串 -> 数组
      let arr = this.message.split("") // ['H', 'e', 'l', ...]
      // 4. 调用数组翻转方法
      arr = arr.reverse() // ['d', 'l', 'r', 'o', 'W', ' ', ',', ...]
      // 5. 数组 -> 字符串
      this.message = arr.join("") 

      // this.message = this.message.split("").reverse().join("")
    }
  }
}
</script>

<style>

</style>