---
title: '第十三章-事件'
categories: js-end
date: 2020-10-29 14:50:41
tag: js
---
**本章内容**
口 理解事件流
口 使用事件处理程序
口 不同的事件类型

<!-- more -->

[第三章-数据类型](http://shuy.cc/2020/07/12/typeOf/)
[第四章-变量、作用域和内存问题](http://shuy.cc/2020/08/13/instance/)
[第五章-引用类型](http://shuy.cc/2020/08/03/object)
[第六章-面向对象的设计程序](http://shuy.cc/2020/08/13/defineProperty/)
[第七章-函数表达式](http://shuy.cc/2020/08/28/func)
[第八章-BOM](http://shuy.cc/2020/09/03/bom/)
[第九章-客户端检测](http://shuy.cc/2020/09/03/navigator/)
[第十章-DOM](http://shuy.cc/2020/09/09/dom/)
[第十三章-事件](http://shuy.cc/2020/10/29/click/)

JavaScript与HTML之间的交互是通过**事件**实现的。事件，就是文档或浏览器窗口中发生的一些特定的交互瞬间。可以使用**侦听器**（或处理程序）来预订事件，以便事件发生时执行相应的代码。这种在传统软件工程中被称为观察员模式的模型，支持页面的行为（JavaScript）与页面的外观（HTML、css代码）之间的松散耦合。

### 事件流
**事件流** 描述的是从页面中接受事件的顺序。但是，IE 和 Netscape 两个开发团队居然提出了差不多完全相反的事件流的概念。

#### 事件冒泡
IE的事件流叫做事件冒泡，即事件开始时由最具体的元素（文档中嵌套层次最深的那个节点）接受，然后逐渐向上传播到较为不具体的节点（文档）。

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Document</title>
</head>
<body>
  <div id="myDivId">Click Me</div>
</body>
</html>
```

如果你点击了页面中的 div 元素，那么这个 click 事件会按照如下的顺序传播：
1). div
2). body
3). html
4). document

> 所有现代浏览器都支持事件冒泡。

#### 事件捕获

Netscape 团队提出的另一种事件流叫做事件捕获。**事件捕获**的思想是不太具体的节点应该更早的接受到事件，而更具体的节点应该最后接受到事件。事件捕获的用意在于事件到达预定目标之前捕获它。

还是以上的 click 事件，顺序就应该如下：
1). document
2). html
3). body
4). div

#### DOM事件流
"DOM2级事件" 规定的事件流包括3个阶段：事件捕获阶段、处于目标阶段和事件冒泡阶段。

<img src="/images/img-folder/2023/click.png">

### 事件处理程序
事件就是用户或者浏览器自身执行的某种动作。诸如click、load、mouseover，都是事件的名字。而响应某个事件的函数就叫做事件处理程序（或事件侦听器）。事件处理程序的名字以"on"开头，因此，click 事件的事件处理程序就是onclick,load事件的事件处理程序就是onload。

#### HTML 事件处理程序
某个元素支持的每种事件，都可以使用一个与相应事件处理程序同名的HTML特性来指定。这个特性的值应该是能够执行的Javscript代码。

```js
<script>
  function showMessage() {
    alert("Click Me!")
  }
</script>
<input type="button" value="Click Me" onclick="showMessage()">
```

在HTML中指定事件处理程序有两个缺点：
1. 存在一个时差的问题。用户可能会在html元素一出现页面上就触发相应的事件，但当时的事件处理程序有可能尚且不具备执行条件，就会出现报错的可能。
2. 另一个缺点是，这种在html文件中书写代码，js代码中也有，一旦修改两个甚至多个文件都得修改，不美观也不好维护和阅读。

这也是许多开发者摒弃HTML事件处理程序，转而使用Javascript指定事件处理程序的原因。

#### DOM0 级事件处理程序
通过Javascript指定事件处理程序的传统方式，就是将一个函数赋值给一个事件处理程序属性。要是用这种方式，首先必须取得一个要操作对象的引用。

每个元素都有自己的事件处理程序属性，这些属性通常全部小写。

```js
var btn = document.getElementById('muBtn');
btn.onclick = function(){
  alert(this.id);
}
```

使用DOM0级方法指定的事件处理程序被认为是元素的方法。因此，这时候的事件处理程序是在元素的作用域中运行的，换句话说就是，this引用的就是当前的元素。

删除事件处理程序的方法，可以将方法设置为null。

```js
btn.onclick = null;
```

#### DOM2 级事件处理程序
##### addEventListener()、removeEventListener()
这两个方法用于处理指定和删除事件处理程序的操作。所有的DOM节点中都包含这两个方法。它们接受3个参数：
1. 要处理的事件名
2. 作为事件处理程序的函数
3. 一个布尔值（true：代表在捕获阶段调用事件处理程序，false则表示冒泡阶段调用）。

```js
var btn = document.getElementById('muBtn');
var clickFun = function(){ // 如果此处不使用命名函数，而直接使用匿名函数，那么就无法去销毁事件处理程序
  console.log('click me');
}
var clickFun1 = function(){ // 如果此处不使用命名函数，而直接使用匿名函数，那么就无法去销毁事件处理程序
  console.log(this.id);
}
btn.addEventListener("click", clickFun, false);
btn.addEventListener("click", clickFun1, false);
btn.removeEventListener("click", clickFun, false);
btn.removeEventListener("click", clickFun1, false);
```

#### IE 事件处理程序
##### attachEvent()、detachEvent()
这两个方法的作用和**addEventListener()**、**removeEventListener()**类似

区别在于：
1. 传递的参数不一样，这两个方法接受两个参数：事件名、函数，只支持冒泡，并且第一个参数是以on开头的。
2. 这两个方法的函数的作用域是全局作用域，所以this指向的是window。
3. 这两个方法支持的浏览器有IE和Opera。

```js
var btn = document.getElementById('muBtn');
var clickFun = function(){ // 如果此处不使用命名函数，而直接使用匿名函数，那么就无法去销毁事件处理程序
  console.log('click me');
}
btn.attachEvent("onclick", clickFun);
btn.removeEventListener("onclick", clickFun);
```

<!-- #### 跨浏览器的事件处理程序 -->

### 事件对象
在触发DOM上的某个事件时，会产生一个事件对象 **event**,这个对象中包含着所有与事件有关的信息。包括导致事件的元素、事件的类型以及其它与特定事件相关的信息。

#### DOM 中的事件对象
```js
var btn = document.getElementById('muBtn');
var clickFun = function(event){
  console.log(event);
}
```

<img src="/images/img-folder/2023/dom.png">

***在需要通过一个函数处理多个事件时，可以使用 type 属性***

```js
var btn = document.getElementById('muBtn');
var clickFun = function(event){
  switch(event.type){
    case "click":
      console.log('click');
      break;
    case "mouseover":
      console.log('mouseover');
      break;
    case "mouseout":
      console.log('mouseout');
      break;
  }
}
btn.onclick = clickFun;
btn.onmouseover = clickFun;
btn.onmouseout = clickFun;
```

##### preventDefault()
阻止特定事件的默认行为。例如：链接的默认行为就是在被单击的时候会导航到其href特性指定的URL。

```js
var link = document.getElementById('mybtn');
link.onclick = function(event){
  event.preventDefault();
}
```

只有 cancelable 值为true 的时候，才可以使用此方法取消默认行为。

##### stopPropagation()
方法用于立即停止时间在DOM层次中的传播，即取消进一步的事件捕获或冒泡。

例如：直接添加到一个按钮的事件处理程序可以调用stopPropagation()方法，从而避免触发注册在document.body上面的事件处理程序。

```js
var link = document.getElementById('mylink');
link.onclick = function(event){
  console.log('click');
  event.stopPropagation();
}
document.body.onclick = function(){
  console.log('click body');
}
```

##### eventPhase 属性
可以用来确定事件当前正位于事件流的那个阶段。

1. event.eventPhase === 1 捕获阶段
2. event.eventPhase === 2 处于目标对象上面
3. event.eventPhase === 3 冒泡阶段

#### IE 中的事件对象
##### returnValue

returnValue 属性相当于DOM中的preventDefault(),作用是取消给定事件的默认行为。

```js
var link = document.getElementById('mylink');
link.onclick = function(){
  console.log('click');
  window.event.returnValue = false;
}
```

##### cancelBubble
cancelBubble 属性相当于DOM中的stopPropagation(),作用是阻止事件的事件冒泡。
<!-- #### 跨浏览器的事件对象 -->

```js
var link = document.getElementById('mylink');
link.onclick = function(){
  console.log('click');
  window.event.cancelBubble = true;
}
```

### 事件类型
web浏览器中可能发生的事件有很多的类型。而“DOM3级事件” 规定了以下几类事件。
+ UI（User Interface,用户界面）事件，当用户与页面上的元素交互时触发。
+ 焦点事件，当元素获得或者失去焦点时触发。
+ 鼠标事件， 当哟用户通过鼠标在页面上执行操作时触发。
+ 滚轮事件，当时用鼠标滚轮（或类似设备）时触发。
+ 文本事件，当在文档中输入文本时触发。
+ 键盘事件，当用户通过键盘在页面中执行操作时触发。
+ 合成事件，当为IEM（input method editor,输入法编辑器）输入字符时触发。
+ 变动事件，当底层DOM结构发生变化时触发。

#### UI 事件
现有的UI事件如下：
+ **load** 当页面完全加载后在 window 上面触发，当所有框架都加载完毕时在框架集上面触发，当图像加载完毕时在<img>元素上面触发，或者当嵌入的内容加载完毕时在<object>元素上面触发。
+ **unload** 当页面完全卸载后在 window 上面触发，当所有框架都卸载完毕时在框架集上面触发，，或者当嵌入的内容卸载完毕时在<object>元素上面触发。
+ **abort** 在用户停止下载过程时，如果嵌入的内容没有加载完，则在<object>元素上面触发。
+ **error** 当发生JavaScript错误时在 window 上面触发，当无法加载图片时在<img>元素上面触发，当嵌入的内容无法加载时在<object>元素上面触发。
+ **select** 当用户选择文本框（ input 或者 textarea ）中的一个或多个字段时触发。
+ **resize** 当窗口或者框架的大小变化时在window上触发。
+ **scroll** 当用户滚动带滚动条的元素中的内容时，在该元素上面触发。<body>元素中包含所加载页面的滚动条。

##### load 事件
当页面完全加载后（包括所有图像、javascript文件、css文件等外部资源），就会触发window上面的load事件。

```js
window.onload = function(){
  var image = document.createElement("img"); // 1. 先执行这句code
  image.onload = function(event){
    console.log(event.target.src); // 4. 最后执行这句code
  };
  document.body.appendChild(image); // 2. 再执行这句code
  image.src = "1.png"; // 3. 然后执行这句code
}
```

新图像元素不一定要从添加到文档后才开始下载，只要设置了 src 属性就会开始下载。

```js
window.onload = function(){
  var script = document.createElement("script");
  script.onload = function(event){
    console.log("load");
  };
  script.src = "index.js";
  document.body.appendChild(script);
}
```

与图像不同，只有在设置了 script 元素的 src 属性并将该元素添加文档后，才会开始 Javascript 文件。换句话说，指定 src 属性和指定事件处理程序的先后顺序就不重要了。

```js
link.onload = function(){
  var link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.onload = function(event){
    console.log("css load");
  };
  link.href = "index.css";
  document.getElementByTagName("head")[0].appendChild(link);
}
```

> link 元素与 script 节点类似，在未指定 href 属性并将 link 元素添加到文档之前也不会开始下载样式表

##### unload 事件
这个事件在文档被卸载后触发。只要用户从一个页面切换到另一个页面，就会触发 unload 事件。利用这个事件最多的情况就是清楚引用，以避免内存泄漏。

##### resize 事件
当窗口或者框架的大小变化时在window上触发。

##### scroll 事件

```js
window.onscroll = function(){
  if(document.compatMode == "CSS1Compat"){
    console.log(document.documentElement.scrollTop);
  } else {
    console.log(document.body.scrollTop);
  }
}
```
由于 Safari 3.1之前的版本不支持 document.compatMode，因此旧版本的浏览器就会满足第二个条件。

#### 焦点事件
焦点事件会在页面元素获得或失去焦点时触发。利用这些事件并与document.hasFocus()方法及document.activeElement 属性配合，可以知晓用户在页面上的行踪。

+ **blur** 在元素失去焦点时触发。这个事件不会冒泡，所有浏览器都支持。
+ **focus** 在元素获得焦点时触发。这个事件不会冒泡，所有浏览器都支持。
+ **focusin** 在元素获得焦点时触发。与HTML事件 focus 等价这个事件会冒泡。
+ **focusout** 在元素获得焦点时触发。与HTML事件 blur 等价这个事件会冒泡。

#### 鼠标与滚轮事件

鼠标事件有以下几种：
+ **click** 单击主鼠标按钮，一般是左边的按钮或者按下回车键时触发。
+ **dblclick** 双击主鼠标按钮，一般是左边的按钮触发。
+ **mousedown** 在用户按下任意鼠标按钮时触发。不能通过键盘触发这个事件。
+ **mouseenter** 在鼠标光标从元素外部首次移动到元素范围之内触发。
+ **mouseleave** 在鼠标光标从元素内部移出到元素范围之内触发。
+ **mousemove** 当鼠标指针在元素内部移动时重复地触发。
+ **mouseout** 在鼠标指针位于元素一个元素上方，然后用户将其移入到另一个元素时触发。
+ **mouseover** 在鼠标指针位于一个元素外部，然后用户将其首次移入另一个元素边界之内时触发。
+ **mouseup** 在用户释放鼠标按钮时触发。
+ **mousewheel** 这个事件跟踪鼠标滚轮，类似于Mac的触控板

#### 键盘与文本事件
3个键盘事件：
+ keydown 当用户按下键盘上的任意键时触发，而且如果按下不放的话，会重复触发此事件。
+ keypress 当用户按下键盘上的字符键时触发，而且如果按下不放的话，会重复触发此事件。按下 Esc 键也会触发这个事件。
+ keyup 当用户释放键盘上的键时触发。

虽然所有元素都支持以上事件，但是只有在用户通过文本框输入文本时才最常用到。

textInput,这个事件是对 keypress 的补充，用意是在将文本显示给用户之前更容易拦截文本。在文本插入文本框之前会触发 textInput 事件。

1). 在用户按了一下键盘上的字符键时，keydown -> keypress -> keyup
2). 在用户按下的是一个非字符键，keydown -> keyup

##### 键码
在发生 keydown 和 keyup事件时，event 对象的 keyCode 属性中会包含一个代码，与键盘上一个特定的键位对应。

```js
var textbox = document.getElementById("myText");
textbox.onkeyup = function(event){
  console.log(event.keyCode);
}
```

<img src="/images/img-folder/2023/keycode1.png">
<img src="/images/img-folder/2023/keycode2.png">

##### 字符编码
event 对象支持一个 charCode属性，这个属性只有发生在 keypress 事件时才包含值，而且这个值是按下的那个键所代表的字符的 ASCII 编码。此时的 keyCode 通常等于0或者也可能等于所按键的键码。

```js
var EventUtil = {
  getChartCode: function(event){
    if(typeof event.charCode === "number"){
      return event.charCode;
    } else {
      return event.keyCode;
    }
  }
}
```

再取得了字符编码之后，就可以使用 String.fromCharCode() 将其转化成实际的字符。

#### 复合事件
**复合事件** 是 DOM3 级事件中新添加的一类事件，用于处理IME（输入法编辑器）的输入序列。可以让用户输入在物理键盘上找不到的字符。

```js
// 检测浏览器是否支持复合事件
var inSupported = document.implementation.hasFeature("CompositionEvent", "3.0");
```

<!-- #### 变动事件
#### HTML5事件
#### 设备事件 -->
#### 触摸与手势事件
触摸事件：
+ touchstart 当手指触摸屏幕时触发；即使已经有一个手指放在了屏幕上也会触发。
+ touchmove 当手指在屏幕上滑动时连续触发。在这个事件发生期间，调用 preventDefault() 可以阻止滚动。
+ touchend 当手指从屏幕上移开时触发。
+ touchcancel 当系统停止跟踪触摸时触发。

上面这几个事件都会冒泡，也都可以取消。

除了常见的DOM属性外，触摸事件还包含下列三个用于跟踪触摸的属性。
+ touches 表示当前跟踪的触摸操作的 Touch 对象的数组。
+ targetTouchs 特定于事件目标的 Touch 对象的数组。
+ changeTouches 表示自上次触摸以来发生了什么改变的Touch 对象的数组。

每个 Touch 对象包含下列属性：
+ clientX 触摸目标在视口中的X坐标
+ clientY 触摸目标在视口中的Y坐标
+ identifier 标识触摸的唯一ID
+ pageX 触摸目标在页面中的X坐标
+ pageY 触摸目标在页面中的Y坐标
+ screenX 触摸目标在屏幕中的X坐标
+ screenY 触摸目标在屏幕中的Y坐标
+ target 触摸的DOM节点目标

在触摸屏上的元素时，这些事件（包括鼠标事件）发生的顺序如下：
1). touchstart
2). mouseover
3). mousemove(一次)
4). mousedown
5). mouseup
6). click
7). touched

### 内存与性能
在开发过程中，开发人员会给每个需要操作的对象添加事件处理程序，如果页面的事件太多的话，那么内存占用的空间会很大，内存占用太大，就会导致程序的效率低下，性能变差，这时候，就需要考虑，如何让程序的性能变高。
#### 事件委托
**事件委托** 利用了事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。例如：click事件会一直冒泡到 document 层次，也就是我们可以为整个页面注册一个事件处理程序，而不必为每一个元素添加事件处理程序。

```html
<ul id="myLinks">
  <li id="link1">go</li>
  <li id="link2">do</li>
  <li id="link3">hi</li>
</ul>
```
```js
var links = document.getElementById("myLinks");
links.onclick = function(event) {
  console.log(event)
}
```

不需要循环为每一个li元素添加 click 事件，只需要为它们的父级元素注册一个事件就可以轻松实现。

#### 移除事件处理程序
每当将事件处理程序指定给元素时，运行中的浏览器代码与支持页面交互的Javascript代码之间就会建立一个连接。这种连接越多，页面执行起来就越慢。可以采用事件委托技术，限制建立的连接数量。但是，如果在不需要的时候，不移除相应的空事件处理程序，也是造成浏web应用程序内存与性能的主要原因。

造成**空事件处理程序**一般有三种情况：

1). 使用 removeChild()或者 replaceChild()方法，将绑定事件处理程序的元素删除。
2). 使用 innerHTML 删除了已经绑定事件处理程序的元素。
3). 卸载页面的时候（可能是在两个页面之间来回切换，也可以是单击了浏览器的刷新按钮）。

```html
<div id="myDiv">
  <input type="button" value="click me" id="myBtn">
</div>
```
```js
var btn = document.getElementById("myBtn");
btn.onclick = function() {
  // 执行了某些操作
  btn.onclick = null; // 移除事件处理程序
  document.getElementById("myDiv").innerHTML = "<div>已经删除掉元素了！</div>"
}
```
一般来说，写在页面之前，先通过 onunload 事件处理程序移除所有事件处理程序。

> 在事件处理程序中删除按钮也能阻止事件冒泡。目标元素在文档中是事件冒泡的前提。

<!-- ### 模拟事件
#### DOM 中的事件模拟
#### IE 中的事件模拟 -->

### 小结
事件是将 JavaScript 与网页联系在一起的主要方式。“DOM3级事件” 规范和 HTML5 定义了常见的大多数事件。即使有规范定义了基本事件，但很多浏览器任然存在自定义的事件。

在使用事件时，需要考虑如下一些内存与性能方面的问题。
+ 在必要限制一个页面中事件处理程序的数量，数量越多会导致内存占用太大，而且也会让用户感觉页面反应不灵活。
+ 建立在事件冒泡机制之上的事件委托技术，可以有效的减少事件处理程序的数量。
+ 建议在浏览器卸载页面之前移除页面中的所有事件处理程序。

事件是 JavaScript 中最重要的主题之一，深入理解事件的工作机制以及它们对性能的影响至关重要。