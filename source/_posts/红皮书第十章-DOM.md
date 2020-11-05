---
title: 红皮书第十章-DOM
categories: jc-end
date: 2020-09-09 11:09:56
---
### 操作节点
##### appendChild(): 用于向childNodes列表末尾插入节点。
##### insertBefore(): 把节点放到childNodes列表指定的位置。接受要插入的节点和作为参照的节点两个参数。
##### replaceChild(): 要插入的节点和要替换的节点。
<!-- more -->
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




