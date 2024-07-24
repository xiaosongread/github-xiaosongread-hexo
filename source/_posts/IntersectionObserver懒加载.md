---
title: IntersectionObserver懒加载
categories: js-end
date: 2019-11-05 11:43:06
tags: js
---

## 前言   
懒加载，顾名思义，在当前网页，滑动页面到能看到图片的时候再加载图片   
故问题拆分成两个：   
1.如何判断图片出现在了当前视口 （即如何判断我们能够看到图片）   
2.如何控制图片的加载   

<!-- more -->

## 方案一
这是最常见的老办法：直接贴代码   
### 核心代码   
```javascript
function lazyLoad(params, callback) {
  const wHeight = document.documentElement.clientHeight || document.body.clientHeight //浏览器的高度
  let sTop  //滚动条的高度
  const attr = params.attr || 'data-src'
  const className = params.className || 'lazy'
  const errorImage = params.errorImage || ''
  const space = params.interval || 100  /** 函数节流间隔 */
  const dom = document.getElementsByClassName(className)
  let before = 0 /** 上一次代码执行时间（节流用） */
  function loadImage(el) {
    el.src = el.getAttribute(attr)
    el.removeAttribute(attr)
    // 图片加载失败
    el.onerror = function () {
      el.src = errorImage
    }
  }
  function judgeImages() {
    const now = Date.now()
    if (now - before < space) return
    before = now
    sTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    for(var j=0;j<dom.length;j++){
        if(dom[j].offsetTop <= sTop + wHeight && dom[j].getAttribute(attr)){
          loadImage(dom[j])
        }
    }
  }
  judgeImages()
  window.addEventListener('scroll', judgeImages)
}
lazyLoad({
  attr: 'data-src',
  className: 'lazy',
  interval: '100',
  errorImage: 'imgs/6.png'
})
```
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
<ul class="photos">
  <li>1：<img class="lazy" src="imgs/6.png" data-src="imgs/1.png"></li>
  <li>2：<img class="lazy" src="imgs/6.png" data-src="imgs/2.png"></li>
  <li>3：<img class="lazy" src="imgs/6.png" data-src="imgs/3.png"></li>
  <li>4：<img class="lazy" src="imgs/6.png" data-src="imgs/4.png"></li>
  <li>5：<img class="lazy" src="imgs/6.png" data-src="imgs/5.png"></li>
</ul>
</body>
<script type="text/javascript">
function lazyLoad(params, callback) {
  const wHeight = document.documentElement.clientHeight || document.body.clientHeight //浏览器的高度
  let sTop  //滚动条的高度
  const attr = params.attr || 'data-src'
  const className = params.className || 'lazy'
  const errorImage = params.errorImage || ''
  const space = params.interval || 100  /** 函数节流间隔 */
  const dom = document.getElementsByClassName(className)
  let before = 0 /** 上一次代码执行时间（节流用） */
  function loadImage(el) {
    el.src = el.getAttribute(attr)
    el.removeAttribute(attr)
    // 图片加载失败
    el.onerror = function () {
      el.src = errorImage
    }
  }
  function judgeImages() {
    const now = Date.now()
    if (now - before < space) return
    before = now
    sTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
    for(var j=0;j<dom.length;j++){
        if(dom[j].offsetTop <= sTop + wHeight && dom[j].getAttribute(attr)){
          loadImage(dom[j])
        }
    }
  }
  judgeImages()
  window.addEventListener('scroll', judgeImages)
}
lazyLoad({
  attr: 'data-src',
  className: 'lazy',
  interval: '100',
  errorImage: 'imgs/6.png'
})
</script>
</html>
```

## 方法二

rootBounds 是在根元素（默认就是viewport）矩形区域的信息，调用getBoundingClientRect()的返回值；   
boundingClientRect 是在目标元素（默认就是viewport），矩形区域的信息，调用getBoundingClientRect()的返回值；   
intersectionRect 是目标元素与根元素交叉区域的信息，并且能清楚地告诉你目标元素的哪个部分是可见的。   
intersectionRatio 目标元素的可见比例，密切相关的一个东西，它能告诉你元素当中有多大一部分是可见的（下图）。有了这个信息，你可以有效地实现一些功能，比如当资源在屏幕上可见之前刚好加载出来。   

```
// api
var io = new IntersectionObserver(callback, option);

// 开始观察
io.observe(document.getElementById('example'));
// 停止观察
io.unobserve(element);
// 关闭观察器
io.disconnect();
```
api具体介绍链接： http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html

代码运行思路：
```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script type="text/javascript" src="http://code.jquery.com/jquery-3.4.1.js"></script>
</head>
<style>
body{
  height: 1000px;
}
.div{
  width: 300px;
  height: 300px;
  margin-bottom: 10px;
  border: 1px solid #dddddd;
}
</style>
<body>
  <div class="div">1</div>
  <div class="div">2</div>
  <div class="div">3</div>
  <div class="div">4</div>
  <div class="div">5</div>
</body>
<script>
$(function(){
  const observer = new IntersectionObserver((changes) => {
    // changes: 目标元素集合
    changes.forEach((change) => {
      if (change.isIntersecting) { // entry.intersectionRatio > 0 && entry.intersectionRatio <= 1 (intersectionRatio 表示相交区域和目标元素的比例值) 
        const div = change.target
        console.log('div', div, change.intersectionRatio, change.boundingClientRect)
        observer.unobserve(div) // 图片已加载， 解除观察
      }
    })
  })
  let divs = document.querySelectorAll('.div')
  divs.forEach(div => {
    observer.observe(div)
  })
})
</script>
</html>
```

## 方法三
浏览器觉得懒加载这事可以交给自己做，你们开发者加个属性就好了。实在是...！   
```html
<img src="aaa.jpg" loading="lazy">
```
> 不过目前浏览器兼容性不太好   
