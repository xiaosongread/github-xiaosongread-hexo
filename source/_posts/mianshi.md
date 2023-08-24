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

### 什么是BFC？
bfc 就是 Block formatting contexts，***块级格式化上下文***
一个独立的渲染区域，有这自己的渲染规则，其内部元素不会和外部元素相互影响。
常见触发 **BFC** 方式：
1. 元素设置了 float 属性（float 不为 none）;
2. 元素设置了 position 属性为 absolute 或 fixed;
3. 元素设置了 display 属性为 inline-block;
4. 元素 overflow 属性值除了 visible 外。


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

<!-- 1) 使用Flexbox布局
在父级容器中设置 display: flex; 和 justify-content: center; align-items: center;
这将使子元素水平和垂直居中

2) 使用Grid布局
在父级容器中设置 display: grid; 和 place-items: center;
这将使子元素水平和垂直居中

3) 使用绝对定位
+ 在子元素中设置 position: absolute; 和 top: 50%; left: 50%; (transform: translate(-50%, -50%)/margin-top: -50%;margin-left: -50%;);
+ 在子元素中设置 position: absolute; 和 top:0; left: 0; bottom: 0; right: 0;
这将使子元素相对于父级容器垂直和水平居中 -->

+ 使用绝对定位 + transform，给子元素添加如下样式
这种方式比较常用，***父子元素都不确定宽高***的情况也适用。
如果 ***子元素的宽高确定***的话，translate中的值也可以设置为子元素宽高的一半，即transform: translate(-100px, -100px); 

```css
.work{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%)
}
```
+ 使用绝对定位 + margin，给子元素添加如下样式
这种方式适合 ***子元素宽高确定***的情况，给margin-top设置百分比的大小将不生效，即margin-top: -50%;不能达到垂直居中的效果

```css
.work1{
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
}
```

+ 使用绝对定位 + margin: auto，给子元素添加如下样式
***父子元素宽高都未知时也适用***。

```css
.work2{
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin:auto;
}
```

+ 父元素使用flex布局，并设置相关的属性值为center
这种方式要求 ***父元素的高度是确定的*** ，百分比形式的高度将不能生效。

```css
.par-work{
  height: 100vh;
  display:flex;
  justify-content:center;
  align-items:center;
}

```

+ 使用table-cell实现
这种方式需要 ***父元素的宽高都是确定的***，才能保证子元素在父元素中垂直水平都居中。

```css
.par-work2 {
  height: 500px;
  width: 500px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.son-work2 {
  display: inline-block;
}
```

+ 使用grid布局
这种方式适用于 ***父元素高度确定***的情况

```css
.par-work3 {
  display: grid;
  height: 500px;
}
.son-work3 {
  align-self: center; /*设置单元格内容的垂直位置*/
  justify-self: center; /*设置单元格内容的水平位置*/
}
```

### — rem、em、vh、px各自代表的含义？
px: 绝对单位，页面按精确像素展示

em: 相对单位，基准为父节点字体大小，如果自身定义了font-size按照自身来计算，整个页面内1em不是一个固定值

rem: 相对单位，可以理解为root em，相对根节点html的字体大小来计算
默认根元素的 font-size 都是 16px 的。如果想要设置 12px 的字体大小也就 是 12px/16px = 0.75rem

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

### — flex

参考文档：[flex布局教程](/2020/11/05/flex布局教程/)
## javascript

### — js中的数据类型

+ 基本类型 string number null undefind boolean Symbol(ES6 引入了一种新的原始数据类型，表示独一无二的值)
+ 引用类型 Object Array Function

### — var/let/const 的区别？
+ 变量提升
var声明存在变量提升，let和const不存在变量提升，不声明是不可以使用的，否则会报错

```js
// 示例1
var a
var a // 重复声明会被忽视
a = 1
console.log(a) // 1
a = 2
console.log(a) // 2
 
// 示例2
var a 
a = 1
console.log(a) // 1
console.log(a) // 1
 
// 示例3
var a 
console.log(a) //undefined
a = 1
console.log(a) // 1
```
> js中，变量提升指的是变量声明的提升，赋值还是按照代码中的顺序逐行执行。

```js
// 函数式声明 会变量提升
fn(10) // 10
function fn (a) {
    console.log(a)
}
// 表达式声明 不会变量提升
console.log(test) // undefined
test(10) // TypeError: test is not a function
var test = function(a) {
  console.log(a)
}
console.log(a) // f a()
function a(v){return v}
console.log(a) // f a()
var a=1
console.log(a) // 1
```
```js
console.log(a) // ƒ a(v){return v}
var a=1
console.log(a) // 1
function a(v){return v}
console.log(a) // 1
```
> 函数的提升是优先变量的提升的。
变量提升指的是变量声明的提升，赋值还是按照代码中的顺序逐行执行。
函数式声明存在变量提升，函数表达式声明不存在变量提升。

+ 作用域
var 没有块级作用域一说，不声明也是可以使用的，let，const有块级作用域一说，只能在声明的花括号里面使用
+ 使用的方法
const声明一个只读的变量，一旦声明，不可以修改，其余使用let，避免使用var，因为有不可控性，代码复杂的时候，不容易查找问题。

### — ES6 标准入门

文档参考：[ES6 入门教程](https://es6.ruanyifeng.com/)
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
普通函数的this是调用者；箭头函数的this是根据作用域的上下文确定的，是不可以修改的。
+ 全局声明的函数，this指向的是window
+ 对象里面的函数，this指向的是当前的对象，但是可以修改
+ 构造函数的this，指向的是new出来的对象
+ 箭头函数的this，是当前声明箭头函数的作用域this指向的是谁，this就是指向谁

#### 普通函数
一句话：谁调用就指向谁。
```js
var person={
   age:20,
   getAge(){
       var age = 30;
       return this.age;
    },
};
person.getAge(); // 20
```

> 这个的 getAge 方法是 person 调用的，所以 this 指向 person，person.age 输出为 20；

#### 箭头函数
一句话：调用者指向谁，则指向谁。
```js
var age = 10;
var person={
   age:20,
   getAge:()=>{
       var age = 30;
       return this.age;
    },
};
person.getAge(); // 10
```

> 这个的 getAge 方法是 person 调用的，则 getAge 和 person 的指向一致，person 是 window 调用的（参照上述普通函数），所以 person 指向 window，因此 getAge 也指向 window，输出 10。

#### 强制改变 this 指向
一句话：你说指向谁就指向谁。
改变 this 指向，有 call，apply，bind 这几种方法。

```js
var age = 10;
var person={
   age:20,
   getAge:function(){
       var age = 30;
       return this.age;
    },
};
person.getAge.call(person);
```

> 这里 call 方法将 person 作为 this 指向，所以输出 20。
这里在执行 getAge 方法的时候，传入了 person，那么 getAge 的 this 指向 person，所以输出 20。

#### 总结
1. 箭头函数没有 this，箭头函数的 this 指向的是外层第一个普通函数的 this，如果外层没有普通函数，则指向 window。
2. 普通函数的 this 指向调用者，如果调用者是 window，则指向 window。
3. 箭头函数的 this 指向是固定的，不会指向调用者，而是指向外层第一个普通函数的 this。


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

```js
const deepClone = obj => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }
  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
}
```

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
console.log(a()) // 10
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

> 简单点理解就是：
防抖是频繁执行某个事件的时候，就等事件停止之后的n秒后再执行相关的操作；
节流是频繁执行某个事件的时候，规定n秒执行一次回调（执行相关的操作），比如规定了1S执行一次，那就是如果用户某个按钮频繁点击了3S，那就执行相关操作（执行回调方法）3次。

使用场景：
最典型的防抖函数应用场景就是搜索输入框了，用户输入之后需要自动发送网络请求获取数据，但是普通函数会频繁的触发事件，而用户的输入并没有完成，请求的结果也是无意义的，毫无疑问地给服务器造成了巨大地压力。
现在需要优化的关键点就是，如何使网络请求触发的不那么频繁，比如在用户输入停下一段时间后，这时，可能代表用户输入已经完毕，在这时才发送请求是最合适的。防抖函数就可以很好的做到这一点。
防抖函数的功能：如果在某个时间内反复触发的函数，那么它只会执行最后触发的那一次。

```js
/**
 * 防抖动
 *
 * @export
 * @param {*} func 需要防抖执行的函数
 * @param {*} delay 多少毫秒不调用后执行一次,延迟时间
 * @returns
 */
function debounce(func, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

+ 节流 n秒内只运行一次，若在n秒内重复触发，只有一次生效(单位时间内，频繁触发一个事件，只会触发一次。)

应用场景：假如有一个轮播图，轮播图以固定的频率播放图片，用户可以点击切换上一张或者下一张，如果用户点击过快，轮播图就会一直切换。这时候，应该控制轮播图切换的频率，在用户的持续点击下，只按照固定的频率切换。
节流函数的功能：连续的触发某个函数，只会以固定的频率去执行

```js
function throttle(func, delay = 500) {
  let timer = null;
  return function(...args) {
    if (!timer) {
      timer = setTimeout(() => {
        func.apply(this, args);
        timer = null;
      }, delay);
    }
  };
}

// 或者
/**
**@param{fn: function} 需要节流的函数
**@param{interval: number} 函数触发的频率
*/
const throttle = (fn, interval) => {
  // 记录上一次触发函数时的时间，初始值为0
  let lastTime  = 0
  return function (...args) {
    // 获取现在的时间
    const nowTime = new Date().getTime()
    // 如果现在的时间减去上次触发的事件大于等于interval，则可以执行函数了
    if(nowTime - lastTime >= interval){
      fn.apply(this, args)
      // 将上次触发函数的时间赋值成当前时间
      lastTime = nowTimes
    }
  }
}
// 或者
/**
 * 节流
 *
 * @export
 * @param {*} fn 方法
 * @param {*} delay 每隔多少毫秒执行一次
 * @returns
 */
const throttle = (fn, delay) => {
  let flag = true;
  return function () {
    if (!flag) return;
    flag = false;
    fn.apply(this, arguments);
    setTimeout(() => {
      flag = true;
    }, delay);
  };
};
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
2、ajax是一种技术，ajax技术包含了get和post请求的，但是它仅仅是一种获取数据的技术，不能直接实现跨域，只有后台服务器配置好Access-Control-Allow-Origin，才可以实现跨域的请求。
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

<!-- ### — 浏览器内核 -->

### — 浏览器输入Url之后发生了什么？

浏览器输入URL链接 -> 回车 -> 浏览器查找当前URL是否有本地缓存 -> dns解析URL对应的IP -> 根据IP建立TCP连接(三次握手) -> 发起http请求 -> 服务器处理请求 ->  关闭TCP连接(四次握手) -> 浏览器根据发回的response响应，启用浏览器的渲染引擎和JS引擎，更具HTML/CSS/JS/IMG等等渲染页面。

#### 从输入URL到页面加载的主干流程如下：

1、浏览器的地址栏输入URL并按下回车。

2、浏览器查找当前URL的DNS缓存记录。

3、DNS解析URL对应的IP。

4、根据IP建立TCP连接（三次握手）。

5、HTTP发起请求。

6、服务器处理请求，浏览器接收HTTP响应。

7、渲染页面，构建DOM树。

8、关闭TCP连接（四次挥手）。

##### 1.首先在浏览器中输入URL

我们常见的RUL是这样的:
http://www.baidu.com
这个域名由三部分组成：协议名、域名、端口号，这里端口是默认所以隐藏。除此之外URL还会包含一些路径、查询和其他片段
例如：http://www.tuicool.com/search?kw=%E4%。
我们最常见的的协议是HTTP协议，除此之外还有加密的HTTPS协议、FTP协议、FILe协议等等。URL的中间部分为域名或者是IP，之后就是端口号了。通常端口号不常见是因为大部分的都是使用默认端口，如HTTP默认端口80，HTTPS默认端口443。

+ 查找缓存：浏览器先查看浏览器缓存-系统缓存-路由缓存中是否有该地址页面，如果有则显示页面内容。如果没有则进行下一步。

+ 浏览器缓存：浏览器会记录DNS一段时间，因此，只是第一个地方解析DNS请求；

+ 操作系统缓存:如果在浏览器缓存中不包含这个记录，则会使系统调用操作系统， 获取操作系统的记录(保存最近的DNS查询缓存)；

+ 路由器缓存：如果上述两个步骤均不能成功获取DNS记录，继续搜索路由器缓存；

+ ISP缓存：若上述均失败，继续向ISP搜索。

##### 2.DNS域名解析

我们知道在地址栏输入的域名并不是最后资源所在的真实位置，域名只是与IP地址的一个映射。网络服务器的IP地址那么多，我们不可能去记一串串的数字，因此域名就产生了，域名解析的过程实际是将域名还原为IP地址的过程。

首先浏览器先检查本地hosts文件是否有这个网址映射关系，如果有就调用这个IP地址映射，完成域名解析。

如果没找到则会查找本地DNS解析器缓存，如果查找到则返回。

如果还是没有找到则会查找本地DNS服务器，如果查找到则返回。

最后迭代查询，按根域服务器 ->顶级域,.cn->第二层域，hb.cn ->子域，www.hb.cn的顺序找到IP地址。

DNS域名解析：浏览器向DNS服务器发起请求，解析该URL中的域名对应的IP地址。DNS服务器是基于UDP的，因此会用到UDP协议。
##### 3.建立TCP连接： 解析出IP地址后，根据IP地址和默认80端口，和服务器建立TCP连接

发起HTTP请求： 浏览器发起读取文件的HTTP请求，，该请求报文作为TCP三次握手的第三次数据发送给服务器

服务器响应请求并返回结果：服务器对浏览器请求做出响应，并把对应的html文件发送给浏览器

关闭TCP连接 ： 通过四次挥手释放TCP连接

浏览器渲染：客户端（浏览器）解析HTML内容并渲染出来，浏览器接收到数据包后的解析

**构建DOM树：**词法分析然后解析成DOM树（dom tree），是由dom元素及属性节点组成，树的根是document对象

构建CSS规则树：生成CSS规则树（CSS Rule Tree）
构建render树：Web浏览器将DOM和CSSOM结合，并构建出渲染树（render tree）
布局（Layout）：计算出每个节点在屏幕中的位置
绘制（Painting）：即遍历render树，并使用UI后端层绘制每个节点。
JS引擎解析过程：
调用JS引擎执行JS代码（JS的解释阶段，预处理阶段，执行阶段生成执行上下文，VO，作用域链、回收机制等等）

创建window对象：window对象也叫全局执行环境，当页面产生时就被创建，所有的全局变量和函数都属于window的属性和方法，而DOM Tree也会映射在window的doucment对象上。当关闭网页或者关闭浏览器时，全局执行环境会被销毁。
加载文件：完成js引擎分析它的语法与词法是否合法，如果合法进入预编译
预编译：在预编译的过程中，浏览器会寻找全局变量声明，把它作为window的属性加入到window对象中，并给变量赋值为’undefined’；寻找全局函数声明，把它作为window的方法加入到window对象中，并将函数体赋值给他（匿名函数是不参与预编译的，因为它是变量）。而变量提升作为不合理的地方在ES6中已经解决了，函数提升还存在。
解释执行：执行到变量就赋值，如果变量没有被定义，也就没有被预编译直接赋值，在ES5非严格模式下这个变量会成为window的一个属性，也就是成为全局变量。string、int这样的值就是直接把值放在变量的存储空间里，object对象就是把指针指向变量的存储空间。函数执行，就将函数的环境推入一个环境的栈中，执行完成后再弹出，控制权交还给之前的环境。JS作用域其实就是这样的执行流机制实现的。
浏览器重绘与重排的区别？
重排/回流（Reflow）：当DOM的变化影响了元素的几何信息，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。表现为重新生成布局，重新排列元素。
重绘(Repaint): 当一个元素的外观发生改变，但没有改变布局,重新把元素外观绘制出来的过程，叫做重绘。表现为某些元素的外观被改变
单单改变元素的外观，肯定不会引起网页重新生成布局，但当浏览器完成重排之后，将会重新绘制受到此次重排影响的部分
重排和重绘代价是高昂的，它们会破坏用户体验，并且让UI展示非常迟缓，而相比之下重排的性能影响更大，在两者无法避免的情况下，一般我们宁可选择代价更小的重绘。
『重绘』不一定会出现『重排』，『重排』必然会出现『重绘』。
如何触发重排和重绘？
任何改变用来构建渲染树的信息都会导致一次重排或重绘：

添加、删除、更新DOM节点
通过display: none隐藏一个DOM节点-触发重排和重绘
通过visibility: hidden隐藏一个DOM节点-只触发重绘，因为没有几何变化
移动或者给页面中的DOM节点添加动画
添加一个样式表，调整样式属性
用户行为，例如调整窗口大小，改变字号，或者滚动。
如何避免重绘或者重排？
集中改变样式，不要一条一条地修改 DOM 的样式。

不要把 DOM 结点的属性值放在循环里当成循环里的变量。

为动画的 HTML 元件使用 fixed 或 absoult 的 position，那么修改他们的 CSS 是不会 reflow 的。

不使用 table 布局。因为可能很小的一个小改动会造成整个 table 的重新布局。

尽量只修改position：absolute或fixed元素，对其他元素影响不大

动画开始GPU加速，translate使用3D变化

提升为合成层

> 将元素提升为合成层有以下优点：
合成层的位图，会交由 GPU 合成，比 CPU 处理要快
当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层
对于 transform 和 opacity 效果，不会触发 layout 和 paint
提升合成层的最好方式是使用 CSS 的 will-change 属性：#target {will-change: transform;}

### 谈谈你对promise、axios的理解
***promise*** 是 js 用来处理所有异步操作的
传统的方式处理异步操作，就是 ajax 嵌套 ajax,就是常说的回调地狱，是非常难维护，而 promise 有 resolive 和 reject 这两个方法，将成功和失败返回的数据，传递给使用者，promise 开始的状态是 pending ，当成功或者失败的时候，状态会切换到 fulfilled(成功)或者rejected（失败）状态，把结果通过then()或者catch()交出去。
promise 不仅仅一次处理一个异步请求，它还有两个方法，all() 和 race() ,all() 只有在里面所有的异步操作都成功才算是成功，race() 只有在一个异步请求成功就会往后面继续执行代码。

### webpack 构建优化怎么搞？
webpack构建的时候，需要找出所有模块文件进行编译处理，那么我们可以在以下几个点上做优化处理：
1. 缩小文件的搜索范围，用alias extensions等配置缩小范围
2. 减少需要解析的文件，使用 noParse配置告诉webpack 排除指定的文件，不对它们进行解析
3. 避免重复编译第三方库，可以吧第三方文件库单独打包到一个文件夹中，他不会跟着业务代码一起重新打包

构建的时候，如果对多个js文件需要被压缩，他会一个一个的进行压缩，可以使用 parallelUglifyPlugin插件来开启多个子进程，采用并行方式对多个js文件进行压缩
## vue相关

### 什么是mvvm?
modal + view + viewModal的缩写，是modal驱动view的渐进式框架，不需要直接操作dom来实现页面的改变。

### 生命周期函数有哪些

+ beforeCreate 实例刚在内存中被创建出来，此时dom data methods 都是取不到的
+ created 实例已经在内存中创建出来，此时dom 是取不到的 data methods可以取到
+ beforeMount 此时已经完成了模板的编译，但是还没有挂载到页面上，此时dom 是取不到的 data methods可以取到
+ mounted 已经将编译好的模板，挂载到了页面指定的容器中显示,dom data methods都可以取到
+ beforeUpdate 状态更新之前执行此函数，此时data中的状态值是最新的，但是界面上显示的数据还是旧的，因为此时还没有开始重新渲染DOM节点
+ updated 实例更新完毕之后调用此函数，此时data中的状态值和界面上显示的数据，都已经完成了更新，界面已经被重新渲染好了
+ beforeDestory 实例销毁之前调用，在这一步，实例仍然完全可用
+ destoryed Vue实例销毁之后调用。调用后，Vue实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁

> 
> **调用解耦一般在那个生命周期函数中执行？** 
可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。
但是推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：
<u>1.能更快获取到服务端数据，减少页面loading 时间；</u>
<u>2.ssr不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；</u>

但是 ***具体的需求*** 需要具体的分析：

比如：如果一个页面里面用到了三个子组件，
页面初始化进来的生命周期执行的顺序是：
父 beforeCreate -> created -> beforeMount
子1 beforeCreate -> created -> beforeMount -> mounted
子2 beforeCreate -> created -> beforeMount -> mounted
子3 beforeCreate -> created -> beforeMount -> mounted
父 mounted

> 那么就应该父组件的调用接口逻辑放到 mounted ,子组件的调用接口放到 created , 这样就避免了父组件里面接口调用阻塞子组件的接口返回，使得子组件的数据先显示到页面中去。

### 为什么使用虚拟dom
+ 创建真实DOM的代价高：真实的 DOM 节点 node 实现的属性很多，而 vnode 仅仅实现一些必要的属性，相比起来，创建一个 vnode 的成本比较低。
+ 触发多次浏览器重绘及回流：使用 vnode ，相当于加了一个缓冲，让一次数据变动所带来的所有 node 变化，先在 vnode 中进行修改，然后 diff 之后对所有产生差异的节点集中一次对 DOM tree 进行修改，以减少浏览器的重绘及回流。
1). 重绘：元素样式的改变（但宽高、大小、位置等不变）
如：outline、visibility、color、background-color等
只改变自身样式，不会影响到其他元素
2). 回流：元素的大小或者位置发生改变（当页面布局和几何信息发生改变的时候），触发了重新布局导致渲染树重新计算布局和渲染
​ 如添加或删除可见的DOM元素；元素的位置发生变化；元素的尺寸发生变化、内容发生变化（如文本变化或图片被另一个不同尺寸的图片所代替）；页面一开始渲染的时候（无法避免）；
​因为回流是根据视口大小来计算元素的位置和大小的，所以浏览器窗口尺寸变化也会引起回流

> 注意：回流一定会触发重绘，而重绘不一定会回流

+ 虚拟dom由于本质是一个js对象，因此天生具备跨平台的能力，可以实现在不同平台的准确显示。
+ Virtual DOM 在性能上的收益并不是最主要的，更重要的是它使得 Vue 具备了现代框架应有的高级特性。

### Vue中key是用来做什么的？为什么不推介使用index作为key？
> key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速

为什么会更快速，更准确呢，下面来看vnode中关于节点更新复用的详情情况
在diff中比较两个节点是否可以复用，主要通过下面sameVnode函数来判断

<img src="/images/img-folder/2023/vnode.png">

+ key：列表上每一项设置的key值
+ data：render函数中设置的一些属性
+ sel：标签和id或者class，例如 div#app.item，表示div标签有一个id：app，class：item

#### 当我们没有设置key值的情况
默认是undefined，undefined===undefined = true

因为是列表，所以标签，class，属性基本上是一样，只是里面内容不一样，通过调用上诉函数，可以判断出：可以复用的dom
我们来设想一下，如果我们有一个列表，然后我们在列表的头部新增一条数据
1、首先会比较新增的vnode和老元素第一个元素比较，因为sameVnode返回true，标签可以复用，修改里面的内容
2、比较第二个元素，是不是sameVnode返回的还是true，标签复用，修改列面的内容，以此类推，是不每一个节点都要替换内容
3、如果我们列表每一项有一个chekbox元素，勾选的第一项，再插入新元素的时候，是不是你插入的节点被勾选了，这样是不是就不对了，有问题
4、而且每一个元素都替换，是不是特别慢，并且列表需要全部重新渲染，大大的影响的性能

> 把key值设置成index，有什么问题吧，为什么说最好不要设置成index

1、列表每一项设置了一个index值，从0、1、2、3、4、5

2、当我们在头部插入一个节点，是不是插入的节点就变成0，原来的0、1、2、3、4都加一位，我们来diff比较的时候，是不是每一项又都不一样了，sameVnode返回的都是false，标签不能复用，都要重新创建一个，插入到节点中，这样是不是也全部需要重新渲染，影响性能

#### 如果设置了key，且key值固定的情况

下面我们来把key设置成唯一的值，且是固定的值，当我们在头部插入一个节点，这个节点的key没有一样的，我们就创建一个，插入到头部

后面的节点，是不是sel没有变，标签没有变，key值也没有变，是不是节点全部都可以复用，只是把位置挪动下，实际上就只创建了一个元素，这样就可以大大加快渲染速度

这就是我们所说的diff操作更加准确，更快速的原因

### v-show和v-if的区别
v-show原理是修改元素的css属性display:none来决定是显示还是隐藏

v-if则是通过操作DOM来进行切换显示

### 双向数据绑定
实现mvvm的双向绑定，是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。


### 常用的指令？常用的内置组件有哪些？

常用指令：
v-html v-text v-modal v-if v-show v-hide v-once v-on v-for v-slot v-pre

常用内置组件
transition 动画 
keepAlive 多个组件动态切换时缓存被移除的组件实例

### computed 和 watch 的区别
#### computed
computed有缓存，关联的data里面的数据不变则不会重新计算，遇到双向绑定的属性值即v-model的属性值需要使用 get()和set(),才能监听

```js
<template>
    <div>
        <p>num {{num}}</p>
        <p>double1 {{double1}}</p>
        <input v-model="double2"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            num: 20
        }
    },
    computed: {
        double1() {
            return this.num * 2
        },
        double2: {//双向绑定的值需要使用get()和set()
            get() {
                return this.num * 2
            },
            set(val) {
                this.num = val/2
            }
        }
    }
}
</script>
```

> **计算属性的特点**
+ 支持缓存，只有依赖数据发生改变，才会重新进行计算,否则只会执行一次
+ 不支持异步，当 computed 内有异步操作时无效
+ 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用 computed
+ 如果 computed 属性属性值是函数，那么默认会走 get() ；函数的返回值就是属性的属性值；在 computed 中的，属性都有一个 get() 和一个 set()，当数据变化时，调用 set()。

#### watch
监听引用类型需要深度监测，而且是拿不到oldVal，值类型不需要深度监听
其可以监听的数据来源：data，props，computed 内的数据。

```js
<template>
    <div>
        <input v-model="name"/>
        <input v-model="info.city"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: '小宋',
            info: {
                city: '北京'
            }
        }
    },
    watch: {
        name(oldVal, val) {
            // eslint-disable-next-line
            console.log('watch name', oldVal, val) // 值类型，可正常拿到 oldVal 和 val
        },
        info: {
            handler(oldVal, val) {
                // eslint-disable-next-line
                console.log('watch info', oldVal, val) // 引用类型，拿不到 oldVal 。因为指针相同，此时已经指向了新的 val
            },
            deep: true // 深度监听
        }
    }
}
</script>
```

> **监听的特点**
+ 主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作，可以看作是 computed 和 methods 的结合体；
+ 可以监听的数据来源：data，props，computed 内的数据；
+ watch 支持异步；
+ 不支持缓存，监听的数据改变，直接会触发相应的操作；
+ 监听函数有两个参数，第一个参数是最新的值，第二个参数是输入之前的值，顺序一定是新值，旧值。

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

### 登陆权限的实现
#### 登陆
在登陆页面，前端需要进行表单校验，通过前端校验，过滤拦截一些不符合规则的参数请求，然后调用后端的提供登陆接口，将符合规则的参数传递给后端，后端接受到请求后，会获取这个请求携带的参数，这些参数通常会有用户名、密码一级验证码、然后来验证这些参数，如果验证不通过，前端将后端提供的错误提示提示给用户即可，如果验证通过，那么就会生成一个token，并且返回给前端，前端接受到这个token之后，需要将这个token保存在本地，在我们下次去调用需要携带token的接口时，通常会将这个token塞入到请求头中，一并发送给后端，那么将token 添加到请求头中，我们通常会去封装一个请求方法，在这个请求方法中完成给请求头添加token的操作，我们在本地保存token，是因为有的页面是需要登录才可以进入的，那么我们就可以通过路由守卫来判断当前本地有没有token，如果没有token就跳转到登录页面，如果你的项目做了token过期之后会自动刷新这个token，然后继续完成请求这么一个功能，那么就更好了，
#### 权限
路由控制的核心包含用户、角色、菜单，用户和角色具备某种关联关系，而角色和菜单具备某种关联关系，所以用户和菜单会通过角色产生关联关系，那对应到后台页面上，首先我们会创建好菜单，然后在创建角色，在创建角色的时候，可以给角色分配菜单，最好当创建用户账号时，就可以给这个用户分配角色，那么当登陆该账号的时候，前端会请求一次后端提供的返回了用户所具备菜单列表的数据接口，然后在前端代码定义路由时，我们会维护两份路由，一份是静态路由，他是所有用户都可以访问的路由，直接挂载在路由实例上即可，还有一份是动态路由，这份路由会根据当前用户所具备的菜单进行筛选asyncRoutes.forEach((item)=>{
	If(menus.find(menu))
})
最后筛选出的路由，通过addRoute这个方法，动态添加上去，这一步通常会在路由守卫中完成（router.beforeEach）,遍历这份动态路由（asyncRoutes.forEach），判断当前遍历项是否存在于后端返回的菜单列表中，那返回一个筛选完成的路由数组，最后我们就可以用这份路由数组去渲染菜单栏了。


## 小程序相关

### 生命周期函数有哪些？小程序的周期函数？
生命周期函数：
onLoad 监听页面加载，一个页面只调用1次
onReady 监听页面初次渲染完成，一个页面只调用1次
onShow 监听页面显示
onHide 监听页面隐藏
onUnLoad 监听页面卸载
小程序周期函数：
onLaunch 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）。可以做一些初始化的工作
onShow 当小程序启动，或从后台进入前台显示，会触发 onShow
onHide 当小程序从前台进入后台，会触发 onHide

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
+ 使用路由，wx.navigation/redircetTo/url+参数等方式，在页面onLoad(e),通过e.key来获取参数
+ 本地缓存，如storage等存储数据

### webview的理解
在小程序中嵌套H5页面，域名必须在白名单里面

### 小程序和h5页面的交互
http://shuy.cc/2020/06/09/%E5%BC%80%E5%8F%91%E9%97%AE%E9%A2%98%E8%AE%B0%E5%BD%95/#%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%92%8Ch5%E9%A1%B5%E9%9D%A2%E7%9A%84%E4%BA%A4%E4%BA%92

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
+ wx.relaunch() 关闭所有页，打开到应用内的某个页面（应用场景：登陆跳转到其他页面）
+ wx.switchTo() 跳转到tabbar页面，关闭其他非tabar页面
+ wx.navigateBack() 关闭当前页，返回上一级或多级页面，可通过getCurrentPages()获取当前的页面栈，决定要返回第几层

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

## 算法题
### 去重
```js
var arr = [11, 11, 22, 22,4, 444,444]
// 循环 + includes
function equal (arr) {
  let newArr = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    if (!newArr.includes(arr[i])) {
      newArr.push(arr[i])
    }
  }
  return newArr;
}
console.log(equal(arr));
// 双循环 判断是否相等
function equal (arr) {
  let newArr = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    let flag = true;
    for (let j = 0; j < newArr.length; j++) {
      if (newArr[j] === arr[i]){
        flag = false;
      }
    }
    if (flag) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
console.log(equal(arr));
// filter 过滤判断下标是否相等
function equal (arr) {
  let result = arr.filter((item, index, self) => {
    return self.indexOf(item) === index;
  })
  return result;
}
console.log(equal(arr));
// es6的 set + from 转化类数组
function equal (arr) {
  let setArr = new Set(arr);
  let result = Array.from(setArr);
  return result;
}
console.log(equal(arr));
```
### 排序
```js
var arr = [5, 2, 4, 8, 1, 3, 10];
// sort 排序
let result = arr.sort((a, b) => a - b);
console.log(result);
// for 循环
function sort (arr) {
  for(var j=0;j<=arr.length-1;j++){
    for(var i=0;i<=arr.length-1;i++){
        if(arr[i]>arr[i+1]){ 
            var tmp = arr[i];
            arr[i] = arr[i+1]
            arr[i+1] = tmp
        }
    }
  }
  return arr
}
```
### 防抖、节流
```js
/**
 * 防抖动
 *
 * @export
 * @param {*} fn 需要防抖执行的函数
 * @param {*} delay 多少毫秒不调用后执行一次,延迟时间
 * @returns
 */
const debounce = (fn, delay = 500) => {
  // 存储定时器的timerId
  let timer = null
  return function(...args) {
    // 在每一次调用函数时，都清除上一次的定时器
    clearTimeout(timer)
    // 开启一个定时器
    timer = setTimeout(() => {
      fn.apply(this, args)
    }, delay)
  }
}
```
```js
/**
**@param{fn: function} 需要节流的函数
**@param{interval: number} 函数触发的频率
*/
const throttle = (fn, interval) => {
  // 记录上一次触发函数时的时间，初始值为0
  let lastTime  = 0
  return function (...args) {
    // 获取现在的时间
    const nowTime = new Date().getTime()
    // 如果现在的时间减去上次触发的事件大于等于interval，则可以执行函数了
    if(nowTime - lastTime >= interval){
      fn.apply(this, args)
      // 将上次触发函数的时间赋值成当前时间
      lastTime = nowTimes
    }
  }
}
// 或者
/**
 * 节流
 *
 * @export
 * @param {*} fn 方法
 * @param {*} delay 每隔多少毫秒执行一次
 * @returns
 */
const throttle = (fn, delay) => {
  let flag = true;
  return function () {
    if (!flag) return;
    flag = false;
    fn.apply(this, arguments);
    setTimeout(() => {
      flag = true;
    }, delay);
  };
};
```
### 求和
```js
// 求数组的和
var arr = [1, 2, 3, 4]
// for 循环
function add (array) {
  let result = 0;
  for (let index = 0; index < array.length; index++) {
    result += array[index]
  }
  return result
}
console.log(add(arr));
// reduce 方法
function add (arr) {
  let result = arr.reduce((prev, cur, index, array) => {
    console.log(prev, cur, array);
    return prev + cur;
  })
  return result;
}
console.log(add(arr));
```
### 数组转对象
```js
/**
let data = [{
  key: 'name',
  value : 'xiaosong'
}, {
  key: 'age',
  value : 12
}]

转||化

let obj = {
  name: 'xiaosong',
  age: 12
}
*/
let data = [{
  key: 'name',
  value : 'xiaosong'
}, {
  key: 'age',
  value : 12
}]
function setArr (data) {
  let obj = {};
  // 写法1：
  for (let index = 0; index < data.length; index++) {
    obj[data[index].key] = data[index].value;
  }
  // 写法2：
  data.map((item, index) => {
    const {key, value} = item;
    obj[key] = value;
  })
  return obj;
}
console.log(setArr())

```
