<template>
  <div>
    <!-- 头部标签 -->
    <van-nav-bar fixed>
      <template #left>
        <!-- <img class="logo" src="../../assets/toutiao_logo.png" alt="" /> -->
        <img class="logo" :src="imgObj" />
      </template>
      <template #right>
        <van-icon
          name="search"
          size="0.48rem"
          color="#fff"
          @click="$router.push('/search')"
        />
      </template>
    </van-nav-bar>

    <!-- 频道部分 -->
    <van-tabs v-model="channelId" animated sticky offset-top="1.226667rem"  :before-change="tabsBeforeChangeFn" @change="tabsChangeFn">
      <van-tab v-for="item in channelList" :key="item.id" :title="item.name" :name="item.id">
        <article-list :cid="channelId"></article-list>
      </van-tab>
    </van-tabs>

    <!-- 编辑频道图标 -->
    <van-icon
      name="plus"
      size="0.37333334rem"
      class="moreChannels"
      @click="show = true"
    />

    <!-- 弹出层组件 -->
    <van-popup v-model="show" class="edit_wrap" @closed="onPopupClosed">
      <!-- 弹出层的主体区域 -->
      <channel-edit
        :userChannelList="channelList"
        @close="show = false"
        @addChannel="addChannelFn"
        @removeChannel="removeChannelFn"
        ref="channelEdit"
        @changeChannel="channgeChannelFn"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import logoPng from '../../assets/toutiao_logo.png'
import { userChannelAPI, updateChannelAPI } from '@/api'

import ArticleList from './ArticleList.vue'
import ChannelEdit from './ChannelEdit.vue'

// “频道名称”和“滚动条位置”之间的对应关系，格式 { '推荐ID': 211, 'htmlID': 30, '开发者资讯ID': 890 }
const nameToTop = {}
export default {
  name: 'Home',
  data () {
    return {
      imgObj: logoPng,
      channelId: 0, // 频道ID(默认0是推荐)
      channelList: [], // 频道列表
      show: false // 编辑频道弹出层显示
    }
  },
  methods: {
    // 添加频道
    async addChannelFn (obj) {
      this.channelList.push(obj)
      this.updateChannel()
    },
    // 统一更新频道
    async updateChannel () {
      // 先拷贝一份数组(前端页面用channelList, 后端用拷贝出的数组)
      // 数组第一层, 对象里key+value是第二层
      const newArr = this.channelList.map((obj) => {
        const newObj = { ...obj }
        return newObj
      })
      // 先剔除推荐
      const index = newArr.findIndex((obj) => obj.name === '推荐')
      newArr.splice(index, 1)
      // 转换字段
      newArr.forEach((obj, index) => {
        delete obj.name
        obj.seq = index + 1
      })
      // 调用接口
      await updateChannelAPI({
        channels: newArr
      })
    },
    // 删除频道
    async removeChannelFn (obj) {
      // 找到这个频道在数组下标删除
      const ind = this.channelList.findIndex((item) => item.id === obj.id)
      this.channelList.splice(ind, 1)
      this.updateChannel()
    },
    // 弹层关闭-重置编辑频道状态
    onPopupClosed () {
      this.$refs.channelEdit.isEdit = false
    },
    // 切换频道
    channgeChannelFn (obj) {
      this.channelId = obj.id // 传过来的频道ID, 影响tabs默认v-model的选择
    },
    // 频道切换之前触发
    tabsBeforeChangeFn () {
      nameToTop[this.channelId] = window.scrollY // 先保存要被切走频道的滚动距离(一定要用哦this.channelId里存着的)
      // 只有return true才会让tabs切换
      return true
    },
    // 频道切换后
    tabsChangeFn (channelId) {
      // 等 DOM 更新完毕之后，根据记录的"滚动条位置"，调用 window.scrollTo() 方法进行滚动
      this.$nextTick(() => {
        window.scrollTo(0, nameToTop[channelId] || 0)
      })
    }
  },
  // 路由离开 - 触发(保存滚动位置)
  beforeRouteLeave (to, from, next) {
    from.meta.top = window.scrollY
    next()
  },
  async created () {
    const res = await userChannelAPI()
    this.channelList = res.data.data.channels
  },
  components: {
    ArticleList,
    ChannelEdit
  }
}
</script>

<style scoped lang="less">
.logo {
  width: 100px;
  height: 30px;
}

/* tab内容距离tab导航的距离 */
/deep/ .van-tabs__content {
  padding-top: 44px;
}

// 设置 tabs 容器的样式
/deep/ .van-tabs__wrap {
  padding-right: 30px;
  background-color: #fff;
}

// 设置小图标的样式
.moreChannels {
  position: fixed;
  top: 62px;
  right: 8px;
  z-index: 999;
}

/* 频道编辑弹出层铺满屏幕 */
.edit_wrap {
  width: 100%;
  height: 100%;
}
</style>
