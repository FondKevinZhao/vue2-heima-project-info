<template>
  <div id="app">
    <ul>
      <!-- 2. v-for循环数据生成标签结构 -->
      <li v-for="(value, index) in arr" :key="index">
        <span>{{ value }}</span>
        <button @click="delFn(index)">删除</button>
      </li>
    </ul>
    <button @click="createFn">生成</button>
  </div>
</template>

<script>
// 目标: 加加减减效果
// 1. 标签结构, 数据数组
export default {
  data() {
    return {
      arr: [1, 5, 3],
    };
  },
  methods: {
    // 3. 生成-事件方法
    createFn(){
      // 4. 产生随机数, 放入数组末尾
      this.arr.push(Math.floor(Math.random() * 100))
    },
    // 5. 删除-事件方法
    delFn(index){
      // 6. 删除数组里对应下标元素
      this.arr.splice(index, 1)
    }
  }
}
</script>