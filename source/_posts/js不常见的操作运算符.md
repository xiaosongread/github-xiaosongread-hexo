---
title: js不常见的操作运算符
categories: js-end
date: 2021-07-12 11:43:25
---
### js整数的操作
使用|0和~~可以将浮点转成整型且效率方面要比同类的parseInt,Math.round 要快,在处理像素及动画位移等效果的时候会很有用。性能比较见此。
<!-- more -->
```javascript
var a = 12.3
var b = 4.2
console.log(~~(a / b)) // 2
var bar = ~~(12.4 / 4.13)
console.log(bar) // 3
var foo = (12.4 / 4.13) | 0;//结果为3
```
还有一个小技巧，就是！！2个叹号，可以将一个值，快速转化为布尔值。
```javascript
var eee="eee";
alert(!!eee)
```
### 逗号运算符
逗号运算符，它将先计算左边的参数，再计算右边的参数值。然后返回最右边参数的值。
```javascript
let x = 1
console.log((x++,x)) // 2
console.log((3,x)) // 2
console.log((3,4)) // 4
```
```javascript
var a = 10, b = 20;

function CommaTest(){
    return a++, b++, 10;
}

var c = CommaTest();

console.log(a); // 返回11
console.log(b); // 返回21
console.log(c); // 返回10
```
### javaScript空值合并操作符（??）
只有当左侧为null和undefined时，才会返回右侧的数 空值合并操作符（??）是一个逻辑操作符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。
```javaScript
let str = null||undefined
let result = str??'xiaosongread'
console.log(result)//xiaosongread

const nullValue = null;
const emptyText = ""; // 空字符串，是一个假值，Boolean("") === false
const someNumber = 42;

const valA = nullValue ?? "xiaosongread1";
console.log(valA); // "xiaosongread1"

const valB = emptyText ?? "xiaosongread2";
console.log(valB); // ""（空字符串虽然是假值，但不是 null 或者 undefined）

const valC = someNumber ?? 0;
console.log(valC); // 42
```

### javaScript可选链操作符( ?. )
可选链操作符( ?. )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。?. 操作符的功能类似于 . 链式操作符，不同之处在于，在引用为空(nullish ) (null 或者 undefined) 的情况下不会引起错误，该表达式短路返回值

使用可选链操作符( ?. )浏览器不会出现报错！
```javaScript
const demo = {
    name: 'xiaosongread',
    cat: {
        name: 'xiaosongread cat'
    }
};
console.log(demo.dog.name); 
//  Uncaught TypeError: Cannot read property 'name' of undefined
console.log(demo.dog.what()); 
// Uncaught TypeError: Cannot read property 'what' of undefined

console.log(demo.dog?.name); 
// undefined
console.log(demo.what?.());
// undefined
```

```javaScript
var obj = [{
  type: 'Number',
  number: 1
},{
  type: 'Number',
  number: 10
},{
  tag: 'String',
  number: 2
},{
  type: 'Number',
}]
let x = 0
obj.forEach(item=>{
  if(item?.type === 'Number'&&item?.number) {
    x = x + item?.number
  }
})
console.log(x) // 11
```

