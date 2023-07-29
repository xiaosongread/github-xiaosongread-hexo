---
title: 简单实现模拟 vue 的数据响应
categories: js-end
date: 2023-07-28 22:45:48
---

主要实现的是修改对象里面的属性，从而使得页面中的显示改变。

采用的是：
1. Object.defineProperty 这个属性来监听对象属性的改变
2. window 设置一个变量，来记录当有属性改变的时候，将需要调用的函数记录一下
3. set 中，当数据属性修改的时候，for 循环来调用相关改变页面的的函数

<!-- more -->

<video id="video" controls="" preload="none" poster="封面">
    <source id="mp4" src="mp4格式视频" type="http://shuy.cc/images/img-folder/2023/vue.mp4">
</videos>

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <div class="box">
    <p id="firstName"></p>
    <p id="lastName"></p>
    <p id="age"></p>
  </div>
  姓名：<input type="text" oninput="data.name = this.value">
  年龄：<input type="number" oninput="data.age = this.value">
</body>
<script src="/hps/euv.js"></script>
<script src="/hps/indexv.js"></script>
</html>
```

```js
// indexv.js
var data = {
  name: '宋彦斌',
  age: 32
}
// 取姓
function getFirstName () {
  let dom1 = document.getElementById('firstName');
  dom1.innerHTML = '姓：' + data.name.substring(0,1)
}
// 取名
function getLastName () {
  let dom2 = document.getElementById('lastName');
  dom2.innerHTML = '名：' + data.name.substring(1)
}
// 取年龄
function getAge () {
  let dom3 = document.getElementById('age');
  dom3.innerHTML = '年龄：' + data.age
}

observe(data) // 观察数据变化
autoRun(getFirstName)
autoRun(getLastName)
autoRun(getAge)

// data.age = 333
// data.name = "张三"
// setTimeout(() => {
//   data.name = "李四"
//   data.age = 4444
// }, 1000)
```

```js
// env.js
/**
 *  观察某个对象的所有属性
 */

function observe (obj) {
  for (let key in obj) {
    let interName = obj[key]
    let funs = []
    Object.defineProperty(obj, key, {
      get () {
        // 记录那个函数用了
        if (window.__func && !funs.includes(window.__func) ) {
          funs.push(window.__func)
        }
        console.log('调用了',funs)
        return interName
      },
      set (val) {
        console.log('调用了1')
        interName = val
        // 执行用我的函数
        for (let i = 0; i < funs.length; i++) {
          funs[i](val)
        }
      }
    })
  }
}

function autoRun (fn) {
  window.__func = fn
  fn()
  window.__func = null
}
```