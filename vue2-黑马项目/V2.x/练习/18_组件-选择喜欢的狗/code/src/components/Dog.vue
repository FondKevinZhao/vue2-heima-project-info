<template>
  <div class="my_div">
    <img
      :src="dogObj.dogImgUrl"
      alt=""
    />
    <p @click="btnFn"
    :style="{backgroundColor: colorS}"
    >{{ dogObj.dogName }}</p>
  </div>
</template>

<script>
export default {
  props: {
    dogObj: Object
  },
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
    // 狗的名字-点击事件
    btnFn(){
      let colorStr = this.getRandColorStr()
      this.colorS = colorStr;

      // 把狗的名字, 传出去
      this.$emit('dogEvent', this.dogObj.dogName)
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