<template>
  <div>
    <table border="1" width="700" style="border-collapse: collapse">
      <caption>
        购物车
      </caption>
      <thead>
        <tr>
          <th><input type="checkbox" v-model="isAll" /> <span>全选</span></th>
          <th>名称</th>
          <th>价格</th>
          <th>数量</th>
          <th>小计</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr
          is="MyTr"
          v-for="(obj, index) in goodList"
          :key="index"
          :goodsObj="obj"
          :ind="index"
          @delEvent="delEFn"
        ></tr>
      </tbody>
      <tfoot>
        <tr>
          <td>合计:</td>
          <td colspan="5">{{ allPrice }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
// 目标: 完成购物车
// 1. App.vue里复制.md里的标签和数据
// 2. 创建MyTr.vue组件, 准备标签
// 3. 引入到App.vue使用组件显示
// 4. App.vue -> MyTr.vue 传入数据对象铺设页面
// 5. 计算属性完整写法, 来实现全选和小选互相影响效果
// 6. 实现+和-按钮的交互逻辑
// 7. 实现删除按钮功能
// 8. 统计总价
import MyTr from "./components/MyTr.vue";
export default {
  data() {
    return {
      goodList: [
        {
          name: "诸葛亮",
          price: 1000,
          num: 1,
          checked: false,
        },
        {
          name: "蔡文姬",
          price: 1500,
          num: 1,
          checked: false,
        },
        {
          name: "妲己",
          price: 2000,
          num: 1,
          checked: false,
        },
        {
          name: "鲁班",
          price: 2200,
          num: 1,
          checked: false,
        },
      ],
    };
  },
  methods: {
    delEFn(index){
      this.goodList.splice(index, 1)
    }
  },
  computed: {
    // 全选框的选中状态
    // isAll(){
    //   // 全选状态-统计所有小选框选中状态, 而得来
    //   // every() - 判断数组里每个值有一个不符合状态就直接返回false
    //   return this.goodList.every(obj => {
    //    return obj.checked === true
    //   })
    //   // 有一个人没选中, 判断条件为false, 最终every也为false, 正好isAll为false, 全选也没选中
    // }
    // 完整写法: 当页面或者其他地方给计算属性, 赋予一个值
    isAll: {
      set(val) {
        // 当前案例: 用户点击全选框
        // 全选选中, val就是true, 全选未选中, val就是false
        this.goodList.forEach(obj => {
          obj.checked = val;
        })
      },
      get() {
        if (this.goodList.length === 0) {
          return false;
        }

        return this.goodList.every((obj) => {
          return obj.checked === true;
        });
      },
    },
    // 统计总价
    allPrice(){
      // 你选中了, 才统计
      return this.goodList.reduce((sum, obj) => {
        if (obj.checked === true) {
          sum += obj.price * obj.num
        }

        return sum; // 一定要给下一次sum的初始值return值进行累加
      }, 0)
    }
  },
  
  components: {
    MyTr,
  },
};
</script>

<style>
</style>