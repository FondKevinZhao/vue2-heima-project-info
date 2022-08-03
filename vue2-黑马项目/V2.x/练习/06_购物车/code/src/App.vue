<template>
  <div id="app">
    <table class="tb">
      <tr>
        <th>编号</th>
        <th>品牌名称</th>
        <th>创立时间</th>
        <th>操作</th>
      </tr>
      <!-- 循环渲染的元素tr -->
      <!-- 3. v-for循环tr标签, 放入数据 -->
      <tr v-for="obj in list" :key="obj.id">
        <td>{{ obj.id }}</td>
        <td>{{ obj.name }}</td>
        <td>{{ obj.time }}</td>
        <td>
          <button @click="delFn(obj.id)">删除</button>
        </td>
      </tr>
      <!-- 4. 控制隐藏/出现 -->
      <tr v-if="list.length === 0">
        <td colspan="4">没有数据咯~</td>
      </tr>
    </table>
  </div>
</template>

<script>
// 目标: 购物车效果
// 1. 标签和样式以及固定数据
// 2. 数据和标签关系对应好, 对象 -> tr
export default {
  data() {
    return {
      list: [
        { id: 102, name: "奔驰", time: "2020-08-01" },
        { id: 231, name: "宝马", time: "2020-08-02" },
        { id: 213, name: "奥迪", time: "2020-08-03" },
      ],
    };
  },
  methods: {
    delFn(id){
      // 5. 通过id, 找到对应下标
      let index = this.list.findIndex(obj => obj.id === id)
      // 6. 用下标删除数组里元素 
      this.list.splice(index, 1)
    }
  }
};
</script>

<style>
#app {
  width: 600px;
  margin: 10px auto;
}

.tb {
  border-collapse: collapse;
  width: 100%;
}

.tb th {
  background-color: #0094ff;
  color: white;
}

.tb td,
.tb th {
  padding: 5px;
  border: 1px solid black;
  text-align: center;
}

.add {
  padding: 5px;
  border: 1px solid black;
  margin-bottom: 10px;
}
</style>
