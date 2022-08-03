<template>
  <div>
    <table width=800 style="text-align: center; margin: 0 auto;" border=1>
            <caption>欢迎光临_vue开发的收银系统_水果店</caption>
            <tr>
                <th>苹果 {{ price }} ¥ / 斤, 折扣 &lt; {{ dis * 10 }} 折 &gt;</th>
            </tr>
            <tr>
                <td>
                    请输入你要购买的斤数 <input type="number" v-model.number="count"   placeholder="斤数">
                </td>
            </tr>
            <tr>
                <td>
                    <button @click="celFn">结账买单~</button>
                </td>
            </tr>
            <tr>
                <td>
                    结账单:
                    <span>总价: {{ allPrice }} ¥元</span>
                    <span>折后价:  {{ disPrice }} ¥元</span>
                    <span>省了: {{ savePrice }}  ¥元</span>
                </td>
            </tr>
        </table>
  </div>
</template>

<script>
// 总结:
// 1. 明确需求, html+css
// 2. 数据准备好变量, 用到页面上
// 3. 点击事件交互效果
// 4. 实现计算过程
export default {
    data(){
        return{
            price: 10, // 单价
            dis: 0.8, // 折扣
            count: 0, // 斤数
            allPrice: 0, // 总价
            disPrice: 0, // 折扣价
            savePrice: 0 // 省了多钱
        }
    },
    methods: {
        celFn(){
            this.allPrice = this.price * this.count;
            this.disPrice = this.allPrice * this.dis;
            this.savePrice = this.allPrice - this.disPrice;
        }
    }
}
</script>

<style>

</style>