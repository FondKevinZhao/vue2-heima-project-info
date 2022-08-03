<template>
  <div id="app">
    <ul>
      <!-- // 2. 把数据循环铺设到页面上 -->
      <li v-for="(str, index) in myArr" :key="index">
        {{ str }}
      </li>
    </ul>
    <button @click="moveFn">走一走</button>
  </div>
</template>

<script>
// 目标: 帅哥美女走一走
// 1. 标签和数据
export default {
  data() {
    return {
      myArr: ["帅哥", "美女", "程序猿"],
    };
  },
  methods: {
    moveFn(){
      // 3. "当前"数组里第一位值取出放到后面, 再删除第一位值
      this.myArr.push(this.myArr[0])
      this.myArr.shift()

      // this.myArr.push(this.myArr.shift())
    }
  }
}
</script>