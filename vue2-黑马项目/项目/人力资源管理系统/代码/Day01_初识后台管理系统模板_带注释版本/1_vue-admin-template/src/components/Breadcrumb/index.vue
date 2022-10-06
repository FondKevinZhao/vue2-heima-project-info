<template>
  <!-- 面包屑导航
      xxxx/xxxx/xxxx
      separator: 代表分割符->记录路由嵌套路径
   -->
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <!-- 动画组(子组件必须有key才能保证动画顺利执行) -->
    <transition-group name="breadcrumb">
      <!-- 面包屑具体项
        根据路由等级数组, 循环多少个面包屑链接
       -->
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
        <!-- 判断如果没有重定向, 当前是最后一个, 显示这个span, 无点击事件 -->
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
        <!-- 如果不是最后一个, 是前面的都是a标签, 点击传递路由对象下去 -->
        <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp' // 设置一段路径规则, 自动生成正则表达式和替换
// 具体看这里https://blog.csdn.net/weixin_43586120/article/details/103764012

export default {
  data() {
    return {
      levelList: null // 路由规则对象的数组
    }
  },
  watch: {
    $route() { // 检测路由变化-重新计算
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    // 获取面包屑导航数组
    getBreadcrumb() {
      // only show routes with meta.title
      // this.$route.matched 拿到当前页面所有匹配的路由信息(一级路由对应一个对象)
      // 可以切换到Menu-1-2-2试试
      // 筛选出带meta选择的路由规则对象形成的新数组
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0] // 取出第一个规则对象

      if (!this.isDashboard(first)) { // 如果不是dashboard页面, 则把数组第一个位置设置成, dashboard的路由规则对象, 剩下的拼接在后面
        matched = [{ path: '/dashboard', meta: { title: 'Dashboard' }}].concat(matched)
      }

      this.levelList = matched.filter(item => {
        // undefined !== false 注意这里有类型检查, 所以这个值是true
        // 意思就是meta选项里有breadcrumb值不能被带上
        return item.meta && item.meta.title && item.meta.breadcrumb !== false
      })
      // 设置路由数组到levelList变量
    },
    // 判断路由名字是不是Dashboard(首页仪表)
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    // 路径编译处理(把占位符:参数名替换成值)
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route // 拿到路径上的参数
      var toPath = pathToRegexp.compile(path) // 给路径上填充参数
      /**
       * 例如:
       * var path = '/user/:id/:name'
         var params = {id: 10001, name: 'bob'}
         var toPath = pathToRegexp.compile(url) // 一段正则
         toPath(params); // /user/10001/bob (向path路径里, 替换对应的参数)
       */
      return toPath(params)
    },
    // 面包屑a链接的点击事件
    handleLink(item) {
      const { redirect, path } = item // 拿到此链接的重定向属性和路由path
      if (redirect) { // 如果有重定向, 先去重定向
        this.$router.push(redirect)
        return
      } // 如果没有重定向, 则跳转到指定path地址
      this.$router.push(this.pathCompile(path))
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
