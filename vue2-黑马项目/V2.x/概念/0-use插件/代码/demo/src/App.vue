<template>
  <div>
    <p>{{ 20 | count }}</p>
  </div>
</template>

<script>
export default {
  created () {
    this.$http({
      url: 'http://123.57.109.30:3006/api/getbooks'
    }).then(res => {
      console.log(res)
    })
  }
}
</script>

<style>

</style>
