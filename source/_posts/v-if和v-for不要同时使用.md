---
title: v-if和v-for不要同时使用
categories: gc-end
date: 2021-02-02 15:53:25
tags: vue 
---

```javascript
<ul>
  <li v-for="item in list" v-if="item.isActive">{{item}}</li>
//   [vue/no-use-v-if-with-v-for]
// The 'undefined' variable inside 'v-for' directive should be replaced with a computed property that returns filtered array instead. You should not mix 'v-for' with 'v-if'.eslint-plugin-vue
</ul>
```
> v-for和v-if不要同时使用，因为v-for的优先级比v-if高，这意味着 v-if 将分别重复运行于每个 v-for 循环中，效率和性能都比较低。

<!-- more -->

可以放到computed属性中，先处理掉循环的列表数据
```javascript
computed: {
  listComputed: function () {
    return this.list.filter(function (item) {
      return item.isActive
    })
  }
}
<ul>
  <li v-for="item in listComputed" v-if="item.isActive">{{item}}</li>
</ul>
```