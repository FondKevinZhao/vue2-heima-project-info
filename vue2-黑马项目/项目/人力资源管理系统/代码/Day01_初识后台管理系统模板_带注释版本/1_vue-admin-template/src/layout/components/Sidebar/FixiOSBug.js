export default {
  computed: {
    // 返回设备类型mobile/desktop
    device() {
      return this.$store.state.app.device
    }
  },
  mounted() {
    // In order to fix the click on menu on the ios device will trigger the mouseleave bug
    // https://github.com/PanJiaChen/vue-element-admin/issues/1135
    this.fixBugIniOS() // 解决ios的bug
  },
  methods: {
    fixBugIniOS() {
      const $subMenu = this.$refs.subMenu // 获取二级菜单
      if ($subMenu) {
        const handleMouseleave = $subMenu.handleMouseleave
        $subMenu.handleMouseleave = (e) => {
          if (this.device === 'mobile') { // 如果移动端阻拦这个事件
            return
          }
          handleMouseleave(e) // 如果不是移动端正常调用鼠标离开
        }
      }
    }
  }
}
