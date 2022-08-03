<template>
  <div>
      <p>我的首页</p>
      <p>查看商品</p>

      <hr>
      <router-link to="/home/sport_home">体育的主页</router-link>
      <router-link to="/home/my_sport">国内的体育</router-link>
      <router-link to="/home/you_sport">国外的体育</router-link>
      <p>下面是二级路由页面↓</p>
      <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>