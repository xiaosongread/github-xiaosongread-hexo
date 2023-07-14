---
title: '红皮书第三章-数据类型'
categories: js-end
date: 2020-07-12 14:50:41
tag: js
---
任何语言的核心都必然会描述这门语言最基础的工作原理。而描述内容通常都要涉及这门语言的语法、操作符、数据类型、内置功能等用于构建复杂解决方案的基本概念。

<!-- more -->

### 语法
#### 区分大小写
ECMAScript中的一切（变量、函数名、操作符）都区分大小写
```js
var test, 
    Test;
test=1;
Test=2;
console.log(test,Test) // 1 2
// 上述两个是不同的两个变量
```
#### 标识符
所谓标识符，就是指变量、函数、属性的名子，或者是函数的参数。
+ 第一个字符必须是一个字母、下划线(_)或一个美元的符号($)
+ 其他字符可以是字母、下划线、美元符或者是数字

按照惯例，ECMAScript标识符采用驼峰大小写格式，也就是第一个字母小写，剩下的每个单词的首字母大写。
例如：
firstName
myCarColor

> 不要把关键字、保留字、true、false、null当成标识符。

```
// 关键字
// 保留字
```

#### 注释

```js
// var a  //单行注释

/*
多行注释
var a = 123;
var b = 456;
console.log(a + b);
*/
```

#### 语句
ECMASript中的语句以一个分号结尾，如果省略;号，则有解析器确定语句的结尾。

> 在公司开发这么久，发现很多开发者每行语句后面都会省略;号，其实这样是错误的，这样解析器会花费额外多的时间推测应该在哪里插入分号，其实也是会影响程序性能的，有的同学会说了，我在打包的时候打包程序会自动加上，但是这样也会增加打包的时间的。

还有一种：

```js
if (test)
  alert(test) // 有效但容易出错，不要去使用
if (test) {
  alert(test) // 就用这种方式
}
```

> **不要写看起来很高大上的代码，通俗易懂，好维护才是好的代码！**
平常的开发工作中，判断语句如果只有一句的时候，开发者同学经常就把{}省略了，其实这种习惯是非常不好的，这样既不美观也不直观，还非常容易出错。
本人在开发中，vue项目本地运行的非常好，但是打包上线就是出错，花了好长时间发现，就是判断语句省略{}，结果自动化工具打包的时候，{}号给我加错了位置导致。

### 变量
ECMASript中的变量是松散型的，所谓的松散型就是可以用来保存任何类型的数据。
在函数中使用var定义了一个变量，那么在函数执行之后这里面的变量也就随之销毁了，这就是局部变量。
函数中定义全局变量，不推荐，因为这样会使的全局变量非常的混乱，不易管理并且排查问题。

```js
var a = '我是字符窜'
a = 123
// 变量可以保存任何类型的数据
function test() {
  var a = "hi";
  b = 1; // 不建议这样定义，会使得全局变量难管理，程序出现问题很难排查问题。
}
test();
console.log(a); // 错误，函数执行之后，局部变量a已经销毁
```

```js
var a = "hi",
    b = "my",
    c = "you"
```
以上方式可以同时定义多个变量

### 数据类型
ECMASript中有5中简单数据类型(基本数据类型)：Undefind、Null、Boolean、Number、String,一种复杂数据类型Object。

#### typeof操作符
检测给定变量的数据类型。

```js
var a,
    b = 123,
    c = "asdd",
    d = function(){},
    e = null,
    f = 1 === 1
console.log(
  typeof a, // undefined
  typeof b, // number
  typeof c, // string
  typeof d, // function
  typeof e, // object
  typeof f  // boolean
)
```
#### undefined 类型
undefined只有一个值，就是声明了一个变量，但是没有初始化。
#### Null 类型
null也是只有一个值，这个特殊值就是null，但是typeof检测时候是object。

```js
var a,b=null;
console.log(a==b,a===b) // true false
```

> null值标示的就是一个空对象的指针。

#### Boolean
Boolean字面值只有两个：true、false。

```js
var message = "hi";
Boolean(message) // true
```
转化布尔值规则表：

|  数据类型     | 转化为true的值 |  转化为false的值-  |
|  ----  | ----  | ----  |
| Boolean | true | false |
|String|任何非空的字符窜|""|
|Number|非0的数字（包括无限大）|0和NaN|
|Object|任何对象|null|
|Undefind|不支持转化|undefind|

```js
var message = "hi";
if (message) {
  console.log("true")
} else {
  console.log("false")
}
```

#### Number 类型
##### 浮点数值
由于保存浮点数值需要的空间是整数的2倍，所以ECMAScript会不失时机的将浮点数转化为整数

```js
var a = 1.0,
    b = 1.;
console.log(a, b) // 1 1
```

对于极大或者极小的数字，我们可以用E或者e来表示（科学计数法），用e表示的数值等于e前面的数值乘以10的指数次幂。

```js
var floatNum = 3.125e4;
var floatNum1 = 0.0000003 = 3e-7;
console.log(floatNum); // 31250 =>3.125 * 10的4次幂。
```
##### 数值范围
由于内存的限制，ECMAScript保存的数值范围在Number.MAX_VALUE(1.797693148623157e+308)至最小值Number.MIN_VALUE(5e-324)。超出就显示Infinity或者-Infinity。
##### NAN
NAN，not a number的缩写，是一个特殊的数值，用于返回本来要返回数值，但是没有返回数值的情况。
例如：任何数除以0，本来是报错的，但是返回NAN，不会影响程序的运行。

特点：
+ 任何设计NaN的操作（NaN/0）会返回NaN，这个特点在多步计算中可能会出错
+ NaN与任何值都不相等，包括自身 
```js
NaN===NaN // false
```

isNaN(),接受一个任何类型的参数，用于判断参数是否可以转化为数值。

```js
isNaN(NaN) // true
isNaN(10) // false,10是一个数值
isNaN('10') // false,可以被转化为数值10
isNaN("blue") // true,不能转化为数值
isNaN(true) // false,可以转化为数值1
```

##### 数值转化
Number(),可以转化任何类型，parseInt()/parseFloat(),专门用来转化字符窜成数值类型。

Number()转化规则：
+ 如果是数值，那就是简单的传入和传出
+ 如果是布尔值，true和false，分别转化为1和0
+ 如果是null，转化为0
+ 如果是undefind,转化为NaN
+ 如果是字符窜:
1. 如果只包含数字，那就直接按十进制转化，0开头直接忽略(010->10),浮点数同理
2. 包含有效16进制，如"0xf",转化为相同大小的10进制
3. 空字符窜转化为0
4. 包含上述格式之外的，转化为NaN
+ 如果是对象，则调用对象的valueOf(),在按照前面的方式转化，如果结果是NAN,在调用对象的toString(),在按照上述方式转化

```js
var num1 = Number('hi') // NaN
var num2 = Number('') // 0
var num3 = Number('000011') // 11
var num4 = Number(true) // 1
```

#### String 类型
用""或者''来表示，用toString(),来将其他类型转化为字符窜。

#### Object 类型
对象其实就是一组数据和功能的集合。刻意通过new操作符来创建对象。

```js
var o = new Object();
// 或者不传递参数的时候
var o = new Object; // 有效但不推荐
```

object类型的所有属性和方法也同样存在于更具体的对象中。
+ constructor: 保存着用于创建当前对象的函数，对于前面的例子，构造函数(constructor)就是Object()
+ hasOwnProperty(propertyName): 用于检查给定的属性在当前对象实例中是否存在。
+ isPrototypeOf(object): 用于检查传入的对象是否是传入对象的原型。
+ propertyIsEnumerable(propertyName): 用于检查给定的属性是否能够使用for-in语句来枚举。
+ toLocaleString(): 返回对象的字符窜表示，该字符窜与执行环境的地区对应。
+ toString(): 返回对象的字符串表示。
+ valueOf(): 返回对象的字符串、数值、布尔值表示。通常与toString()方法的返回值相同。

<!-- ### 操作符
#### 一元操作符
#### 位操作符
#### 布尔操作符
#### 乘性操作符
#### 加性操作符
#### 关系操作符
#### 相等操作符
#### 条件操作符
#### 赋值操作符
#### 逗号操作符 -->

### 语句
#### if语句
if (conditioin) {
  statement1
} else if (conditioin1) {
  statement2
} else {
  statement3
}
conditioin(条件)不一定返回true，程序会自动调用Boolean来转化为true或者false
```js
if(i > 12) 
  console.log('执行此处1'); // 不推荐
else {
  console.log('执行此处2'); // 推荐用代码块
}

//或者

if (i > 12) console.log('执行此处1') else console.log('执行此处2'); // 不推荐
```
#### do-while语句
属于后测试循环语句。在循环体中的代码先执行一次，才会测试出口的条件。简单来说就是，如果循环需要先执行一次在判断条件的话，就会使用。
```js
var i = 0;
do {
  i += 2;
  console.log(i); // 2 4 6 8 10
} while (i < 10);
console.log(i);
```
#### while语句
属于前测试循环语句。在循环之前，要先判断条件，所以循环体里面的内容有可能永远不会执行。
```js
var i = 0;
while(i < 10) {
  i += 2;
  console.log(i); // 2 4 6 8 10
}
console.log(i) // 10
```
#### for语句
for (initialization(初始化表达式),expression(控制表达式),post-loop-expression(循环后表达式)) statement

```js
var count = 10;
for(var i = 0; i < count; i++){
  console.log(i) // 0 1 2 3 4 5 6 7 8 9 
}
// 等价于
var count = 10;
var i = 0;
for(; i < count; ) {
  console.log(i);
  i++;
}
// 等价于
var count = 10;
var i = 0;
while(i < count) {
  console.log(i);
  i++;
}
```
> 使用while循环做不到的，for循环也做不到

#### for-in语句
是一种精确迭代语句，可以用来枚举对象的属性。
```js
for(var propName in window) {
  document.write(propName + '</br>')
}
var obj = {
  name: 'xiaosong',
  age: 32,
  sex: 'man',
  look: function(){}
}
for(var attr in obj){
  console.log(attr) // name age sex look
}
```
#### label语句
使用label语句可以在代码中添加标签，以便将来使用。
label: statement
```js
start: for(var i = 0; i< 10; i++){
  console.log(i)
}
```
> 加标签的语句一般都要与for语句等循环语句来配合使用。

#### break和continue语句
break: 立即退出循环，强制继续执行循环后面的语句。
continue: 虽然也是立即退出循环，但退出循环后会从循环的顶部继续执行。

```js
var num = 0;
for(var i=1; i<10; i++) {
  if(i % 5 == 0) {
    break; // 当i=5的时候，就退出循环了
  }
  num++; // 所以这步执行了 i=1,2,3,4  总共 +1 了4次
}
console.log(num); // 4
```

```js
var num = 0;
for(var i=1; i<10; i++) {
  if(i % 5 == 0) {
    continue; // 当i=5的时候，就退出当前循环了，然后继续循环
  }
  num++; // 所以这步执行了 i=1,2,3,4,6,7,8,9  总共 +1 了8次
}
console.log(num); // 8
```
break和continue可以联合label指定退出到代码的指定处。
```js
var num = 0;
outermost:
for(var i=0; i < 10; i++){ // 执行了5次
  for(var j=0; j < 10; j++){ 
    if(i === 5 && j === 5){ // i=== 5的时候，这里已经执行了50次，然后又执行了5次，j===5的时候完全退出，总共执行了5*10 + 5 = 55次
      break outermost;
    }
    num++;
  }
}
console.log(num); // 55
```
```js
var num = 0;
outermost:
for(var i=0; i < 10; i++){ // 执行了9次
  for(var j=0; j < 10; j++){ 
    if(i === 5 && j === 5){ // i=== 5&&j===5的时候，这里已经执行了55次，然后又执行了4*10次，总共执行了(5*10 + 5) + 4 *10 = 95次
      continue outermost;
    }
    num++;
  }
}
console.log(num); // 95
```
#### with语句
with语句的作用是将代码的作用域设置到一个特定的对象上。
目的是简化多次编写同一对象的工作。

```js
var qa = location.search.substring(1);
var hostName = location.hostname;
var url = location.href;
// 可以简化成
with(location) {
  var qa = search.substring(1);
  var hostName = hostname;
  var url = href;
}
```
> 由于大量使用with语句，会导致性能下降，代码也不容易调试，所以大型程序开发，不建议使用with语句。

#### switch语句
```js
switch (i){
  case 25:
    /** 合并两种情形*/
  case 35:
    console.log('25 || 35');
    break;
  case 45:
    console.log(45);
    break;
  case 55:
    console.log(55);
    break;
  default:
    console.log('other');
}
```
### 函数
ECMAScript的函数使用function来声明的，后跟一组参数以及函数体。
```js
function sum(a, b) {
  return a + b;
  console.log('打印'); // 这句话永远不会执行！
}
```
#### 理解参数
```js
function doSomthing(a, b) {
  console.log(arguments.length)
  return a + arguments[1];
}
doSomthing(1) // 1 NaN
doSomthing(1, 2) // 2 3
doSomthing(1, 2, 3) // 3 3
```


