<template>
  <div>
    <!-- 无id时, 可以使用index(反正也是就地更新) -->
    <div
      style="display: inline-block"
      v-for="(num, index) in arr"
      :key="index"
    >
    <!-- 4. v-model收集用户选中复选框对应value值 -->
      <input type="checkbox" :value="num" v-model="listArr"/>
      <span>{{ num }}</span>
    </div>
    <p>你选中的元素, 累加的值和为: {{ allCount }}</p>
  </div>
</template>

<script>
// 目标: 选择数字, 我来求和
// 1. 标签和数据准备好
// 2. v-for生成标签结构, 复选框绑定value值(为了一会儿让v-model收集)
export default {
    data(){
        return {
            arr: [9, 15, 19, 25, 29, 31, 48, 57, 62, 79, 87],
            listArr: []
        }
    },
    // 3. 累积和准备计算属性
    computed: {
      allCount(){
        // 5. 统计listArr数组里和
        return this.listArr.reduce((sum, num) => sum += num, 0)
      }
    }
};
</script>