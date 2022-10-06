<template>
  <!-- layout布局页面(左边和上面) -->
  <div :class="classObj" class="app-wrapper">
    <!-- 灰色蒙层: 在移动端下, 切换左侧导航, 会出现
      sidebar.opened -> 侧边栏导航出现(值来自vuex的sidebar.js)
      点击蒙层关闭->设置(opened为false, 本地还存个0)
     -->
    <div v-if="device==='mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <!-- 左侧侧边栏组件 -->
    <sidebar class="sidebar-container" />
    <!-- 右侧容器 -->
    <div class="main-container">
      <!-- 头部是否固定(在@/settings可以设置, 但是在vuex里取出)->现在false不固定 -->
      <div :class="{'fixed-header':fixedHeader}">
        <!-- 头部导航组件 -->
        <navbar />
      </div>
      <!-- 主体内容区域 -->
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components' // 头部导航, 左侧导航, 右下角主体
import ResizeMixin from './mixin/ResizeHandler' // 混入对象, 公共的东西注入

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin], // 混入其他配置项, 此组件创建就会执行混入里的生命周期方法
  computed: {
    // 返回左侧导航控制对象
    sidebar() {
      return this.$store.state.app.sidebar
    },
    // 返回当前设备类型值
    device() {
      return this.$store.state.app.device
    },
    // 返回头部是否固定
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    // 返回class对象(layout页面用的样式)
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened, // 左侧导航样式是否生效(前缀类名, 只有fixedHeader为true才有效)
        openSidebar: this.sidebar.opened, // 移动端->左侧导航开启为true, 整体内容部分定位
        withoutAnimation: this.sidebar.withoutAnimation, // 是否需要动画(可以自定义此类名相关具体css)
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth}); /*calc()函数用于动态计算长度值。 calc()函数支持 "+", "-", "*", "/" 运算；*/
    // 用全局放大镜查找$sideBarWidth这个变量: 210px宽度(左侧宽度)
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
