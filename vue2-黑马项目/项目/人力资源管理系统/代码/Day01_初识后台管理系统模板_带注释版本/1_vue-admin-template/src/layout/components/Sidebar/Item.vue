<script>
export default {
  name: 'MenuItem',
  functional: true, // 这是一个函数式组件
  props: {
    icon: { // 图标名
      type: String,
      default: ''
    },
    title: { // 标题名
      type: String,
      default: ''
    }
  },
  render(h, context) { // render函数相当于以前的template模板
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) { // 如果是el-icon用i标签加载类名
        vnodes.push(<i class={[icon, 'sub-el-icon']} />) // 这种js里写标签的方式叫jsx写法(一个大括号里是表达式)
      } else {
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    if (title) {
      // 并列关系放入一个span标签
      vnodes.push(<span slot='title'>{title}</span>)
    }
    return vnodes
  }
  // render函数: https://blog.csdn.net/sansan_7957/article/details/83014838
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
