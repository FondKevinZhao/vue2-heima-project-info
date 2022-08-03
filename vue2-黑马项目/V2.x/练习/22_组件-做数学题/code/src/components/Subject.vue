<template>
  <div class="subject">
    <span>{{ one }}</span>
    <span>+</span>
    <span>{{ two }}</span>
    <span>=</span>
    <input type="number" v-model.number="result" :disabled="isCheck"/>
    <button @click="sendFn" :disabled="isCheck">提交</button>
  </div>
</template>

<script>
export default {
    props: ['one', 'two', 'index'],
    data(){
        return {
            result: '',
            isCheck: false // 是否关闭按钮和输入框
        }
    },
    methods: {
        sendFn(){
            this.$emit('celE', this.index, this.result)
            this.isCheck = true // 关闭输入框和按钮
        }
    }
};
</script>

<style scoped>
.subject {
  margin: 5px;
  padding: 5px;
  font-size: 20px;
}
.subject span {
  display: inline-block;
  text-align: center;
  width: 20px;
}
.subject input {
  width: 50px;
  height: 20px;
}
</style>