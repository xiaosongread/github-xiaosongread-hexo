---
title: 常用知识总结
categories: js-end
date: 2022-05-05 13:54:03
tags: css js vue
---

## -- html/css

### — css 的布局方式

1.table 布局
2.flex 布局
3.float 布局 
4.响应式布局

### — 盒子模型

IE 盒子模型：宽高包括 content + padding + bording; box-sizing: border-box
标准盒模型：宽高就是元素的实际宽高 content; box-sizing: content-box

<!-- more -->

### 什么是 BFC？

bfc 就是 Block formatting contexts，**_块级格式化上下文_**
一个独立的渲染区域，有这自己的渲染规则，其内部元素不会和外部元素相互影响。
常见触发 **BFC** 方式：

1. 元素设置了 float 属性（float 不为 none）;
2. 元素设置了 position 属性为 absolute 或 fixed;
3. 元素设置了 display 属性为 inline-block;
4. 元素 overflow 属性值除了 visible 外。

### — HTML5 新增元素

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

- 使用绝对定位 + transform，给子元素添加如下样式
  这种方式比较常用，**_父子元素都不确定宽高_**的情况也适用。
  如果 **_子元素的宽高确定_**的话，translate 中的值也可以设置为子元素宽高的一半，即 transform: translate(-100px, -100px);

```css
.work {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

- 使用绝对定位 + margin，给子元素添加如下样式
  这种方式适合 **_子元素宽高确定_**的情况，给 margin-top 设置百分比的大小将不生效，即 margin-top: -50%;不能达到垂直居中的效果

```css
.work1 {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -100px;
  margin-left: -100px;
}
```

- 使用绝对定位 + margin: auto，给子元素添加如下样式
  **_父子元素宽高都未知时也适用_**。

```css
.work2 {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto;
}
```

- 父元素使用 flex 布局，并设置相关的属性值为 center
  这种方式要求 **_父元素的高度是确定的_** ，百分比形式的高度将不能生效。

```css
.par-work {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
```

- 使用 table-cell 实现
  这种方式需要 **_父元素的宽高都是确定的_**，才能保证子元素在父元素中垂直水平都居中。

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

- 使用 grid 布局
  这种方式适用于 **_父元素高度确定_**的情况

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

### — 有哪些方式可以影藏页面元素？区别是什么？

- display: none
- visibility: hidden
- opacity: 0
- width + height 设置为 0
- 定位到可视范围之外

|                        | display: none | visibility: hidden | opacity: 0 |
| ---------------------- | ------------- | ------------------ | ---------- |
| 页面中                 | 不存在        | 存在               | 存在       |
| 重排                   | 会            | 不会               | 不会       |
| 重绘                   | 会            | 会                 | 不一定     |
| 自身绑定事件           | 不触发        | 不触发             | 触发       |
| transition             | 不支持        | 支持               | 支持       |
| 被遮挡的元素可出发事件 | 能            | 能                 | 不能       |

### — css 选择器有哪些？优先级

- !important
- 行内样式
- Id 选择器
- 类选择器 class
- 后代选择器 .box dox
- 子选择器 .box>.child 选择.box 下面所有类名为 child 的元素
- 相邻同胞选择器 .one+.two,选择紧邻.one 之后的所有.two 元素
- div,p 选择所有的 div、p 的所有元素
- 伪类选择器

```css
:link 选择未被访问的链接
:visited：选取已被访问的链接
:active：选择活动链接
:hover ：鼠标指针浮动在上面的元素
:focus ：选择具有焦点的
:first-child：父元素的首个子元
```

- 伪元素选择器

```css
:first-letter ：用于选取指定选择器的首字母
:first-line ：选取指定选择器的首行
:before : 选择器在被选元素的内容前面插入内容
:after : 选择器在被选元素的内容后面插入内容
```

- 属性选择器

```css
[attribute] 选择带有attribute属性的元素
[attribute=value] 选择所有使用attribute=value的元素
[attribute~=value] 选择attribute属性包含value的元素
[attribute|=value]：选择attribute属性以value开头的元素
```

- 伪类选择器（css3）

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

- 属性选择器（css3）

```css
[attribute*=value]：选择attribute属性值包含value的所有元素
[attribute^=value]：选择attribute属性开头为value的所有元素
[attribute$=value]：选择attribute属性结尾为value的所有元素
```

nth-child/nth-of-type 的区别

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
h5:nth-of-type(2n + 1) {
  background: red;
}
```

<img src="/images/img-folder/2023/ms-2.png">

1）找出和设置标签一样的标签
2）然后再找对应的下标标签

### — 清除浮动的方法

1）使用带 clear 属性的空元素
在浮动元素的后面设置一个空元素，然后给这个空元素设置属性.clear{clear:both;}
2）使用 overflow 属性
给浮动元素的容器添加 overflow:hidden;或 overflow:auto;可以清除浮动，另外在 IE6 中还 需要触发 hasLayout ，例如为父元素设置容器宽高或设置 zoom:1。 在添加 overflow 属性后，浮动元素又回到了容器层，把容器高度撑起，达到了清理浮动 的效果。
3）使用 css 的:after 伪元素

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
div/p/h1~h6/ol/ul/li/table 2.行内元素
span/img/a/strong/input

### — position 的属性

相对定位：relative,相对于当前元素的位置来移动
绝对定位：absolute,相对于父元素（具有相对定位属性）来定位
固定定位：fixed,相对于页面的左上角定位

### — SEO

1）语义化的 html 的标签使用
2）设置合理的 title,description,keywords
3）重要的 html 代码放到页面的前面
4）尽量少用 iframe，搜索引擎抓不到里面的内容
5）图片上面加上 alt 属性

### — 什么是响应式布局？

响应式网站设计（Responsive Web design）是一种网络页面设计布局，页面的设计与开发应当根据用户行为以及设备环境(系统平台、屏幕尺寸、屏幕定向等)进行相应的响应和调整

1> 响应式网站常见特点：

- 同时适配 PC + 平板 + 手机等
- 标签导航在接近手持终端设备时改变为经典的抽屉式导航
- 网站的布局会根据视口来调整模块的大小和位置

2> 实现响应式布局的方式有如下：

- 媒体查询（我们可以设置不同类型的媒体条件，并根据对应的条件，给相应符合条件的媒体调用相对应的样式表）
- 百分比
- vw/vh
- rem

3> 响应式设计实现通常会从以下几方面思考：

- 弹性盒子（包括图片、表格、视频）和媒体查询等技术
- 使用百分比布局创建流式布局的弹性 UI，同时使用媒体查询限制元素的尺寸和内容变更范围
- 使用相对单位使得内容自适应调节
- 选择断点，针对不同断点实现不同布局和内容展示

### — flex

参考文档：[flex 布局教程](/2020/11/05/flex布局教程/)

### — rem、em、vh、px 各自代表的含义？
> CSS 中的尺寸单位都是 相对长度单位，只是相对的目标不同。

+ px: 绝对单位，页面按精确像素展示
px 全称为 pixel（像素），它是相对于 **屏幕显示器分辨率**（桌面设定的分辨率，不是显示器的物理分辨率） 而言的，在 相同/不同 的设备上 1px 表示多个 设备像素。
当 **一个像素点越大** 时, 呈现的图像就会 越模糊；当**一个像素点越小**时, 像素点就会 越密集, 呈现的图像就会 越清晰。
+ em: 相对单位，基准为父节点字体大小，如果自身定义了 font-size 按照自身来计算，整个页面内 1em 不是一个固定值
> 若 当前元素/父元素 的 font-size 未设置，由于 font-size 属性值可被继承的原因，可逐级向上查找，最终找不到则相对于浏览器默认字体大小，即 font-size = 16px。

+ rem: 相对单位，可以理解为 root em，相对根节点 html 的字体大小来计算
默认根元素的 font-size 都是 16px 的。如果想要设置 12px 的字体大小也就 是 12px/16px = 0.75rem
+ vh/vw: 主要用于页面视口大小布局，在页面布局上更加方便简单
vw 和 vh 是将 视口 宽/高 都分成 100 份，因此 `100vw = 视口宽`、`100vh = 视口高`
与之相关的还有 vmin 和 vmax 两个单位。

+ vmin 和 vmax 代表的是 `视口宽度` 和 `视口高度` 中的 `最小值` 和 `最大值`
+ `vmin = 视口高度 vh 和 宽度 vw 间的最小值`
+ `vmax = 视口高度 vh 和 宽度 vw 间的最大值`

### - H5 移动端适配原理
**rem适配原理**

+ 将设备分成 n 等分，n 可以是任意正确的值（比如 `flexible.js` 中的 n = 10 ）。
+ + 设置 `html` 元素的 `font-size` 为 `设备宽度 / 10`，即得到 设备视口 1 rem 到底表示 多少设备视口 px。
+ 将设计稿也分成 n 等分，此时设计稿中的某个元素a 的 px 对应 设备中这个元素的 rem 的计算方式为
+ + ?rem = 设计稿 a px / (`设计稿的宽度 / n`(表示1rem为多少px像素))

举个例子：
比如你的设计稿是 750px，然后你分成了10，那么 1rem = 75px，此时设计稿中某个元素的大小为 30px，
那么在设备中这个元素的大小就是 30/75 = 0.4rem。

## javascript

### — js 中的数据类型

- 基本类型 string number null undefind boolean Symbol(ES6 引入了一种新的原始数据类型，表示独一无二的值)
- 引用类型 Object Array Function

### — var/let/const 的区别？

- 变量提升
  var 声明存在变量提升，let 和 const 不存在变量提升，不声明是不可以使用的，否则会报错

```js
// 示例1
var a;
var a; // 重复声明会被忽视
a = 1;
console.log(a); // 1
a = 2;
console.log(a); // 2

// 示例2
var a;
a = 1;
console.log(a); // 1
console.log(a); // 1

// 示例3
var a;
console.log(a); //undefined
a = 1;
console.log(a); // 1
```

> js 中，变量提升指的是变量声明的提升，赋值还是按照代码中的顺序逐行执行。

```js
// 函数式声明 会变量提升
fn(10); // 10
function fn(a) {
  console.log(a);
}
// 表达式声明 不会变量提升
console.log(test); // undefined
test(10); // TypeError: test is not a function
var test = function (a) {
  console.log(a);
};
console.log(a); // f a()
function a(v) {
  return v;
}
console.log(a); // f a()
var a = 1;
console.log(a); // 1
```

```js
console.log(a); // ƒ a(v){return v}
var a = 1;
console.log(a); // 1
function a(v) {
  return v;
}
console.log(a); // 1
```

> 函数的提升是优先变量的提升的。
> 变量提升指的是变量声明的提升，赋值还是按照代码中的顺序逐行执行。
> 函数式声明存在变量提升，函数表达式声明不存在变量提升。

- 作用域
  var 没有块级作用域一说，不声明也是可以使用的，let，const 有块级作用域一说，只能在声明的花括号里面使用
- 使用的方法
  const 声明一个只读的变量，一旦声明，不可以修改，其余使用 let，避免使用 var，因为有不可控性，代码复杂的时候，不容易查找问题。

### — ES6 标准入门

文档参考：[ES6 入门教程](https://es6.ruanyifeng.com/)

### — 数组常用的方法

<h4>增删改</h4>

|          | 向前+                                  | 向前-                                  | 向后+                                | 向后-          |
| -------- | -------------------------------------- | -------------------------------------- | ------------------------------------ | -------------- |
| 页面中   | unshift                                | shift                                  | push                                 | pop            |
| 语法     | array.unshift(item1,item2, ..., itemX) | array.shift()                          | array.push(item1, item2, ..., itemX) | array.pop()    |
| 返回结果 | 数组新长度                             | 数组原来的第一个元素的值（移除的元素） | 数组新长度                           | 返回删除的元素 |
| 原数组   | 改变原数组                             | 改变了原数组                           | 改变原数组                           | 改变了原数组   |

- concat 合并两个数组
- splice （增、删、改）传入两个参数，分别是开始位置，删除元素的数量，返回包含删除元素的数组
  array.splice(index,howmany,item1,.....,itemX)

| 参数              | 描述                                                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------- |
| index             | 必需。规定从何处添加/删除元素。</br>该参数是开始插入和（或）删除的数组元素的下标，必须是数字。                            |
| howmany           | 可选。规定应该删除多少元素。必须是数字，但可以是 "0"。<br />如果未规定此参数，则删除从 index 开始到原数组结尾的所有元素。 |
| item1, ..., itemX | 可选。要添加到数组的新元素                                                                                                |

```js
// 移除数组的第三个元素，并在数组第三个位置添加新元素:
var fruits = ["Banana", "Orange", "Apple", "Mango"];
fruits.splice(2, 1, "Lemon", "Kiwi");
// Banana,Orange,Lemon,Kiwi,Mango
// 从第三个位置开始删除数组后的两个元素：
var fruits = ["Banana", "Orange", "Apple", "Mango"];
// Banana,Orange
fruits.splice(2, 2);
```

- slice() 方法可从已有的数组中返回选定的元素。
  slice() 方法可提取字符串的某个部分，并以新的字符串返回被提取的部分。【不会影响原始数组】
  array.slice(start, end)

```js
// 使用负值从数组中读取元素
var fruits = ["Banana", "Orange", "Lemon", "Apple", "Mango"];
var myBest = fruits.slice(-3, -1); // 截取倒数第三个（包含）到倒数第一个（不包含）的两个元素
var myBest = fruits.slice(-3); // 截取最后三个元素
// Lemon,Apple
// 截取字符串
var str = "www.runoob.com!";
document.write(str.slice(4) + "<br>"); // 从第 5 个字符开始截取到末尾
document.write(str.slice(4, 10)); // 从第 5 个字符开始截取到第10个字符
```

<h4>查</h4>
查找元素，返回元素坐标或者元素值

- indexOf() 返回要查找的元素在数组中的位置，如果没找到则返回 -1
- includes() 返回要查找的元素在数组中的位置，找到返回 true，否则 false
- find() 返回通过测试（函数内判断）的数组的第一个元素的值
  当数组中的元素在测试条件时返回 true 时, find() 返回符合条件的元素，之后的值不会再调用执行函数。
  如果没有符合条件的元素返回 undefined

> array.find(function(currentValue, index, arr),thisValue)
> [参数]
> callback：必须。为数组中每个元素执行的函数，该函数接受三个参数：
> currentValue：必须。数组中正在处理的当前元素。
> index：可选。当前元素的索引值。
> arr：可选。当前元素所在的数组对象。
> thisValue：可选。传递给函数的值一般用 "this" 值。
> 如果这个参数为空， "undefined" 会传递给 "this" 值

```js
let arr1 = [1, 2, 3, 4, 5];
let num = arr1.find((item) => item > 1);
console.log(num); // 2
```

- findIndex() 返回传入一个测试条件（函数）符合条件的数组第一个元素位置。
  当数组中的元素在测试条件时返回 true 时, findIndex() 返回符合条件的元素的索引位置，之后的值不会再调用执行函数。
  如果没有符合条件的元素返回 -1

> array.findIndex(function(currentValue, index, arr), thisValue)

```js
const arr = [1, 2, 3, 4, 5, 3, 3, 2, 4, 5];

// 可以这么写
const index = arr.findIndex((item) => {
  return item > 2;
});
console.log(index); // 2
// 也可以这么写
const index = arr.findIndex((item) => item > 2);
```

<h4>排序</h4>
+ reverse() 将数组元素翻转
+ sort()

```js
var arr = [1, 2, 22, 11, 33, 3, 5, 4];
console.log(arr.sort()); // [1,11,2,22,3,33,4,5]
```

> 默认情况下 sort 方法是按 ascii 字母顺序排序的，而非我们认为是按数字大小排序

```javascript
var a = [1, 1, 10, 2, 4, 9, 5, 3];
function compare(v1, v2) {
  if (v1 > v2) {
    return 1;
  } else if (v1 < v2) {
    return -1;
  } else if (v1 === v2) {
    return 0;
  }
}
var b = a.sort(compare);
console.log(b); // [1, 1, 2, 3, 4, 5, 9, 10]

var a = [1, 1, 10, 2, 4, 9, 5, 3];
function compare(v1, v2) {
  return v2 - v1;
}
var b = a.sort(compare);
console.log(b); // [10, 9, 5, 4, 3, 2, 1, 1]

var a = [1, 1, 10, 2, 4, 9, 5, 3];
function compare(v1, v2) {
  return v1 - v2;
}
var b = a.sort(compare);
console.log(b); // [1, 1, 2, 3, 4, 5, 9, 10]
```

#### 数组转字符窜

join() 方法接收一个参数，即字符串分隔符，返回包含所有项的字符串

#### 迭代

- some() 对数组每一项都运行传入的函数，有一项符合就返回 true
- every() 每一项都符合才返回 true
- forEach() 循环数组每一项，没有返回值
- filter() 返回符合的项会组成函数
- map() 返回由每次函数调用的结果组成的函数
- for...in 遍历对象的属性 key
- for...of 遍历对象的值 value

#### 去重

1.利用 ES6 Set 去重

ES6 提供了新的数据结构 `Set`。它类似于数组，但是成员的值都是唯一的，没有重复的值。

`Set`本身是一个构造函数，用来生成 `Set` 数据结构。

```js
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
// 2 3 5 4
上面代码通过add()方法向 Set 结构加入成员，结果表明 Set 结构不会添加重复的值。
```

```js
function unique(arr) {
  return Array.from(new Set(arr));
}
var arr = [
  1,
  "true",
  "true",
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  "NaN",
  0,
  0,
  "a",
  {},
  {},
  1,
  "a",
];
console.log(unique(arr));
// [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}, {}]
```

> Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组，也是 ES6 的新增方法。

```js
let arrayLike = {
  0: "tom",
  1: "65",
  2: "男",
  3: ["jane", "john", "Mary"],
  length: 4,
};
let arr = Array.from(arrayLike);
console.log(arr); // ['tom','65','男',['jane','john','Mary']]
```

2.利用 for 嵌套 for，然后 splice 去重（ES5 中最常用）

```js
function unique(arr) {
  for (var i = 0; i < arr.length; i++) {
    for (var j = i + 1; j < arr.length; j++) {
      if (arr[i] == arr[j]) {
        //第一个等同于第二个，splice方法删除第二个
        arr.splice(j, 1);
        j--;
      }
    }
  }
  return arr;
}
var arr = [
  1,
  1,
  "true",
  "true",
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  "NaN",
  0,
  0,
  "a",
  "a",
  {},
  {},
];
console.log(unique(arr));
//[1, "true", 15, false, undefined, NaN, NaN, "NaN", "a", {…}, {…}]     //NaN和{}没有去重，两个null直接消失了
```

3.利用 indexOf 去重

```js
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log("type error!");
    return;
  }
  var array = [];
  for (var i = 0; i < arr.length; i++) {
    if (array.indexOf(arr[i]) === -1) {
      array.push(arr[i]);
    }
  }
  return array;
}
var arr = [
  1,
  1,
  "true",
  "true",
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  "NaN",
  0,
  0,
  "a",
  "a",
  {},
  {},
];
console.log(unique(arr));
// [1, "true", true, 15, false, undefined, null, NaN, NaN, "NaN", 0, "a", {…}, {…}]  //NaN、{}没有去重
```

4.利用 includes

```js
function unique(arr) {
  if (!Array.isArray(arr)) {
    console.log("type error!");
    return;
  }
  var array = [];
  for (var i = 0; i < arr.length; i++) {
    if (!array.includes(arr[i])) {
      //includes 检测数组是否有某个值
      array.push(arr[i]);
    }
  }
  return array;
}
var arr = [
  1,
  1,
  "true",
  "true",
  true,
  true,
  15,
  15,
  false,
  false,
  undefined,
  undefined,
  null,
  null,
  NaN,
  NaN,
  "NaN",
  0,
  0,
  "a",
  "a",
  {},
  {},
];
console.log(unique(arr));
//[1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {…}, {…}]     //{}没有去重
```

### — call/apply/bind 的区别？

- call()的第一个参数为 this 绑定的对象，后面传入一串字符窜
  当第一个参数为 null 或者 undefined 的时候，默认指向 window
- apply()和 call 类似，不同在于第二个参数是一个数组
- bind()和 call()类似，不同点在于 bind()不会立即执行，而是返回了一个改变 this 后的函数；不同点二在于当你调用 fn1 = fn.bind(newThis,param1)方法后，执行 fn2(prama2)时，参数 prama2 会加到 param1 后面。

```js
let obj1 = {
  name: "obj1",
  fn1(param) {
    console.log(this.name, param);
  },
};
let obj2 = {
  name: "obj2",
  fn1(param) {
    console.log(this.name, param);
  },
};
// 一般调用
obj1.fn1("param1"); //输出 obj1 param1
//call的第一参数为调用该函数的对象时，等价于一般调用
obj1.fn1.call(obj1, "param1"); //输出 obj1 param1
//改变this指针，指向obj2
obj1.fn1.call(obj2, "param1"); //输出 obj2 param1

//apply的第二个参数为参数数组
obj1.fn1.apply(obj2, ["param1"]); //输出 obj2 param1

//bind方法返回一个函数,但不会执行，这个函数的参数继承bind方法的参数
let fun = obj1.fn1.bind(obj2, "param");
fun(); //输出 obj2 param1
```

> 求数组中的最大最小值

```js
var arr = [0, 8, 3, 46];
let max = Math.max.apply(null, arr); // 46
let min = Math.min.apply(null, arr); // 0
// 等价于
let max = window.Math.max(...arr);
let min = window.Math.min(...arr);
```

这里利用 apply 的第二个参数是接受一个数组，而在调用函数的时候会自动展开这个数组，而 max 和 min 方法接受参数的形式是(1,2,3,4)。

> 将 arguments 等类数组转换为数组

```js
var trueArr = Array.prototype.slice.call(arguments, 0, arguments.length);
```

> 使用 log 代替 console.log

```js
function log() {
  console.log.apply(console, arguments);
}
```

### 箭头函数和普通函数的区别

普通函数的 this 是调用者；箭头函数的 this 是根据作用域的上下文确定的，是不可以修改的。

- 全局声明的函数，this 指向的是 window
- 对象里面的函数，this 指向的是当前的对象，但是可以修改
- 构造函数的 this，指向的是 new 出来的对象
- 箭头函数的 this，是当前声明箭头函数的作用域 this 指向的是谁，this 就是指向谁

#### 普通函数

一句话：谁调用就指向谁。

```js
var person = {
  age: 20,
  getAge() {
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
var person = {
  age: 20,
  getAge: () => {
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
var person = {
  age: 20,
  getAge: function () {
    var age = 30;
    return this.age;
  },
};
person.getAge.call(person);
```

> 这里 call 方法将 person 作为 this 指向，所以输出 20。
> 这里在执行 getAge 方法的时候，传入了 person，那么 getAge 的 this 指向 person，所以输出 20。

#### 总结

1. 箭头函数没有 this，箭头函数的 this 指向的是外层第一个普通函数的 this，如果外层没有普通函数，则指向 window。
2. 普通函数的 this 指向调用者，如果调用者是 window，则指向 window。
3. 箭头函数的 this 指向是固定的，不会指向调用者，而是指向外层第一个普通函数的 this。

### — typeof 与 instanceof 区别

typeof 和 instanceof 都是 JavaScript 中用来检测数据类型的运算符，但它们的作用不同。
1.typeof 运算符是用来检测一个变量或表达式的数据类型的。它返回一个字符串，表示该值的数据类型。

> 基本数据类型可以用 typeof 检测出来，但 null、数组、对象、函数的实例(new+函数),返回的都是 object，无法检测到真实的数据类型，需要使用 instanceof

```js
console.log(typeof 123); // number
console.log(typeof "hello"); //输出 string
console.log(typeof true); //输出 boolean
console.log(typeof undefined); //输出 undefined
console.log(typeof function () {}); //输出 function
console.log(typeof null); //输出 object
console.log(typeof [123]); //输出 object
console.log(typeof { name: "tom", age: 18 }); //输出 object
console.log(typeof new Date()); //输出 object
```

2.instanceof
instanceof 运算符是用来判断一个对象是否属于某个类（构造函数）的实例。
instanceof 检查的是对象的原型链上是否有该类实例，只要原型链上有该类实例，就会返回 true，否则为 false

```js
var arr = [1, 2, 3];
arr instanceof Array; // 返回 true

var date = new Date();
date instanceof Date; // 返回 true

var reg = /hello/;
reg instanceof RegExp; // 返回 true

class Person {}
class Dog extends Person {}
let dog = new Dog();
console.log(dog instanceof Dog); //输出 true
console.log(dog instanceof Person); //输出 true
console.log(dog instanceof Object); //输出 true
//执行顺序：dog-->Person的实例-->Object实例-->Object原型
//Object是所有对象的原型，所以任何和对象和Object进行instanceof运算都会返回true
let b = { name: "Bob", age: 18 };
console.log(b instanceof Person); //输出 false
```

> 需要注意的是，instanceof 运算符只能用来判断对象是否为该类的实例，不能用来判断基本数据类型的值。而且，如果要判断对象是否为某个类的实例，该类必须是通过构造函数定义的，不能是字面量对象或匿名函数等其他形式。

3.typeof 与 instanceof 总结：
①typeof 与 instanceof 用来判断变量是否为空,或者属于什么数据类型
②typeof 返回的是一个字符串,用来判断是什么数据类型
③instanceof 返回的是一个布尔值,用来判断一个变量是否属于对象上的实例
④typeof 检测的是简单数据类型,instanceof 检测的是引用数据类型

### — 本地存储

- cookie
  存储数据大小为 4K 左右，客户端请求服务器。将 cookie 返给服务器，以此来判断用户的状态，可以设置过期时间，不可跨域访问
- sessionStorage
  存储数据大小为 5M 左右，在当前浏览器窗口关闭后自动删除，存储位置为当前域名的浏览器本地
- localStorage
  存储数据大小为 5M 左右，可以手动添加删除，不手动删除，会一直保存在当前域名的浏览器本地

> 标记用户与跟踪用户行为的情况，推荐使用 cookie
> 适合长期保存在本地的数据（令牌），推荐使用 localStorage
> 敏感账号一次性登录，推荐使用 sessionStorage

### — 深拷贝和浅拷贝

浅拷贝指的是创建一个属性、值完全一样的变量，如果是基本类型，拷贝的就是基本类型，如果是引用类型那拷贝的就是一个内存对象，只是拷贝出了一个引用值，改变拷贝值，原值也会改变。
深拷贝完全是开辟了一个栈，两个引用类型出了属性、值一样，完全都是独立的，修改其中的一个，不会影响另一个的值。

- Object.assign
- Array.prototype.slice()
- Array.prototype.concat()
- ... 拓展符实现的复制

以上方法都存在浅拷贝的现象

深拷贝的方法有：

- \_cloneDeep() Lodash 库的方法
- jQuery.extend()
- JSON.stringify()
- 循环递归

```js
const deepClone = (obj) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  let result = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepClone(obj[key]);
    }
  }
  return result;
};
```

### — JSON 是什么？

JSON 是轻量级的文本数据格式，是一门独立的语言，是用 js 语法描述的数据对象，但独立于任何的语言，编程语言都支持 JSON，具有自我描述性，更容易理解。

- json 对象转化为 json 字符窜

```js
var jsonStr = JSON.stringify(jsonObj);
```

- JSON 字符串转化为 JSON 对象

  1). 使用 eval()函数进行转换
  使用 eval() 转换时需要在 json 字符外包裹一对小括号。

ie8(兼容模式)、ie7、ie6 不要使用此方法。

```js
var jsonObj = eval("(" + jsonStr + ")");
```

2). 使用 JSON.parse()方法进行转换
ie8(兼容模式)、ie7、ie6 不要使用此方法。

```js
var jsonObj = JSON.parse(jsonStr);
```

3). 使用 jQuery 进行转换
如果我们项目中有使用 jQuery，那么直接使用 $.parseJSON() 方法即可，而且可以确保各个浏览器的兼容性。

```js
var jsonObj = $.parseJSON(jsonStr);
```

### — 闭包，使用场景

#### 概念

闭包是指一个函数中有权访问另一个函数中的变量，本质就是在函数 A 中返回另一个函数 B，这时候 B 函数可以访问 A 函数中的变量，这样就形成了一个闭包，A 函数中变量不会被销毁，并且这个变量只能通过 B 函数来访问。

#### 解决的问题

能够让函数执行后，其中的变量不会被销毁，同时能够让函数内的局部变量被访问。

#### 闭包带来的问题和如何规避

由于垃圾回收机制不能销毁闭包中的局部变量，从而导致内存泄漏，一旦闭包使用的太多，就会导致内存溢出，导致程序不安全和卡顿，所以必须手动设置闭包=null,让垃圾回收机制回收闭包中的变量。

#### 简单实现一个闭包

```js
var getA = function () {
  var a = 10;
  return function () {
    return a;
  };
};
var a = getA();
console.log(a()); // 10
```

#### 闭包的作用

- 延长变量的生命周期
- 创建私有变量
- 闭包可以在函数外部访问到函数内部作用域的变量
- 闭包可以让访问变量不会被垃圾机制回收

#### 闭包的应用场景

- 使用场景一:给对象设置私有变量并且利用特权方法去访问私有属性

```js
function Fun() {
  var name = "tom";

  this.getName = function () {
    return name;
  };
}

var fun = new Fun();
console.log(fun.name); //输出undefined,在外部无法直接访问name
console.log(fun.getName()); //可以通过特定方法去访问
```

- 防抖节流

### — 什么是防抖和节流？

- 防抖 n 秒后在执行该事件，若在 n 秒之内被重复触发，则重新计时(单位时间内，频繁触发一个事件，以最后一次触发为准。)

> 简单点理解就是：
> 防抖是频繁执行某个事件的时候，就等事件停止之后的 n 秒后再执行相关的操作；
> 节流是频繁执行某个事件的时候，规定 n 秒执行一次回调（执行相关的操作），比如规定了 1S 执行一次，那就是如果用户某个按钮频繁点击了 3S，那就执行相关操作（执行回调方法）3 次。

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
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}
```

- 节流 n 秒内只运行一次，若在 n 秒内重复触发，只有一次生效(单位时间内，频繁触发一个事件，只会触发一次。)

应用场景：假如有一个轮播图，轮播图以固定的频率播放图片，用户可以点击切换上一张或者下一张，如果用户点击过快，轮播图就会一直切换。这时候，应该控制轮播图切换的频率，在用户的持续点击下，只按照固定的频率切换。
节流函数的功能：连续的触发某个函数，只会以固定的频率去执行

```js
function throttle(func, delay = 500) {
  let timer = null;
  return function (...args) {
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
  let lastTime = 0;
  return function (...args) {
    // 获取现在的时间
    const nowTime = new Date().getTime();
    // 如果现在的时间减去上次触发的事件大于等于interval，则可以执行函数了
    if (nowTime - lastTime >= interval) {
      fn.apply(this, args);
      // 将上次触发函数的时间赋值成当前时间
      lastTime = nowTimes;
    }
  };
};
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

### — ajax 的请求过程

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
  if (xhr.readyState === 4) {
    // 请求处理完毕，响应就绪
    if (xhr.status === 200) {
      // 请求成功
      var data = xhr.responseText;
      console.log(data);
    }
  }
};
```

### — ajax 请求的时候 get 和 post 方式的区别

- get 请求，传递的参数是链接传递，有长度限制（IE 和 Safari 浏览器 限制 2k，Opera 限制 4k，Firefox 限制 8k（非常老的版本 256byte）），post 请求无限制
- get 请求参数在 url 后面传递，不安全，容易被窃取
- post 请求需要设置请求头

### — ajax、axios、jsonp 的理解

1、jsonp 是一种可以解决跨域问题的方式，就是通过动态创建 script 标签用 src 引入外部文件实现跨域，script 加载实际上就是一个 get 请求，并不能实现 post 请求。(其他实现跨域的方法有：iframe,window.name,postMessage,CORS...)
2、ajax 是一种技术，ajax 技术包含了 get 和 post 请求的，但是它仅仅是一种获取数据的技术，不能直接实现跨域，只有后台服务器配置好 Access-Control-Allow-Origin，才可以实现跨域的请求。
3、axios 是通过 promise 实现对 ajax 技术的一种封装，axios 是 ajax，ajax 不止 axios。

### — 什么是事件委托以及优缺点

js 事件委托就是利用冒泡的原理，把本应该添加到某个元素上的事件委托给他的父级，从而减少 DOM 交互达到网页优化。

【优点】

1.可以大量节省内存占用，减少事件注册。比如 ul 上代理所有 li 的 click 事件就很不错。 2.可以实现当新增子对象时，无需再对其进行事件绑定，对于动态内容部分尤为合适

【缺点】

事件代理的常用应用应该仅限于上述需求，如果把所有事件都用事件代理，可能会出现事件误判。即本不该被触发的事件被绑定上了事件。

### — 如何解决数字精度丢失的问题?

理论上用有限的空间来存储无限的小数是不可能保证精确的，但我们可以处理一下得到我们期望的结果

当你拿到 1.4000000000000001 这样的数据要展示时，建议使用 toPrecision 凑整并 parseFloat 转成数字后再显示，如下：

```js
parseFloat((1.4000000000000001).toPrecision(12)) === 1.4; // True
```

封装成方法就是：

```js
function strip(num, precision = 12) {
  return +parseFloat(num.toPrecision(precision));
}
```

最后还可以使用第三方库，如 Math.js、BigDecimal.js

### — 原型，原型链 ? 有什么特点？

JavaScript 常被描述为一种基于原型的语言——每个对象拥有一个原型对象

当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依次层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾

原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链 (prototype chain)，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。

### — 如何实现上拉加载，下拉刷新？

开源社区有很多优秀的解决方案，如 iscroll、better-scroll、pulltorefresh.js 库等等

### — 说说你对作用域链的理解

1、作用域就是变量与函数的可访问范围
2、一般情况下，变量取值到创建这个变量的函数的作用域中取值。 但是如果在当前作用域中没有查到值，就会向上级作用域去查，直到查到全局作用域，这么一个查找过程形成的链条就叫做作用域链

<!-- ### — 浏览器内核 -->

### — 浏览器输入 Url 之后发生了什么？

浏览器输入 URL 链接 -> 回车 -> 浏览器查找当前 URL 是否有本地缓存 -> dns 解析 URL 对应的 IP -> 根据 IP 建立 TCP 连接(三次握手) -> 发起 http 请求 -> 服务器处理请求 -> 关闭 TCP 连接(四次握手) -> 浏览器根据发回的 response 响应，启用浏览器的渲染引擎和 JS 引擎，更具 HTML/CSS/JS/IMG 等等渲染页面。

#### 从输入 URL 到页面加载的主干流程如下：

1、浏览器的地址栏输入 URL 并按下回车。

2、浏览器查找当前 URL 的 DNS 缓存记录。

3、DNS 解析 URL 对应的 IP。

4、根据 IP 建立 TCP 连接（三次握手）。

5、HTTP 发起请求。

6、服务器处理请求，浏览器接收 HTTP 响应。

7、渲染页面，构建 DOM 树。

8、关闭 TCP 连接（四次挥手）。

##### 1.首先在浏览器中输入 URL

我们常见的 RUL 是这样的:
http://www.baidu.com
这个域名由三部分组成：协议名、域名、端口号，这里端口是默认所以隐藏。除此之外 URL 还会包含一些路径、查询和其他片段
例如：http://www.tuicool.com/search?kw=%E4%。
我们最常见的的协议是 HTTP 协议，除此之外还有加密的 HTTPS 协议、FTP 协议、FILe 协议等等。URL 的中间部分为域名或者是 IP，之后就是端口号了。通常端口号不常见是因为大部分的都是使用默认端口，如 HTTP 默认端口 80，HTTPS 默认端口 443。

- 查找缓存：浏览器先查看浏览器缓存-系统缓存-路由缓存中是否有该地址页面，如果有则显示页面内容。如果没有则进行下一步。

- 浏览器缓存：浏览器会记录 DNS 一段时间，因此，只是第一个地方解析 DNS 请求；

- 操作系统缓存:如果在浏览器缓存中不包含这个记录，则会使系统调用操作系统， 获取操作系统的记录(保存最近的 DNS 查询缓存)；

- 路由器缓存：如果上述两个步骤均不能成功获取 DNS 记录，继续搜索路由器缓存；

- ISP 缓存：若上述均失败，继续向 ISP 搜索。

##### 2.DNS 域名解析

我们知道在地址栏输入的域名并不是最后资源所在的真实位置，域名只是与 IP 地址的一个映射。网络服务器的 IP 地址那么多，我们不可能去记一串串的数字，因此域名就产生了，域名解析的过程实际是将域名还原为 IP 地址的过程。

首先浏览器先检查本地 hosts 文件是否有这个网址映射关系，如果有就调用这个 IP 地址映射，完成域名解析。

如果没找到则会查找本地 DNS 解析器缓存，如果查找到则返回。

如果还是没有找到则会查找本地 DNS 服务器，如果查找到则返回。

最后迭代查询，按根域服务器 ->顶级域,.cn->第二层域，hb.cn ->子域，www.hb.cn的顺序找到IP地址。

DNS 域名解析：浏览器向 DNS 服务器发起请求，解析该 URL 中的域名对应的 IP 地址。DNS 服务器是基于 UDP 的，因此会用到 UDP 协议。

##### 3.建立 TCP 连接： 解析出 IP 地址后，根据 IP 地址和默认 80 端口，和服务器建立 TCP 连接

发起 HTTP 请求： 浏览器发起读取文件的 HTTP 请求，，该请求报文作为 TCP 三次握手的第三次数据发送给服务器

服务器响应请求并返回结果：服务器对浏览器请求做出响应，并把对应的 html 文件发送给浏览器

关闭 TCP 连接 ： 通过四次挥手释放 TCP 连接

浏览器渲染：客户端（浏览器）解析 HTML 内容并渲染出来，浏览器接收到数据包后的解析

**构建 DOM 树：**词法分析然后解析成 DOM 树（dom tree），是由 dom 元素及属性节点组成，树的根是 document 对象

构建 CSS 规则树：生成 CSS 规则树（CSS Rule Tree）
构建 render 树：Web 浏览器将 DOM 和 CSSOM 结合，并构建出渲染树（render tree）
布局（Layout）：计算出每个节点在屏幕中的位置
绘制（Painting）：即遍历 render 树，并使用 UI 后端层绘制每个节点。
JS 引擎解析过程：
调用 JS 引擎执行 JS 代码（JS 的解释阶段，预处理阶段，执行阶段生成执行上下文，VO，作用域链、回收机制等等）

创建 window 对象：window 对象也叫全局执行环境，当页面产生时就被创建，所有的全局变量和函数都属于 window 的属性和方法，而 DOM Tree 也会映射在 window 的 doucment 对象上。当关闭网页或者关闭浏览器时，全局执行环境会被销毁。
加载文件：完成 js 引擎分析它的语法与词法是否合法，如果合法进入预编译
预编译：在预编译的过程中，浏览器会寻找全局变量声明，把它作为 window 的属性加入到 window 对象中，并给变量赋值为’undefined’；寻找全局函数声明，把它作为 window 的方法加入到 window 对象中，并将函数体赋值给他（匿名函数是不参与预编译的，因为它是变量）。而变量提升作为不合理的地方在 ES6 中已经解决了，函数提升还存在。
解释执行：执行到变量就赋值，如果变量没有被定义，也就没有被预编译直接赋值，在 ES5 非严格模式下这个变量会成为 window 的一个属性，也就是成为全局变量。string、int 这样的值就是直接把值放在变量的存储空间里，object 对象就是把指针指向变量的存储空间。函数执行，就将函数的环境推入一个环境的栈中，执行完成后再弹出，控制权交还给之前的环境。JS 作用域其实就是这样的执行流机制实现的。
浏览器重绘与重排的区别？
重排/回流（Reflow）：当 DOM 的变化影响了元素的几何信息，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。表现为重新生成布局，重新排列元素。
重绘(Repaint): 当一个元素的外观发生改变，但没有改变布局,重新把元素外观绘制出来的过程，叫做重绘。表现为某些元素的外观被改变
单单改变元素的外观，肯定不会引起网页重新生成布局，但当浏览器完成重排之后，将会重新绘制受到此次重排影响的部分
重排和重绘代价是高昂的，它们会破坏用户体验，并且让 UI 展示非常迟缓，而相比之下重排的性能影响更大，在两者无法避免的情况下，一般我们宁可选择代价更小的重绘。
『重绘』不一定会出现『重排』，『重排』必然会出现『重绘』。
如何触发重排和重绘？
任何改变用来构建渲染树的信息都会导致一次重排或重绘：

添加、删除、更新 DOM 节点
通过 display: none 隐藏一个 DOM 节点-触发重排和重绘
通过 visibility: hidden 隐藏一个 DOM 节点-只触发重绘，因为没有几何变化
移动或者给页面中的 DOM 节点添加动画
添加一个样式表，调整样式属性
用户行为，例如调整窗口大小，改变字号，或者滚动。
如何避免重绘或者重排？
集中改变样式，不要一条一条地修改 DOM 的样式。

不要把 DOM 结点的属性值放在循环里当成循环里的变量。

为动画的 HTML 元件使用 fixed 或 absoult 的 position，那么修改他们的 CSS 是不会 reflow 的。

不使用 table 布局。因为可能很小的一个小改动会造成整个 table 的重新布局。

尽量只修改 position：absolute 或 fixed 元素，对其他元素影响不大

动画开始 GPU 加速，translate 使用 3D 变化

提升为合成层

> 将元素提升为合成层有以下优点：
> 合成层的位图，会交由 GPU 合成，比 CPU 处理要快
> 当需要 repaint 时，只需要 repaint 本身，不会影响到其他的层
> 对于 transform 和 opacity 效果，不会触发 layout 和 paint
> 提升合成层的最好方式是使用 CSS 的 will-change 属性：#target {will-change: transform;}

### 谈谈你对 promise、axios 的理解

**_promise_** 是 js 用来处理所有异步操作的
传统的方式处理异步操作，就是 ajax 嵌套 ajax,就是常说的回调地狱，是非常难维护，而 promise 有 resolive 和 reject 这两个方法，将成功和失败返回的数据，传递给使用者，promise 开始的状态是 pending ，当成功或者失败的时候，状态会切换到 fulfilled(成功)或者 rejected（失败）状态，把结果通过 then()或者 catch()交出去。
promise 不仅仅一次处理一个异步请求，它还有两个方法，all() 和 race() ,all() 只有在里面所有的异步操作都成功才算是成功，race() 只有在一个异步请求成功就会往后面继续执行代码。

### webpack 构建优化怎么搞？

webpack 构建的时候，需要找出所有模块文件进行编译处理，那么我们可以在以下几个点上做优化处理：

1. 缩小文件的搜索范围，用 alias extensions 等配置缩小范围
2. 减少需要解析的文件，使用 noParse 配置告诉 webpack 排除指定的文件，不对它们进行解析
3. 避免重复编译第三方库，可以吧第三方文件库单独打包到一个文件夹中，他不会跟着业务代码一起重新打包

构建的时候，如果对多个 js 文件需要被压缩，他会一个一个的进行压缩，可以使用 parallelUglifyPlugin 插件来开启多个子进程，采用并行方式对多个 js 文件进行压缩

## vue 相关

### 什么是 mvvm?

modal + view + viewModal 的缩写，是 modal 驱动 view 的渐进式框架，不需要直接操作 dom 来实现页面的改变。
1）View 层
View 是视图层，也就是用户界面。前端主要由 HTML 和 CSS 来构建 。
（2）Model 层
Model 是指数据模型，泛指后端进行的各种业务逻辑处理和数据操控，对于前端来说就是后端提供的 api 接口。
（3）ViewModel 层
ViewModel 是由前端开发人员组织生成和维护的视图数据层。在这一层，前端开发者对从后端获取的 Model 数据进行转换处理，做二次封装，以生成符合 View 层使用预期的视图数据模型。

（1）View 层

```js
<div id="app">
  <p>{{ message }}</p>
  <button v-on:click="showMessage()">Click me</button>
</div>
```

（2）ViewModel 层

```js
var app = new Vue({
  el: "#app",
  data: {
    // 用于描述视图状态
    message: "Hello Vue!",
  },
  methods: {
    // 用于描述视图行为
    showMessage() {
      let vm = this;
      alert(vm.message);
    },
  },
  created() {
    let vm = this;
    // Ajax 获取 Model 层的数据
    ajax({
      url: "/your/server/data/api",
      success(res) {
        vm.message = res;
      },
    });
  },
});
```

（3） Model 层

```js
{
    "url": "/your/server/data/api",
    "res": {
        "success": true,
        "name": "IoveC",
        "domain": "www.cnblogs.com"
    }
}
```
### 为什么 Vue 里面的是 data 是函数？
Vue实例中的 data 是通过一个函数的返回值来返回的，这样创建每一个实例的时候，就会返回一个新的对象，相当于给每一个实例的 data 属性对象创建了一个新的内存空间，相当于每次调用组件的时候，都生成了一个意思对象属性，这样就不会造成数据污染，避免发生一个组件里面修改了里面的对象，调用这个组件的所有数据都发生变化。

### 怎样理解 Vue 的单向数据流？
所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中
但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。
额外的，每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值。

> 子组件修改父组件的props值，只能事件通知父组件来修改，而不能直接去修改父组件的值。


### Vue 是如何实现数据双向绑定的？

Vue 数据双向绑定主要是指：数据变化更新视图，视图变化更新数据.
即：

- 输入框内容变化时，Data 中的数据同步变化。即 View => Data 的变化。

- Data 中的数据变化时，文本节点的内容同步变化。即 Data => View 的变化。

其中，View 变化更新 Data ，可以通过事件监听的方式来实现，所以 Vue 的数据双向绑定的工作主要是如何根据 Data 变化更新 View。
回答1：
通过数据劫持和订阅者、发布者模式来实现，同时使用Object.defineProperty()方法来给劫持的属性添加getter和setter，当数据改变时，setter触发，setter中发布消息，订阅者收到消息后进行更新,也就是说数据发生变化视图更新，视图改变，数据也改变。
第一步：需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上setter和getter属性。
第二步：compile解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图。
第三步：Watcher订阅者是Observer和Compile之间通信的桥梁，主要做的事情是:
1、在自身实例化时往属性订阅器(dep)里面添加自己
2、自身必须有一个update()方法
3、待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则更新视图。
第四步：MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 ->视图更新；视图交互变化(input) -> 数据model变更的双向绑定效果。
回答2：
**Vue 的双向数据绑定实现原理主要基于以下几个核心概念：**

1. **数据劫持**：Vue 使用 Object.defineProperty 方法来劫持数据的 setter 和 getter，以此实现数据与视图的双向绑定。当数据对象被修改时，视图也会随之更新。
2. **依赖追踪**：当一个 Vue 实例劫持数据对象的属性时，Vue 会缓存这些属性，并使用一个叫做“依赖追踪”的对象来记录这些属性的依赖关系。当依赖对象被修改时，Vue 会触发更新相关的视图。
3. **异步更新**：Vue 为了性能优化，采用了异步更新的策略。当数据变化时，Vue 不会立即更新视图，而是将更新操作放入一个队列中，等待浏览器的 repaint，然后再统一进行更新。这样可以在一次 repaint 中尽可能多地更新视图，提高性能。
4. **响应式系统**：Vue 还设计了一套响应式系统，用于管理这些依赖关系和更新队列。当依赖关系发生变化时，Vue 会自动更新相关的视图，并处理可能出现的冲突和错误。

**在实现细节上，Vue 的双向数据绑定机制包括以下几个步骤：**

1. 在 Vue 实例创建时，对 data 中的属性进行劫持，添加对应的 getter 和 setter，用于拦截属性的读取和修改操作。
2. 当组件中通过 v-model 指令或其他方式对 data 中的属性进行修改时，getter 和 setter 会拦截这些操作，并更新 Vue 实例中的数据状态。
3. 当 Vue 实例中的数据状态发生变化时，会触发依赖追踪对象的更新操作，将相关的视图加入到更新队列中。
4. 在浏览器 repaint 阶段，Vue 会统一执行更新队列中的更新操作，将数据状态与视图状态同步。
总的来说，Vue 的双向数据绑定机制通过数据劫持、依赖追踪和异步更新等技术实现了高效的数据与视图之间的同步，为开发者提供了简洁易用的开发体验。

### Vue 框架怎么实现对象和数组的监听？

通过 Object.defineProperty() 对数据进行劫持，但是 Object.defineProperty() 只能对属性进行数据劫持，不能对整个对象进行劫持。
同理无法对数组进行劫持，但是我们在使用 Vue 框架中都知道，Vue 能检测到对象和数组（部分方法的操作）的变化，那它是怎么实现的呢？我们查看相关代码如下：

```js
/**
 * Observe a list of Array items.
 */
observeArray (items: Array<any>) {
  for (let i = 0, l = items.length; i < l; i++) {
    observe(items[i])  // observe 功能为监测数据的变化
  }
}

/**
 * 对属性进行递归遍历
 */
let childOb = !shallow && observe(val) // observe 功能为监测数据的变化
```

通过以上 Vue 源码部分查看，我们就能知道 Vue 框架是通过遍历数组 和递归遍历对象，从而达到利用 Object.defineProperty() 也能对对象和数组（部分方法的操作）进行监听。

### Proxy 与 Object.defineProperty 优劣对比

**_Proxy 的优势如下:_**

- Proxy 可以直接监听对象而非属性；
- Proxy 可以直接监听数组的变化；
- Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
- Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；
- Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；

**_Object.defineProperty 的优势如下:_**

兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。

### Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？

受现代 JavaScript 的限制 ，Vue 无法检测到对象属性的添加或删除。
由于 Vue 会在初始化实例时对属性执行 `getter/setter` 转化，所以属性必须在 data 对象上存在才能让 Vue 将它转换为响应式的。
但是 Vue 提供了 `Vue.set (object, propertyName, value)` / `vm.$set (object, propertyName, value)`来实现为对象添加响应式属性，那框架本身是如何实现的呢？
我们查看对应的 Vue 源码：`vue/src/core/instance/index.js`

```js
export function set(target: Array<any> | Object, key: any, val: any): any {
  // target 为数组
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 修改数组的长度, 避免索引>数组长度导致splcie()执行有误
    target.length = Math.max(target.length, key);
    // 利用数组的splice变异方法触发响应式
    target.splice(key, 1, val);
    return val;
  }
  // key 已经存在，直接修改属性值
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  const ob = (target: any).__ob__;
  // target 本身就不是响应式数据, 直接赋值
  if (!ob) {
    target[key] = val;
    return val;
  }
  // 对属性进行响应式处理
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}
```

我们阅读以上源码可知，`vm.$set` 的实现原理是：

- 如果目标是数组，直接使用数组的 `splice` 方法触发相应式；
- 如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用 `defineReactive` 方法进行响应式处理（ `defineReactive` 方法就是 Vue 在初始化对象时，给对象属性采用 `Object.defineProperty` 动态添加 `getter` 和 `setter` 的功能所调用的方法）

### 生命周期函数有哪些

- beforeCreate 实例刚在内存中被创建出来，此时 dom data methods 都是取不到的
- created 实例已经在内存中创建出来，此时 dom 是取不到的 data methods 可以取到
- beforeMount 此时已经完成了模板的编译，但是还没有挂载到页面上，相关的 render 函数首次被调用，此时 dom 是取不到的 data methods 可以取到
- mounted 已经将编译好的模板，挂载到了页面指定的容器中显示,dom data methods 都可以取到
- beforeUpdate 状态更新之前执行此函数，此时 data 中的状态值是最新的，但是界面上显示的数据还是旧的，因为此时还没有开始重新渲染 DOM 节点
- updated 实例更新完毕之后调用此函数，此时 data 中的状态值和界面上显示的数据，都已经完成了更新，界面已经被重新渲染好了
- beforeDestory 实例销毁之前调用，在这一步，实例仍然完全可用
- destoryed Vue 实例销毁之后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁

> **调用解耦一般在那个生命周期函数中执行？**
> 可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。
> 但是推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：
> <u>1.能更快获取到服务端数据，减少页面 loading 时间；</u>
> <u>2.ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；</u>

但是 **_具体的需求_** 需要具体的分析：

比如：如果一个页面里面用到了三个子组件，
页面初始化进来的生命周期执行的顺序是：
父 beforeCreate -> created -> beforeMount
子 1 beforeCreate -> created -> beforeMount -> mounted
子 2 beforeCreate -> created -> beforeMount -> mounted
子 3 beforeCreate -> created -> beforeMount -> mounted
父 mounted

> 那么就应该父组件的调用接口逻辑放到 mounted ,子组件的调用接口放到 created , 这样就避免了父组件里面接口调用阻塞子组件的接口返回，使得子组件的数据先显示到页面中去。

### 为什么使用虚拟 dom

- 创建真实 DOM 的代价高：真实的 DOM 节点 node 实现的属性很多，而 vnode 仅仅实现一些必要的属性，相比起来，创建一个 vnode 的成本比较低。
- 触发多次浏览器重绘及回流：使用 vnode ，相当于加了一个缓冲，让一次数据变动所带来的所有 node 变化，先在 vnode 中进行修改，然后 diff 之后对所有产生差异的节点集中一次对 DOM tree 进行修改，以减少浏览器的重绘及回流。
  1). 重绘：元素样式的改变（但宽高、大小、位置等不变）
  如：outline、visibility、color、background-color 等
  只改变自身样式，不会影响到其他元素
  2). 回流：元素的大小或者位置发生改变（当页面布局和几何信息发生改变的时候），触发了重新布局导致渲染树重新计算布局和渲染
  ​ 如添加或删除可见的 DOM 元素；元素的位置发生变化；元素的尺寸发生变化、内容发生变化（如文本变化或图片被另一个不同尺寸的图片所代替）；页面一开始渲染的时候（无法避免）；
  ​ 因为回流是根据视口大小来计算元素的位置和大小的，所以浏览器窗口尺寸变化也会引起回流

> 注意：回流一定会触发重绘，而重绘不一定会回流

- 虚拟 dom 由于本质是一个 js 对象，因此天生具备跨平台的能力，可以实现在不同平台的准确显示。
- Virtual DOM 在性能上的收益并不是最主要的，更重要的是它使得 Vue 具备了现代框架应有的高级特性。

### Vue 中 key 是用来做什么的？为什么不推介使用 index 作为 key？

> key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速

为什么会更快速，更准确呢，下面来看 vnode 中关于节点更新复用的详情情况
在 diff 中比较两个节点是否可以复用，主要通过下面 sameVnode 函数来判断

<img src="/images/img-folder/2023/vnode.png">

- key：列表上每一项设置的 key 值
- data：render 函数中设置的一些属性
- sel：标签和 id 或者 class，例如 div#app.item，表示 div 标签有一个 id：app，class：item

#### 当我们没有设置 key 值的情况

默认是 `undefined，undefined===undefined = true`

因为是列表，所以标签，class，属性基本上是一样，只是里面内容不一样，通过调用上诉函数，可以判断出：可以复用的 dom
我们来设想一下，如果我们有一个列表，然后我们在列表的头部新增一条数据
1、首先会比较新增的 vnode 和老元素第一个元素比较，因为 sameVnode 返回 true，标签可以复用，修改里面的内容
2、比较第二个元素，是不是 sameVnode 返回的还是 true，标签复用，修改列面的内容，以此类推，是不每一个节点都要替换内容
3、如果我们列表每一项有一个 chekbox 元素，勾选的第一项，再插入新元素的时候，是不是你插入的节点被勾选了，这样是不是就不对了，有问题
4、而且每一个元素都替换，是不是特别慢，并且列表需要全部重新渲染，大大的影响的性能

> 把 key 值设置成 index，有什么问题吧，为什么说最好不要设置成 index

1、列表每一项设置了一个 index 值，从 0、1、2、3、4、5

2、当我们在头部插入一个节点，是不是插入的节点就变成 0，原来的 0、1、2、3、4 都加一位，我们来 diff 比较的时候，是不是每一项又都不一样了，sameVnode 返回的都是 false，标签不能复用，都要重新创建一个，插入到节点中，这样是不是也全部需要重新渲染，影响性能

#### 如果设置了 key，且 key 值固定的情况

下面我们来把 key 设置成唯一的值，且是固定的值，当我们在头部插入一个节点，这个节点的 key 没有一样的，我们就创建一个，插入到头部

后面的节点，是不是 sel 没有变，标签没有变，key 值也没有变，是不是节点全部都可以复用，只是把位置挪动下，实际上就只创建了一个元素，这样就可以大大加快渲染速度

这就是我们所说的 diff 操作更加准确，更快速的原因

### v-show 和 v-if 的区别

v-show 原理是修改元素的 css 属性 display:none 来决定是显示还是隐藏

v-if 则是通过操作 DOM 来进行切换显示

### 常用的指令？常用的内置组件有哪些？

常用指令：
v-html v-text v-modal v-if v-show v-hide v-once v-on v-for v-slot v-pre

常用内置组件
transition 动画
keepAlive 多个组件动态切换时缓存被移除的组件实例

### Vue 修饰符有哪些
**事件修饰符**

.stop 阻止事件继续传播
.prevent 阻止标签默认行为
.capture 使用事件捕获模式, 即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理
.self 只当在 event.target 是当前元素自身时触发处理函数
.once 事件将只会触发一次
.passive 告诉浏览器你不想阻止事件的默认行为
**v-model 的修饰符**

.lazy 通过这个修饰符，转变为在 change 事件再同步
.number 自动将用户的输入值转化为数值类型
.trim 自动过滤用户输入的首尾空格
**键盘事件的修饰符**

.enter
.tab
.delete (捕获 “删除” 和“退格”键)
.esc
.space
.up
.down
.left
.right
**系统修饰键**

.ctrl
.alt
.shift
.meta
**鼠标按钮修饰符**

.left
.right
.middle

### computed 和 watch 的区别

#### computed

computed 有缓存，关联的 data 里面的响应式数据不变则不会重新计算，遇到双向绑定的属性值即 v-model 的属性值需要使用 get()和 set(),才能监听

+ 计算属性是基于它们的响应式依赖进行缓存的，只在相关响应式依赖发生改变时它们才会重新求值，也就是说只要 message 值不变，多次访问计算属性会立即返回之前的计算结果，而不必再次执行函数

+ 如果 message 值改变了，不依赖 message 的值，计算属性不会重新计算

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

- 支持缓存，只有依赖数据发生改变，才会重新进行计算,否则只会执行一次
- 不支持异步，当 computed 内有异步操作时无效
- 如果一个属性是由其他属性计算而来的，这个属性依赖其他属性，是一个多对一或者一对一，一般用 computed
- 如果 computed 属性属性值是函数，那么默认会走 get() ；函数的返回值就是属性的属性值；在 computed 中的，属性都有一个 get() 和一个 set()，当数据变化时，调用 set()。

#### watch

监听引用类型需要深度监测，而且是拿不到 oldVal，值类型不需要深度监听
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

- 主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作，可以看作是 computed 和 methods 的结合体；
- 可以监听的数据来源：data，props，computed 内的数据；
- watch 支持异步；
- 不支持缓存，监听的数据改变，直接会触发相应的操作；
- 监听函数有两个参数，第一个参数是最新的值，第二个参数是输入之前的值，顺序一定是新值，旧值。

> 计算属性一般用在模板渲染中，某个值是依赖了其它的响应式对象甚至是计算属性计算而来；而侦听属性适用于观测某个值的变化去完成一段复杂的业务逻辑。

### v-if 与 v-for 为什么不建议一起使用
当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级。这意味着 `v-if` 将分别重复运行于 每个 `v-for` 循环中，即先运行 `v-for` 的循环，然后在每一个 `v-for` 的循环中，再进行 `v-if` 的条件对比，会造成性能问题，影响速度。

解决这个问题的方法是:
+ 可以使用`计算属性`将数据提前过滤

```js
computed: {
  activeUsers() {
    return this.users.filter((user) => user.isActive)
  }
}
```

+ 也可以使用 `<template>` 元素，在 `<template>` 元素上使用 `v-if`，然后将 `v-for` 放在 `<template>` 元素上

### v-model 原理
v-model 只是语法糖而已

v-model 在内部为不同的输入元素使用不同的 property 并抛出不同的事件：

text 和 textarea 元素使用 value property 和 input 事件；
checkbox 和 radio 使用 checked property 和 change 事件；
select 字段将 value 作为 prop 并将 change 作为事件。
注意: 对于需要使用输入法（如中文、日文、韩文等）的语言，你会发现 v-model 不会在输入法组合文字过程中得到更新。

### vue 自定义指令设置

- 全局: Vue.directive('指令名称，不需要写 v-开头',对象或函数)

```js
Vue.directive("test", {
  bind(el, bind) {
    console.log(el);
  },
});

Vue.directive("red", {
  // bind 第一次绑定到元素时调用
  bind(el, bindings) {
    el.style.cssText = `color:red;font-size:30px`;
  },
});
```

- 私有
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

### Vue.mixin 的使用场景和原理
在日常的开发中，我们经常会遇到在不同的组件中经常会需要用到一些相同或者相似的代码，这些代码的功能相对独立，可以通过 Vue 的 mixin 功能抽离公共的业务逻辑，原理类似 “对象的继承”，当组件初始化时会调用 mergeOptions 方法进行合并，采用策略模式针对不同的属性进行合并。当组件和混入对象含有同名选项时，这些选项将以恰当的方式进行 “合并”。

### nextTick 使用场景和原理
nextTick 中的回调是在下次 DOM 更新循环结束之后执行的延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。主要思路就是采用微任务优先的方式调用异步方法去执行 nextTick 包装的方法。

**nexttick使用场景**
1.获取数据更新之后的DOM
2.created()中进行DOM操作
3.获取元素宽度

看例子，比如当 `DOM` 内容改变后，我们需要获取最新的高度

```js
<template>
  <div>{{ name }}</div>
</template>
<script>
export default {
  data() {
    return {
      name: ""
    }
  },
  mounted() {
    console.log(this.$el.clientHeight) // 0
    this.name = "沐华"
    console.log(this.$el.clientHeight) // 0
    this.$nextTick(() => {
      console.log(this.$el.clientHeight) // 18
    });
  }
};
</script>
```

### Vue.set 方法原理
了解 Vue 响应式原理的同学都知道在两种情况下修改数据 Vue 是不会触发视图更新的

1. 在实例创建之后添加新的属性到实例上（给响应式对象新增属性）

2. 直接更改数组下标来修改数组的值

Vue.set 或者说是 $set 原理如下

因为响应式数据 我们给对象和数组本身都增加了__ob__属性，代表的是 Observer 实例。当给对象新增不存在的属性 首先会把新的属性进行响应式跟踪 然后会触发对象__ob__的 dep 收集到的 watcher 去更新，当修改数组索引时我们调用数组本身的 splice 方法去更新数组

### 父子组件之间的通信

**父传子**：通过 props 来传递
父组件(:变量名) -> 子组件([props])来接收

+ 父组件访问子组件的数据和方法：
通过 `$refs` 或者 `$children` 访问子组件的属性

```js
<cpn ref="twoChildrenRef"></cpn>

// this.$refs.twoChildrenRef.子组件数据
// this.$refs.twoChildrenRef.子组件方法
```

**子传父**：$emit/$on
子组件($emit('事件名'，值)) -> 父组件(@事件名='aa',aa(传递的值))来接收

+ 子组件访问父组件的数据和方法:

在子组件直接使用 `this.$parent`

```js
this.$parent.name; 
this.$parent.方法名(); 
```

**兄弟组件**：创建一个事件中心

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

**Vuex**：专门为Vue开发的用于管理应用状态的库，使Vue的状态能按照可预期的方式来进行管理。

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
{
  path: "/user/:userId";
}
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

### router 和 route 的区别

- $route 对象
  表示当前的所有的路由信息，包括路径，参数，query 对象等

```js
import Layout from "../views/layout/Layout";
const asyncRoutes = [
  {
    path: "/product-define",
    component: Layout,
    redirect: "/product-define/",
    name: "ProductDefineManagement",
    meta: {
      title: "产品定义定价",
      icon: "icon-dingyidingjia",
    },
    children: [
      {
        path: "CarType",
        name: "CarType",
        component: () => import("@/views/product_define/CarType"),
        meta: { title: "车型" },
      },
    ],
  },
];
```

> $route.path 路径
> $route.params 一个 key: val 对象
> $route.query 一个 key: val 对象
> $route.hash #号后面的数据
> $route.fullPath url，包含参数和 hash 完整路径
> $route.matched 数组，常用作面包屑
> $route.name 当前路由的名称
> $route.meta 路由元信息，一些额外标注参数

- $router 对象：是全局的路由实例。

### 编程式导航的使用方法

1.**路由的跳转**
this.$router.push()
+ path 跳转方式，只可以用query传参
```js
this.$router.push( {path:'login', query: { userName: '01testuser2'}})
```
+ name 跳转方式，可以用query和params传参
```js
this.$router.push( {name:'login', query: { userName: '01testuser2'}})

this.$router.push( {name:'login', params: { userName: '01testuser2'}})
```
> query传参与params传参区别：query传参相当于get请求，在浏览器的url地址中会显示参数；params相当于post请求，在浏览器的地址栏中不显示。

2.**路由替换**
this.$router.replace() 
***使用方法和 `this.$router.push()` 一样***
3.**后退**
this$router.back()
4.**前进**
this.$router.forward() 
5.**前进后退**
this.$router.go() -1 为后退 
6.**配置路由常用参数**

- path 路径
- component 路由相对于组件的路径
- name 路由的名称
- children 嵌套路由的子组件的配置项
- props 路由解耦
- redirect 路由重定向

### 什么是路由守卫？路由的钩子函数有哪些？

路由守卫：路由跳转前后的一些验证
路由钩子函数：

- beforeRouterEnter 当路由跳转之前（登录之前）
- beforeRouterUpdate 当路由进行更新的时候，如果当前路由发生了变化，但是不需要组件进行销毁
- beforeRouterLeave 当路由离开的时候（当用户没有支付离开的时候、当用户填写完用户信息没有保存的时候）
- beforeEach 全局守卫，验证用户是否登录

### vue-router 路由钩子函数是什么 执行顺序是什么
路由钩子的执行流程, 钩子函数种类有: 全局守卫、路由守卫、组件守卫

完整的导航解析流程:

导航被触发。
在失活的组件里调用 beforeRouteLeave 守卫。
调用全局的 beforeEach 守卫。
在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
在路由配置里调用 beforeEnter。
解析异步路由组件。
在被激活的组件里调用 beforeRouteEnter。
调用全局的 beforeResolve 守卫 (2.5+)。
导航被确认。
调用全局的 afterEach 钩子。
触发 DOM 更新。
调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。


### 能说下 vue-router 中常用的路由模式实现原理吗?
**hash 模式**

location.hash 的值实际就是 URL 中 #后面的东西 它的特点在于：hash 虽然出现 URL 中，但不会被包含在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。
可以为 hash 的改变添加监听事件
window.addEventListener("hashchange", funcRef, false);
每一次改变 hash（window.location.hash），都会在浏览器的访问历史中增加一个记录利用 hash 的以上特点，就可以来实现前端路由 “更新视图但不重新请求页面” 的功能了

> 特点：兼容性好但是不美观

**history 模式**

利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。

这两个方法应用于浏览器的历史记录站，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。这两个方法有个共同的特点：当调用他们修改浏览器历史记录栈后，虽然当前 URL 改变了，但浏览器不会刷新页面，这就为单页应用前端路由 “更新视图但不重新请求页面” 提供了基础。

> 特点：虽然美观，但是刷新会出现 404 需要后端进行配置

### vuex 的理解

vuex 是专门为 vue 开发的一款状态管理库，主要采用集中管理应用所有的组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

- state 保存应用的**全部状态**的对象 this.$store.state(key)
- Getter 其实就是 state 通过**计算属性**，衍变出的新的状态 this.$store.getters(key)
- Mutation 包含一个字符窜名称和回调函数，必须是 ***同步函数***

```js
mutations: {
  name(state) {
    state.count++
  }
}
```

> 它其实就是操作 `state` 的，它不能直接调用，这更像是一个事件注册，需要 `store.commit('name')`来调用对应的 `mutation`

- action 类似于 `mutation`,但是 `action` 提交的是 `mutation`，并且是 ***异步*** 的，使用 `commit('mutation 名')`来调用，action 使用 `dispatch` 来调用

> 在 main.js 引入 store，注入。新建了一个 store 目录，然后….. export 。 
场景：单页应用中，组件之间的共享状态和方法 state Vuex 使用单一状态树,即每个应用将仅仅包含一个 store 实例，但单一状态树和模块化并不冲突。存放的数据状态，不可以直接修改里面的数据。 
+ **mutations** 定义的方法动态修改 Vuex 的 store 中的状态或数据。 
+ **getters** 类似 vue 的计算属性，主要用来过滤一些数据。 
+ **action** 可以理解为通过将 mutations 里面处里数据的方法变成可异步的处理数据的方法，简单的说就是异步操作数据。
view 层通过 store.dispath 来分发 action。 
+ **modules** 项目特别复杂的时候，可以让每一个模块拥有自己的 state、mutation、action、getters,使得结构非常清晰，方便管理。

快速掌握 vuex 常用的所有 api 用法: http://shuy.cc/2019/07/24/vuex/

### Vuex 页面刷新数据丢失怎么解决
需要做 vuex 数据持久化 一般使用本地存储的方案来保存数据 可以自己设计存储方案 也可以使用第三方插件

推荐使用 vuex-persist 插件，它就是为 Vuex 持久化存储而生的一个插件。不需要你手动存取 storage ，而是直接将状态保存至 cookie 或者 localStorage 中

### Vuex 为什么要分模块并且加命名空间
模块: 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块。

命名空间：默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应。如果希望你的模块具有更高的封装度和复用性，你可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名

### 你有对 Vue 项目进行哪些优化？

从 **`3个大方面`**，**`22个小方面`**详细讲解如何进行 Vue 项目的优化。
**（1）代码层面的优化**

- 对象层级不要过深，否则性能就会差
- 不需要响应式的数据不要放到 data 中（可以用 Object.freeze() 冻结数据）
- v-if 和 v-show 区分使用场景
- computed 和 watch 区分使用场景
- v-for 遍历必须为 item 添加 key，且避免同时使用 v-if
- 长列表性能优化
- 事件的销毁
- 图片资源懒加载
- 路由懒加载
- 第三方插件的按需引入
- 优化无限列表性能
- 服务端渲染 SSR or 预渲染
- 防止内部泄漏，组件销毁后把全局变量和事件销毁
- 防抖、节流运用

**（2）Webpack 层面的优化**

- Webpack 对图片进行压缩
- 减少 ES6 转为 ES5 的冗余代码
- 提取公共代码
- 模板预编译
- 提取组件的 CSS
- 优化 SourceMap
- 构建结果输出分析
- Vue 项目的编译优化

**（3）基础的 Web 技术的优化**

- 开启 gzip 压缩
- 浏览器缓存
- CDN 的使用
- 使用 Chrome Performance 查找性能瓶颈

### 使用过 Vue SSR 吗？说说 SSR
SSR 也就是服务端渲染，也就是将 Vue 在客户端把标签渲染成 HTML 的工作放在服务端完成，然后再把 html 直接返回给客户端。

优点：

SSR 有着更好的 SEO、并且首屏加载速度更快

缺点： 开发条件会受到限制，服务器端渲染只支持 beforeCreate 和 created 两个钩子，当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于 Node.js 的运行环境。

服务器会有更大的负载需求

### 登陆权限的实现

#### 登陆

在登陆页面，前端需要进行表单校验，通过前端校验，过滤拦截一些不符合规则的参数请求，然后调用后端的提供登陆接口，将符合规则的参数传递给后端，后端接受到请求后，会获取这个请求携带的参数，这些参数通常会有用户名、密码一级验证码、然后来验证这些参数，如果验证不通过，前端将后端提供的错误提示提示给用户即可，如果验证通过，那么就会生成一个 token，并且返回给前端，前端接受到这个 token 之后，需要将这个 token 保存在本地，在我们下次去调用需要携带 token 的接口时，通常会将这个 token 塞入到请求头中，一并发送给后端，那么将 token 添加到请求头中，我们通常会去封装一个请求方法，在这个请求方法中完成给请求头添加 token 的操作，我们在本地保存 token，是因为有的页面是需要登录才可以进入的，那么我们就可以通过路由守卫来判断当前本地有没有 token，如果没有 token 就跳转到登录页面，如果你的项目做了 token 过期之后会自动刷新这个 token，然后继续完成请求这么一个功能，那么就更好了，

#### 权限

路由控制的核心包含用户、角色、菜单，用户和角色具备某种关联关系，而角色和菜单具备某种关联关系，所以用户和菜单会通过角色产生关联关系，那对应到后台页面上，首先我们会创建好菜单，然后在创建角色，在创建角色的时候，可以给角色分配菜单，最好当创建用户账号时，就可以给这个用户分配角色，那么当登陆该账号的时候，前端会请求一次后端提供的返回了用户所具备菜单列表的数据接口，然后在前端代码定义路由时，我们会维护两份路由，一份是静态路由，他是所有用户都可以访问的路由，直接挂载在路由实例上即可，还有一份是动态路由，这份路由会根据当前用户所具备的菜单进行筛选 asyncRoutes.forEach((item)=>{
If(menus.find(menu))
})
最后筛选出的路由，通过 addRoute 这个方法，动态添加上去，这一步通常会在路由守卫中完成（router.beforeEach）,遍历这份动态路由（asyncRoutes.forEach），判断当前遍历项是否存在于后端返回的菜单列表中，那返回一个筛选完成的路由数组，最后我们就可以用这份路由数组去渲染菜单栏了。

### vue2.0 和 vue3.0 的区别
+ 响应式原理
+ 模板编译
+ 生命周期
+ 组件
+ 性能优化


## 小程序相关
### 微信的小程序的主要文件
+ WXML——模板文件
+ WXSS——样式文件，样式可直接用import导入
+ JS——脚本逻辑文件，逻辑处理，网络请求
+ app.json——配置文件入口，整个小程序的全局配置，网络超时时间、底部tab、页面路径，window字段是小程序所有页面的顶部背景颜色、文字颜色
+ app.js——可以没有内容，可以在里边监听生命周期函数、声明全局变量
+ app.wxss——全局配置样式文件

### 小程序中如何进行接口请求？会不会跨域，为什么
微信小程序有自带的api接口，wx.request();
不会跨域，因为微信小程序不是浏览器，没有同源策略的约束；

```js
wx.request({
  url: 'https://xxxxxxx.com/api',
  method: "POST",
  data: {
    pageNum: 1,
    pageSize: 10
  },
  header: {
    "content-type": "application/x-www-form-urlencoded"
  },
  success: res => {
    console.log(res)
  }
})
```

### 小程序的常用命令有哪些
```js
引用数据 `{{}}`
逻辑渲染 `wx:if wx:elif wx:else hidden`
列表渲染 `wx:for wx:for-item wx:for-index wx:key`，使用 `wx:for-item` 指定数组当前元素的变量名，使用 `wx:for-index` 指定数组当前下标的变量名。
```
```html
<view wx:for="{{array}}" wx:for-index="idx" wx:for-item="itemName"></view>
```
```js
驱动视图 `this.setData({})`
事件绑定 `bind`
```

### 生命周期函数有哪些？小程序的周期函数？

生命周期函数：
onLoad 监听页面加载，一个页面只调用 1 次
onReady 监听页面初次渲染完成，一个页面只调用 1 次
onShow 监听页面显示
onHide 监听页面隐藏
onUnLoad 监听页面卸载
小程序周期函数：
onLaunch 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）。可以做一些初始化的工作
onShow 当小程序启动，或从后台进入前台显示，会触发 onShow
onHide 当小程序从前台进入后台，会触发 onHide

### 应用与页面生命周期发生顺序
小程序中的生命周期函数，分为 应用生命周期函数 和 页面生命周期函数 ；

应用 onLaunch -> 应用 onShow -> 页面 page -> onLoad -> onShow -> onReady -> onUnload

App.js是小程序入口文件，所以在App.js中调用**应用生命周期函数**：
```js
App({
    // 小程序初始化完成时，执行此函数，可以做一些初始化的工作
    onLaunch: function( options ){}
    // 小程序显示到屏幕上的时候，执行此函数
    onShow: function( options ){}
    // 小程序被最小化的时候，执行此函数
    onHide: function(){}
})
```
**页面生命周期函数**
- onLoad: 监听页面加载
- onShow: 监听页面显示
- onReady: 监听页面初次渲染完成
- onHide: 监听页面影藏
- onUnload: 监听页面卸载

### 小程序和Vue写法的区别
- 数据绑定：小程序是wx:bind，vue是v-bind
- 事件绑定：小程序是bind，vue是@
- 样式绑定：小程序是wx:class，vue是:class
- 循环遍历：小程序是wx:for，vue是v-for
- 调用data模型：小程序是this.data.unifo，vue是this.unifo
- 给模型赋值：小程序是this.setData({unifo:1}

### 小程序是如何传值？

```html
<button bindTap="get" id="123" data-name="按钮名">按钮</button>
```

```js
get(e) {
  let id = e.currentTarget.id
  let name = e.currentTarget.dataset.name
}
```

### 小程序如何进行页面的跳转传参以及接收数据
最常用的两个页面的跳转和传参方式：
①wx.navigateTo 
②navigator标签

```js
wx.navigateTo({
     url: `/pages/details?id=${xxx}`
});

<navigator url="/page/navigate/navigate?title=navigate" hover-class="navigator-hover">跳转到新页面</navigator>
```
跳转页接收参数：
```js
onLoad (options) {
    console.log(options)
    this.setData({
      goodsId:options.id,
      goodsName:options.name
  })
}
```
其他方式：
+ wx.switchTab() 用来 跳转至tabBar页面，并关闭其他所有非 tabBar 页面

+ wx.redirectTo() 和 wx.navigateTo() 一样，都 跳转至非tabBar页面，但会关闭当前页面

+ wx.reLaunch() 也是 跳转至非tabBar页面，并且会关闭其他所有页面

+ wx.navigateBack() 用来返回上一页面或多级页面，并关闭当前页面。
```js
wx.navigateBack({
  delta: 2 //返回的页面数，1为返回上一页，如果delta大于现有页面数，则返回到首页。
})
```

### wxss 和 css 的区别
1px = 2rpx
- wxss 背景图只能引入外联，不能使用本地图片
- 小程序使用@important 引入外链样式，地址为相对路径
- 单位为 rpx，是响应式像素，可根据屏幕宽度做自适应

### 小程序是如何传递数据？

- 在 app.js 中，this.globalData={}中存放数据，在组件.js 中，头部引入 const app = getApp(),来获取全局变量，直接使用 app.globalData.key 来获取变量
- 使用路由，wx.navigation/redircetTo/url+参数等方式，在页面 onLoad(e),通过 e.key 来获取参数
- 本地缓存，如 storage 等存储数据

### 小程序如何进行本地存储？
小程序提供了读写本地数据缓存的接口，通过 wx.getStorage/wx.getStorageSync读取本地缓存，通过 wx.setStorage/wx.setStorageSync写数据到缓存，其中带Sync后缀的接口表示是同步接口
```js
// 同步存储
wx.setStorageSync('key', 'value')
// 异步存储，并且开启加密存储
wx.setStorage({
  key: "key",
  data: "value",
  encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
  success() {
    wx.getStorage({
      key: "key",
      encrypt: true, // 若开启加密存储，setStorage 和 getStorage 需要同时声明 encrypt 的值为 true
      success(res) {
        console.log(res.data)
      }
    })
  }
})
// 同步读取缓存
var value = wx.getStorageSync('key')
// 异步读取缓存
wx.getStorage({
  key: 'key',
  success (res) {
    console.log(res.data)
  }
})
```

### 谈谈你对微信小程序请求封装的理解
在小程序开发过程中,我们可能会进行许多的网络请求,如果每次请求都去写一遍 `request` 代码：

```js
wx.request({
  url: 'xxx',
  data: {
    a: '',
    b: ''
  },
  header: {
    'content-type': 'application/json' // 默认值
  },
  success(res) {
    console.log(res.data)
  },
  fail(err){
    console.log(err)  
  }
})
```

效率低下且不便于维护，所以封装一下 wx.request 接口还是有必要的。

通常以返回 promise 对象的形式进行请求的封装：

```js
const baseUrl = "123456.com"
function request(method, url, dataObj) {
    return new Promise(function(resolve, reject) {
        let header = {
            'content-type': 'application/json',
        };
        wx.request({
            url: baseURL + url,
            method: method,
            data: dataObj.data,
            header: dataObj.header||header,
            success(res) {
                //请求成功
                if (res.code == 0) {
                    resolve(res);
                } else {
                    //其他异常
                    reject('运行时错误,请稍后再试');
                }
            },
            fail(err) {
                //请求失败
                reject(err)
            }
        })
    })
}
```

### webview 的理解

在小程序中嵌套 H5 页面，域名必须在白名单里面

### 小程序和 h5 页面的交互

http://shuy.cc/2020/06/09/%E5%BC%80%E5%8F%91%E9%97%AE%E9%A2%98%E8%AE%B0%E5%BD%95/#%E5%B0%8F%E7%A8%8B%E5%BA%8F%E5%92%8Ch5%E9%A1%B5%E9%9D%A2%E7%9A%84%E4%BA%A4%E4%BA%92

### 注意事项

1.rpx，规定屏幕宽度为 750rpx，可适配不同的屏幕宽度 
2.本地资源 wxss 无法获取，bgimg 可使用网络图片，base64,或者使用标签来引入
3.navigateTo，一个应用同时能发开 5 个页面或者使用 redirct

### 小程序的双向绑定和 vue 的有什么区别

小程序必须使用 this.setState({key:val})来更新数据，直接赋值不能更新页面变化

### 下拉刷新的实现方法

app.json 中，将'enablePullDownFresh': true,开启全局下拉刷新，组件.json 中，将'enablePullDownFresh': true,开启单页下拉刷新，组件中的 onPullDownRefresh 写加载的逻辑，wx.stopPullDownRefresh()更新完数据，停止更新。

### 跳转的方式有哪些

- wx.navigateTo() 保留当前页，跳转到应用指定页面，不能跳转 tabar 页面
- wx.redircetTo() 关闭当前页，跳转到应用指定页面，不能跳转 tabar 页面
- wx.relaunch() 关闭所有页，打开到应用内的某个页面（应用场景：登陆跳转到其他页面）
- wx.switchTo() 跳转到 tabbar 页面，关闭其他非 tabar 页面
- wx.navigateBack() 关闭当前页，返回上一级或多级页面，可通过 getCurrentPages()获取当前的页面栈，决定要返回第几层

### 描述一下小程序的登陆流程

点击登陆按钮 -> 调用微信登陆程序接口 wx.login,获取 code(有效期 5 分钟) -> 后台使用 code、appid,appSercrent 获取 openid、session-key,然后生成 token 返回给前端 -> 前端保存 token，便于之后的业务请求

### wx:if 和 hidden 的区别，如何使用？

wx:if 有更高的切换消耗
hidden 有更高的初始渲染消耗
页面数据切换使用 hidden,运行条件变化使用 wx:if

### app.json 的配置项

pages 存放小程序所有 pages 的路径
window 小程序所有页面的顶部、背景颜色，文字 tabbar 等的设置
tabBar 设置底部导航，最多 5 个，最少 2 个

### 微信小程序中的数据渲染与浏览器中有什么不同
浏览器中渲染是单线程的;

而在小程序中的运行环境分成渲染层和逻辑层， WXML 模板和 WXSS 样式工作在渲染层，JS 脚本工作在逻辑层。

### 你认为微信小程序的优点是什么，缺点是什么
优点：
①容易推广。在微信中，小程序拥有众多入口，且微信用户基数大，这些都有助于推广小程序；
②使用便捷。微信下拉即可打开小程序列表，点击即可使用小程序，不需要额外的安装操作等；
③体验良好。小程序不会像H5页面一样经常出现卡顿、延时、加载慢、权限不足等问题；
④成本更低，从开发成本到运营推广成本，小程序的花费仅为APP的十分之一。

缺点：
①单个包大小限制为2M，这导致无法开发大型的应用，采用分包最大是20M；
②需要像app一样审核上架，这点相对于H5的发布要麻烦一些；
③处处受微信限制。例如不能直接分享到朋友圈，涉及到积分，或者虚拟交易的时候，小程序也是不允许的。

### 如何优化首次加载小程序的速度

**包体积优化**

- 分包加载（优先采用，大幅降低主包体积）。

- 图片优化（1.使用tinypng压缩图片素材； 2.服务器端支持，可采用webp格式）。

- 组件化开发（易维护）。

- 减少文件个数及冗余数据。

**请求优化**

- 关键数据尽早请求(onLoad()阶段请求,次要数据可以通过事件触发再请求)；整合请求数据，降低请求次数。
- 采用cdn缓存静态的接口数据（如判断用户登录状态，未登录则请求缓存接口数据），cdn稳定且就近访问速度快（针对加载总时长波动大）。
- 缓存请求的接口数据。

**首次渲染优化**

- 图片懒加载（节省带宽）。
- setData优化（不要一次性设置过多的数据等）。
- DOM渲染优化（减少DOM节点）

## 算法题

### 去重

```js
var arr = [11, 11, 22, 22, 4, 444, 444];
// 循环 + includes
function equal(arr) {
  let newArr = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    if (!newArr.includes(arr[i])) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}
console.log(equal(arr));
// 双循环 判断是否相等
function equal(arr) {
  let newArr = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    let flag = true;
    for (let j = 0; j < newArr.length; j++) {
      if (newArr[j] === arr[i]) {
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
function equal(arr) {
  let result = arr.filter((item, index, self) => {
    return self.indexOf(item) === index;
  });
  return result;
}
console.log(equal(arr));
// es6的 set + from 转化类数组
function equal(arr) {
  let setArr = new Set(arr);
  let result = Array.from(setArr);
  return result;
}
console.log(equal(arr));
```

### 快排算法

**快速排序**（Quick Sort）是一种常用的排序算法，其基本思想是分治法。它的主要步骤是:

- 选择一个基准元素，将数组分为两个子数组，左边的元素都小于基准元素，右边的元素都大于基准元素。
- 然后对这两个子数组递归地应用快速排序。

```js
function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIndex = partition(arr, left, right);
    quickSort(arr, left, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}

function partition(arr, left, right) {
  let pivot = arr[right];
  let i = left;
  for (let j = left; j < right; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}

// 测试代码
let arr = [5, 9, 1, 2, 0, 6, 3];
console.log(quickSort(arr)); // 输出：[0, 1, 2, 3, 5, 6, 9]
```

```js
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr; // 如果数组长度为1或者空数组，则直接返回
  }

  let pivotIndex = Math.floor(arr.length / 2); // 选择基准数的索引
  let pivot = arr.splice(pivotIndex, 1)[0]; // 取出基准数
  let left = [];
  let right = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]); // 小于基准数的放在左边数组
    } else {
      right.push(arr[i]); // 大于等于基准数的放在右边数组
    }
  }

  // 递归地对左右子数组进行排序，并将结果合并
  return quickSort(left).concat([pivot], quickSort(right));
}

// 测试代码
let arr = [3, 1, 5, 2, 4];
let sortedArr = quickSort(arr);
console.log(sortedArr); // 输出 [1, 2, 3, 4, 5]
```

### 排序

```js
var arr = [5, 2, 4, 8, 1, 3, 10];
// sort 排序
let result = arr.sort((a, b) => a - b);
console.log(result);
// for 循环
function sort(arr) {
  for (var j = 0; j <= arr.length - 1; j++) {
    for (var i = 0; i <= arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        var tmp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmp;
      }
    }
  }
  return arr;
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
  let timer = null;
  return function (...args) {
    // 在每一次调用函数时，都清除上一次的定时器
    clearTimeout(timer);
    // 开启一个定时器
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
```

```js
/**
 **@param{fn: function} 需要节流的函数
 **@param{interval: number} 函数触发的频率
 */
const throttle = (fn, interval) => {
  // 记录上一次触发函数时的时间，初始值为0
  let lastTime = 0;
  return function (...args) {
    // 获取现在的时间
    const nowTime = new Date().getTime();
    // 如果现在的时间减去上次触发的事件大于等于interval，则可以执行函数了
    if (nowTime - lastTime >= interval) {
      fn.apply(this, args);
      // 将上次触发函数的时间赋值成当前时间
      lastTime = nowTimes;
    }
  };
};
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
var arr = [1, 2, 3, 4];
// for 循环
function add(array) {
  let result = 0;
  for (let index = 0; index < array.length; index++) {
    result += array[index];
  }
  return result;
}
console.log(add(arr));
// reduce 方法
function add(arr) {
  let result = arr.reduce((prev, cur, index, array) => {
    console.log(prev, cur, array);
    return prev + cur;
  });
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
let data = [
  {
    key: "name",
    value: "xiaosong",
  },
  {
    key: "age",
    value: 12,
  },
];
function setArr(data) {
  let obj = {};
  // 写法1：
  for (let index = 0; index < data.length; index++) {
    obj[data[index].key] = data[index].value;
  }
  // 写法2：
  data.map((item, index) => {
    const { key, value } = item;
    obj[key] = value;
  });
  return obj;
}
console.log(setArr());
```

### 时间相关

**_写一个类似于抢购的倒计时_**

```js
// 父组件
<div>
  开抢时间：{{ date }}
  <Time1 :date="date" />
</div>

data() {
  return {
    date: '2023/8/29 23:56:00'
  }
}
```

```js
// 子组件
<div>
  {{ str }}
</div>

created() {
  // 将传入的时间字符串转化为时间戳
  this.format(this.date)
},
methods: {
  format(date) {
    const that = this
    setInterval(() => {
      // 根据时间戳获取时分秒
      const endTime = new Date(date).getTime()
      const newTime = new Date().getTime()
      const diffTime = (endTime - newTime) / 1000
      var day = parseInt(diffTime / 60 / 60 / 24)
      var honur = parseInt((diffTime / 60 / 60) % 24)
      var min = parseInt((diffTime / 60) % 60)
      var sen = parseInt(diffTime % 60)

      if (diffTime <= 0) {
        that.str = '开抢了！'
        clearInterval(that.timer)
      } else {
        that.str = day + '天 ' + honur + '小时 ' + min + '分 ' + sen + '秒'
      }
    }, 1000)
  }
}
```

**_写一个显示当前时间的方法_**

```js
<div>{{ time }}</div>

setInterval(() => {
  this.timeFn()
}, 1000)

timeFn() {
  let timeStr = new Date()
  let year = timeStr.getFullYear()
  let mounth = timeStr.getMonth() + 1
  let day = timeStr.getDate()
  let hour = timeStr.getHours()
  let minu = timeStr.getMinutes()
  let secon = timeStr.getSeconds()
  if (mounth < 10) {
    mounth = '0' + mounth
  }
  if (day < 10) {
    day = '0' + day
  }
  if (hour < 10) {
    hour = '0' + hour
  }
  if (minu < 10) {
    minu = '0' + minu
  }
  if (secon < 10) {
    secon = '0' + secon
  }
  this.time = `${year}/${mounth}/${day} ${hour}:${minu}:${secon}`
}
```

## webpack

### webpack 的打包原理、流程

Webpack 是一个静态模块打包工具，可以使用它管理项目中的模块依赖，并编译输出模块所需的静态文件；它可以很好地管理、打包开发中所用到的 HTML,CSS,JavaScript 和静态文件（图片，字体）等，让开发更高效；对于不同类型的依赖，Webpack 有对应的模块加载器，而且会分析模块间的依赖关系，最后合并生成优化的静态资源。

<img src="https://pic4.zhimg.com/80/v2-fc53c2795e3acee053090d439bfd196f_1440w.webp" />

1. 读取命令行传入的参数
   从 `package.json` 配置文件和 `shell` 命令中读取与合并参数
2. 解析 webpack.config.js 配置文件
   根据上一步得到的参数初始化 `Compiler` 对象，加载所有配置的 `Plugin` ，执行对象的 `run` 方法开始执行编译。
3. 读取入口文件
   根据配置中的 `entry` 找出所有的入口文件
4. 调用 loader 进行编译
   从入口文件触发，调用所有配置的 `Loader` 对模块进行翻译，再找出该模块依赖的模块，然后递归本步骤直到所有入口依赖的文件都进行翻译。使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系。
5. 输出打包结果
   根据依赖关系图，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转化成一个单独的文件加入到输出列表，根据配置确定输出的路径和文件名，输出。

### webpack 区分不同的开发环境

### webpack 的基本配置，每个配置作用

```js
var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');
var pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');

module.exports = {
  // 入口文件，是模块构建的起点，同时每一个入口文件对应最后生成的一个 chunk。
  entry: './path/to/my/entry/file.js'，
  // 文件路径指向(可加快打包过程)。
  resolve: {
    alias: {
      '@': resolve('src'),
      'react': pathToReact
    }
  },
  // 生成文件，是模块构建的终点，包括输出文件与输出路径。
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js'
  },
  // 这里配置了处理各模块的 loader ，包括 css 预处理 loader ，es6 编译 loader，图片处理 loader。
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('mock'),
          resolve('node_modules/webpack-dev-server/client')
        ],
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: 'url-loader',
        exclude: [resolve('src/icons')],
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
    ],
    noParse: [pathToReact]
  },
  // webpack 各插件对象，在 webpack 的事件流中执行对应的方法。
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
```

### Loader - Plugin 的区别

#### loader

`Loader` 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。因为 `Webpack` 只认识 `JavaScript`，所以 `Loader` 就成了翻译官，对其他类型的资源进行转译的预处理工作。
默认情况下，在遇到 `import` 或者 `load` 加载模块的时候，`webpack` 只支持对 `js` 文件打包。像`css`、`sass`、`png`等这些类型的文件的时候，`webpack`则无能为力，这时候就需要配置对应的 `loader` 进行文件内容的解析。

##### **配置**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
};
```

##### **特性**

从上述代码可以看到，在处理 css 模块的时候，use 属性中配置了三个 loader 分别处理 css 文件。因为 loader 支持链式调用，链中的每个 loader 会处理之前已处理过的资源，最终变为 js 代码。顺序为相反的顺序执行，即上述执行方式为 sass-loader、css-loader、style-loader。

除此之外，loader 的特性还有如下： - Loader 可以是同步的，也可以是异步的 - Loader 运行在 Node.js 中，并且能够执行任何操作 - 除了常见的通过 package.json 的 main 来将一个 npm 模块导出为 loader，还可以在 module.rules 中使用 loader 字段直接引用一个模块 - 插件(plugin)可以为 loader 带来更多特性 - Loader 能够产生额外的任意文件

可以通过 loader 的预处理函数，为 JavaScript 生态系统提供更多能力。用户现在可以更加灵活地引入细粒度逻辑，例如：压缩、打包、语言翻译和更多其他特性。

##### **常用 Loader**

在页面开发过程中，除了需要导入一些场景 js 文件外，还需要配置响应的 loader 进行加载。WebPack 常见的 Loader 如下：

- `style-loader`：将 css 添加到 DOM 的内联样式标签 style 里，然后通过 dom 操作去加载 css。
- `css-loader`:允许将 css 文件通过 require 的方式引入，并返回 css 代码。
- `less-loader`: 处理 less，将 less 代码转换成 css。
- `sass-loader`: 处理 sass，将 scss/sass 代码转换成 css。
- `postcss-loader`：用 postcss 来处理 css。
- `autoprefixer-loader`: 处理 css3 属性前缀，已被弃用，建议直接使用 postcss。
- `file-loader`: 分发文件到 output 目录并返回相对路径。
- `url-loader`: 和 file-loader 类似，但是当文件小于设定的 limit 时可以返回一个 Data Url。
- `html-minify-loader`: 压缩 HTML
- `babel-loader` :用 babel 来转换 ES6 文件到 ES。
- `awesome-typescript-loader`：将 TypeScript 转换成 JavaScript，性能优于 ts-loader。
- `eslint-loader`：通过 ESLint 检查 JavaScript 代码。
- `tslint-loader`：通过 TSLint 检查 TypeScript 代码。
- `cache-loader`: 可以在一些性能开销较大的 Loader 之前添加，目的是将结果缓存到磁盘里

下面以`css-loader`为例子，来说明 Loader 的使用过程。首先，我们在项目中安装`css-loader`插件。

```js
npm install --save-dev css-loader
```

然后将规则配置到`module.rules`中，比如：

```js
rules: [
  ...,
 {
  test: /\.css$/,
    use: {
      loader: "css-loader",
      options: {
     // 启用/禁用 url() 处理
     url: true,
     // 启用/禁用 @import 处理
     import: true,
        // 启用/禁用 Sourcemap
        sourceMap: false
      }
    }
 }
]
```

#### Plugin

`Plugin`就是插件，基于事件流框架`Tapable`，插件可以扩展 `Webpack` 的功能，在 `Webpack` 运行的生命周期中会广播出许多事件，`Plugin` 可以监听这些事件，在合适的时机通过 `Webpack` 提供的 `API` 改变输出结果。

`Webpack`中的`Plugin`也是如此，`Plugin`赋予其各种灵活的功能，例如打包优化、资源管理、环境变量注入等，它们会运行在 `Webpack` 的不同阶段（钩子 / 生命周期），贯穿了`Webpack`整个编译周期。

<img src="https://pic1.zhimg.com/80/v2-259ab753c744667e125e59d7050ac104_1440w.webp" />

##### 配置

```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 访问内置的插件
module.exports = {
  ...
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};
```

##### 常见的 Plugin

Weebpack 中，常见的 plugin 有如下一些：

- `define-plugin`：定义环境变量 (Webpack4 之后指定 mode 会自动配置)
- `ignore-plugin`：忽略部分文件
- `html-webpack-plugin`：简化 HTML 文件创建 (依赖于 html-loader)
- `web-webpack-plugin`：可方便地为单页应用输出 HTML，比 html-webpack-plugin 好用
- `uglifyjs-webpack-plugin`：不支持 ES6 压缩 (Webpack4 以前)
- `terser-webpack-plugin`: 支持压缩 ES6 (Webpack4)
- `webpack-parallel-uglify-plugin`: 多进程执行代码压缩，提升构建速度
- `mini-css-extract-plugin`: 分离样式文件，CSS 提取为独立文件，支持按需加载 (替代 extract-text-webpack-plugin)
- `serviceworker-webpack-plugin`：为网页应用增加离线缓存功能
- `clean-webpack-plugin`: 目录清理 - ModuleConcatenationPlugin: 开启 Scope Hoisting
- `speed-measure-webpack-plugin`: 可以看到每个 Loader 和 Plugin 执行耗时 (整个打包耗时、每个 Plugin 和 Loader 耗时)
- `webpack-bundle-analyzer`: 可视化 Webpack 输出文件的体积 (业务组件、依赖第三方模块)

下面通过 clean-webpack-plugin 来看一下插件的使用方法。首先，需要安装 clean-webpack-plugin 插件。

```js
npm install --save-dev clean-webpack-plugin
```

然后，引入插件即可使用。

```js
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
module.exports = {
 ...
  plugins: [
    ...,
    new CleanWebpackPlugin(),
    ...
  ]
}
```

#### 区别

Loader 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。因为 Webpack 只认识 JavaScript，所以 Loader 就成了翻译官，对其他类型的资源进行转译的预处理工作。

Plugin 就是插件，基于事件流框架 Tapable，插件可以扩展 Webpack 的功能，在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

- Loader 运行在打包文件之前，Loader 在 module.rules 中配置，作为模块的解析规则，类型为数组。每一项都是一个 Object，内部包含了 test(类型文件)、loader、options (参数)等属性。
- Plugins 在整个编译周期都起作用，Plugin 在 plugins 中单独配置，类型为数组，每一项是一个 Plugin 的实例，参数都通过构造函数传入。

### webpack 性能优化

作为一个项目的打包构建工具，在完成项目开发后经常需要利用 Webpack 对前端项目进行性能优化，常见的优化手段有如下几个方面：

- JS 代码压缩
- CSS 代码压缩
- Html 文件代码压缩
- 文件大小压缩
- 图片压缩
- Tree Shaking
- 代码分离
- 内联 chunk

#### JS 代码压缩

`terser` 是一个 `JavaScript` 的解释、绞肉机、压缩机的工具集，可以帮助我们压缩、丑化我们的代码，让 `bundle` `更小。在production` 模式下，webpack 默认就是使用 `TerserPlugin` 来处理我们的代码的。如果想要自定义配置它，配置方法如下。

```js
const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
    ...
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true              // 电脑cpu核数-1
            })
        ]
    }
}
```

TerserPlugin 常用的属性如下：

- extractComments：默认值为 true，表示会将注释抽取到一个单独的文件中，开发阶段，我们可设置为 false ，不保留注释
- parallel：使用多进程并发运行提高构建的速度，默认值是 true，并发运行的默认数量： os.cpus().length - 1
- terserOptions：设置我们的 terser 相关的配置：
  compress：设置压缩相关的选项，
  mangle：设置丑化相关的选项，可以直接设置为 true
  mangle：设置丑化相关的选项，可以直接设置为 true
  toplevel：底层变量是否进行转换
  keep_classnames：保留类的名称
  keep_fnames：保留函数的名称

#### CSS 代码压缩

CSS 压缩通常用于去除无用的空格等，不过因为很难去修改选择器、属性的名称、值等，所以我们可以使用另外一个插件：`css-minimizer-webpack-plugin`。配置如下：

```js
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = {
  // ...
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
  },
};
```

#### Html 文件代码压缩

使用`HtmlWebpackPlugin`插件来生成 HTML 的模板时候，可以通过配置属性`minify`进行`html`优化，配置如下。

```js
module.exports = {
    ...
    plugin:[
        new HtmlwebpackPlugin({
            ...
            minify:{
                minifyCSS:false, // 是否压缩css
                collapseWhitespace:false, // 是否折叠空格
                removeComments:true // 是否移除注释
            }
        })
    ]
}
```

#### 文件大小压缩

对文件的大小进行压缩，可以有效减少 http 传输过程中宽带的损耗，文件压缩需要用到 `compression-webpack-plugin`插件，配置如下。

```js
new ComepressionPlugin({
  test: /\.(css|js)$/, // 哪些文件需要压缩
  threshold: 500, // 设置文件多大开始压缩
  minRatio: 0.7, // 至少压缩的比例
  algorithm: "gzip", // 采用的压缩算法
});
```

#### 图片压缩

如果我们对 bundle 包进行分析，会发现图片等多媒体文件的大小是远远要比 `js`、`css` 文件要大的，所以图片压缩在打包方面也是很重要的。配置可以参考如下的方式：

```js
module: {
  rules: [
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            name: "[name]_[hash].[ext]",
            outputPath: "images/",
          },
        },
        {
          loader: "image-webpack-loader",
          options: {
            // 压缩 jpeg 的配置
            mozjpeg: {
              progressive: true,
              quality: 65,
            },
            // 使用 imagemin**-optipng 压缩 png，enable: false 为关闭
            optipng: {
              enabled: false,
            },
            // 使用 imagemin-pngquant 压缩 png
            pngquant: {
              quality: "65-90",
              speed: 4,
            },
            // 压缩 gif 的配置
            gifsicle: {
              interlaced: false,
            },
            // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
            webp: {
              quality: 75,
            },
          },
        },
      ],
    },
  ];
}
```

#### Tree Shaking

Tree Shaking
Tree Shaking 是一个术语，在计算机中表示消除死代码，依赖于 ES Module 的静态语法分析。在 webpack 实现 Trss shaking 有两种不同的方案： - usedExports：通过标记某些函数是否被使用，之后通过 Terser 来进行优化的 - sideEffects：跳过整个模块/文件，直接查看该文件是否有副作用

usedExports 的配置方法很简单，只需要将 usedExports 设为 true 即可，如下。

```js
module.exports = {
    ...
    optimization:{
        usedExports
    }
}
```

而 sideEffects 则用于告知 webpack compiler 在编译时哪些模块有副作用，配置方法是在 package.json 中设置 sideEffects 属性。如果 sideEffects 设置为 false，就是告知 webpack 可以安全的删除未用到的 exports，如果有些文件需要保留，可以设置为数组的形式。

```js
"sideEffecis":[    "./src/util/format.js",    "*.css" // 所有的css文件]
```

#### 代码分离

默认情况下，所有的 JavaScript 代码（业务代码、第三方依赖、暂时没有用到的模块）在首页全部都加载，就会影响首页的加载速度。如果可以分出出更小的 bundle，以及控制资源加载优先级，从而优化加载性能。

代码分离可以通过 splitChunksPlugin 来实现，该插件 webpack 已经默认安装和集成，只需要配置即可。

```js
module.exports = {
 ...
    optimization:{
        splitChunks:{
             chunks:"all"
                }
        }}
```

splitChunks 有如下几个属性：

- Chunks：对同步代码还是异步代码进行处理
- minSize： 拆分包的大小, 至少为 minSize，如何包的大小不超过 minSize，这个包不会拆分
- maxSize： 将大于 maxSize 的包，拆分为不小于 minSize 的包 - minChunks：被引入的次数，默认是 1

#### 内联 chunk

可以通过 InlineChunkHtmlPlugin 插件将一些 chunk 的模块内联到 html，如 runtime 的代码（对模块进行解析、加载、模块信息相关的代码），代码量并不大但是必须加载的，比如：

```js
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
     module.exports = {
           ...    plugin:[
              new InlineChunkHtmlPlugin(HtmlWebpackPlugin,[/runtime.+\.js/]}
```

> 总结一下，Webpack 对前端性能的优化，主要是通过文件体积大小入手，主要的措施有分包、减少 Http 请求次数等。

### webpack 构建优化

随着功能和业务代码越来越多，相应的 Webpack 的构建时间也会越来越久，构建的效率也会越来越低，那如何提升 Webpack 构建速度，是前端工程化的重要一环。常用的手段有如下一些：

- 优化 loader 配置
- 合理使用 resolve.extensions
- 优化 resolve.modules
- 优化 resolve.alias
- 使用 cache-loader - terser 启动多线程
- 合理使用 sourceMap

#### 优化 loader 配置

在使用 Loader 时，可以通过配置`include`、`exclude`、`test`属性来匹配文件，通过`include`、`exclude`来规定匹配应用的 loader。例如，下面是 ES6 项目中配置 babel-loader 的例子：

```js
module.exports = {
  module: {
    rules: [
      {
        // 如果项目源码中只有 js 文件就不要写成 /\.jsx?$/，提升正则表达式性能
        test: /\.js$/,
        // babel-loader 支持缓存转换出的结果，通过 cacheDirectory 选项开启
        use: ["babel-loader?cacheDirectory"],
        // 只对项目根目录下的 src 目录中的文件采用 babel-loader
        include: path.resolve(__dirname, "src"),
      },
    ],
  },
};
```

#### 合理 resolve.extensions

在开发中，我们会有各种各样的模块依赖，这些模块可能来自第三方库，也可能是自己编写的， resolve 可以帮助 Webpack 从每个 require/import 语句中，找到需要引入到合适的模块代码。

具体来说，通过 resolve.extensions 是解析到文件时自动添加拓展名，默认情况如下：

```js
module.exports = {
    ...
    extensions:[".warm",".mjs",".js",".json"]
}
```

当我们引入文件的时候，若没有文件后缀名，则会根据数组内的值依次查找。所以，处理配置的时候，不要随便把所有后缀都写在里面。

#### 优化 resolve.modules

resolve.modules 用于配置 webpack 去哪些目录下寻找第三方模块，默认值为['node_modules']。所以，在项目构建时，可以通过指明存放第三方模块的绝对路径来减少寻找的时间。

```js
module.exports = {
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")], // __dirname 表示当前工作目录
  },
};
```

#### 优化 resolve.alias

alias 给一些常用的路径起一个别名，特别当我们的项目目录结构比较深的时候，一个文件的路径可能是./../../的形式，通过配置 alias 以减少查找过程。

```js
module.exports = {
    ...
    resolve:{
        alias:{
            "@":path.resolve(__dirname,'./src')
        }
    }
}
```

#### 优化 resolve.mainFields

在一些性能开销较大的 loader 之前添加 cache-loader，以将结果缓存到磁盘里，显著提升二次构建速度。比如：

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.ext$/,
        use: ["cache-loader", ...loaders],
        include: path.resolve("src"),
      },
    ],
  },
};
```

需要说明的是，保存和读取这些缓存文件会有一些时间开销，所以请只对性能开销较大的 loader 使用此 loader。

#### 开启多线程

开启多进程并行运行可以提高构建速度，配置如下：

```js
module.exports = {
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true, //开启多线程
      }),
    ],
  },
};
```

#### 合理使用 sourceMap

sourceMap 用于定位错误位置，但会降低构建速度。

```js
module.exports = {
  devtool: "source-map",
};
```

### Webpack Proxy 工作原理

**代理**
在项目开发中不可避免会遇到跨越问题，Webpack 中的 Proxy 就是解决前端跨域的方法之一。所谓代理，指的是在接收客户端发送的请求后转发给其他服务器的行为，webpack 中提供服务器的工具为 webpack-dev-server。

> 服务器与服务器之间请求数据并不会存在跨域行为，跨域行为是浏览器安全策略限制

**webpack-dev-server**
webpack-dev-server 是 webpack 官方推出的一款开发工具，将自动编译和自动刷新浏览器等一系列对开发友好的功能全部集成在了一起。同时，为了提高开发者日常的开发效率，只适用在开发阶段。在 webpack 配置对象属性中配置代理的代码如下：
```js
// ./webpack.config.js
const path = require('path')

module.exports = {
  // ...
  devServer: {
  contentBase: path.join(\_\_dirname, 'dist'),
  compress: true,
  port: 9000,
  proxy: {
    '/api': {
            `target: 'https://api.github.com'
    }
  }
}
```
其中，devServetr 里面 proxy 则是关于代理的配置，该属性为对象的形式，对象中每一个属性就是一个代理的规则匹配。

属性的名称是需要被代理的请求路径前缀，一般为了辨别都会设置前缀为 /api，值为对应的代理匹配规则，对应如下：

- target：表示的是代理到的目标地址。
- pathRewrite：默认情况下，我们的 /api-hy 也会被写入到 URL 中，如果希望删除，可以使用 pathRewrite。
- secure：默认情况下不接收转发到 https 的服务器上，如果希望支持，可以设置为 false。
- changeOrigin：它表示是否更新代理后请求的 headers 中 host 地址。

**实现概述**
在开发阶段， webpack-dev-server 会启动一个本地开发服务器，所以我们的应用在开发阶段是独立运行在 localhost 的一个端口上，而后端服务又是运行在另外一个地址上。所以在开发阶段中，由于浏览器同源策略的原因，当本地访问后端就会出现跨域请求的问题。

解决这种问题时，只需要设置 webpack proxy 代理即可。当本地发送请求的时候，代理服务器响（proxy 工作原理实质上是利用 http-proxy-middleware 这个 http 代理中间件，实现请求转发给其他服务器）应该请求，并将请求转发到目标服务器，目标服务器响应数据后再将数据返回给代理服务器，最终再由代理服务器将数据响应给本地。
