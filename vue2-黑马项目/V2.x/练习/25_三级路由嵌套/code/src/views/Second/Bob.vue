<template>
  <div>
    <ul>
      <li>
        <router-link to="/contacts/bob/blog">blog</router-link>
      </li>
      <li>
        <router-link to="/contacts/bob/fix">fix</router-link>
      </li>
    </ul>
    <!-- 三级路由挂载点 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.router-link-active{
  color: red;
}
</style>