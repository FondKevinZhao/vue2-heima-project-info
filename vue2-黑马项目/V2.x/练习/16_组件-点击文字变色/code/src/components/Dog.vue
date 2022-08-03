<template>
  <div class="my_div">
    <img
      src="https://scpic.chinaz.net/files/pic/pic9/202003/zzpic23514.jpg"
      alt=""
    />
    <p @click="btnFn"
    :style="{backgroundColor: colorS}"
    >这是一个孤独可怜的狗</p>
  </div>
</template>

<script>
export default {
  data(){
    return {
      colorS: '' // 背景颜色
    }
  },
  methods: {
    // 随机颜色字符串
    getRandColorStr(){
      let r = Math.floor(Math.random() * 256)
      let g = Math.floor(Math.random() * 256)
      let b = Math.floor(Math.random() * 256)
      return `rgb(${r}, ${g}, ${b})`
    },
    btnFn(){
      let colorStr = this.getRandColorStr()
      this.colorS = colorStr;
    }
  }
};
</script>

<style>
.my_div {
  width: 200px;
  border: 1px solid black;
  text-align: center;
  float: left;
}

.my_div img {
  width: 100%;
  height: 200px;
}
</style>