<template>
  <!-- 左侧导航开始 -->
  <div :class="{'has-logo':showLogo}">
    <!-- 左侧顶部logo是否显示 -->
    <logo v-if="showLogo" :collapse="isCollapse" />
    <!-- 左侧导航正文 -->
    <!-- 官方隐藏组件scrollbar: https://www.cnblogs.com/myfirstboke/p/10218138.html -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- element-ui官方的导航菜单
        :default-active 默认激活
        collapse 是否折叠
       -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- 自定义插槽SidebarItem.vue, 遍历路由规则数组 -->
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem' // 左侧导航, 每一行item项
import variables from '@/styles/variables.scss' // scss文件还可以导出变量

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'sidebar' // 左侧导航对象
    ]),
    routes() {
      // 返回router里定义的规则对象数组(全部)
      return this.$router.options.routes
    },
    // 默认激活了路由地址
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    // 是否显示左侧导航顶部的logo
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    // 返回样式对象
    variables() {
      return variables
    },
    // 如果打开了, 返回false
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
