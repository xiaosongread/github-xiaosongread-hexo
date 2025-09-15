---
title: pina
categories: js-end
date: 2025-09-10 16:45:53
---
## 安装
用你喜欢的包管理器安装 `pinia`：

```bash
yarn add pinia
# 或者使用 npm
npm install pinia
```

> 如果你的应用使用的 Vue 版本低于 `2.7`，你还需要安装组合式 API 包：`@vue/composition-api`。

### **创建一个 pinia 实例**

创建一个 pinia 实例 (根 store) 并将其传递给应用：

```js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

如果你使用的是 `Vue 2`，你还需要安装一个插件，并在应用的根部注入创建的 `pinia`：

<!-- more -->

```js
import { createPinia, PiniaVuePlugin } from 'pinia'

Vue.use(PiniaVuePlugin)
const pinia = createPinia()

new Vue({
  el: '#app',
  // 其他配置...
  // ...
  // 请注意，同一个`pinia'实例
  // 可以在同一个页面的多个 Vue 应用中使用。
  pinia,
})
```

这样才能提供 devtools 的支持。在 Vue 3 中，一些功能仍然不被支持，如 time traveling 和编辑，这是因为 vue-devtools 还没有相关的 API，但 devtools 也有很多针对 Vue 3 的专属功能，而且就开发者的体验来说，Vue 3 整体上要好得多。在 Vue 2 中，Pinia 使用的是 Vuex 的现有接口 (因此不能与 Vuex 一起使用) 。


### **应该在什么时候使用 Store?**

一个 Store 应该包含可以在整个应用中访问的数据。这包括在许多地方使用的数据，例如显示在导航栏中的用户信息，以及需要通过页面保存的数据，例如一个非常复杂的多步骤表单。

另一方面，你应该避免在 Store 中引入那些原本可以在组件中保存的本地数据，例如，一个元素在页面中的可见性。

并非所有的应用都需要访问全局状态，但如果你的应用确实需要一个全局状态，那 Pinia 将使你的开发过程更轻松。

### **什么时候不应该使用 Store?**
有的时候我们会过度使用 store。如果觉得应用程序的 store 过多，你可能需要重新考虑使用 store 的目的。例如其中一些逻辑应该只是组合式函数，或者应该只是组件的本地状态。

---

## 定义 Store
Store 是用 `defineStore()` 定义的，它的第一个参数要求是一个独一无二的名字：

```ts
import { defineStore } from 'pinia'

//  `defineStore()` 的返回值的命名是自由的
// 但最好含有 store 的名字，且以 `use` 开头，以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useAlertsStore = defineStore('alerts', {
  // 其他配置...
})
```
这个名字 ，也被用作 id ，是必须传入的， Pinia 将用它来连接 store 和 devtools。为了养成习惯性的用法，将返回的函数命名为 use... 是一个符合组合式函数风格的约定。

`defineStore()` 的第二个参数可接受两类值：`Setup 函数`或 `Option 对象`。

### Option Store

与 Vue 的选项式 API 类似，我们也可以传入一个带有 `state`、`actions` 与 `getters` 属性的 Option 对象

```ts
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0, name: 'Eduardo' }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```
你可以认为 `state` 是 store 的数据 (`data`)`，getters` 是 store 的计算属性 (`computed`)，而 `actions` 则是方法 (`methods`)。

为方便上手使用，Option Store 应尽可能直观简单。

### Setup Store
也存在另一种定义 store 的可用语法。与 Vue 组合式 API 的 setup 函数 相似，我们可以传入一个函数，该函数定义了一些响应式属性和方法，并且返回一个带有我们想暴露出去的属性和方法的对象。

```ts
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Eduardo')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, name, doubleCount, increment }
})
```
在 ***Setup Store*** 中：
- `ref()` 就是 `state` 属性
- `computed()` 就是 `getters` 属性
- `function()` 就是 `actions` 属性

注意，要让 pinia 正确识别 `state`，你必须在 setup store 中返回 `state` 的所有属性。这意味着，你不能在 store 中使用私有属性。不完整返回会影响 `SSR` ，开发工具和其他插件的正常运行。

`Setup store` 比 `Option Store` 带来了更多的灵活性，因为你可以在一个 `store` 内创建侦听器，并自由地使用任何组合式函数。不过，请记住，使用组合式函数会让 `SSR` 变得更加复杂。

Setup store 也可以依赖于全局提供的属性，比如路由。任何**应用层面**提供的属性都可以在 store 中使用 `inject()` 访问，就像在组件中一样：

```ts
import { inject } from 'vue'
import { useRoute } from 'vue-router'
import { defineStore } from 'pinia'

export const useSearchFilters = defineStore('search-filters', () => {
  const route = useRoute()
  // 这里假定 `app.provide('appProvided', 'value')` 已经调用过
  const appProvided = inject('appProvided')

  // ...

  return {
    // ...
  }
})
```

> 不要返回像 `route` 或 `appProvided` (上例中)之类的属性，因为它们不属于 store，而且你可以在组件中直接用 `useRoute()` 和 `inject('appProvided')` 访问。

### 你应该选用哪种语法？
和在 Vue 中如何选择组合式 API 与选项式 API 一样，选择你觉得最舒服的那一个就好。两种语法都有各自的优势和劣势。Option Store 更容易使用，而 Setup Store 更灵活和强大。

### 使用 Store
虽然我们前面定义了一个 store，但在我们使用 `<script setup>` 调用 `useStore()`(或者使用 `setup()` 函数，像所有的组件那样) 之前，store 实例是不会被创建的：

```ts
import { useCounterStore } from '@/stores/counter'
// 在组件内部的任何地方均可以访问变量 `store` ✨
const store = useCounterStore()
```

> 请注意，`store` 是一个用 `reactive` 包装的对象，这意味着不需要在 `getters` 后面写 `.value`。就像 `setup` 中的 `props` 一样，我们不能对它进行解构：
```ts
<script setup>
import { useCounterStore } from '@/stores/counter'
import { computed } from 'vue'

const store = useCounterStore()
// ❌ 下面这部分代码不会生效，因为它的响应式被破坏了
// 与 reactive 相同: https://vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive
const { name, doubleCount } = store
name // 将会一直是 "Eduardo" //
doubleCount // 将会一直是 0 //
setTimeout(() => {
  store.increment()
}, 1000)
// ✅ 而这一部分代码就会维持响应式
// 💡 在这里你也可以直接使用 `store.doubleCount`
const doubleValue = computed(() => store.doubleCount)
</script>
```

### 从 Store 解构 - storeToRefs()

为了从 store 中提取属性时保持其响应性，你需要使用 `storeToRefs()`。它将为每一个响应式属性创建引用。当你只使用 store 的状态而不调用任何 action 时，它会非常有用。请注意，你可以直接从 store 中解构 action，因为它们也被绑定到 store 上：

```ts
<script setup>
import { storeToRefs } from 'pinia'
const store = useCounterStore()
// `name` 和 `doubleCount` 都是响应式引用
// 下面的代码同样会提取那些来自插件的属性的响应式引用
// 但是会跳过所有的 action 或者非响应式（非 ref 或者 非 reactive）的属性
const { name, doubleCount } = storeToRefs(store)
// 名为 increment 的 action 可以被解构
const { increment } = store
</script>
```

---

## state

在 Pinia 中，state 被定义为一个返回初始状态的函数。这使得 Pinia 可以同时支持`服务端`和`客户端`。

```js
import { defineStore } from 'pinia'

const useStore = defineStore('storeId', {
  // 为了完整类型推理，推荐使用箭头函数
  state: () => {
    return {
      // 所有这些属性都将自动推断出它们的类型
      count: 0,
      name: 'Eduardo',
      isAdmin: true,
      items: [],
      hasChanged: true,
    }
  },
})
```

### TypeScript
你并不需要做太多努力就能使你的 state 兼容 TS。确保启用了 strict，或者至少启用了 noImplicitThis，Pinia 将自动推断您的状态类型！ 但是，在某些情况下，您应该帮助它进行一些转换：

```ts
const useStore = defineStore('storeId', {
  state: () => {
    return {
      // 用于初始化空列表
      userList: [] as UserInfo[],
      // 用于尚未加载的数据
      user: null as UserInfo | null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
```

如果你愿意，你可以用一个接口定义 state，并添加 state() 的返回值的类型。

```ts
interface State {
  userList: UserInfo[]
  user: UserInfo | null
}

const useStore = defineStore('storeId', {
  state: (): State => {
    return {
      userList: [],
      user: null,
    }
  },
})

interface UserInfo {
  name: string
  age: number
}
```

### 访问 state
默认情况下，你可以通过 `store` 实例访问 state，直接对其进行读写。

```js
const store = useStore()

store.count++
```

> 注意，新的属性如果没有在 `state()` 中被定义，则不能被添加。它`必须`包含初始状态。

### 重置state
 + 使用 ***选项式 API*** 时，你可以通过调用 store 的 `$reset()` 方法将 state 重置为初始值。

```js
const store = useStore()

store.$reset()
```

在 `$reset()` 内部，会调用 `state()` 函数来创建一个新的状态对象，并用它替换当前状态。

---

 + 在 ***Setup Stores*** 中，您需要`创建自己的` $reset() 方法：

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)

  function $reset() {
    count.value = 0
  }

  return { count, $reset }
})
```

### 使用选项式 API 的用法

在下面的例子中，你可以假设相关 store 已经创建了：

```js
// 示例文件路径：
// ./src/stores/counter.js

import { defineStore } from 'pinia'

const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
})
```

如果你不能使用组合式 API，但你可以使用 computed，methods，...，那你可以使用 `mapState()` 辅助函数将 state 属性映射为只读的计算属性：

```js
import { mapState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // 可以访问组件中的 this.count
    // 与从 store.count 中读取的数据相同
    ...mapState(useCounterStore, ['count'])
    // 与上述相同，但将其注册为 this.myOwnName
    ...mapState(useCounterStore, {
      myOwnName: 'count',
      // 你也可以写一个函数来获得对 store 的访问权
      double: store => store.count * 2,
      // 它可以访问 `this`，但它没有标注类型...
      magicValue(store) {
        return store.someGetter + this.count + this.double
      },
    }),
  },
}
```
#### 可修改的 state

如果你想修改这些 state 属性 (例如，如果你有一个表单)，你可以使用 mapWritableState() 作为代替。但注意你不能像 mapState() 那样传递一个函数：

```js
import { mapWritableState } from 'pinia'
import { useCounterStore } from '../stores/counter'

export default {
  computed: {
    // 可以访问组件中的 this.count，并允许设置它。
    // this.count++
    // 与从 store.count 中读取的数据相同
    ...mapWritableState(useCounterStore, ['count'])
    // 与上述相同，但将其注册为 this.myOwnName
    ...mapWritableState(useCounterStore, {
      myOwnName: 'count',
    }),
  },
}
```

### 变更 state - $patch

除了用 `store.count++` 直接改变 store，你还可以调用 `$patch` 方法。它允许你用一个 `state` 的补丁对象在同一时间更改多个属性：

```js
store.$patch({
  count: store.count + 1,
  age: 120,
  name: 'DIO',
})
```
不过，用这种语法的话，有些变更真的很难实现或者很耗时：任何集合的修改（例如，向数组中添加、移除一个元素或是做 `splice` 操作）都需要你创建一个新的集合。因此，`$patch` 方法也接受一个函数来组合这种难以用补丁对象实现的变更。

```js
store.$patch((state) => {
  state.items.push({ name: 'shoes', quantity: 1 })
  state.hasChanged = true
})
```
两种变更 store 方法的主要区别是，$patch() 允许你将多个变更归入 devtools 的同一个条目中。同时请注意，直接修改 state，$patch() 也会出现在 devtools 中，而且可以进行 time travel (在 Vue 3 中还没有)。

### 替换 state

你不能完全替换掉 store 的 state，因为那样会破坏其响应性。但是，你可以 ***patch*** 它。

```js
// 这实际上并没有替换`$state`
store.$state = { count: 24 }
// 在它内部调用 `$patch()`：
store.$patch({ count: 24 })
```

### 订阅 state - $subscribe()
类似于 Vuex 的 `subscribe` 方法，你可以通过 store 的 `$subscribe()` 方法侦听 state 及其变化。比起普通的 `watch()`，使用 `$subscribe()` 的好处是 ***subscriptions*** 在 ***patch*** 后只触发一次 (例如，当使用上面的函数版本时)。

```ts
cartStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // 和 cartStore.$id 一样
  mutation.storeId // 'cart'
  // 只有 mutation.type === 'patch object'的情况下才可用
  mutation.payload // 传递给 cartStore.$patch() 的补丁对象。

  // 每当状态发生变化时，将整个 state 持久化到本地存储。
  localStorage.setItem('cart', JSON.stringify(state))
})
```

### 刷新时机

在底层实现上，`$subscribe()` 使用了 Vue 的 `watch()` 函数。你可以传入与 `watch()` 相同的选项。当你想要在 每次 state 变化后立即触发订阅时很有用：

```js
cartStore.$subscribe((mutation, state) => {
  // 每当状态发生变化时，将整个 state 持久化到本地存储
  localStorage.setItem('cart', JSON.stringify(state))
}, { flush: 'sync' })
```

### 取消订阅
默认情况下，***state subscription*** 会被绑定到添加它们的组件上 (如果 store 在组件的 `setup()` 里面)。这意味着，当该组件被卸载时，它们将被自动删除。如果你想在组件卸载后依旧保留它们，请将 `{ detached: true }` 作为第二个参数，以将 ***state subscription*** 从当前组件中分离：

```js
<script setup>
const someStore = useSomeStore()
// 此订阅器即便在组件卸载之后仍会被保留
someStore.$subscribe(callback, { detached: true })
</script>
```
>你可以在 `pinia` 实例上使用 `watch()` 函数侦听整个 state。
```js
watch(
  pinia.state,
  (state) => {
    // 每当状态发生变化时，将整个 state 持久化到本地存储。
    localStorage.setItem('piniaState', JSON.stringify(state))
  },
  { deep: true }
)
```
---

## Getter

Getter 完全等同于 store 的 state 的计算值。可以通过 defineStore() 中的 `getters` 属性来定义它们。推荐使用箭头函数，并且它将接收 `state` 作为第一个参数：

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
})
```

大多数时候，getter 仅依赖 state。不过，有时它们也可能会使用其他 getter。因此，即使在使用常规函数定义 getter 时，我们也可以通过 `this` 访问到整个 store 实例，但(在 TypeScript 中)必须定义返回类型。这是为了避免 TypeScript 的已知缺陷，不过这不影响用箭头函数定义的 getter，也不会影响不使用 `this` 的 getter。

```js
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    // 自动推断出返回类型是一个 number
    doubleCount(state) {
      return state.count * 2
    },
    // 返回类型**必须**明确设置
    doublePlusOne(): number {
      // 整个 store 的 自动补全和类型标注 ✨
      return this.doubleCount + 1
    },
  },
})
```

然后你可以直接访问 store 实例上的 getter 了：

```js
<script setup>
import { useCounterStore } from './counterStore'

const store = useCounterStore()
</script>

<template>
  <p>Double count is {{ store.doubleCount }}</p>
</template>
```

### 访问其他 getter
