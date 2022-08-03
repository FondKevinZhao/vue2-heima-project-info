<template>
  <div>
    <div>
      <router-link to="/ui_router">UI_Router</router-link>
      <router-link to="/contacts">Contacts</router-link>
      <router-link to="/about">About</router-link>
    </div>
    <hr>
   <router-view></router-view>
  </div>
</template>

<script>
export default {
 
}
</script>

<style scoped>
.router-link-active{
  color: red;
}
</style>