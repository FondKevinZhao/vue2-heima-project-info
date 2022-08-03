<template>
  <div>
    <router-view></router-view>

  </div>
</template>

<script>
import { getAllChannelsAPI } from '@/api'
// try+catch来捕获await同步代码的错误
export default {
  async created () {
    try {
      const res = await getAllChannelsAPI()
      console.log(res)
    } catch (err) {
      // err参数拿到的就是错误对象
      // 给用户来个弹窗提示-程序出错了
      // console.dir() 详细打印
      // console.log() 日志打印(黑色文字)
      // console.warning() 警告打印(黄色)
      // console.error() 错误提示(红色)
      console.dir(err)
    }
  }
}
</script>

<style>
</style>
