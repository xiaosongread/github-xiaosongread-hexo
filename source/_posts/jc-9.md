---
title: 移动端（微信等）使用 vConsole调试console
categories: gc-end
date: 2019-06-16 15:10:29
---

### 
移动端和h5的混合开发模式，在h5中调用原生的方法来获取数据的交互特别多，但是提示比较困难，因为在应用中不像浏览器，无法打开控制台，改如何调试呢？

#### use
```javascript
npm install vconsole

import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
let vConsole = new VConsole() // 初始化
```
<!-- more -->
或者，找到模块下面的dist/vconsole.min.js ，然后复制到自己的项目中
```html
<head>
    <script src="dist/vconsole.min.js"></script>
</head>
<!--建议在 `<head>` 中引入哦~ -->
<script>
  // 初始化
  var vConsole = new VConsole();
  console.log('VConsole is cool');
</script>
```

![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/vconsole1.png)
![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/vconsole.png)

出现上面的就是安装成功了！

> 请注意，VConsole 只是 vConsole 的原型，而非一个已实例化的对象。所以在手动 new 实例化之前，vConsole 不会被插入到网页中。

[官方文档](https://github.com/Tencent/vConsole/blob/dev/doc/tutorial_CN.md)