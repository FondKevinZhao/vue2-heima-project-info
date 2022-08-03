<template>
  <div>
      <h3>AddItem组件</h3>
      <p>已知库存数: {{ $store.state.count }}</p>
      <button @click="addFn">库存+1</button>
      <button @click="asyncAddFn">延迟1秒, 库存+5</button>
  </div>
</template>

<script>
export default {
  methods: {
    addFn(){
      this.$store.commit('addCount', 1)
    },
    asyncAddFn(){
      this.$store.dispatch('asyncAddCount', 5)
    }
  }
}
</script>