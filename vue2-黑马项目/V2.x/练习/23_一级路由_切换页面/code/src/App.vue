<template>
  <div>
    <div>
      <router-link to="/home">首页</router-link>
      <router-link to="/category">分类</router-link>
      <router-link to="/order">订单</router-link>
      <router-link to="/my">我的</router-link>
    </div>
    <h4>显示路由切换的页面↓</h4>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>