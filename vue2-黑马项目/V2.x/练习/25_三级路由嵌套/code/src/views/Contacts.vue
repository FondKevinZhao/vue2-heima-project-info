<template>
  <div>
    <ul>
      <li>
        <router-link to="/contacts/all_contacts">All_contacts</router-link>
      </li>
      <li>
        <router-link to="/contacts/alice">Alice</router-link>
      </li>
      <li>
        <router-link to="/contacts/bob">Bob</router-link>
      </li>
    </ul>

    <button @click="btnFn">随机显示</button>
    <!-- 当前一级下的 二级路由挂载点 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    methods: {
        btnFn(){
           let arr = ['/contacts/all_contacts', '/contacts/alice', '/contacts/bob']
           let path = arr[Math.floor(Math.random() * arr.length)]
           if (this.$route.path !== path) {
               this.$router.push(path)
           }
        }
    }
};
</script>

<style scoped>
.router-link-active{
  color: red;
}
</style>