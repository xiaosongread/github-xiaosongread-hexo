---
title: 常用知识总结
categories: js-end
date: 2022-05-05 13:54:03
tags: css js vue
---

## -- html/css
### — css的布局方式
1.table布局
2.flex布局
3.float布局
4.响应式布局
### — 盒子模型
IE盒子模型：宽高包括content + padding + bording; box-sizing: border-box
标准盒模型：宽高就是元素的实际宽高 content; box-sizing: content-box
<!-- more -->

### — HTML5新增元素
```text
canvas/audio/video
source(定义媒体资源<video>/<audio>)/
embed(定义嵌入的内容)/track(为诸如video和audio元素之类的媒介规定外部文本轨道)
article 定义页面独立的内容区域
aside 定义页面的侧边栏内容
details 描述文档或文档某个部分的细节
dialog 定义对话框
footer header 定义文档的头尾区域
nav 定义导航链接的部分
等等
```

### — 居中的方式

1) 父子元素的宽高已知
```css
margin: 父元素的高减去子元素的高/2(垂直居中) auto(水平居中)
```
2) 父子元素的宽高未知

### — rem、em、vh、px各自代表的含义？
px: 绝对单位，页面按精确像素展示
em: 相对单位，基准为父节点字体大小，如果滋生定义了font-size按照自身来计算，整个页面内1em不是一个固定值
rem: 相对单位，可以理解为root em，相对根节点html的字体大小来计算
vh/vw: 主要用于页面视口大小布局，在页面布局上更加方便简单

### — 有哪些方式可以影藏页面元素？区别是什么？
+ display: none
+ visibility: hidden
+ opacity: 0 
+ width + height 设置为0
+ 定位到可视范围之外

|         | display: none  |  visibility: hidden   | opacity: 0  |
|  ----  | ----  |
| 页面中  | 不存在         | 存在                   | 存在        |
| 重排  | 会         | 不会                   | 不会        |
| 重绘  | 会         | 会                   | 不一定        |
| 自身绑定事件  | 不触发         | 不触发                   | 触发        |
| transition  | 不支持         | 支持                   | 支持        |
| 被遮挡的元素可出发事件  | 能         | 能                   | 不能        |


### — css选择器有哪些？优先级
+ !important 
+ 行内样式
+ Id选择器
+ 类选择器 class
+ 后代选择器 .box dox
+ 子选择器 .box>.child 选择.box下面所有类名为child的元素
+ 相邻同胞选择器 .one+.two,选择紧邻.one之后的所有.two元素
+ div,p 选择所有的div、p的所有元素 
+ 伪类选择器

```css
:link 选择未被访问的链接
:visited：选取已被访问的链接
:active：选择活动链接
:hover ：鼠标指针浮动在上面的元素
:focus ：选择具有焦点的
:first-child：父元素的首个子元
```
+ 伪元素选择器

```css
:first-letter ：用于选取指定选择器的首字母
:first-line ：选取指定选择器的首行
:before : 选择器在被选元素的内容前面插入内容
:after : 选择器在被选元素的内容后面插入内容
```

+ 属性选择器

```css
[attribute] 选择带有attribute属性的元素
[attribute=value] 选择所有使用attribute=value的元素
[attribute~=value] 选择attribute属性包含value的元素
[attribute|=value]：选择attribute属性以value开头的元素
```
+ 伪类选择器（css3） 

```css
:first-of-type 父元素的首个元素
:last-of-type 父元素的最后一个元素
:only-of-type 父元素的特定类型的唯一子元素
:only-child 父元素中唯一子元素
:nth-child(n) 选择父元素中第N个子元素
:nth-last-of-type(n) 选择父元素中第N个子元素，从后往前
:last-child 父元素的最后一个元素
:root 设置HTML文档
:empty 指定空的元素
:enabled 选择被禁用元素
:disabled 选择被禁用元素
:checked 选择选中的元素
:not(selector) 选择非 <selector> 元素的所有元素
```

+ 属性选择器（css3） 

```css
[attribute*=value]：选择attribute属性值包含value的所有元素
[attribute^=value]：选择attribute属性开头为value的所有元素
[attribute$=value]：选择attribute属性结尾为value的所有元素
```

nth-child/nth-of-type的区别
```html
<h5>1</h5>
<h5>2</h5>
<h5>3</h5>
<h5>4</h5>
<div>5</div>
<h5>6</h5>
<h5>7</h5>
```
```css
2n+1 // 1 3 5 7
h5:nth-child(2n+1) {
  background: red;
}
```
<img src="/images/img-folder/2023/ms-1.png">

1）先找设置标签的全部同级标签
2）然后找对应的下标，如果选择器一致，那就匹配上，不一致就继续匹配下个下标的选择器

```css
h5:nth-of-type(2n+1) {
  background: red;
}
```
<img src="/images/img-folder/2023/ms-2.png">

1）找出和设置标签一样的标签
2）然后再找对应的下标标签

### — 清除浮动的方法
1）使用带clear属性的空元素
在浮动元素的后面设置一个空元素，然后给这个空元素设置属性.clear{clear:both;}
2）使用overflow属性
给浮动元素的容器添加overflow:hidden;或 overflow:auto;可以清除浮动，另外在 IE6 中还 需要触发 hasLayout ，例如为父元素设置容器宽高或设置 zoom:1。 在添加 overflow 属性后，浮动元素又回到了容器层，把容器高度撑起，达到了清理浮动 的效果。
3）使用css的:after伪元素
```css

.container{
  border: 5px  solid#eee;
}
.container::after{
  content: "020"; 
  display: block; 
  height: 0; 
  clear: both; 
  /* 表示元素不可见 */
  visibility: hidden;  
}
.media {
  width: 100px;
  height: 100px;
  float: left;
  background-color:aquamarine;
}
.container p{
  float: left;
}
 
<div class="container">
  <div class="media"></div>
</div>
<p>hello</p>
```

### — 常见的行内元素、块级元素
1.块级元素
  div/p/h1~h6/ol/ul/li/table
2.行内元素
  span/img/a/strong/input

### — position的属性
相对定位：relative,相对于当前元素的位置来移动
绝对定位：absolute,相对于父元素（具有相对定位属性）来定位
固定定位：fixed,相对于页面的左上角定位

### — SEO
1）语义化的html的标签使用
2）设置合理的title,description,keywords
3）重要的html代码放到页面的前面
4）尽量少用iframe，搜索引擎抓不到里面的内容
5）图片上面加上alt属性

### — 什么是响应式布局？
响应式网站设计（Responsive Web design）是一种网络页面设计布局，页面的设计与开发应当根据用户行为以及设备环境(系统平台、屏幕尺寸、屏幕定向等)进行相应的响应和调整

1> 响应式网站常见特点：

+ 同时适配PC + 平板 + 手机等
+ 标签导航在接近手持终端设备时改变为经典的抽屉式导航
+ 网站的布局会根据视口来调整模块的大小和位置

2> 实现响应式布局的方式有如下：

+ 媒体查询（我们可以设置不同类型的媒体条件，并根据对应的条件，给相应符合条件的媒体调用相对应的样式表）
+ 百分比
+ vw/vh
+ rem

3> 响应式设计实现通常会从以下几方面思考：
+ 弹性盒子（包括图片、表格、视频）和媒体查询等技术
+ 使用百分比布局创建流式布局的弹性UI，同时使用媒体查询限制元素的尺寸和内容变更范围
+ 使用相对单位使得内容自适应调节
+ 选择断点，针对不同断点实现不同布局和内容展示

## javascript

### — js中的数据类型

+ 基本类型 string number null undefind boolean Symbol(ES6 引入了一种新的原始数据类型，表示独一无二的值)
+ 引用类型 Object Array Function

### — var/let/const 的区别？
+ 变量提升
var申明存在变量提升，let和const存在变量提升，不声明是不可以使用的，否则会报错
+ 作用域
var 没有块级作用域一说，不声明也是可以使用的，let，const有块级作用域一说，只能在申明的花括号里面使用
+ 使用的方法
const声明一个只读的变量，一旦声明，不可以修改，其余使用let，避免使用var，因为有不可控性，代码复杂的时候，不容易查找问题。

### — 数组常用的方法

<h4>增删改</h4>

|        | 向前+  | 向前- |  向后+  | 向后-  |
|  ----  | ----  | ----  | ----  | ----  |
| 页面中 | unshift | shift | push   | pop   |
| 语法   |array.unshift(item1,item2, ..., itemX)|array.shift()|array.push(item1, item2, ..., itemX)|array.pop()|
|返回结果|数组新长度|数组原来的第一个元素的值（移除的元素）|数组新长度|返回删除的元素|
|原数组|改变原数组|改变了原数组|改变原数组|改变了原数组|

+ concat 合并两个数组
+ splice （增、删、改）传入两个参数，分别是开始位置，删除元素的数量，返回包含删除元素的数组
array.splice(index,howmany,item1,.....,itemX)

|   参数     | 描述  |
|  ----  | ----  |
|  index | 必需。规定从何处添加/删除元素。</br>该参数是开始插入和（或）删除的数组元素的下标，必须是数字。|
|  howmany | 可选。规定应该删除多少元素。必须是数字，但可以是 "0"。<br />如果未规定此参数，则删除从 index 开始到原数组结尾的所有元素。|
| item1, ..., itemX | 可选。要添加到数组的新元素 |

```js 
// 移除数组的第三个元素，并在数组第三个位置添加新元素:
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2,1,"Lemon","Kiwi");
// Banana,Orange,Lemon,Kiwi,Mango
// 从第三个位置开始删除数组后的两个元素：
var fruits = ["Banana", "Orange", "Apple", "Mango"];
// Banana,Orange
fruits.splice(2,2);
```

+ slice() 方法可从已有的数组中返回选定的元素。
slice() 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。【不会影响原始数组】
array.slice(start, end)

```js
// 使用负值从数组中读取元素
var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
var myBest = fruits.slice(-3,-1); // 截取倒数第三个（包含）到倒数第一个（不包含）的两个元素
var myBest = fruits.slice(-3);  // 截取最后三个元素
// Lemon,Apple
// 截取字符串
var str="www.runoob.com!";
document.write(str.slice(4)+"<br>"); // 从第 5 个字符开始截取到末尾
document.write(str.slice(4,10)); // 从第 5 个字符开始截取到第10个字符
```
<h4>查</h4>
查找元素，返回元素坐标或者元素值

+ indexOf() 返回要查找的元素在数组中的位置，如果没找到则返回 -1
+ includes() 返回要查找的元素在数组中的位置，找到返回true，否则false
+ find() 返回通过测试（函数内判断）的数组的第一个元素的值
当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
如果没有符合条件的元素返回 undefined

> array.find(function(currentValue, index, arr),thisValue)
[参数]
callback：必须。为数组中每个元素执行的函数，该函数接受三个参数：
currentValue：必须。数组中正在处理的当前元素。
index：可选。当前元素的索引值。
arr：可选。当前元素所在的数组对象。
thisValue：可选。传递给函数的值一般用 "this" 值。
如果这个参数为空， "undefined" 会传递给 "this" 值

```js
let arr1 = [1, 2, 3, 4, 5];
let num = arr1.find(item => item > 1);
console.log(num) // 2
```
+ findIndex() 返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。
如果没有符合条件的元素返回 -1

> array.findIndex(function(currentValue, index, arr), thisValue)

```js
const arr = [1, 2, 3, 4, 5, 3, 3, 2, 4, 5 ]
 
// 可以这么写
const index = arr.findIndex(item => {
    return item > 2
})
console.log(index) // 2
// 也可以这么写
const index = arr.findIndex(item => item > 2)
```

<h4>排序</h4>
+ reverse() 将数组元素翻转
+ sort() 

```js
var arr=[1,2,22,11,33,3,5,4];
console.log(arr.sort()) // [1,11,2,22,3,33,4,5]
```

> 默认情况下sort方法是按ascii字母顺序排序的，而非我们认为是按数字大小排序 

```javascript
var a = [1,1,10,2,4,9,5,3]
function compare(v1,v2) {
  if (v1>v2) {
      return 1
  } else if(v1<v2) {
      return -1
  } else if (v1===v2){
      return 0
  }
}
var b = a.sort(compare)
console.log(b) // [1, 1, 2, 3, 4, 5, 9, 10]

var a = [1,1,10,2,4,9,5,3]
function compare(v1, v2){
  return v2-v1
}
var b = a.sort(compare)
console.log(b) // [10, 9, 5, 4, 3, 2, 1, 1]

var a = [1,1,10,2,4,9,5,3]
function compare(v1, v2){
  return v1-v2
}
var b = a.sort(compare)
console.log(b) // [1, 1, 2, 3, 4, 5, 9, 10]
```

#### 数组转字符窜

join() 方法接收一个参数，即字符串分隔符，返回包含所有项的字符串

#### 迭代

+ some() 对数组每一项都运行传入的函数，有一项符合就返回true
+ every() 每一项都符合才返回true
+ forEach() 循环数组每一项，没有返回值
+ filter() 返回符合的项会组成函数
+ map() 返回由每次函数调用的结果组成的函数
+ for...in 遍历对象的属性key
+ for...of 遍历对象的值value


#### 去重
1.利用ES6 Set去重


```js
function unique (arr) {
  return Array.from(new Set(arr))
}
var arr = [1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a',{},{}, 1, 'a'];
console.log(unique(arr))
// [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]
```

> Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组，也是ES6的新增方法。

```js
let arrayLike = {
  0: 'tom', 
  1: '65',
  2: '男',
  3: ['jane','john','Mary'],
  'length': 4
}
let arr = Array.from(arrayLike)
console.log(arr) // ['tom','65','男',['jane','john','Mary']]
```

2.利用for嵌套for，然后splice去重（ES5中最常用）
```js
function unique(arr){            
  for(var i=0; i<arr.length; i++){
      for(var j=i+1; j<arr.length; j++){
          if(arr[i]==arr[j]){         //第一个等同于第二个，splice方法删除第二个
              arr.splice(j,1);
              j--;
          }
      }
  }
  return arr; 
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
//[1, "true", 15, false, undefined, NaN, NaN, "NaN", "a", {…}, {…}]     //NaN和{}没有去重，两个null直接消失了
```

3.利用indexOf去重
```js
function unique(arr) {
  if (!Array.isArray(arr)) {
      console.log('type error!')
      return
  }
  var array = [];
  for (var i = 0; i < arr.length; i++) {
      if (array .indexOf(arr[i]) === -1) {
          array .push(arr[i])
      }
  }
  return array;
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
// [1, "true", true, 15, false, undefined, null, NaN, NaN, "NaN", 0, "a", {…}, {…}]  //NaN、{}没有去重
```

4.利用includes
```js
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log('type error!')
    return
  }
  var array =[];
  for(var i = 0; i < arr.length; i++) {
    if( !array.includes( arr[i]) ) {//includes 检测数组是否有某个值
            array.push(arr[i]);
      }
  }
  return array
}
var arr = [1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}];
console.log(unique(arr))
//[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]     //{}没有去重
```
### — bind/call/apply的区别？

+ call()的第一个参数为this绑定的对象，后面传入一串字符窜
当第一个参数为null或者undefined的时候，默认指向window
+ apply()和call类似，不同在于第二个参数是一个数组
+ bind()和call()类似，不通电在于bind()不会立即执行，而是返回了一个改变this后的函数；不同点二在于当你调用fn1 = fn.bind(newThis,param1)方法后，执行fn2(prama2)时，参数prama2会加到param1后面。

```js
let obj1 = {
  name: 'obj1',
  fn1(param) {
    console.log(this.name, param);
  }
}
let obj2 = {
  name: 'obj2',
  fn1(param) {
    console.log(this.name, param);
  }
}
// 一般调用
obj1.fn1('param1')  //输出 obj1 param1
//call的第一参数为调用该函数的对象时，等价于一般调用
obj1.fn1.call(obj1, 'param1')     //输出 obj1 param1
//改变this指针，指向obj2
obj1.fn1.call(obj2, 'param1')     //输出 obj2 param1

//apply的第二个参数为参数数组
obj1.fn1.apply(obj2, ['param1'])  //输出 obj2 param1

//bind方法返回一个函数,但不会执行，这个函数的参数继承bind方法的参数
let fun = obj1.fn1.bind(obj2, 'param')
fun()   //输出 obj2 param1
```

> 求数组中的最大最小值

```js
var arr = [0,8,3,46]
let max = Math.max.apply(null, arr) // 46
let min = Math.min.apply(null, arr) // 0
// 等价于
let max = window.Math.max(...arr)
let min = window.Math.min(...arr)
```

这里利用apply的第二个参数是接受一个数组，而在调用函数的时候会自动展开这个数组，而max和min方法接受参数的形式是(1,2,3,4)。

> 将 arguments 等类数组转换为数组

```js
var trueArr = Array.prototype.slice.call(arguments,0,arguments.length)
```

> 使用 log 代替 console.log

```js
function log(){
  console.log.apply(console, arguments);
}
```
### 箭头函数和普通函数的区别
普通函数的this是调用者；箭头函数的this是根据作用域的上下文确定的是，是不可以修改的。
+ 全局声明的函数，this指向的是window
+ 对象里面的函数，this指向的是当前的对象，但是可以修改
+ 构造函数的this，指向的是new出来的对象
+ 箭头函数的this，是当前声明箭头函数的作用域this指向的是谁，this就是指向谁

### — typeof 与 instanceof 区别
typeof 和 instanceof 都是 JavaScript 中用来检测数据类型的运算符，但它们的作用不同。
1.typeof 运算符是用来检测一个变量或表达式的数据类型的。它返回一个字符串，表示该值的数据类型。

> 基本数据类型可以用typeof检测出来，但null、数组、对象、函数的实例(new+函数),返回的都是object，无法检测到真实的数据类型，需要使用instanceof

```js
console.log(typeof 123);// number
console.log(typeof 'hello');//输出 string
console.log(typeof true);//输出 boolean
console.log(typeof undefined);//输出 undefined
console.log(typeof function () { });//输出 function
console.log(typeof null);//输出 object
console.log(typeof [123]);//输出 object
console.log(typeof { name: 'tom', age: 18 });//输出 object
console.log(typeof new Date());//输出 object
```
2.instanceof
instanceof 运算符是用来判断一个对象是否属于某个类（构造函数）的实例。
instanceof 检查的是对象的原型链上是否有该类实例，只要原型链上有该类实例，就会返回true，否则为false

```js
var arr = [1, 2, 3];
arr instanceof Array // 返回 true

var date = new Date();
date instanceof Date // 返回 true

var reg = /hello/;
reg instanceof RegExp // 返回 true

class Person { }
class Dog extends Person { }
let dog = new Dog()
console.log(dog instanceof Dog);//输出 true
console.log(dog instanceof Person);//输出 true
console.log(dog instanceof Object);//输出 true
//执行顺序：dog-->Person的实例-->Object实例-->Object原型
//Object是所有对象的原型，所以任何和对象和Object进行instanceof运算都会返回true
let b = { name: 'Bob', age: 18 }
console.log(b instanceof Person);//输出 false
```

> 需要注意的是，instanceof 运算符只能用来判断对象是否为该类的实例，不能用来判断基本数据类型的值。而且，如果要判断对象是否为某个类的实例，该类必须是通过构造函数定义的，不能是字面量对象或匿名函数等其他形式。

3.typeof与instanceof总结：
①typeof与instanceof用来判断变量是否为空,或者属于什么数据类型
②typeof返回的是一个字符串,用来判断是什么数据类型
③instanceof返回的是一个布尔值,用来判断一个变量是否属于对象上的实例
④typeof检测的是简单数据类型,instanceof检测的是引用数据类型
### — 本地存储
+ cookie
存储数据大小为4K左右，客户端请求服务器。将cookie返给服务器，以此来判断用户的状态，可以设置过期时间，不可跨域访问
+ sessionStorage
存储数据大小为5M左右，在当前浏览器窗口关闭后自动删除，存储位置为当前域名的浏览器本地
+ localStorage
存储数据大小为5M左右，可以手动添加删除，不手动删除，会一直保存在当前域名的浏览器本地

> 标记用户与跟踪用户行为的情况，推荐使用cookie
适合长期保存在本地的数据（令牌），推荐使用localStorage
敏感账号一次性登录，推荐使用sessionStorage

### — 深拷贝和浅拷贝

浅拷贝指的是创建一个属性、值完全一样的变量，如果是基本类型，拷贝的就是基本类型，如果是引用类型那拷贝的就是一个内存对象，只是拷贝出了一个引用值，改变拷贝值，原值也会改变。
深拷贝完全是开辟了一个栈，两个引用类型出了属性、值一样，完全都是独立的，修改其中的一个，不会影响另一个的值。

+ Object.assign
+ Array.prototype.slice()
+ Array.prototype.concat()
+ ... 拓展符实现的复制

以上方法都存在浅拷贝的现象

深拷贝的方法有：
+ _cloneDeep() Lodash库的方法
+ jQuery.extend()
+ JSON.stringify()
+ 循环递归

### — JSON是什么？
JSON是轻量级的文本数据格式，是一门独立的语言，是用js语法描述的数据对象，但独立于任何的语言，编程语言都支持JSON，具有自我描述性，更容易理解。
+ json对象转化为json字符窜

```js
var jsonStr = JSON.stringify(jsonObj);
```

+ JSON字符串转化为JSON对象

1). 使用eval()函数进行转换
使用 eval() 转换时需要在 json 字符外包裹一对小括号。

ie8(兼容模式)、ie7、ie6 不要使用此方法。

```js
var jsonObj = eval('(' + jsonStr + ')');
```
2). 使用JSON.parse()方法进行转换
ie8(兼容模式)、ie7、ie6 不要使用此方法。

```js
var jsonObj = JSON.parse(jsonStr);
```

3). 使用jQuery进行转换
如果我们项目中有使用 jQuery，那么直接使用 $.parseJSON() 方法即可，而且可以确保各个浏览器的兼容性。

```js
var jsonObj = $.parseJSON(jsonStr);
```

### — 闭包，使用场景
#### 概念
闭包是指一个函数中有权访问另一个函数中的变量，本质就是在函数A中返回另一个函数B，这时候B函数可以访问A函数中的变量，这样就形成了一个闭包，A函数中变量不会被销毁，并且这个变量只能通过B函数来访问。
#### 解决的问题
能够让函数执行后，其中的变量不会被销毁，同时能够让函数内的局部变量被访问。
#### 闭包带来的问题和如何规避
由于垃圾回收机制不能销毁闭包中的局部变量，从而导致内存泄漏，一旦闭包使用的太多，就会导致内存溢出，导致程序不安全和卡顿，所以必须手动设置闭包=null,让垃圾回收机制回收闭包中的变量。
#### 简单实现一个闭包
```js
var getA = function() {
  var a = 10;
  return function() {
    return a
  }
}
var a = getA()
console.log(a) // 10
```
#### 闭包的作用
+ 延长变量的生命周期
+ 创建私有变量
+ 闭包可以在函数外部访问到函数内部作用域的变量
+ 闭包可以让访问变量不会被垃圾机制回收

#### 闭包的应用场景
+ 使用场景一:给对象设置私有变量并且利用特权方法去访问私有属性
```js
function Fun(){
  var name = 'tom';
  
  this.getName = function (){
    return name;
  }
}

var fun = new Fun(); 
console.log(fun.name);//输出undefined,在外部无法直接访问name
console.log(fun.getName());//可以通过特定方法去访问
```

+ 防抖节流

### — 什么是防抖和节流？
+ 防抖 n秒后在执行该事件，若在n秒之内被重复触发，则重新计时(单位时间内，频繁触发一个事件，以最后一次触发为准。)

```js
/**
 * 防抖动
 *
 * @export
 * @param {*} fn 方法
 * @param {*} delay 多少毫秒不调用后执行一次
 * @returns
 */
export function debounce(fn, delay) {
  var timeout = null
  return function() {
    let that = this
    let args = arguments
    clearTimeout(timeout) 
    timeout = setTimeout(function() {
      fn.apply(that, args)
    }, delay)
  }
}
```

+ 节流 n秒内只运行一次，若在n秒内重复触发，只有一次生效(单位时间内，频繁触发一个事件，只会触发一次。)

```js
/**
 * 节流
 *
 * @export
 * @param {*} func 方法
 * @param {*} delay 每隔多少毫秒执行一次
 * @returns
 */
export function throttle(func, delay) {
  var timer = null
  return function() {
    var that = this
    var args = arguments
    if (!timer) {
      timer = setTimeout(function() {
        func.apply(that, args)
        timer = null
      }, delay)
    }
  }
}
```

### — ajax的请求过程

```js
// ajax 提交 post 请求的数据
// 1. 创建核心对象
var xhr = new XMLHttpRequest();
// 2. 准备建立连接
xhr.open("POST", "register.php", true);
// 3. 发送请求
// 如果要POST提交数据，则需要设置请求头
// 有的面试官会问为什么要设置请求头？ 知道请求正文是以什么格式
// Content-Type: application/x-www-form-urlencoded，请求正文是类似 get 请求 url 的请求参数
// Content-Type: application/json，请求正文是一个 json 格式的字符串
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
// 发送数据
xhr.send(querystring);
// 4. 处理响应
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) { // 请求处理完毕，响应就绪
    if (xhr.status === 200) { // 请求成功
      var data = xhr.responseText;
      console.log(data);
    }
  }
}
```

### — ajax请求的时候get 和post方式的区别

+ get请求，传递的参数是链接传递，有长度限制（IE 和 Safari 浏览器 限制 2k，Opera 限制4k，Firefox 限制 8k（非常老的版本 256byte）），post请求无限制
+ get请求参数在url后面传递，不安全，容易被窃取
+ post请求需要设置请求头

### — ajax、axios、jsonp的理解
1、jsonp是一种可以解决跨域问题的方式，就是通过动态创建script标签用src引入外部文件实现跨域，script加载实际上就是一个get请求，并不能实现post请求。(其他实现跨域的方法有：iframe,window.name,postMessage,CORS...)
2、ajax是一种技术，ajax技术包含了get和post请求的，但是它仅仅是一种获取数据的技术，不能直接实现跨域，只有后台服务器配置好Access-Control-Allow-Origin，才可以实现请求的跨域。
3、axios是通过promise实现对ajax技术的一种封装，axios是ajax，ajax不止axios。

### — 什么是事件委托以及优缺点
js事件委托就是利用冒泡的原理，把本应该添加到某个元素上的事件委托给他的父级，从而减少DOM交互达到网页优化。

【优点】

1.可以大量节省内存占用，减少事件注册。比如ul上代理所有li的click事件就很不错。 
2.可以实现当新增子对象时，无需再对其进行事件绑定，对于动态内容部分尤为合适

【缺点】

事件代理的常用应用应该仅限于上述需求，如果把所有事件都用事件代理，可能会出现事件误判。即本不该被触发的事件被绑定上了事件。

### — 如何解决数字精度丢失的问题?

理论上用有限的空间来存储无限的小数是不可能保证精确的，但我们可以处理一下得到我们期望的结果

当你拿到 1.4000000000000001 这样的数据要展示时，建议使用 toPrecision 凑整并 parseFloat 转成数字后再显示，如下：
```js
parseFloat(1.4000000000000001.toPrecision(12)) === 1.4  // True
```

封装成方法就是：

```js
function strip(num, precision = 12) {
  return +parseFloat(num.toPrecision(precision));
}
```

最后还可以使用第三方库，如Math.js、BigDecimal.js

### — 原型，原型链 ? 有什么特点？

JavaScript 常被描述为一种基于原型的语言——每个对象拥有一个原型对象

当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾

原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链 (prototype chain)，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。

### — 如何实现上拉加载，下拉刷新？

开源社区有很多优秀的解决方案，如iscroll、better-scroll、pulltorefresh.js库等等

### — 说说你对作用域链的理解

1、作用域就是变量与函数的可访问范围
2、一般情况下，变量取值到创建这个变量的函数的作用域中取值。 但是如果在当前作用域中没有查到值，就会向上级作用域去查，直到查到全局作用域，这么一个查找过程形成的链条就叫做作用域链

### — 浏览器输入Url之后发生了什么？

浏览器输入URL链接 -> 回车 -> 浏览器查找当前URL是否有本地缓存 -> dns解析URL对应的IP -> 根据IP三次握手TCP -> 发起http请求 -> 服务器处理请求 ->  关闭四次握手 -> 浏览器根据发回的response响应，启用浏览器的渲染引擎和JS引擎，更具HTML/CSS/JS/IMG等等渲染页面。

1.浏览器解析html源码，创建dom树，在dom树中，每个html标签都有一个节点，每个文本都有一个节点，dom数的根节点是html标签
2.浏览器解析css，计算出最终的样式，对css中非法的代码过滤掉，根据优先级计算最终的渲染树
3.根据生成的dom树和cssom，调用GPU，合成图层，显示在屏幕上。

## vue相关

### 什么是mvvm?
modal + view + viewModal的缩写，是modal驱动view的渐进式框架，不需要直接操作dom来实现页面的改变。

### 为什么使用虚拟dom
+ 创建真实DOM的代价高：真实的 DOM 节点 node 实现的属性很多，而 vnode 仅仅实现一些必要的属性，相比起来，创建一个 vnode 的成本比较低。
+ 触发多次浏览器重绘及回流：使用 vnode ，相当于加了一个缓冲，让一次数据变动所带来的所有 node 变化，先在 vnode 中进行修改，然后 diff 之后对所有产生差异的节点集中一次对 DOM tree 进行修改，以减少浏览器的重绘及回流。
+ 虚拟dom由于本质是一个js对象，因此天生具备跨平台的能力，可以实现在不同平台的准确显示。
+ Virtual DOM 在性能上的收益并不是最主要的，更重要的是它使得 Vue 具备了现代框架应有的高级特性。

### Vue中key是用来做什么的？为什么不推介使用index作为key？
1、key的作用主要是为了高效的更新虚拟DOM（使用key，它会基于key的变化重新排列元素顺序，并且会移除key不存在的元素）

2、当以数组的下标index作为index值时，其中一个元素（如增删改查）发生了变化就有可能导致所有元素的key值发生变化

### v-show和v-if的区别
v-show原理是修改元素的css属性display:none来决定是显示还是隐藏

v-if则是通过操作DOM来进行切换显示

### 双向数据绑定
实现mvvm的双向绑定，是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

### 生命周期函数有哪些

+ beforeCreate 实例刚在内存中被创建出来，此时还没有初始化好data和methods属性
+ created 实例已经在内存中创建出来，此时的data和methods以及创建完成，但是还没有开始编译模板
+ beforeMount 此时已经完成了模板的编译，但是还没有挂载到页面上
+ mounted 已经将编译好的模板，挂载到了页面指定的容器中显示
+ beforeUpdate 状态更新之前执行此函数，此时data中的状态值是最新的，但是界面上显示的数据还是旧的，因为此时还没有开始重新渲染DOM节点
+ updated 实例更新完毕之后调用此函数，此时data中的状态值和界面上显示的数据，都已经完成了更新，界面已经被重新渲染好了
+ beforeDestory 实例销毁之前调用，在这一步，实例仍然完全可用
+ destoryed Vue实例销毁之后调用。调用后，Vue实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁

### 常用的指令？常用的内置组件有哪些？

常用指令：
v-html v-text v-modal v-if v-show v-hide v-once v-on v-for

常用内置组件
transition 动画 
keepAlive 多个组件动态切换时缓存被移除的组件实例

### vue自定义指令设置

+ 全局: Vue.directive('指令名称，不需要写v-开头',对象或函数)

```js
Vue.directive('test',{
	bind(el,bind){
		console.log(el)
	}
})

Vue.directive('red', {
    // bind 第一次绑定到元素时调用
    bind(el, bindings) {
        el.style.cssText = `color:red;font-size:30px`
    }
})
```

+ 私有
在组件中的

```js
new Vue({
	directives: {
		test:{
			bind(el,bind){}
		},
		// bind/update
		test2(el,bind){}
	}
})

// 定义局部指令，只有当前的实例能用
directives: {
    red: {
        // bind它还没有绑定到父元素中,初始化
        bind(el) {
            el.style.cssText = `color:red;font-size:30px`
        }
    }
}
```

### 父子组件之间的通信

父传子：通过props来传递
父组件(:变量名) -> 子组件([props])来接收
子传父：$emit/$on
子组件($emit('事件名'，值)) -> 父组件(@事件名='aa',aa(传递的值))来接收
兄弟组件：创建一个事件中心 

```js
let Hub = new Vue()
Hub.$emit('change', 值) // Hub触发事件
Hub.$on('change', ()=>{
  // Hub接收事件
  this.msg = 值
})
通过Hub.$off()方法名销毁之后无法进行传递数据
```
详细介绍：http://shuy.cc/2019/04/27/jc-6/

### 路由跳转的方式，传参方式有哪些？
1). 标签
```js
<router-link :to="{name: '路由名'}"
```

2). 动态路由
App.vue

```js
<router-link :to="'/user/' + userId">用户</router-link>
```

router.js

```js
{path: '/user/:userId'}
```

```js
<router-link :to="{name: 'users', params: {id: 12}}">用户</router-link>
this.$route.push({name: 'users', params: {id: 12}})
this.$route.push('/user/12')

// 获取：$route.params.id
```

```js
<router-link :to="{path: '/profile', query: {id: 12}}">档案</router-link>

<router-link :to="{name: '/users', query: {id: 12}}">档案</router-link>

aa() {
  this.$router.push({
    path: '/profile',
    query: {
      name: 'yaoyao',
      id: 12
    }
  })
}

// 获取：$route.query.id
```

### router 和 route的区别
+ $route对象
表示当前的所有的路由信息，包括路径，参数，query对象等

```js
import Layout from '../views/layout/Layout'
const asyncRoutes = [
  {
    path: '/product-define',
    component: Layout,
    redirect: '/product-define/',
    name: 'ProductDefineManagement',
    meta: {
      title: '产品定义定价',
      icon: 'icon-dingyidingjia'
    },
    children: [
      {
        path: 'CarType',
        name: 'CarType',
        component: () => import('@/views/product_define/CarType'),
        meta: { title: '车型' }
      }
    ]
  }
]
```

> $route.path 路径
  $route.params 一个key: val对象
  $route.query 一个key: val对象
  $route.hash #号后面的数据
  $route.fullPath url，包含参数和hash完整路径
  $route.matched 数组，常用作面包屑
  $route.name 当前路由的名称
  $route.meta 路由元信息，一些额外标注参数


+ $router对象：是全局的路由实例。

### 编程式导航的使用方法
  
1.路由的跳转
this.$router.push()
2.路由替换
this.$router.replace()
3.后退
this$router.back()
4.前进
this.$router.forward()
5.前进后退
this.$router.go() -1为后退
6.配置路由常用参数
+ path 路径
+ component 路由相对于组件的路径
+ name 路由的名称
+ children 嵌套路由的子组件的配置项 
+ props 路由解耦
+ redirect 路由重定向

### 什么是路由守卫？路由的钩子函数有哪些？
路由守卫：路由跳转前后的一些验证
路由钩子函数：
+ beforeRouterEnter 当路由跳转之前（登录之前）
+ beforeRouterUpdate 当路由进行更新的时候，如果当前路由发生了变化，但是不需要组件进行销毁
+ beforeRouterLeave 当路由离开的时候（当用户没有支付离开的时候、当用户填写完用户信息没有保存的时候）
+ beforeEach 全局守卫，验证用户是否登录 

### vuex的理解

vuex是专门为vue开发的一款状态管理库，主要采用集中管理应用所有的组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

+ state 保存应用的全部状态的对象 this.$store.state(key)
+ Getter 其实就是state通过计算属性，衍变出的新的状态 this.$store.getters(key)
+ Mutation 包含一个字符窜名称和回调函数，必须是同步函数
```js
mutations: {
  name(state) {
    state.count++
  }
}
```
> 它其实就是操作state的，它不能直接调用，这更像是一个事件注册，需要 store.commit('name')来调用对应的mutation

+ action 类似于mutation,但是action提交的数mutation，并且是异步的，使用commit('mutation名')来调用，action使用dispatch来调用

> 在main.js引入store，注入。新建了一个store目录，然后….. export 。 场景：单页应用中，组件之间的共享状态和方法 state Vuex 使用单一状态树,即每个应用将仅仅包含一个store 实例，但单一状态树和模块化并不冲突。存放的数据状态，不可以直接修改里面的数据。 mutations mutations定义的方法动态修改Vuex 的 store 中的状态或数据。 getters 类似vue的计算属性，主要用来过滤一些数据。 action actions可以理解为通过将mutations里面处里数据的方法变成可异步的处理数据的方法，简单的说就是异步操作数据。view 层通过 store.dispath 来分发 action。 modules 项目特别复杂的时候，可以让每一个模块拥有自己的state、mutation、action、getters,使得结构非常清晰，方便管理。

快速掌握vuex常用的所有api用法: http://shuy.cc/2019/07/24/vuex/

## 小程序相关

### 生命周期函数有哪些？小程序的周期函数？
生命周期函数：
onLoad
onUnLoad
onShow
onHide
onReady
小程序周期函数：
onLaunch
onShow
onError

### 应用与页面生命周期发生顺序
应用onLaunch -> 应用onShow -> 页面page -> onLoad -> onShow -> onReady
### 小程序是如何传值？

```html
<button bindTap="get" id='123' data-name="按钮名">按钮</button>
```

```js
get(e) {
  let id = e.currentTarget.id
  let name = e.currentTarget.dataset.name
}
```

### wxss和css的区别

+ wxss背景图只能引入外联，不能使用本地图片
+ 小程序使用@important引入外链样式，地址为相对路径
+ 单位为rpx，是响应式像素，可根据屏幕宽度做自适应

### 小程序是如何传递数据？

+ 在app.js中，this.globalData={}中存放数据，在组件.js中，头部引入const app = getApp(),来获取全局变量，直接使用app.globalData.key来获取变量
+ 使用路由，wx.navigation/redircetTo/url+参数等方式，在页面onLoad(e),通过e来获取参数
+ 本地缓存，如storage等存储数据

### webview的理解
在小程序中嵌套H5页面，域名必须在白名单里面

### 注意事项
1.rpx，规定屏幕宽度为750rpx，可适配不同的屏幕宽度
2.本地资源wxss无法获取，bgimg可使用网络图片，base64,或者使用标签来引入
3.navigateTo，一个应用同时能发开5个页面或者使用redirct

### 小程序的双向绑定和vue的有什么区别
小程序必须使用this.setState({key:val})来更新数据，直接赋值不能更新页面变化

### 下拉刷新的实现方法
app.json中，将'enablePullDownFresh': true,开启全局下拉刷新，组件.json中，将'enablePullDownFresh': true,开启单页下拉刷新，组件中的onPullDownRefresh写加载的逻辑，wx.stopPullDownRefresh()更新完数据，停止更新。

### 跳转的方式有哪些
+ wx.navigateTo() 保留当前页，跳转到应用指定页面，不能跳转tabar页面
+ wx.redircetTo() 关闭当前页，跳转到应用指定页面，不能跳转tabar页面
+ wx.switchTo() 跳转到tabbar页面，关闭其他非tabar页面
+ wx.navigateBack() 关闭当前页，返回上一级或多级页面，可通过getCurrentPages()获取当前的页面栈，决定要返回第几层
+ wx.relaunch() 关闭所有页，打开到应用内的某个页面（应用场景：登陆跳转到其他页面）

### 描述一下小程序的登陆流程

点击登陆按钮 -> 调用微信登陆程序接口wx.login,获取code(有效期5分钟) -> 后台使用code、appid,appSercrent获取openid、session-key,然后生成token返回给前端 -> 前端保存token，便于之后的业务请求

### wx:if和hidden的区别，如何使用？

wx:if 有更高的切换消耗
hidden 有更高的初始渲染消耗
页面数据切换使用hidden,运行条件变化使用wx:if

### app.json的配置项

pages 存放小程序所有pages的路径
window 小程序所有页面的顶部、背景颜色，文字tabbar等的设置
tabBar 设置底部导航，最多5个，最少2个

