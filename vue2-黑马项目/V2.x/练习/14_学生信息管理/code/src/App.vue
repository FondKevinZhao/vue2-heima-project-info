<template>
  <div id="app">
    <div>
      <span>姓名:</span>
      <input type="text" v-model.trim="user.name"/>
    </div>
    <div>
      <span>年龄:</span>
      <input type="number" v-model.number="user.age"/>
    </div>
    <div>
      <span>性别:</span>
      <select v-model="user.sex">
        <option value="男">男</option>
        <option value="女">女</option>
      </select>
    </div>
    <div>
      <button @click="addOrEditFn">添加/修改</button>
    </div>
    <div>
      <table
        border="1"
        cellpadding="10"
        cellspacing="0"
        v-show="arr.length > 0"
      >
        <tr>
          <th>序号</th>
          <th>姓名</th>
          <th>年龄</th>
          <th>性别</th>
          <th>操作</th>
        </tr>
        <tr v-for="(obj, index) in arr" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ obj.name }}</td>
          <td>{{ obj.age }}</td>
          <td>{{ obj.sex }}</td>
          <td>
            <button @click="delFn(index)">删除</button>
            <button @click="editFn(obj, index)">编辑</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
// 需求1: 铺设列表
// 需求2: 新增
// (1): v-model绑定表单里值
// (2): 按钮绑定事件, 点击后插入数组新对象
// 坑: 对象插入到数组里还会互相引用

// 需求3: 编辑+修改
// (1): 编辑事件传入要编辑的数据对象
// (2): 拷贝数组里的对象回显给user
// (3): 添加/修改按钮判断-本次新增/修改 (难)


// 需求4: 删除
// (1): 绑定点击事件, 传入对应索引
// (2): 删除数组里数据

// 无论添加/修改-按了以后清空输入框
// 判断下如果是空的要提示用户
// 表格没有数据, 表格隐藏
export default {
  data(){
      return {
          user: { // 表单里绑定对象
              name: '',
              age: 0,
              sex: ''
          },
          editIndex: -1, // 正在编辑的索引默认打开网页是没有的
          arr: [ // 数据源
              {
                  name: 'Tom',
                  age: 19,
                  sex: '男'
              },
              {
                  name: 'Jone',
                  age: 21,
                  sex: '女'
              }
          ]
      }
  },
  methods: {
      addOrEditFn(){ // 添加/修改方法
        if (this.user.name.length === 0 || this.user.age === 0 || this.user.sex.length === 0) {
            alert("请输入内容")
            return
        }

        if (this.editIndex === -1) { // 新增
            this.arr.push({...this.user})
        } else { // 编辑
            this.$set(this.arr, this.editIndex, {...this.user}) // 修改数组里某个值导致v-for更新
        }

        // 清空输入框
        this.user.name = ''
        this.user.age = 0
        this.user.sex = ''
        

        this.editIndex = -1
      },
      editFn(theObj, index){ // 编辑-点击事件
        this.user = {...theObj} // 回显
        this.editIndex = index // 正在编辑的索引
      },
      delFn(index){ // 删除方法
        this.arr.splice(index, 1)
      }
  }
}
</script>
