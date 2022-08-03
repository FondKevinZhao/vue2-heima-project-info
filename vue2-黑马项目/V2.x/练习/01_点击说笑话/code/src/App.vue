<template>
  <div>
    <p>{{ word }}</p>
    <button @click="btnFn">点击说笑话</button>
  </div>
</template>

<script>
// 目标: 点击切换笑话
// 1. 标签和数据
// 2. 按键-点击事件
export default {
  data(){
    return {
      word: '这里是一条笑话',
      jockArr: ['我去相亲网站去了, 那你找到对象了吗? 不! 我找到了他们网站的一个Bug', '讲述一下车怎么翻沟里了。我坐在副驾说沟！沟!沟! 朋友说：欧嘞，欧嘞。欧嘞 结果车就翻里了。', '几位大哥开车去钓鱼，车陷草里了，然后几个大神说把草烧了就出来了，然后就放火烧了，结果就烧没了。']
    }
  },
  methods: {
    // 3. 随机数方法
    getRandFn(min, max){
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    // 点击方法
    btnFn(){
      // 4. 调用产生一个随机的下标索引
      let index = this.getRandFn(0, this.jockArr.length - 1)
      // 5. 换出随机笑话字符串
      let str = this.jockArr[index]
      // 6. 设置给word变量 - 页面展示
      this.word = str;

      // this.word = this.jockArr[this.getRandFn(0, this.jockArr.length - 1)]
    }
  }
}
</script>