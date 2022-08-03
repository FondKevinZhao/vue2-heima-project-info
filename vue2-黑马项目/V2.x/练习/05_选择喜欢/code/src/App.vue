<template>
  <div>
      <p>请选择你喜欢的专栏</p>
      <div style="display: inline-block" v-for="(str, index) in titleArr" :key="index">
          <input type="checkbox" :value="str" v-model="selArr"/><span>{{ str }}</span>
      </div>
      <div>
          <ul>
              <li v-for="(str, index) in selArr" :key="index">{{ str }}</li>
          </ul>
      </div>
  </div>
</template>

<script>
// 总结: 
// 1. 准备标签
// 2. 准备数组-循环标签+数据
// 3. 准备v-model和value,收集用户选中的频道
// 4. 把用户选中数据, 循环到li上
export default {
    data(){
        return {
            titleArr: ["科幻", "喜剧", "动漫", "冒险", "科技", "军事", "娱乐", "奇闻"], // 频道数组
            selArr: [] // 用户选中的频道
        }
    }
}
</script>

<style>

</style>