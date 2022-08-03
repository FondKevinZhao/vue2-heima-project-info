<template>
  <div>
    <table>
      <tr is="MyTr"
      v-for="(obj, index) in goodsArr"
      :key="index"
      :goodsObj="obj"
      ></tr>
    </table>
    <p>All Number: {{ allCount }}</p>
  </div>
</template>

<script>
// 目标: 卖完了小购物车效果
// 1. 封装tr组件, 准备标签和样式
// 2. 在App.vue里, 准备好其他和数据变量
// 3. App.vue里, 把表格和tr组件使用
// 注意: table>tr / select>option / ul>li / ol>li
// 4. 循环数组, 分发数据到tr中显示
// 5. 判断数据为0, 显示"卖光了!!!"
// 6. 统计总数量, 计算属性allCount
import MyTr from "./components/MyTr.vue";
export default {
  data() {
    return {
      goodsArr: [
        // 商品数组
        {
          count: 0,
          goodsName: "Watermelon",
        },
        {
          count: 0,
          goodsName: "Banana",
        },
        {
          count: 0,
          goodsName: "Orange",
        },
        {
          count: 0,
          goodsName: "Pineapple",
        },
        {
          count: 0,
          goodsName: "Strawberry",
        },
      ],
    };
  },
  computed: {
    allCount(){
      return this.goodsArr.reduce((sum, obj) => {
        return sum += obj.count
      }, 0)
    }
  },
  components: {
    MyTr,
  },
};
</script>

<style scoped>
</style>