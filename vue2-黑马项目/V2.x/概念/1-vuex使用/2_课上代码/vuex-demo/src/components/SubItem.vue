<template>
  <div>
      <h3>SubItem组件</h3>
      <p>已知库存数: {{ count }}</p>
      <button @click="subFn">库存-1</button>
      <button @click="asyncSubFn">延迟1秒, 库存-5</button>
  </div>
</template>

<script>
// 需求1: 映射state到计算属性
// 1. 拿到辅助函数 mapState
// 2. 在computed内, ...mapState(['state变量名'])
// 3. 当计算属性使用

// 需求2: 映射mutations到方法里
// 1. 拿到辅助函数 mapMutations
// 2. 在methods内, ...mapMutations(['mutations函数名'])
// 3. 当普通方法使用

// 需求3: 映射actions到方法里
// 1. 拿到辅助函数 mapActions
// 2. 在methods内, ...mapActions(['actions函数名'])
// 3. 当普通方法使用

import { mapState, mapMutations, mapActions } from 'vuex'
// let r = mapState(['count']) // 提取store里的state叫count的变量
// console.log(r); // 返回值: {count: 函数体(return state里count的值)}

export default {
  computed: {
    // 映射count, 得到对象展开, 合并到计算属性中
    ...mapState(['count'])
  },
  methods: {
    ...mapMutations(['subCount']),
    ...mapActions(['asyncSubCount']),
    subFn(){
      this.subCount(1)
    },
    asyncSubFn(){
      this.asyncSubCount(5)
    }
  }
}
</script>