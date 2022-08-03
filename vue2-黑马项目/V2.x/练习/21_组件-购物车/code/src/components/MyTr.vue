<template>
  <tr>
      <td>
          <input type="checkbox" v-model="goodsObj.checked">
      </td>
      <td>
          <span>{{ goodsObj.name }}</span>
      </td>
      <td>
          <span>{{ goodsObj.price }}</span>
      </td>
      <td>
          <button @click="subFn">-</button>
          <span>{{ goodsObj.num }}</span>
          <button @click="addFn">+</button>
      </td>
      <td>
          <span>{{ goodsObj.price * goodsObj.num  }}</span>
      </td>
      <td>
          <button @click="delFn">删除</button>
      </td>
  </tr>
</template>

<script>
export default {
    props: {
        goodsObj: Object,
        ind: Number, // 索引
    },
    methods: {
        // +
        addFn(){
            this.goodsObj.num++
        },
        // -
        subFn(){
            if (this.goodsObj.num > 1) {
                this.goodsObj.num--
            }
        },
        // 删除点击事件
        delFn(){
            this.$emit('delEvent', this.ind)
        }
    }
}
</script>

<style>

</style>