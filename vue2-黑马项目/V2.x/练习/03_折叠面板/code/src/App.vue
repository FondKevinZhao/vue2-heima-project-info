<template>
  <div id="app">
    <h3>案例：折叠面板</h3>
    <div>
      <div class="title">
        <h4>芙蓉楼送辛渐</h4>
        <span class="btn" @click="btnFn">
          收起
        </span>
      </div>
      <!-- 3. v-show="vue变量" 控制标签显示/隐藏 -->
      <div class="container" v-show="isShow">
        <p>寒雨连江夜入吴,</p>
        <p>平明送客楚山孤。</p>
        <p>洛阳亲友如相问，</p>
        <p>一片冰心在玉壶。</p>
      </div>
    </div>
  </div>
</template>

<script>
// 目标: 折叠面板
// 1. 准备标签+样式(下载less)
export default {
  data() {
    return {
      isShow: true
    }
  },
  methods: {
    // 2. 绑定事件和方法
    btnFn(){
      // 4. 判断当前状态, 决定isShow值
      if (this.isShow === true) {
        this.isShow = false
      } else {
        this.isShow = true
      }
      
      // this.isShow = !this.isShow
    }
  }
}
</script>

<style lang="less">
body {
  background-color: #ccc;
  #app {
    width: 400px;
    margin: 20px auto;
    background-color: #fff;
    border: 4px solid blueviolet;
    border-radius: 1em;
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.5);
    padding: 1em 2em 2em;
    h3 {
      text-align: center;
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid #ccc;
      padding: 0 1em;
    }
    .title h4 {
      line-height: 2;
      margin: 0;
    }
    .container {
      border: 1px solid #ccc;
      padding: 0 1em;
    }
    .btn {
      /* 鼠标改成手的形状 */
      cursor: pointer;
    }
  }
}
</style>