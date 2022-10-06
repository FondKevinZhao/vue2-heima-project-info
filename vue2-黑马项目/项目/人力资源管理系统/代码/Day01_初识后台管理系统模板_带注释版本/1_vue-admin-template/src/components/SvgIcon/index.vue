<template>
  <!-- 外链地址用div展示图标 -->
  <!-- $listeners拿到父级给它绑定的所有事件
  <child @test1="test1Fn" @test2="test2Fn"></child>
  目标: 在child组件的vue文件内, 我可以通过$listeners直接接收所有的事件和方法
  讲解: $listeners是Vue2.4新增内置的新的属性, 收集父级给我绑定的所有事件和方法
  $listeners等于 {test1: test1Fn, test2: test2Fn}
  知识点:
  以前绑定事件v-on:事件名="事件方法"
  现在绑定事件v-on="{事件名: 事件方法, 事件名: 事件方法}"
   -->
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    v-on="$listeners"
  />
  <!-- svg标签->矢量图形(放大不失真)->渲染图标(.svg文件->描绘图形的形状信息)
    aria-hidden="true" 让浏览器读此文件内容的时候, 把这个标签略过不要读
    use加载另外一个svg文件内容, 显示在use标签位置上(例如: 我们项目中svg有很多文件, 一处显示多个svg)
    靠的就是use和href链接
   -->
  <svg v-else :class="svgClass" aria-hidden="true" v-on="$listeners">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
// doc: https://panjiachen.github.io/vue-element-admin-site/feature/component/svg-icon.html#usage
import { isExternal } from '@/utils/validate' // 判断是否为外链地址
// 知识点: 外链地址, 以http开头/其他协议开头的
// 相对地址: ./开头的或者/开头的

export default {
  name: 'SvgIcon',
  props: {
    // 在使用svg-icon标签(例如登录页面)
    // 传入icon-class名字(例如'user')
    iconClass: {
      type: String,
      required: true
    },
    // 传入自定义类名(外面定义了额外的字体样式)
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 判断外链
    isExternal() {
      // 外链地址为true
      return isExternal(this.iconClass)
    },
    // 图标名字(对应文件名字)
    iconName() {
      return `#icon-${this.iconClass}`
    },
    // svg设置样式类名
    svgClass() {
      if (this.className) { // 如果外面传入自定义样式, 拼接2个类名使用
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    },
    // 外链icon的样式-用css的mask方式来渲染图标
    styleExternalIcon() {
      return {
        mask: `url(${this.iconClass}) no-repeat 50% 50%`,
        '-webkit-mask': `url(${this.iconClass}) no-repeat 50% 50%`
      }
    }
  }
}
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
