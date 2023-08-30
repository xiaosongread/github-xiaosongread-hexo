---
title: 每日练习
categories: js-end
date: 2022-12-24 13:58:54
---

多做一做比较经典的题目，终归是没有错的

<!-- more -->

### vue 写一个倒计时抢购的组件

```html
// 父组件
<template>
  <div>
    盛大活动
    <Date v-model="time" />
  </div>
</template>

<script>
  import Date from "./date";
  export default {
    components: { Date },
    data() {
      return {
        time: "2023-08-31 10:08:00",
      };
    },
  };
</script>
// 子组件
<template>
  <div>{{ str }}</div>
</template>
<script>
  export default {
    props: {
      value: {
        type: String,
        default: "",
      },
    },
    data() {
      return {
        str: "",
      };
    },
    created() {
      this.cutTime(this.value);
    },
    mounted() {},
    methods: {
      cutTime(str) {
        setInterval(() => {
          let endStr = new Date(str).getTime();
          let nowStr = new Date().getTime();
          let time = (endStr - nowStr) / 1000;
          let day = parseInt(time / 60 / 60 / 24);
          let hour = parseInt((time / 60 / 60) % 24);
          let minu = parseInt((time / 60) % 60);
          let second = parseInt(time % 60);
          if (time <= 0) {
            this.str = "开始抢购了！";
          } else {
            this.str = `剩余 ${day}天${hour}小时${minu}分${second}秒 开抢`;
          }
        }, 1000);
      },
    },
  };
</script>
```

### 盗窃算法

```js
var arr = [1, 5, 3, 10, 19];
function rob(arr) {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[1];
  if (arr.length === 2) return Math.max(arr[1], arr[2]);
  var dps = [];
  dps[0] = arr[0];
  dps[1] = Math.max(arr[1], arr[2]);
  for (let i = 2; i < arr.length; i++) {
    dps[i] = Math.max(arr[i] + dps[i - 2], dps[i - 1]);
  }
  console.log(dps[arr.length - 1]);
  return dps[arr.length - 1];
}
rob(arr);
```
