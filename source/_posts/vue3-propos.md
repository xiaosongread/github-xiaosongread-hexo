---
layout: vue3
title: vue3 通信方式
date: 2023-08-15 22:00:01
tags:
---

## vue3 通信方式
本文会涉及的知识点：

* [Props](#Props)
* [emits](#emits)
* [expose / ref](#expose/ref)
* [v-model](#v-model)
* [插槽 slot](#插槽 slot)
* [provide / inject](#provide / inject)
* [总线 bus](#总线 bus)
* [getCurrentInstance](#getCurrentInstance)
* [Vuex](#Vuex)
* [Pinia](#Pinia)
* [mitt.js](#mitt.js)

<!-- more -->

(本文测试代码)[https://github.com/xiaosongread/vue3-template]

### Props
父组件向子组件传递数据，子组件通过 props 接收数据。

[props 文档](https://v3.cn.vuejs.org/guide/component-props.html)

**父组件**
```js
// Parent.vue

<template>
  <!-- 使用子组件 -->
  <Child :msg="message" />
</template>

<script setup>
import Child from './components/Child.vue' // 引入子组件

let message = '雷猴'
</script>
```

**子组件**
```js
// Child.vue

<template>
  <div>
    {{ msg }}
  </div>
</template>

<script setup>

const props = defineProps({
  msg: {
    type: String,
    default: ''
  }
})

console.log(props.msg) // 在 js 里需要使用 props.xxx 的方式使用。在 html 中使用不需要 props

</script>
```

在 script setup 中必须使用 defineProps API 来声明 props，它具备完整的推断并且在 script setup 中是直接可用的。

在 script setup 中，defineProps 不需要另外引入。

props 其实还能做很多事情，比如：
设置默认值 default ，
类型验证 type ，
要求必传 required ，
自定义验证函数 validator 等等。

### emits

子组件通知父组件触发一个事件，并且可以传值给父组件。（简称：子传父）

[emits 文档](https://v3.cn.vuejs.org/guide/migration/emits-option.html)
**父组件**
```js
// Parent.vue

<template>
  <div>父组件：{{ message }}</div>
  <!-- 自定义 changeMsg 事件 -->
  <Child @changeMsg="changeMessage" />
</template>

<script setup>
import { ref } from 'vue'
import Child from './components/Child.vue'

let message = ref('雷猴')

// 更改 message 的值，data是从子组件传过来的
function changeMessage(data) {
  message.value = data
}
</script>
```

**子组件**
```js

// Child.vue

<template>
  <div>
    子组件：<button @click="handleClick">子组件的按钮</button>
  </div>
</template>

<script setup>

// 注册一个自定义事件名，向上传递时告诉父组件要触发的事件。
const emit = defineEmits(['changeMsg'])

function handleClick() {
  // 参数1：事件名
  // 参数2：传给父组件的值
  emit('changeMsg', '鲨鱼辣椒')
}

</script>
```

和 props 一样，在 script setup 中必须使用 defineEmits API 来声明 emits，它具备完整的推断并且在 script setup 中是直接可用的。

### expose/ref
子组件可以通过 expose 暴露自身的方法和数据。

父组件通过 ref 获取到子组件并调用其方法或访问数据。

[expose 文档](https://v3.cn.vuejs.org/guide/component-basics.html#%E5)

**父组件**
```js
// Parent.vue

<template>
  <div>父组件：拿到子组件的message数据：{{ msg }}</div>
  <button @click="callChildFn">调用子组件的方法</button>

  <hr>

  <Child ref="com" />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Child from './components/Child.vue'

const com = ref(null) // 通过 模板ref 绑定子组件

const msg = ref('')

onMounted(() => {
  // 在加载完成后，将子组件的 message 赋值给 msg
  msg.value = com.value.message
})

function callChildFn() {
  // 调用子组件的 changeMessage 方法
  com.value.changeMessage('蒜头王八')

  // 重新将 子组件的message 赋值给 msg
  msg.value = com.value.message
}
</script>
```

**子组件**
```js
// Child.vue

<template>
  <div>子组件：{{ message }}</div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('蟑螂恶霸')

function changeMessage(data) {
  message.value = data
}

// 使用 defineExpose 向外暴露指定的数据和方法
defineExpose({
  message,
  changeMessage
})

</script>
```
在 script setup 中，defineExpose 不需要另外引入。

### v-model

v-model 是 Vue 的一个语法糖。

#### 单值的情况
组件上的 v-model 使用 modelValue 作为 prop 和 update:modelValue 作为事件。

[v-model 参数文档](https://v3.cn.vuejs.org/api/directives.html#v-model)

**父组件**

```js

// Parent.vue

<template>
  <Child v-model="message" />
</template>

<script setup>
import { ref } from 'vue'
import Child from './components/Child.vue'

const message = ref('雷猴')
</script>
```

**子组件**

```js
// Child.vue

<template>
  <div @click="handleClick">{{modelValue}}</div>
</template>

<script setup>
import { ref } from 'vue'

// 接收
const props = defineProps([
  'modelValue' // 接收父组件使用 v-model 传进来的值，必须用 modelValue 这个名字来接收
])

const emit = defineEmits(['update:modelValue']) // 必须用 update:modelValue 这个名字来通知父组件修改值

function handleClick() {
  // 参数1：通知父组件修改值的方法名
  // 参数2：要修改的值
  emit('update:modelValue', '喷射河马')
}

</script>
```
子组件你也可以这么简单写：
```js
// Child.vue

<template>
  <div @click="$emit('update:modelValue', '喷射河马')">{{modelValue}}</div>
</template>

<script setup>
import { ref } from 'vue'

// 接收
const props = defineProps([
  'modelValue' // 接收父组件使用 v-model 传进来的值，必须用 modelValue 这个名字来接收
])

</script>
```

#### 多个 v-model 绑定

**父组件**

```js
// Parent.vue

<template>
  <Child v-model:msg1="message1" v-model:msg2="message2" />
</template>

<script setup>
import { ref } from 'vue'
import Child from './components/Child.vue'

const message1 = ref('雷猴')

const message2 = ref('蟑螂恶霸')
</script>
```

**子组件**

```js
// Child.vue

<template>
  <div><button @click="changeMsg1">修改msg1</button> {{msg1}}</div>

  <div><button @click="changeMsg2">修改msg2</button> {{msg2}}</div>
</template>

<script setup>
import { ref } from 'vue'

// 接收
const props = defineProps({
  msg1: String,
  msg2: String
})

const emit = defineEmits(['update:msg1', 'update:msg2'])

function changeMsg1() {
  emit('update:msg1', '鲨鱼辣椒')
}

function changeMsg2() {
  emit('update:msg2', '蝎子莱莱')
}

</script>
```

#### v-model 修饰符

```js
// Parent.vue

<template>
  <Child v-model.uppercase="message" />
</template>

<script setup>
import { ref } from 'vue'
import Child from './components/Child.vue'

const message = ref('hello')
</script>
```

```js
<template>
  <div>{{modelValue}}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps([
  'modelValue',
  'modelModifiers'
])

const emit = defineEmits(['update:modelValue'])

onMounted(() => {
  // 判断有没有 uppercase 修饰符，有的话就执行 toUpperCase() 方法
  if (props.modelModifiers.uppercase) {
    emit('update:modelValue', props.modelValue.toUpperCase())
  }
})

</script>
```

### 插槽 slot
插槽可以理解为传一段 HTML 片段给子组件。子组件将 slot 元素作为承载分发内容的出口。

#### 默认插槽
插槽的基础用法非常简单，只需在 子组件 中使用 slot 标签，就会将父组件传进来的 HTML 内容渲染出来。

[默认插槽 文档](https://cn.vuejs.org/guide/components/slots.html)

```js
// Parent.vue

<template>
  <Child>
    <div>雷猴啊</div>
  </Child>
</template>
```

```js
// Child.vue

<template>
  <div>
    <slot></slot>
  </div>
</template>
```

#### 具名插槽
具名插槽 就是在 默认插槽 的基础上进行分类，可以理解为对号入座。

```js
// Parent.vue

<template>
  <Child>
    <template v-slot:monkey>
      <div>雷猴啊</div>
    </template>

    <button>鲨鱼辣椒</button>
  </Child>
</template>
```

```js
// Child.vue

<template>
  <div>
    <!-- 默认插槽 -->
    <slot></slot>
    <!-- 具名插槽 -->
    <slot name="monkey"></slot>
  </div>
</template>
```

父组件需要使用 template 标签，并在标签上使用 v-solt: + 名称 。

子组件需要在 slot 标签里用 name= 名称 对应接收。

这就是 对号入座。

> 插槽内容的排版顺序，是 以子组件里的排版为准。

#### 作用域插槽

如果你用过 Element-Plus 这类 UI框架 的 Table ，应该就能很好的理解什么叫作用域插槽。

<img src="/images/img-folder/2023/slot.png">

```js
// Parent.vue

<template>
  <!-- v-slot="{scope}" 获取子组件传上来的数据 -->
  <!-- :list="list" 把list传给子组件 -->
  <Child v-slot="{scope}" :list="list">
    <div>
      <div>名字：{{ scope.name }}</div>
      <div>职业：{{ scope.occupation }}</div>
      <hr>
    </div>
  </Child>
</template>

<script setup>
import { ref } from 'vue'
import Child from './components/Child.vue'

const list = ref([
  { name: '雷猴', occupation: '打雷'},
  { name: '鲨鱼辣椒', occupation: '游泳'},
  { name: '蟑螂恶霸', occupation: '扫地'},
])
</script>
```
```js
// Child.vue

<template>
  <div>
    <!-- 用 :scope="item" 返回每一项 -->
    <slot v-for="item in list" :scope="item" />
  </div>
</template>

<script setup>
const props = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
</script>
```

### provide / inject

遇到多层传值时，使用 props 和 emit 的方式会显得比较笨拙。这时就可以用 provide 和 inject 了。
provide 是在父组件里使用的，可以往下传值。
inject 是在子(后代)组件里使用的，可以往上取值。

> 无论组件层次结构有多深，父组件都可以作为其所有子组件的依赖提供者。

[provide / inject 文档](https://cn.vuejs.org/guide/components/provide-inject.html#prop-drilling)

<img src="https://cn.vuejs.org/assets/provide-inject.3e0505e4.png">

```js
// Parent.vue

<template>
  <Child></Child>
</template>

<script setup>
import { ref, provide, readonly } from 'vue'
import Child from './components/Child.vue'

const name = ref('猛虎下山')
const msg = ref('雷猴')

// 使用readonly可以让子组件无法直接修改，需要调用provide往下传的方法来修改
provide('name', readonly(name))

provide('msg', msg)

provide('changeName', (value) => {
  name.value = value
})
</script>
```
```js
// Child.vue

<template>
  <div>
    <div>msg: {{ msg }}</div>
    <div>name: {{name}}</div>
    <button @click="handleClick">修改</button>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const name = inject('name', 'hello') // 看看有没有值，没值的话就适用默认值（这里默认值是hello）
const msg = inject('msg')
const changeName = inject('changeName')

function handleClick() {
  // 这样写不合适，因为vue里推荐使用单向数据流，当父级使用readonly后，这行代码是不会生效的。没使用之前才会生效。
  // name.value = '雷猴'

  // 正确的方式
  changeName('虎躯一震')

  // 因为 msg 没被 readonly 过，所以可以直接修改值
  msg.value = '世界'
}
</script>
```

> provide 可以配合 readonly 一起使用。
provide 和 inject 其实主要是用在深层关系中传值

### 总线bus

在 Vue2 有总线传值的方法，我们在 Vue3 中也可以自己模拟。
这个方式其实有点像 Vuex 或者 Pinia 那样，弄一个独立的工具出来专门控制数据。
但和 Vuex 或 Pinia 相比，我们自己写的这个方法并没有很好的数据跟踪之类的特性。

**原理**
我们创建一个 Bus.js 文件，用来控制数据和注册事件的。

Bus.js 里有一个 Bus 类

+ eventList 是必须项，用来存放事件列表的。
+ constructor 里除了 eventList 外，其他都是自定义数据，公共数据就是存在这里的。
+ $on 方法用来注册事件。
+ $emit 方法可以调用 $on 里的事件。
+ $off 方法可以注销 eventList 里的事件。

然后需要用到总线的组件，都导入 Bus.js ，就可以共同操作一份数据了。

**Bus.js**

```js
// Bus.js

import { ref } from "vue"

class Bus {
  constructor() {
    // 收集订阅信息，调度中心
    this.evenList = {}, // 事件列表，这项是必须的
    // 下面都是自定义值
    this.msg = ref('这是一条总线的信息')
  }

  // 订阅
  $on(name, fn) {
    this.evenList[name] = this.evenList[name] || []
    this.evenList[name].push(fn)
    console.log(this.evenList)
  }

  // 发布
  $emit(name, data) {
    if (this.evenList[name]) {
      this.evenList[name].forEach(fn => {
        fn(data)
      });
    }
  }

  // 取消调用
  $off(name) {
    if (this.evenList[name]) {
      delete this.evenList[name]
    }
  }
}

export default new Bus()
```

**parant.vue**

```js
// parent

<template>
  <div>
    <h1>Bus</h1>
    <div>
      父组件：
      <span style="margin-right: 30px;">message: {{ message }}</span>
      <span>msg: {{ msg }}</span>
    </div>
    <Child />
  </div>
</template>
<script setup>
import Bus from "../utils/Bus"
import Child from "../components/bus.vue"

const msg = ref(Bus.msg)
const message = ref('hello')

// 用监听的写法
Bus.$on('changeMsg', data => {
  message.value = data
})
</script>
```

**bus.vue**

```js
// child

<template>
  <div>
    子组件：
    <button @click="handleBusEmit">触发Bus.$emit</button>
    <button @click="changeBusMsg">修改总线里面的msg</button>
  </div>
</template>

<script setup>
import Bus from "../utils/Bus"

function handleBusEmit () {
  Bus.$emit('changeMsg', '触发emit并且修改了msg数据')
}

function changeBusMsg () {
  Bus.msg.value = '子组件修改了总线的值'
}
</script>
```

### getCurrentInstance

getcurrentinstance 是 vue 提供的一个方法，支持访问内部组件实例。

> getCurrentInstance 只暴露给高阶使用场景，典型的比如在库中。
强烈反对在应用的代码中使用 getCurrentInstance。请不要把它当作在组合式 API 中获取 this 的替代方案来使用。

说白了，这个方法 适合在开发组件库的情况下使用，不适合日常业务开发中使用。
getCurrentInstance **只能在 setup 或生命周期钩子中调用。**

在 script setup 中，我模拟了类似 $parent 和 $children 的方式。

```js
// Parent.vue

<template>
  <div>父组件 message 的值: {{ message }}</div>
  <button @click="handleClick">获取子组件</button>
  <Child></Child>
  <Child></Child>
</template>

<script setup>
import { ref, getCurrentInstance, onMounted } from 'vue'
import Child from './components/Child.vue'

const message = ref('雷猴啊')

let instance = null

onMounted(() => {
  instance = getCurrentInstance()
})

// 子组件列表
let childrenList = []

// 注册组件
function registrationCom(com) {
  childrenList.push(com)
}

function handleClick() {
  if (childrenList.length > 0) {
    childrenList.forEach(item => {
      console.log('组件实例：', item)
      console.log('组件名(name)：', item.type.name)
      console.log('组件输入框的值：', item.devtoolsRawSetupState.inputValue)
      console.log('---------------------------------------')
    })
  }
}

</script>
```

```js
// Child.vue

<template>
  <div>
    <div>----------------------------</div>
    子组件：<button @click="handleClick">获取父组件的值</button>
    <br>
    <input type="text" v-model="inputValue">
  </div>
</template>

<script>
export default {
  name: 'ccccc'
}
</script>

<script setup>
import { getCurrentInstance, onMounted, nextTick, ref } from 'vue'

const inputValue = ref('')

let instance = null

onMounted(() => {
  instance = getCurrentInstance()
  nextTick(() => {
    instance.parent.devtoolsRawSetupState.registrationCom(instance)
  })

})

function handleClick() {
  let msg = instance.parent.devtoolsRawSetupState.message
  msg.value = '哈哈哈哈哈哈'
}

</script>
```

### Vuex

Vuex 主要解决 跨组件通信 的问题。

在 Vue3 中，需要使用 Vuex v4.x 版本。

```js
// store/index.js

import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
```

在 store/index.js 下输入以上内容。

+ state：数据仓库，用来存数据的。
+ getters：获取数据的，有点像 computed 的用法(个人觉得)。
+ mutations: 更改 state 数据的方法都要写在 mutations 里。
+ actions：异步的方法都写在这里，但最后还是需要通过 mutations 来修改 state 的数据。
+ modules：分包。如果项目比较大，可以将业务拆散成独立模块，然后分文件管理和存放。

然后在 src/main.js 中引入

```js
// main.js
import { createApp } from 'vue'
import store from '@/store'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App).use(router).use(store).mount('#app')
```

```js
// store/modules/app.js
import { getListData } from "@/api/login";
export default {
  namespaced: true,
  state: {
    sidebar: '123',
    listData: []
  },
 
  mutations: {
    TOGGLE_SIDEBAR: state => {
      state.sidebar = '2222'
    },
    SET_LIST_DATA: (state, listData) => {
      console.log('listdata-state:', listData)
      state.listData = listData
    }
  },
 
  actions: {
    toggleSideBar({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    async getListDataAction({ commit, state }, params) {
      await getListData()
        .then((res) => {
          // 处理返回结果，例如转换成对应的符合业务需求的数据结构
          console.log("接口数据:", res)
          commit("SET_LIST_DATA", res);
        })
        .catch((err) => {
          // 处理异常，即异常状态下数据应该是什么样子
        })
    }
  }
}
```

```js
// getters.js
const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  listData: state => state.app.listData
}
 
export default getters
```

```js
// store/index.js
import getters from './getters'
import { createStore } from 'vuex'
 
const modulesFiles = import.meta.glob('./modules/*.js',{ eager: true }); // 异步方式
 
let modules = {}
for (const [key, value] of Object.entries(modulesFiles)) {
  var moduleName = key.replace(/^\.\/(.*)\.\w+$/, '$1');
  const name = moduleName.split('/')[1]
  modules[name] = value.default
}
 
const store = createStore({
  modules,
  getters
})
 
export default store
```

### Pinia
Pinia 是最近比较火热的一个工具，也是用来处理 跨组件通信 的，极大可能成为 Vuex 5 。

[Pinia 文档](https://pinia.vuejs.org/zh/api/modules/pinia.html)


从我使用 Pinia 一阵后的角度来看，Pinia 跟 Vuex 相比有以下优点：

+ 调用时代码跟简洁了。
+ 对 TS 更友好。
+ 合并了 Vuex 的 Mutation 和 Action 。天然的支持异步了。
+ 天然分包。
+ 除此之外，Pinia 官网还说它适用于 Vue2 和 Vue3。


Pinia 简化了状态管理模块，只用这3个东西就能应对日常大多任务。

+ state：存储数据的仓库
+ getters：获取和过滤数据（跟 computed 有点像）
+ actions：存放 “修改 state ”的方法

### mitt.js
我们前面用到的 总线 Bus 方法，其实和 mitt.js 有点像，但 mitt.js 提供了更多的方法。
比如：
+ on：添加事件
+ emit：执行事件
+ off：移除事件
+ clear：清除所有事件

mitt.js 不是专门给 Vue 服务的，但 Vue 可以利用 mitt.js 做跨组件通信。

[github 地址](https://github.com/developit/mitt)

[npm 地址](https://www.npmjs.com/package/mitt)

#### 安装

```js
npm i mitt 
```

#### 使用

我模拟一下 总线Bus 的方式。
我在同级目录创建3个文件用作模拟。

```html
Parent.vue
Child.vue
Bus.js
```

```js
// Bus.js

import mitt from 'mitt'
export default mitt()
```

```js
// Parent.vue

<template>
  <div>
    Mitt
    <Child />
  </div>
</template>

<script setup>
import Child from './Child.vue'
import Bus from './Bus.js'

Bus.on('sayHello', () => console.log('雷猴啊'))
</script>
```

```js
// Child.vue

<template>
  <div>
    Child：<button @click="handleClick">打声招呼</button>
  </div>
</template>

<script setup>
import Bus from './Bus.js'

function handleClick() {
  Bus.emit('sayHello')
}
</script>
```

此时，点击 Child.vue 上的按钮，在控制台就会执行在 Parent.vue 里定义的方法。


mitt.js 的用法其实很简单，建议跟着 [官方示例](https://www.npmjs.com/package/mitt) 敲一下代码，几分钟就上手了。


