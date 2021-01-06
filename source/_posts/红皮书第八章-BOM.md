---
title: 红皮书第八章-BOM
categories: jc-end
date: 2020-09-03 15:26:41
---
### window对象
BOM对象的核心是window,它表示浏览器的实例，window是javascript和浏览器交互的接口。

> 有一点值得注意:定义全局变量和在window上面定义变量有一个区别就是，在window上面直接定义变量，可以用delete删除，但是直接定义是不可以删除的用delete

<!-- more -->

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
  if (document.compatMode === 'CSS1compat') { // 标准兼容模式开启
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

#### 导航和打开窗口open()
<i>window.open()</i>有四个参数：要加载页面的url,窗口目标，一个特性字符窜以及一个表示新页面是否取代浏览器历史记录中当前加载页面的布尔值。通常只需传入第一个参数，最后一个参数只在不打开新窗口的情况下使用。

```javascript
window.open('https://www.baidu.com', 'topFrame')
// 等同于
<a href="https://www.baidu.com" target="topFrame">
```
如果有 topFrame 名称的框架就在该框架打开，否则就新开一个 topFrame 名称的页面。第二个参数还可以是<i>_self</i>、<i>_parent</i>、<i>_top</i>、<i>_blank</i>。

```javascript
var myDoor = window.open('https://www.baidu.com', 'topFrame')
myDoor.close() // 关闭新打开的窗口
```
#### 间歇式调用和超时调用
```javascript
var num = 0
var max = 10
var intervalId = null
function incrementNumber(){
  num++
  if(num == max) {
    clearInterval(intervalId)
  }
  console.log(num)
}
intervalId = setInterval(incrementNumber, 10)
// 以上方法也可以写成如下形式：
var num = 0
var max = 10
function incrementNumber(){
  num++
  if(num <= max) {
    setTimeout(incrementNumber, 10)
    console.log(num)
  } else {
    console.log('Done')
  }
}
setTimeout(incrementNumber, 10)
```
可见、在使用超时调用时,没有必要跟踪超时调调用 ID.因为每次执行代码之后,如果不再没置另一次超时调用, 调用会自行停止。一般认为,使用超时调用来模拟间歌词用的是一种最佳模式.在开发环境下，很少使用真正的间歇调用,原因是后一个间歇调用可能会在前一个间歇调用结束之前启动。而像前面示例中那样使用超时调用,则完全可以避免这一点。所以,最好不要使用同歇调用。
### localtion对象
localtion对象既是window对象的属性，也是document的属性，所以window.localtion和document.localtion结果是一样的，localtion所有的属性如下：
<img src="/images/img-folder/hps/8/1.png">    

#### 查询字符窜参数
```javascript
// 返回参数集合
function getQueryStringArgs() {
  var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
  args = {},
  items = qs.length ? qs.split("&") : [],
  item = null,
  name = null,
  value = null,
  len = items.length;
  for(var i=0; i< len; i++) {
    item = items[i].split("=")
    name = decodeURIComponent(item[0])
    value = decodeURIComponent(item[1])
    if (name.length) {
      args[name] = value
    }
  }
  return args
}
// 返回指定属性的值
function getQueryAttrToString(attr) {
  var qs = (location.search.length > 0 ? location.search.substring(1) : ""),
  items = qs.length ? qs.split("&") : [],
  item = null,
  name = null,
  value = null,
  len = items.length;
  for(var i=0; i< len; i++) {
    item = items[i].split("=")
    name = decodeURIComponent(item[0])
    if (name === attr) {
      value = decodeURIComponent(item[1])
    }
  }
  return value
}
```
#### 位置操作
使用location对象可以通过很多方式来改变浏览器的位置，首先也是最常用的是，就是使用assign()方法并为其传递一个url值，如下：
```javascript
location.assign('https://www.baidu.com')
```
这样浏览器会打开新的链接，并且在浏览器中生成一条新的浏览器历史记录。location.href和window.location设置为一个url，也会在后台调用此方法的。另外修改url的属性，也可以当前加载的页面
假设初始的url: 'https://www.songyanbin.com'

```javascript
// 修改后的URL：https://www.songyanbin.com#setion1
location.hash = '#setion1'
// 修改后的URL：https://www.songyanbin.com?title=123
location.search = '?title=123'
// 其余方法如上表的属性集合
```
> 以上的所有方法，都会重新生成一条浏览器历史记录，如果想禁用生成新的历史记录，可以使用<strong>replace()</strong>方法，用户点击回退就不能回到上一个页面，这个方法只接受一个参数，就是新的url链接。

与位置有关的还有<strong>reload()</strong>方法，重新加载当前显示的页面，如果要强制从服务器拉去页面信息，需要传递参数true。
```javascript
window.reload() // 有可能从缓存中加载
window.reload(true) // 从服务器重新加载
```
位于reload()后面的代码，与可能执行也有可能不执行，取决于网络延迟和资源的加载，所以最后放到代码的最后一行执行。
### navigator对象
<img src="/images/img-folder/hps/8/2.png">

#### 检测插件
```javascript
function hasPlugin(name) {
  name = name.toLowerCase()
  for(var i=0; i< navigator.plugins.length; i++){
    if(navigator.plugins[i].name.toLowerCase().indexOf(name) > -1) {
      return true
    }
  }
  return false
}
console.log(hasPlugin('Flash'))
```
> 以上方法不支持IE浏览器，需要支持的，请看红皮书212页有相关的说明。

### screen对象
javascript有几个对象相对编程来说意义不大，screen对象就是意义不大的一个，基本上就是用来表示客户端的能力，包括浏览器窗口外部的显示器信息，如像素宽度和高度。
<img src="/images/img-folder/hps/8/3.png">

### history对象
history对象保存这用户上网的历史记录，从窗口打开的那一刻起，每个浏览器的窗口、标签页乃至每个框架，都有自己的history对象和特定的window相关联，处于安全的考虑，开发者获取不到具体的浏览历史实际的URL，但是可以通过类似<strong>go()</strong>来实现前进后退。
#### go()

```javascript
history.go(1) //前进1步
history.go(-1) //后退1步
history.go(2) //前进2步
```
也可以传递一个字符窜，跳转到最近的包含字符窜的历史记录，与可能是前进也有可能是后退，具体要看哪个更近。
```javascript
history.go("wrox.com") //跳转到最近的包含wrox.com的页面
```
#### back()/forward()：表示前进和后退
```javascript
history.back() // 后退一页
history.forward() // 前进一页
```
history.length等于0的时候，说明这个是用户打开窗口的第一个页面。

### 小结
浏览器对象模型( BOM)以 window 对象为依托,表示浏览器窗口以及页而可见区域。同时,window对象还是ECMAscript中的global对象，因而所有全局对象和函数都是它的属性，且所有原生的构造函数及其他函数也都存在与他的命名空间下本章讨论了下列 BOM 的组成部分。
1.在传用框架时、每个框架都有自己的 window 对象以及所有原生构造函数及其他函数的副本。每个框架都保在在 frames 集合中,可以通过位置或通过名称来访问。
2.有一些窗口指针,可以用来引用其他框架,包括父框架。
3.top对象始终指向最外围的枢架,也就是整个浏览器窗口。
4.parent 对象表示包含当前框架的框架,而 self 对象则回指 window,
5.使用 location对象可以通过编程方式来访问浏览器的导航系统。设置相应的属性,可以逐段或整体性地修改浏览器的 URL,
6.调用 replace()方法可以导航到一个新 URL,同时该 URL 会替换浏览器历史记录中当前显示的页面。
7.navigator 对象提供了与浏览器有关的信息。到底提供哪些信息。很大程度上取决于用户的浏地器;不过,也有一些公共的属性( 如userAgent )存在于所有浏览器中。
BOM中海油两个对象：screen和history,但他们的功能有限。secreen对象中保存着与客户端显示器有关的信息，这些信息一般只用于站点分析。 history 对象为访问浏览器的历史记录开了一个小缝隙,开发人员可以据此判断历史记录的数量,也可以在历史记录中向后或向前导航到任意页面。

