<template>
  <div>
    <h2>随机点名</h2>
    <div class="box">
      <span>名字是：</span>
      <div class="qs">{{ userName }}</div>
    </div>
    <div class="btns">
      <button class="start" @click="startFn">开始</button>
      <button class="end" @click="endFn">结束</button>
    </div>
  </div>
</template>

<script>
// 目标: 开始随机显名, 结束就停止
// 1. 标签和样式
// 2. 准备变量, 用于在页面显示名字
export default {
  data() {
    return {
      userName: "这里显示姓名",
      // 3. 准备名字数组
      nameArr: ["孙悟空", "猪八戒", "沙师弟", "白龙马"],
      timer: null, // 保存计时器本身(一会儿用于销毁)
      isHave: false //  保存计时器状态
    };
  },
  methods: {
    // 4. 封装随机数函数
    getRandom(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    // 5. 开始-点击事件
    startFn() {
      if (this.isHave === true) return
      // 6. 产生随机下标, 换出名字, 赋予给变量影响页面
      // 7. 创建计时器, 间隔100毫秒,执行一次
      // 注意: 不能用function, 因为this会指向window, 访问不到当前vue组件里变量和方法了
      this.isHave = true // 现在有一个计时器在运行
      this.timer = setInterval(() => {
        let index = this.getRandom(0, this.nameArr.length - 1);
        this.userName = this.nameArr[index];
      }, 100);
    },
    // 8. 结束-点击事件
    endFn(){
      clearInterval(this.timer)
      this.isHave = false;
    }
  },
};

// 点击导致计时器多次创建问题
// 解决方案1: 点击先清除计时器, 重新创建
// 新的问题: 一直点击, 一直销毁, 计时器没机会执行, 效果就不会走
// 解决方案2: 变量来做开关
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

h2 {
  text-align: center;
}

.box {
  width: 600px;
  margin: 50px auto;
  display: flex;
  font-size: 25px;
  line-height: 40px;
}

.qs {
  width: 450px;
  height: 40px;
  color: red;
}

.btns {
  text-align: center;
}

.btns button {
  width: 120px;
  height: 35px;
  margin: 0 50px;
}
</style>