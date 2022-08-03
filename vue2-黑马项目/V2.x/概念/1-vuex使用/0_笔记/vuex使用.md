# Day01_vuex

## 今日学习目标(边讲边练)

* 跨组件通信能力
* vuex的基础使用
* 购物车案例-改装

## 1.vuex介绍

### 目标

- 什么是vuex
- 为什么学习vuex

### 通信方案

![image-20210323175925844](images/image-20210323175925844.png)



| 组件关系   | 数据通信                       |
| ---------- | ------------------------------ |
| 父子关系   | 父传子：props ； 子传父：$emit |
| 非父子关系 | vuex (一种组件通信方案)        |

### vuex是什么

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用**集中式**存储管理数据，以相应的规则保证状态以一种可预测的方式发生变化

![image-20210323180002533](images/image-20210323180002533.png)

### vuex为何学

程序页面多, 数据变量多

1. 不同组件数据**保持同步**
2. 数据的修改都是**可追踪**

一个户外商店有两名员工，张三和李四

一天的早上，他们分别对**帐篷的数量**做了一次盘点，发现一共有三个帐篷

张三卖出去俩个，他以为库存里还有**一个**

李四卖出去一个，他以为库存里还有**两个**

而事实上是，库存现在已经为**零**

如果他们再接受客户的预订，就会出现库存**不足**的情况

> 张三和李四因为没有保持库存的数量的同步导致了尴尬，这个就是所谓的`数据保持同步 `
>
> 店长需要知道, 谁卖出了多少个帐篷，这个行为我们称之为`数据修改是可追踪的`

图示:

![image-20210601212946879](images/image-20210601212946879.png)

### vuex中存什么

**多个组件共享状态**，才存储在vuex中

某个组件中的私有数据，依旧存储在data中

例如：

- 登陆的用户名需要在**首页**, **个人中心**, **结算**页面使用, 用户名存在vuex中

- 文章详情数据, 只有在文章详情页查看, 在自身data中声明

### 小结

1. 什么是vuex
   * vuex是Vue官方推荐的集中式状态管理机制
2. 为何学vuex
   * 数据同步, 集中管理
3. vuex中存什么
   * 多个组件共享的值

## 2.vuex学习内容

### 目标

* 知道vuex要学习什么

### 核心概念

1. 官网地址: https://vuex.vuejs.org/zh/

2. 安装(固定)

3. 配置项(固定)

   | 配置项        | 含义           | 注意                         |
   | ------------- | -------------- | ---------------------------- |
   | **state**     | 单一状态树     | 类似data                     |
   | **mutations** | 数据管家(同步) | 唯一修改state地方            |
   | actions       | 异步请求       | 要改state需要提交给mutations |
   | getters       | vuex计算属性   | 类似computed                 |
   | modules       | 模块拆分       |                              |

### 图示关系

单一定义store对象, 里面5个配置项, 在任意组件可以使用

![image-20210625120835921](images/image-20210601215035990.png)

### 小结

1. vuex五个核心概念是?
   * state / mutations / actions / getters / modules

## 3.vuex例子准备

### 目标

* 创建项目, 为学习准备
  * 需求1: App.vue(作为根组件)
  
  * 需求2: 子组件Add和子组件Sub, 嵌入在App.vue里
  
  * 需求3: 三个组件共享库存数据(**保持同步**)
  
    ![vuex例子](images/vuex例子.gif)



### 工程准备

1. 初始化新的工程 vuex-demo

   ```js
   vue create vuex-demo
   ```

2. 清空欢迎界面

3. 并设置如下三个组件, 目录如下：

   ```js
   |-components
   |---AddItem.vue
   |---SubItem.vue
   |-App.vue
   ```

### App.vue

> 复制标签和样式, 引入AddItem和SubItem2个子组件显示

```vue
<template>
  <div id="app">
    <h1>根组件</h1>
    <span>库存总数:</span>
    <input type="text">
    <div style="border:1px solid black; width: 300px;">
      <AddItem></AddItem>
    </div>
    <hr>
    <div style="border:1px solid black; width: 300px;">
      <SubItem></SubItem>
    </div>
  </div>
</template>

<script>
import AddItem from '@/components/AddItem'
import SubItem from '@/components/SubItem'
export default {
  components: {
    AddItem,
    SubItem
  }
}
</script>

<style>
#app {
  width: 300px;
  margin: 20px auto;
  border:1px solid #ccc;
  padding:4px;
}
</style>
```

### AddItem.vue

```vue
<template>
  <div>
      <h3>AddItem组件</h3>
      <p>已知库存数: 0</p>
      <button>库存+1</button>
  </div>
</template>

<script>
export default {

}
</script>
```

### SubItem.vue

```vue
<template>
  <div>
      <h3>SubItem组件</h3>
      <p>已知库存数: 0</p>
      <button>库存-1</button>
  </div>
</template>

<script>
export default {

}
</script>
```

### 小结

1. App下套用了AddItem和SubItem, 要在3个组件共享一个数据

## 4.vuex-store准备

### 目标

* 创建store仓库
* 注入到Vue项目中

### store概念

每个 Vuex 应用的核心 store（仓库）, 包含5个核心概念

![image-20210626135859118](images/image-20210626135859118.png)

### vuex目录

和路由模块router/index.js - 类似, 维护项目目录的整洁，新建src/store/index.js文件

>  当然， 这个步骤并不是必需的

![image-20210323183824648](images/image-20210323183824648.png)

### 使用步骤

1. 工程中 - 下载vuex

   ```bash
   yarn add vuex
   ```

2. store/index.js - 创建定义导出store对象

   ```js
   // 目标: 创建store仓库对象
   // 1. 下载vuex: 终端命令(yarn add vuex)
   // 2. 引入vuex
   import Vue from 'vue'
   import Vuex from 'vuex'
   // 3. 注册
   Vue.use(Vuex)
   // 4. 实例化store对象
   const store = new Vuex.Store({})
   // 5. 导出store对象
   export default store
   ```

3. main.js - 导入注入到Vue中

   ```js
   import Vue from 'vue'
   import App from './App.vue'
   import store from '@/store' // 导入store对象
   
   Vue.config.productionTip = false
   
   new Vue({
     // 6. 注入到Vue实例中(确保组件this.$store使用) // this.$store = store
     store,
     render: h => h(App),
   }).$mount('#app')
   
   ```

请再次回忆一下vue-router的用法，是不是很像？

### 小结

1. vuex的核心是什么?

   * store对象(包含5个核心属性)

2. 如何创建store对象?

   * 工程下载vuex模块
   * store/index.js
     * 引入注册
     * 生成store对象导出
     * main.js - 导入注入

## 5.vuex-state数据源

### 目标

* 定义state
* 直接使用state
* 辅助函数mapState

> state是唯一的公共数据源，统一存储

### 定义state

在store/index.js定义state

语法:

```js
/*
const store = new Vuex.Store({
    state: {
        变量名: 初始值
    }
})	
*/
```

具体代码:

```js
const store = new Vuex.Store({
    state: {
        count: 100 // 库存
    }
})
```

### 使用state2种方式

* 方式1: 组件内 - **直接**使用

  语法: 

  ```js
  this.$store.state.变量名
  ```

* 方式2: 组件内 - **映射**使用 (推荐)

  语法:

  ```js
  // 1. 拿到mapState辅助函数
  import { mapState } from 'vuex'
  export default {
      computed: {
          // 2. 把state里变量映射到计算属性中
          ...mapState(['state里的变量名'])
      }
  }
  ```

### AddItem直接用

```vue
<template>
  <div>
      <h3>AddItem组件</h3>
      <p>已知库存数: {{ $store.state.count }}</p>
      <button>库存+1</button>
  </div>
</template>
```

### App.vue直接用

计算属性count, 和输入框的v-model双向绑定

```vue
<input type="text" v-model="count">

<script>
export default {
  computed: {
    count: {
      set(){},
      get(){
        return this.$store.state.count
      }
    }
  }
}
</script>
```

### SubItem映射用

```vue
<template>
  <div>
      <h3>SubItem组件</h3>
      <p>已知库存数: {{ count }}</p>
      <button>库存-1</button>
  </div>
</template>

<script>
// 需求1: 映射state到计算属性
// 1. 拿到辅助函数 mapState
// 2. 在computed内, ...mapState(['state变量名'])
// 3. 当计算属性使用
import { mapState } from 'vuex'
// let r = mapState(['count']) // 提取store里的state叫count的变量
// console.log(r); // 返回值: {count: 函数体(return state里count的值)}

export default {
  computed: {
    // 映射count, 得到对象展开, 合并到计算属性中
    ...mapState(['count'])
  },
}
</script>
```

整个过程的示意图如下

![image-20210323201917787](images/image-20210323201917787.png)

### 注意

state是响应式的, 只要state值变化, 页面上使用的地方会自动更新同步

### 小结

1. state作用?

   定义全局状态数据源

2. state如何定义?

   在store内, state: {变量名: 初始值}

3. state的值如何用到具体vue组件内?

   * 直接使用 this.$store.state.变量名
   * 映射使用 ...mapState(['state的变量名'])

## 6.vuex-mutations定义-同步修改

### 目标

- 定义mutations

### 定义mutations

> mutations类似数据管家, 操作state里的数据

在store/index.js定义mutations

语法:

```js
/*
const store  = new Vuex.Store({
	mutations: {
		函数名 (state, 可选值) {
			// 同步修改state值代码
		}
	}
})
*/
```

具体代码

```javascript
const store  = new Vuex.Store({
    state: {
        count: 100 // 库存
    },
	mutations: {
		addCount (state, value) { // 负责增加库存的管家
			state.count += value
		},
        subCount (state, value) { // 负责减少库存的管家
            state.count -= value
        },
        setCount (state, value) { // 负责直接修改库存的管家
            state.count = value;
        }
	}
})
```

### 注意

> 1. mutations是**唯一**能修改state的地方, 确保**调试工具**可以追踪变化
> 2. mutations函数内, 只能写同步代码, 调试工具可追踪变化过程
>    * 因为调试工具要**立刻**产生一次记录, 所以必须是同步的

### 小结

1. mutations里函数作用?

   * 负责修改state里的数据

2. mutations只能写什么样的代码?

   * 同步流程的代码

## 7.vuex-mutations使用

### 目标

- 使用mutations2种方式
- mutations注意事项

### 使用mutations的2种方式

* 方式1: 组件内 - **直接**使用

  语法:

  ```js
  this.$store.commit("mutations里的函数名", 具体值)
  ```

* 方式2: 组件内 - **映射**使用

  语法:

  ```js
  // 1. 拿到mapMutations辅助函数
  import { mapMutations } from 'vuex'
  export default {
      methods: {
          // 2. 把mutations里方法映射到原地
          ...mapMutations(['mutations里的函数名'])
      }
  }
  ```

### AddItem直接用

* 点击事件绑定
* 提交mutations传入值

```vue
<button @click="addFn">库存+1</button>

<script>
export default {
  methods: {
    addFn(){
      this.$store.commit('addCount', 1)
    }
  }
}
</script>
```

### App.vue直接用

* 触发计算属性的set方法
* 提交mutations传入值

```vue
<span>库存总数: </span>
<input type="text" v-model="count">

<script>
export default {
  computed: {
    count: {
      set(val){
        this.$store.commit('setCount', val) // 把表单值提交给store下的mutations
      },
      get(){
        return this.$store.state.count
      }
    }
  }
}
</script>
```

### SubItem映射用

* 点击事件
* 映射mutations的方法
* 调用mutations方法传值

```vue
<button @click="subFn">库存-1</button>

<script>
// 需求2: 映射mutations到方法里
// 1. 拿到辅助函数 mapMutations
// 2. 在methods内, ...mapMutations(['mutations函数名'])
// 3. 当普通方法使用

import { mapMutations } from 'vuex'
export default {
  methods: {
    ...mapMutations(['subCount']),
    subFn(){
      this.subCount(1)
    }
  }
}
</script>
```

### 注意

> mutations函数上, 只能接收**一个参数值**, 如果传对个, 请传一个对象

### 小结

1. mutations有哪2种使用方式?

   直接使用 this.$store.commit()

   映射使用 mapMutations把方法映射到组件内直接调用

2. state, mutations, 视图组件, 3个关系是什么?

   



![](asset/mutation.jpg)

## 8.vuex-actions定义-异步修改

### 目标

- 定义actions

### 定义actions

在store/index.js定义actions

语法:

```js
/*
const store = new Vuex.Store({
	actions: {
		函数名 (store, 可选值) {
			// 异步代码, 把结果commit给mutations给state赋值
		}
	}
})
*/
```

具体代码:

```js
const store  = new Vuex.Store({
    // ...省略state和mutations此处
    actions: {
        asyncAddCount(store, num){
            setTimeout(() => { // 1秒后, 异步提交给add的mutations
                store.commit('addCount', num)
            }, 1000)
        },
        asyncSubCount(store, num) {
            setTimeout(() => { // 1秒后, 异步提交给sub的mutations
                store.commit('subCount', num)
            }, 1000)
        }
    }
})
```

### 小结

1. actions和mutations区别?

   mutations里同步修改state

   actions里放入异步操作

2. actions是否能操作state?

   不建议, 要commit给mutations(为调试工具可追踪)

3. actions和mutations里函数, 第一个形参分别是什么?

   mutations的是state

   actions的是store

## 9.vuex-actions使用

### 目标

* 使用actions

### 使用actions的2种方式

* 方式1: 组件内 - **直接**使用

  语法:

  ```js
  this.$store.dispatch('actions函数名', 具体值)
  ```

* 方式2: 组件内 - **映射**使用

  语法:

  ```js
  // 1. 拿到mapActions辅助函数
  import { mapActions } from 'vuex'
  export default {
      methods: {
          // 2. 把actions里方法映射到原地
          ...mapActions(['actions里的函数名'])
      }
  }
  ```

### AddItem直接用

* 点击事件
* dispatch触发action

```vue
<button @click="asyncAddFn">延迟1秒, 库存+5</button>

<script>
export default {
  methods: {
    asyncAddFn(){
      this.$store.dispatch('asyncAddCount', 5)
    }
  }
}
</script>
```

### SubItem映射用

* 点击事件
* 映射actions的方法
* 调用actions的方法传值

```vue
<button @click="asyncSubFn">延迟1秒, 库存-5</button>

<script>
// 需求3: 映射actions到方法里
// 1. 拿到辅助函数 mapActions
// 2. 在methods内, ...mapActions(['actions函数名'])
// 3. 当普通方法使用

import { mapActions } from 'vuex'
export default {
  methods: {
    ...mapActions(['asyncSubCount']),
    asyncSubFn(){
      this.asyncSubCount(5)
    }
  }
}
</script>
```

### 小结

1. actions使用方式?

   方式1: this.$store.dispatch('actions方法名字', 值)

   方式2: ...mapActions(['actions里的方法名']) 映射到原地使用

2. 视图组件, state, mutations, actions的关系是?

![](asset/action-state.png)

## 10.vuex-重构购物车-准备Store

### 目标

- 在现有项目如何集成vuex

### store准备

1. 复制预习资料<shopcar-模板>到自己今天文件夹下
2. 下载vuex
3. store/index.js创建导出store对象
4. main.js把store引入, 然后注入到Vue实例

### 小结

1. 现有项目如何集成vuex

   下载vuex

   创建store对象并注入到Vue实例中

## 11.vuex-重构购物车-配置项(上午结束)

### 目标

* 准备state和mutations还有actions

### 配置项准备

1. 定义state - 保存商品列表数组

```js
state: {
    goodsList: [] // 列表
}
```

2. 定义mutations - 给state里变量赋值

```js
mutations: {
    setGoodsList(state, newList) {
        state.goodsList = newList
    }
}
```

3. 定义actions - 异步请求数据提交给mutations

```js
actions: {
    async asyncGetGoodsList(store) {
        const url = `https://www.escook.cn/api/cart`
        // 发送异步请求
        const res = await axios({ url: url });
        store.commit('setGoodsList', res.data.list) // 提交mutation修改state中的数据
    }
}
```

### App.vue使用vuex

* 把vuex商品数组映射回来使用
* 网络请求调用actions方法

```vue
<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({list: 'goodsList'}) // 自定义原地属性名list, 映射vuex里的goodsList变量值
  },
  created(){
    this.asyncGetGoodsList()
  },
  methods: {
    ...mapActions(['asyncGetGoodsList']),
    allFn(bool){
      this.list.forEach(obj => obj.goods_state = bool)
    }
  }
}
</script>
```

### 小结

1. mapState可以改变映射到原地的计算属性名吗?

   可以的, 格式...mapState({''计算属性名', 'state里要映射的变量名'})

## 12.vuex-getters定义-计算属性

### 目标

* getters概念
* 定义getters

### getters概念

vuex身上的全局状态-计算属性, 类似于computed

getters 依赖于 state中原始数据的变化，并返回计算后的新数据

### 定义getters

在store/index.js定义getters

语法:

```js
/*
const store = new Vuex.Store({
	getters: {
		计算属性名 (state) {
			return 值给计算属性
		}
	}
})
*/
```

具体代码

```js
const store = new Vuex.Store({
    // ...省略其他
    getters: {
        allCount(state) {
            return state.goodsList.reduce((sum, obj) => {
                if (obj.goods_state === true) { // 选中商品才累加数量
                    sum += obj.goods_count;
                }
                return sum;
            }, 0)
        },
        allPrice(state) {
            return state.goodsList.reduce((sum, obj) => {
                if (obj.goods_state) {
                    sum += obj.goods_count * obj.goods_price
                }
                return sum;
            }, 0)
        }
    }
})
```

### 小结

1. getters有什么用?

   vuex里的计算属性, 属于全局计算属性, 类似computed

## 13.vuex-getters使用

### 目标

* 组件内使用getters

### 使用getters的2种方式

* 方式1: 组件内 - **直接**使用

  语法:

  ```js
  this.$store.getters.计算属性名
  ```

* 方式2: 组件内 - **映射**使用

  语法:

  ```js
  // 1. 拿到mapGetters辅助函数
  import { mapGetters } from 'vuex'
  export default {
  	computed: {
          // 2. 把getters里属性映射到原地
        ...mapGetters(['getters里的计算属性名'])
      }   
  }
  ```

### MyFooter.vue里使用

* 使用2种方式给计算属性值

```vue
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    allCount(){
     return this.$store.getters.allCount;
    },
    ...mapGetters(['allPrice'])
  }
}
</script>
```

### 小结

1. getters如何使用?

   方式1: this.$store.getters.计算属性名

   方式2: ...mapGetters(['getters里计算属性名'])

## 14.vuex-modules定义-分模块

### 目标

* 为何要分模块
* modules定义

### 为何分模块

![image-20210326113544941](images/image-20210326113544941.png)

### 代码上的对比

![image-20210626234048113](images/image-20210626234048113.png)

### 创建modules模块对象

* 新建store/modules/user.js
* 新建store/modules/cart.js

语法: 对象里包含5个核心概念, 只有state变成函数形式

user.js - 用户模块对象

```js
// 用户模块对象
const userModule = {
    state(){
        return {
            name: "",
            age: 0,
            sex: ''
        }
    },
    mutations: {},
    actions: {},
    getters: {}
}
export default userModule
```

cart.js - 购物车模块对象

```js
// 购物车模块对象
import axios from 'axios'
const cartModule = {
    state() {
        return {
            goodsList: []
        }
    },
    mutations: {
        setGoodsList(state, newList) {
            state.goodsList = newList
        }
    },
    actions: {
        async asyncGetGoodsList(store) {
            const url = `https://www.escook.cn/api/cart`
            // 发送异步请求
            const res = await axios({ url: url });
            store.commit('setGoodsList', res.data.list) // 提交mutation修改state中的数据
        }
    },
    getters: {
        allCount(state) {
            return state.goodsList.reduce((sum, obj) => {
                if (obj.goods_state === true) { // 选中商品才累加数量
                    sum += obj.goods_count;
                }
                return sum;
            }, 0)
        },
        allPrice(state) {
            return state.goodsList.reduce((sum, obj) => {
                if (obj.goods_state) {
                    sum += obj.goods_count * obj.goods_price
                }
                return sum;
            }, 0)
        }
    }
}
export default cartModule
```

### 定义modules

语法: 

```js
modules: {
    模块名: 模块对象
}
```

* 把2个模块对象, 引回到store里注册

```js
import Vue from 'vue'
import Vuex from 'vuex'
import cartModule from './modules/cart'
import userModule from './modules/user'
Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        user: userModule,
        cart: cartModule
    }
})
export default store
```

### 小结

1. 为什么分模块?

   集中式管理项目过大, 变量过多, 会导致state臃肿, 难以维护

2. 如何分模块?

   定义**模块对象**, state变成函数返回对象形式, 每个模块都有state/mutations/actions/getters/modules

3. 根store如何注册?

   modules里 { 模块名: **模块对象** }

## 15.分模块-影响state取值方式

### 目的

* 只要分模块, state取值方式改变, 其他暂时不变

### state使用方式修改

* 方式1: 组件内 - **直接**使用

  原语法:

  ```js
  this.$store.state.变量名
  ```

  分模块后语法:

  ```js
  this.$store.state.模块名.变量名
  ```

* 方式2: 组件内 - **映射**使用

  原语法:

  ```js
  ...mapState(['state里变量名'])
  ...mapState({'变量名': "state里变量名"}) // 给映射过来的state起别的名字
  ```

  分模块后语法:

  ```js
  ...mapState({
      '变量名': state => state.模块名.变量名
  })
  ```

### App.vue-修改

```js
computed: {
    // ...mapState({list: 'goodsList'}) // 本地属性名list, 映射vuex里的goodsList变量值
    // 方式1: 直接用
    // list(){ // 这个list就是组件内普通的计算属性名
    //     return this.$store.state.cart.goodsList 
    // }.
    // 方式2: 映射方式改变
    ...mapState({'list': state => state.cart.goodsList})
},
```

### 小结

1. 分模块对什么有影响?

   对state的取值方式有影响, 对其他暂无影响

2. state如何取值?

   在组件使用的时候, 要state.模块名.变量名

## 16.分模块-命名空间

### 目标

* 防止多个模块之间, mutations/actions/getters的名字冲突

### 开启命名空间

在模块对象内设置`namespaced: true`

```js
const moduleShopCar = {
    namespaced: true,
    state () {},
    mutations: {},
    actions: {},
    getters: {},
    modules: {}
}
```

### state使用方式修改

* 直接使用无变化: this.$store.state.模块名.变量名

* 辅助函数需要遵守格式

  ```js
  ...mapState("模块名", ['state变量名'])
  ```

### mutations使用方式修改

* 方式1: 组件内 - **直接**使用

  * 原语法:

    ```js
    this.$store.commit("mutations里的函数名", 具体值)
    ```

  * 开命名空间后语法:

    ```js
    this.$store.commit("模块名/mutations里的函数名", 具体值)
    ```

* 方式2: 组件内 - **映射**使用

  * 原语法:

    ```js
    ...mapMutations(['mutations里方法名'])
    ```

  * 开命名空间后语法:

    ```js
    ...mapMutations("模块名", ['mutations里方法名'])
    ```

### actions使用方式修改

* 方式1: 组件内 - **直接**使用

  * 原语法:

    ```js
    this.$store.dispatch("actions里的函数名", 具体值)
    ```

  * 开命名空间后语法:

    ```js
    this.$store.dispatch("模块名/actions里的函数名", 具体值)
    ```

* 方式2: 组件内 - **映射**使用

  * 原语法:

    ```js
    ...mapActions(['actions里方法名'])
    ```

  * 开命名空间后语法:

    ```js
    ...mapActions("模块名", ['actions里方法名'])
    ```

### getters使用方式修改

* 方式1: 组件内 - **直接**使用

  * 原语法:

    ```js
    this.$store.getters.计算属性名
    ```

  * 开命名空间后语法:

    ```js
    this.$store.getters['模块名/计算属性名']
    ```

* 方式2: 组件内 - **映射**使用

  * 原语法:

    ```js
    ...mapGetters(['getters里计算属性名'])
    ```

  * 开命名空间后语法:

    ```js
    ...mapGetters("模块名", ['getters里计算属性名'])
    ```

### 小结

1. state和mutations, 在根store和开启命名空间里的区别?



![image-20210604084953510](images/image-20210604084953510.png)

2. 整个vuex的体系是?

   ![image-20210624225100101](images/image-20210624225100101.png)

## 扩展: 使用Devtools调试vuex数据

> 优秀的调试工具可以使我们写程序事半功倍，最后我们再学习一下如果使用dev-tools来调试vuex中的数据，这也是数据可预测特性里不可缺少的一环

### 目标

- 掌握dev-tools调试vuex
- 理解什么是数据状态是可追踪的

### 如何进行调试

注意只有vue+vuex的项目才可以用

![](asset/mutation1.png)

### 调试信息说明

![](asset/mutation2.png)
