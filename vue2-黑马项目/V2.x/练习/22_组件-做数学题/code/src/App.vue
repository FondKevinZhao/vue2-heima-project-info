<template>
  <div id="app">
    <h2>测试题</h2>
    <subject 
    v-for="(obj, index) in arr" 
    :key="index"
    :one="obj.num1"
    :two="obj.num2"
    :index="index"
    @celE="celFn"
    ></subject>
    <div>
      <flag 
      v-for="(obj, index) in arr" 
      :key="index"
      :index="index"
      :status="obj.isOk"
      ></flag>
    </div>
  </div>
</template>

<script>
// 组件-只负责数据展示, 逻辑全都回传给App.vue页面
// 需求: 完成做数学题
// 1. 组件+标签+样式 铺设好
// 2. 准备数据, 铺设页面
// 3. Subject内, 获取结果, 点击提交
// 4. 回传给App.vue事件方法, 计算结果, 影响isOk状态
// 5. Flag内, 接收isOk状态的值和索引, 判断class, 判断文字
import Flag from "./components/Flag.vue";
import Subject from "./components/Subject.vue";
export default {
  components: {
    Flag,
    Subject,
  },
  data() {
    return {
      arr: [
        {
          num1: Math.floor(Math.random() * 10),
          num2: Math.floor(Math.random() * 10),
          isOk: "unComplate", // 未完成
        },
        {
          num1: Math.floor(Math.random() * 10),
          num2: Math.floor(Math.random() * 10),
          isOk: "unComplate", // 未完成
        },
        {
          num1: Math.floor(Math.random() * 10),
          num2: Math.floor(Math.random() * 10),
          isOk: "unComplate", // 未完成
        },
        {
          num1: Math.floor(Math.random() * 10),
          num2: Math.floor(Math.random() * 10),
          isOk: "unComplate", // 未完成
        },
        {
          num1: Math.floor(Math.random() * 10),
          num2: Math.floor(Math.random() * 10),
          isOk: "unComplate", // 未完成
        },
      ],
    };
  },
  methods: {
      celFn(index, result){
          let obj = this.arr[index] // 题目对象
          if (obj.num1 + obj.num2 === result) {
              obj.isOk = "yes"
          } else {
              obj.isOk = "no" // 题目回答错误
          }
      }
  }
};
</script>

<style>
body {
  background-color: #eee;
}

#app {
  background-color: #fff;
  width: 500px;
  margin: 50px auto;
  box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
  padding: 2em;
}
</style>