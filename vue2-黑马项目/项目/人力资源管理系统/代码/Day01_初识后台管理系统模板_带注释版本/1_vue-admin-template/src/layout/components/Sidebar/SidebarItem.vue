<template>
  <!-- 如果路由对象中hidden为true, 证明此路由对象不想要左侧导航 -->
  <div v-if="!item.hidden">
    <!-- 判断唯一对象, 没有children孩子, !总是显示
      说白了, 这种没有递归左侧导航, 就显示一个就行
     -->
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <!-- 这里路由规则对象还必须有meta了不然不显示左侧导航, to要跳转的路径是处理后的路由path -->
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <!-- el-menu真正的子标签->显示导航item
          index要切换的路由路径
          左侧导航回去才有submenu-title-noDropdown类名
         -->
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <!-- item才是真正一行显示的具体标签
            使用路由对象meta里icon字段显示图标
            title也是路由对象里meta字段显示文字
           -->
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <!-- 如果不只一个孩子, 那就证明要往里递归了
      标签先使用el-menu的el-submenu带子导航的标签了
      popper-append-to-body: 是否将弹出菜单插入至 body 元素
     -->
    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <!-- 标题部分, 先显示本身的路由对象 -->
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <!-- 然后下属部分, 再显示一个slidebar-item导航(因为在本身, 不用注册直接使用)
       有多少个子路由对象数组元素, 直接循环子层(孙子层要往里继续调用本组件代码)
       is-nest 子标签无需再缩进等样式了
       bash-path当前基地址(子标签的), 要拼接当前地址和子级的路由地址传入-共子导航点击跳转
       -->
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'
import { isExternal } from '@/utils/validate'
import Item from './Item'
import AppLink from './Link'
import FixiOSBug from './FixiOSBug'

export default {
  name: 'SidebarItem',
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // 路由对象
    item: {
      type: Object,
      required: true
    },
    // 是否归巢(就是左侧导航是否回去了)
    isNest: {
      type: Boolean,
      default: false
    },
    // 第一层路由的基础地址
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null
    return {}
  },
  methods: {
    // 是否只有一个孩子路由对象
    // children参数是路由对象里的children
    // parent是当前路由对象
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        // item是子路由对象, 如果hidden为true, 则返回false不要收集
        if (item.hidden) {
          return false
        } else {
          // Temp set(will be used if only has one showing child)
          // 先假装item只有一个保存下
          // 返回true收集起来这个孩子
          this.onlyOneChild = item
          return true
        }
      })

      // When there is only one child router, the child router is displayed by default
      // 如果真的只有一个元素,返回true给hashOneShowingChild方法
      if (showingChildren.length === 1) {
        return true
      }

      // Show parent if there are no child router to display
      // 如果一个孩子没有, 也返回true, 但是onlyOneChild保存一个对象
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ... parent, path: '', noShowingChildren: true } // {path: '', name: 'Menu1-3', meta: {…}, noShowingChildren: true, component: ƒ}
        return true
      }

      return false // 如果是多个子路由对象, 返回false
    },
    // 处理路径->路由规则里可能是/a/b, 也可能是http开头的外链地址
    resolvePath(routePath) {
      // 如果是外链, 直接返回
      if (isExternal(routePath)) {
        return routePath
      }
      // 如果基础地址有值, 证明这个导航是第一层的导航, 直接返回
      if (isExternal(this.basePath)) {
        return this.basePath
      }
      // 如果这个组件是递归嵌套, 第一次有basePath, 以后都是后续的路由地址传入的
      // 在上一段路径上拼接反正路由地址返回
      return path.resolve(this.basePath, routePath)
    }
  }
}
</script>
