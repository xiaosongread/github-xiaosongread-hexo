---
title: '第九章-客户端检测'
categories: js-end
date: 2020-09-25 14:50:41
tag: js
---
**本章内容**
口 使用能力检测
口 用户代理检测的历史
口 选择检测方式

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

### 能力检测
最常用也最为人们广泛接受的客户端检测形式是**能力检测**（又称特性检测）。这种方式不是识别特定的浏览器，而是识别浏览器的能力。

```js
if (object.propertyInQuestion) {
  // 使用 object.propertyInQuestion
}
```

```js
function getElement(id) {
  if(document.getElementById) {
    return document.getElementById(id);
  } else if(document.all){
    return document.all(id);
  } else {
    throw new Error("No way to retrieve element!");
  }
}
```
#### 更可靠的能力检测
能力检测对于想知道某个特性是否会按照适当方式行事（而不仅仅是某个特性存在）非常有用。

```js
// 不要这样做！这不是能力检测 —— 只检测了是否存在相应的方法
function isSortable(object) {
  return !!object.sort
}
```
上面代码是不靠谱的，应该这样，所有对象只要有sort属性就会返回true,比如：

```js
var result = isSortable({sort: true});
```

这样检查应该更靠谱：

```js
function isSortable(obj) {
  return typeof obj === "function"
}
```

这里使用 typeof 操作符用于确定 sort 的确是一个函数，因此可以调用它对数据进行排序。

> 在可能的情况下，要尽量使用 typeof 进行能力检测。

<!-- #### 能力检测，不是浏览器检测

### 怪癖检测 -->

### 用户代理检测
#### navigator.userAgent
用户代理检测通过检测用户代理字符串确定实际使用的浏览器。在每一次HTTP请求过程中，用户代理字符串是作为响应首部发送的，而且该字符串可以通过Javascript的 **navigator.userAgent** 属性访问。在服务端，通过检测用户代理字符串确定用户使用的浏览器是一种常用而且广为接受的做法。
<!-- #### 用户代理字符串的历史 -->
#### 用户代理字符串检测技术
+ 识别是手机还是PC
+ 识别是Android还是iphone
+ 识别不同的浏览器平台
+ 识别是浏览器环境还是微信小程序环境
<!-- #### 完整的代码
#### 使用方法 -->

<!-- ### 小结 -->
