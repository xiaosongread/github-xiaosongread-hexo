---
title: 红皮书第十章-DOM
categories: jc-end
date: 2020-09-09 11:09:56
---
[红皮书第三章-数据类型](http://shuy.cc/2020/07/12/typeOf/)
[红皮书第四章-变量、作用域和内存问题](http://shuy.cc/2020/08/13/instance/)
[红皮书第五章-引用类型](http://shuy.cc/2020/08/03/object)
[红皮书第六章-面向对象的设计程序](http://shuy.cc/2020/08/04/%E7%BA%A2%E7%9A%AE%E4%B9%A6%E7%AC%AC%E5%85%AD%E7%AB%A0-%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%9A%84%E8%AE%BE%E8%AE%A1%E7%A8%8B%E5%BA%8F/)
[红皮书第七章-函数表达式](http://shuy.cc/2020/08/28/%E7%BA%A2%E7%9A%AE%E4%B9%A6%E7%AC%AC%E4%B8%83%E7%AB%A0-%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F/)
[红皮书第八章-BOM](http://shuy.cc/2020/09/03/%E7%BA%A2%E7%9A%AE%E4%B9%A6%E7%AC%AC%E5%85%AB%E7%AB%A0-BOM/)
[红皮书第十章-DOM](http://shuy.cc/2020/09/09/%E7%BA%A2%E7%9A%AE%E4%B9%A6%E7%AC%AC%E5%8D%81%E7%AB%A0-DOM/)
<!-- more -->
### 操作节点
##### appendChild(): 用于向childNodes列表末尾插入节点。
##### insertBefore(): 把节点放到childNodes列表指定的位置。接受要插入的节点和作为参照的节点两个参数。
##### replaceChild(): 要插入的节点和要替换的节点。
##### removeChild(): 接受要解除的节点一个参数。
##### cloneNode(): 用于创建调用此方法的节点的完全相同的副本。接受一个布尔值，标示是否执行深度复制
##### normalize(): 唯一的作用是处理文档树中的文本节点。由于解析器的实现和DOM操作等原因，可能会出现文本节点不包含文本，或者接连出现两个文本节点的情况，当在某个节点调用这个方法时，就会在该机诶单后代节点中查找上述两种情况，如果找到了空节点，则删除它，如果找到了相邻的文本节点，则将他们合并为一个文本节点。
### Document类型
```javascript
<html>
  <body></body>
</html>
var html = document.documentElement
console.log(html === document.childNodes[0]) // true
console.log(html === document.firstChild) // true
```
以上代码说明：document.documentElement指向的就是文档的根节点html.

> 所有浏览器都支持document.body和document.documentElement属性。

#### document.title: 修改文档的标题
```javascript
var title = document.title
title = "修改后的标题"
```
#### URL/domain/referrer
```javascript
console.log(document.URL) // http://10.5.40.130:8000/3.html
console.log(document.domain) // 10.5.40.130
console.log(document.referrer) // 空字符窜
```
document.referrer：返回跳转到当前页面的来源的页面的url。没有的情况就返回空字符窜。

> document.domain设置同源域名，可以解决跨域的问题。

### 查找元素
#### getElementById()/getElementsByTagName()
```javascript
<body>
<img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2278525f1db4bebb3da97aa3c9cbe26~tplv-k3u1fbpfcp-zoom-1.image" name="myImage" id="myIdImage">
</body>

var images = document.getElementsByTagName('img')
console.log(images.length) // 1
console.log(images[0].src) 
console.log(images.item(0).src) 
console.log(images.namedItem('myImage').src)
console.log(images['myImage'].src)
以上方法都可获取到src:https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d2278525f1db4bebb3da97aa3c9cbe26~tplv-k3u1fbpfcp-zoom-1.image
```
#### getElementsByName(): 返回带有指定name值的集合。
#### 特殊的集合
document.anchors(): 包含文档中所有带name属性的a元素。   
document.forms(): 包含文档中所有的form元素。   
document.images(): 包含文档中所有的image元素。   
document.links(): 包含文档中所有带href属性的a元素。   
#### 文档写入
write(): 在文档中写入内容，接受一个 字符窜 的参数，原样写入
writeIn(): 在文档中写入内容，接受一个 字符窜 的参数，在字符窜的末尾加上换行符（n/）
open(): 打开文档
close(): 关闭文档
```javascript
document.write("<script src='a.js'><\/script>")
```
### Element类型
+ nodeType的值为1
+ nodeName的值为元素的标签名
+ nodeValue为null
+ parentNode为Document或者是Element
```javascript
<div id="id"></div>
var a = document.getElementById('id')
console.log(a.tagName) // DIV
console.log(a.nodeName) // DIV
console.log(a.nodeType) // 1
```
#### 取得特性
getAttribute()
setAttribute()
removeAttribute()
```javascript
<div id="id" class="myDive" my_special_attribute="hellow" style="font-weight: bold">aaa</div>
var a = document.getElementById('id')
console.log(a.getAttribute('id')) // id
console.log(a.getAttribute('class')) // myDive
console.log(a.getAttribute('my_special_attribute')) // hellow
console.log(a.getAttribute('style')) // font-weight: bold
console.log(a.style) // 返回的是对象
console.log(a.style.fontWeight) // bold
```
> 属性名不区分大小写，a.getAttribute('id')和a.getAttribute('ID')是同一个意思。onclick和style返回的都是字符窜，

#### 设置属性
setAttribute(设置的属性名，设置的属性的值),如果有设置的属性名，那就覆盖，否则就是新添加。
```javascript
a.setAttribute('id', 'myDiv1')
a.setAttribute('id', 'myDive1')
a.setAttribute('myColor', 'red')
console.log(a.getAttribute('myColor')) // red
```
#### 删除属性
```javascript
// 删除前
<div id="id" class="myDive" my_special_attribute="hellow" myColor="red" style="font-weight: bold">aaa</div>
a.removeAttribute('myColor')
// 删除后
console.log(a.getAttribute('myColor')) // red
<div id="id" class="myDive" my_special_attribute="hellow" style="font-weight: bold">aaa</div>
```
#### 创建元素
使用document.createElement()方法可以创建新元素。这个方法只接受要创建的元素的标签名，不区分大小写。
```javascript
var div = document.createElement('div')
div.id = 'divId'
div.className = 'divClassName'
```
appendChild()
insertBefore()
replaceChild()
```javascript
document.body.appendChild(div)
```
