// 混入技术: 可以往组件的export default中直接注入这个完整对象进去合并
import store from '@/store'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

export default {
  watch: {
    $route(route) { // 监听路由改变
      if (this.device === 'mobile' && this.sidebar.opened) { // 如果在移动端而且左侧导航开启, 则关闭左侧导航
        store.dispatch('app/closeSideBar', { withoutAnimation: false })
      }
    }
  },
  beforeMount() { // 组件挂载前, 监听网页宽度改变
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() { // 组件销毁前, 移除监听网页宽度改变
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() { // 此组件挂载
    const isMobile = this.$_isMobile()
    if (isMobile) { // 如果是移动端, 则保存移动端状态, 关闭左侧导航
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', { withoutAnimation: true })
    }
  },
  methods: {
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    // 判断是否为移动端设备
    $_isMobile() {
      const rect = body.getBoundingClientRect() // 方法返回元素的大小及其相对于视口的位置
      return rect.width - 1 < WIDTH // 看看是否小于移动宽度设备(为什么-1, 因为有的125%浏览器会有小数)
    },
    // 是否重置设备类型/重置左侧导航出现(隐藏)
    $_resizeHandler() {
      if (!document.hidden) { // 如果文档还在
        const isMobile = this.$_isMobile() // 是否为移动端, 切换vuex里保存当前设备类型
        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) { // 如果为移动端则关闭左侧导航
          store.dispatch('app/closeSideBar', { withoutAnimation: true })
        }
      }
    }
  }
}
