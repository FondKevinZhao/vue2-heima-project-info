<template>
  <div>
      <span>{{ gName }}</span>
      <button @click="addFn">+</button>
      <span>{{ gCount }}</span>
      <button @click="subFn">-</button>
  </div>
</template>

<script>
export default {
    props: {
        gName: String, // 商品名
        gCount: Number, // 商品数量
        ind: Number // 索引
    },
    methods: {
        // +号点击事件
        addFn(){
            this.$emit('addEvent', this.ind)
        },
        // -号点击事件
        subFn(){
            this.$emit('subEvent', this.ind)
        }
    }
}
</script>

<style>

</style>