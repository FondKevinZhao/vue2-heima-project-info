<template>
  <span :class="{undo: status === 'unComplate', right: status === 'yes', error: status === 'no'}">
      {{ index + 1}}: {{ status === 'unComplate' ? '未完成' : status === 'yes' ? '正确' : '错误'}}
  </span>
</template>

<script>
export default {
   props: ['status', 'index'] // 'unComplate'
};
</script>

<style scoped>
.right {
  color: green;
}
.error {
  color: red;
}
.undo {
  color: #ccc;
}
</style>