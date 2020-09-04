---
title: 红皮书第八章-BOM
categories: jc-end
date: 2020-09-03 15:26:41
---
### window对象
BOM对象的核心是window,它表示浏览器的实例，window是javascript和浏览器交互的接口。

> 有一点值得注意:定义全局变量和在window上面定义变量有一个区别就是，在window上面直接定义变量，可以用delete删除，但是直接定义是不可以删除的用delete

```javascript
window.aa = 123
var bb = 123
delete window.aa
delete  bb
console.log(window.aa) // undefined
console.log(bb) // 123
```
#### 窗口关系及框架
#### 窗口位置
<strong>screenLeft/screenTop</strong>用来记录浏览器相对于屏幕的位置信息，但是火狐使用的是<strong>screenX/screenY</strong>来支持，如下代码:

```javascript
var leftPos = (typeof window.screenLeft === "number") ? window.screenLeft : window.screenX
var topPos = (typeof window.screenTop === "number") ? window.screenTop : window.screenY
console.log('屏幕距离', leftPos, topPos) // 0 0
```

> moveTo(x,y):接受的参数是移动新位置的x,y坐标；moveBy(xpx,ypx):接受的参数是向上向下移动的像素值。这几个动作，有可能被浏览器所禁用，个人感觉没什么大的用武之地。

```javascript
window.moveTo(10,20)
window.moveBy(0,200)
```

#### 窗口的大小
##### outerWidth/outerHeight/innerWidth/innerHeight
<strong>outerWidth/outerHeight</strong>: 返回浏览器窗口本身的大小
<strong>innerWidth/innerHeight</strong>: 表示该容器页面视图区的大小（减去边框宽度）
在谷歌浏览器中，以上两组方法返回的数据一致（返回的是视口大小而非浏览器窗口大小）
##### clientWidth/clientHeight
<strong>document.documentElement.clientWidth/document.documentElement.clientHeight</strong> 中保存了页面视口的信息，在IE下，这两个在标准模式下才生效，如果是混杂模式下，只能通过 <strong>document.body.clientWidth/document.body.clientHeight</strong>来获取相同的信息，而在谷歌模式下面，不管哪种模式，上面两组方法都可以获取到相同的信息，这样看来，谷歌浏览器的兼容做的可以说是相当的好了。
虽然无法获取到浏览器的窗口大小，但是可以取得页面视口的大小，如下代码：

```javascript
var pageWidth = window.innerWidth
var pageHeight = window.innerHeight
if (typeof pageWidth !== 'number') {
  if (document.compatMode === 'CSSLCompat') {
    pageWidth = document.documentElement.clientWidth
    pageHeight = document.documentElement.clientHeight
  } else {
    pageWidth = document.body.clientWidth
    pageHeight = document.body.clientHeight
  }
}
```
##### resizeTo()/resizeBy()
resizeTo(): 接受浏览器窗口新的宽度和高度
resizeBy(): 接口新窗口和原窗口的宽度和高度差

> 以上两个方法有可能被浏览器禁用，所以用处不是特别的大。

#### 导航和打开窗口
