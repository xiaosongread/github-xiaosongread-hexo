---
title: 红皮书第五章-引用类型
categories: jc-end
date: 2020-08-03 17:31:01
---

**本章内容**
口 使用对象
口 创建并操作数组
口 理解基本的JavaScript类型
口 使用基本类型和基本包装类型

<!-- more -->

[红皮书第三章-数据类型](http://shuy.cc/2020/07/12/typeOf/)
[红皮书第四章-变量、作用域和内存问题](http://shuy.cc/2020/08/13/instance/)
[红皮书第五章-引用类型](http://shuy.cc/2020/08/03/object)
[红皮书第六章-面向对象的设计程序](http://shuy.cc/2020/08/04/%E7%BA%A2%E7%9A%AE%E4%B9%A6%E7%AC%AC%E5%85%AD%E7%AB%A0-%E9%9D%A2%E5%90%91%E5%AF%B9%E8%B1%A1%E7%9A%84%E8%AE%BE%E8%AE%A1%E7%A8%8B%E5%BA%8F/)
[红皮书第七章-函数表达式](http://shuy.cc/2020/08/28/%E7%BA%A2%E7%9A%AE%E4%B9%A6%E7%AC%AC%E4%B8%83%E7%AB%A0-%E5%87%BD%E6%95%B0%E8%A1%A8%E8%BE%BE%E5%BC%8F/)
[红皮书第八章-BOM](http://shuy.cc/2020/09/03/%E7%BA%A2%E7%9A%AE%E4%B9%A6%E7%AC%AC%E5%85%AB%E7%AB%A0-BOM/)
[红皮书第十章-DOM](http://shuy.cc/2020/09/09/%E7%BA%A2%E7%9A%AE%E4%B9%A6%E7%AC%AC%E5%8D%81%E7%AB%A0-DOM/)

### object 类型
**创建对象**的两种方法：
1.new操作符后跟object构造函数
2.对象字面量法

```js
// new 构造函数
var person = new Object();
person.name = "song";
person.age = 21;
// 字面量
var person = {
    name: "song",
    age: 21
}
```
**访问**对象的两种方法
1.一般来说，访问对象的属性使用点表示法
2.方括号访问，优点是可以通过变量访问，另外如果属性名包含非法字符的时候，也可使用方括号访问。

```js
var person = {
    name: "song",
    age: 21,
    'last name': 'yaoyao'
}
var name = person.name;
var attr = 'age'
var age = person[attr];
var lastName = person['last name'];
```
### Array 类型
[红皮书第五章-引用类型-字符窜数组常用易混淆方法总结](http://www.shuy.cc/2020/07/02/object)  ( 6/24 )  
**创建数组**的两种方法
1. 使用Array构造函数
2. 数组字面量

```js
var arr1 = new Array();
var arr2 = Array(); // new 操作符可以省略掉
var arr3 = ["red", "blue", "blank"];
var arr4 = new Array(4); // 创建包含4调数据的数组
var arr5 = new Array("red", "blue", "blank"); // 创建数组 ["red", "blue", "blank"]
```

数组的length属性，不是只读，可以用这个属性从数组的末尾添加或者删除数据。

```js
var arr = ["red", "blue", "blank"];
arr[3] = "green"; // 新增数组项
console.log(arr);// ["red", "blue", "blank", "green"]
arr.length = 1;// 删除数组项
console.log(arr);// ["red"]
```
#### 检测数组
数组检测使用 instanceof

```js
if(value instanceof Array) {
    // doSmothing
}
```
##### Array.isArray()
确定某个值到底是不是数组。

```js
if(Array.isArray(value)){
    // doSmothing
}
```
#### 转换方法
##### toString()
返回由数组中每个值的字符窜拼接而成的一个以逗号分隔的字符窜。

```js
var arr = ['a', 1, 'b'];
var tostring = arr.toString()
console.log(tostring, typeof tostring) // a,1,b string
```
##### valueOf()
返回的还是数组。

```js
var arr = ['a', 1, 'b'];
var tovalueof = arr.valueOf()
console.log(tovalueof, typeof tovalueof) // ['a', 1, 'b'] 'object'
```
##### toLocaleString()

```js
var person1 = {
  toLocaleString: function(){
    return 'toLocaleString1'
  },
  toString: function(){
    return 'toString1'
  }
}
var person2 = {
  toLocaleString: function(){
    return 'toLocaleString2'
  },
  toString: function(){
    return 'toString2'
  }
}
var people = [person1, person2];
alert(people) // // toString1,toString2
console.log(people.toString()) // toString1,toString2
console.log(people.toLocaleString()) // toLocaleString1,toLocaleString2
```

##### join
数组转化为字符窜，参数为分隔符号。

```js
var arr = ['a', 1, 'b'];
var str = arr.join('-');
console.log(str); // a-1-b
```

#### 栈方法
##### push
可以接受任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。
##### pop
从数组末尾移除最后一项，减少数组的长度，返回移除数组的长度。

```js
var nums = [1,2,3,4];
nums.push(5,6,7);
console.log(nums); // [1, 2, 3, 4, 5, 6, 7]
nums.pop();
console.log(nums); // [1, 2, 3, 4, 5, 6]
```

#### 队列方法
##### unshift
在数组最前端添加任意项并返回数组的长度。
##### shift
移除数组中的第一项并返回该项，同时将数组的长度减1。

```js
var nums = [1,2,3,4];
nums.unshift(5,6,7);
console.log(nums); // [5, 6, 7, 1, 2, 3, 4]
nums.shift();
console.log(nums); // [6, 7, 1, 2, 3, 4]
```
#### 重排序方法
数组中已经存在两个可以直接用来重排序的方法：reverse()和sort()。
##### reverse()
用来反转数组，返回值是排序之后的数组。
```js
var arr = [1,2,3,4];
arr.reverse();
console.log(arr); // [4, 3, 2, 1]
```
##### sort()
用来对数组进行重排序，实现的原理是将数组中的每一项取其的toString()值，然后比较得到的字符串，已确定如何排序。
在默认情况下，按照升序排列数组项-及最小的值位于最前面，最大值排在最后面。
返回值是排序之后的数组。

```js
var arr = [0,1,5,10,15];
arr.sort();
console.log(arr); // [0, 1, 10, 15, 5]
```
上面的例子中，虽然数值5小于数值10，但是"10"位于"5"前面，所以如果需要排序，则需要用到 sort 的参数函数

```js
var arr = [0,1,5,10,15];
var arr1 = ["0","1","5","10",15];
function compare(value1, value2){
  if (value1 < value2) {
    return -1;
  } else if (value1 > value2) {
    return 1;
  } else {
    return 0;
  }
}
arr.sort(compare);
arr1.sort(compare);
console.log(arr, arr1); // [0, 1, 5, 10, 15] ['0', '1', '10', '5', 15]
```

> **比较函数**接受的参数，如果第一个参数应该位于第二个参数之 前 则返回一个 负数；
如果第一个参数应该位于第二个参数之 后 则返回 整数；
如果两个参数相等则返回 0；

以上代码：定义第一个参数value1位于第二个参数的前面，同时定义value1小于value2，那么最后排列的数组，肯定是小值在前，大值在后，那就是**升序**。

如果实现**降序**，看一下代码：

```js
var arr = [0,1,5,10,15];
function compare(value1, value2){
  if (value1 < value2) {
    return 1;
  } else if (value1 > value2) {
    return -1;
  } else {
    return 0;
  }
}
arr.sort(compare);
console.log(arr); // [15, 10, 5, 1, 0]
```

> 对于数值类型或者其 valueOf() 方法返回数值类型的对象类型，可以使用更简单的比较函数。这个函数只要用第二个值减第一个值即可（降序），或者第一个值减第二个值（升序）。
```js
var arr = [0,1,5,10,15];
var arr1 = ["0","1","5","10",15];
function compare(value1, value2){
  return value2 - value1
}
arr.sort(compare);
arr1.sort(compare);
console.log(arr, arr1); // [15, 10, 5, 1, 0] (5) [15, '10', '5', '1', '0']
```
#### 操作方法
##### concat()
合并数组的方法。
基于当前数组中的所有项创建一个数组。接受一个或多个数组，则该方法会将这些数组中的项每一项都添加到结果数组中。

```js
var colors = ['red', 'blue', 'green'];
var colors2 = colors.concat('yellow', ['black', 'brown']);
console.log(colors); // ['red', 'blue', 'green']
console.log(colors2); // ['red', 'blue', 'green', 'yellow', 'black', 'brown']
```

##### slice()
slice() 它能够基于当前数组中一或多个项创建一个新数组。
接受一个或者两个参数，即要返回项的起始和结束位置。
+ 在接受一个参数的时候，返回从该指定位置到数组结尾的所有项；
+ 在接受两个参数的时候，返回第一个参数到第二个参数之间的所有项。

```js
var colors = ['red', 'blue', 'green', 'yellow', 'black', 'brown'];
var colors1 = colors.slice(1);
var colors2 = colors.slice(1,4);
console.log(colors1, colors2); // ['blue', 'green', 'yellow', 'black', 'brown'] ['blue', 'green', 'yellow']
```

> 如果 slice() 方法的参数中有一个负数，则用数组的长度加上该数来确定相应的位置。

```js
var colors = ['red', 'blue', 'green', 'yellow', 'black', 'brown'];
var colors1 = colors.slice(-2, -1); // slice(-2, -1) => slice(4, 5)
console.log(colors1); // ['black']
```

##### splice()
这个方法算是数组中最强大的数组方法了，他有很多用法。
***返回值是删除掉的数组。***
splice() 的主要用途是向数组的中部插入项，但使用这种方法的方式则有如下3种。

+ 删除
可以删除任意数量的项，只需指定2个参数：要删除第一项的位置和要删除的项数。splice(0,2): 删除数组从第一项开始之后的两项。
+ 插入
可以向指定位置插入任意数量的项，只需提供3个参数：起始位置、0(要删除的项数)、要插入的项。splice(2,0,"red","green"),在数组的下标为2的位置开始，然后在插入两项("red","green")。
+ 替换
可以向指定位置插入任意数量的项，且同时删除指定数量的项。只需提供3个参数：起始位置、index(要删除的项数)、要插入的项。splice(2,1,"red","green"),在数组的下标为2的位置开始，删除1项，然后在插入两项("red","green")。

```js
// 删除
var colors = ['red', 'blue', 'green', 'yellow'];
var removeColors = colors.splice(0, 2); 
console.log(removeColors, colors); // ['red', 'blue'] ['green', 'yellow']
// 插入
var colors = ['red', 'blue', 'green', 'yellow'];
colors.splice(2, 0, "black", "brown");
console.log(colors); //  ['red', 'blue', 'black', 'brown', 'green', 'yellow']
// 替换
var colors = ['red', 'blue', 'green', 'yellow'];
colors.splice(2, 1, "blank")
console.log(colors); // ['red', 'blue', 'blank', 'yellow']
```

#### 位置方法
##### indexOf()、lastIndexOf()
接受两个参数：要查找的项和表示查找起点位置（可选）的索引。indexOf()从数组前面开始查找，lastIndexOf()相反。
***返回值：如果查找的值在数组中存在，那就返回这个值在数组中第一次查到的下标，不存在就会 -1***

```js
var numbers = [1,2,3,4,5,4];
console.log(numbers.indexOf(4)); // 3
console.log(numbers.indexOf(4, 4)); // 5

var person = {
  name: "song"
};

var people = [{
  name: "song"
}];

var morePeople = [person];

console.log(people.indexOf(person)); // -1
console.log(morePeople.indexOf(person)); // 0
```
people.indexOf(person)返回-1是因为虽然person和morePeople中的元素都有相同的属性和值，但它们是不同的对象，占用不同的内存空间。因此，people.indexOf(person)返回-1表示person对象在people数组中没有找到。

#### 迭代方法
##### every()
对数组的每一项运行给定的函数，如果该函数的每一项都返回true，则返回true。
##### some()
对数组的每一项运行给定的函数，如果该函数有一项返回true，则返回true。
##### filter()
对数组的每一项运行给定的函数，返回该函数运行true的项组成的数组。
##### map()
对数组的每一项运行给定的函数，返回每次函数调用的结果组成的数组。
##### forEach()
对数组的每一项运行给定的函数，没有返回值，单纯的循环操作。

```js
var numbers = [1,2,3,4,5,6];
var everyResult = numbers.every((item, index, array) => {
  return item > 0
})
console.log(everyResult); // true

var someResult = numbers.some((item, index, array) => {
  return item > 10
})
console.log(someResult); // false

var filterResult = numbers.filter((item, index, array) => {
  return item > 2
})
console.log(filterResult); // [3,4,5,6]

var mapResult = numbers.map((item, index, array) => {
  return item * 2
})
console.log(mapResult); // [2, 4, 6, 8, 10, 12]

number.forEach((item, index, array) => {
  // do all
})
```

#### 归并方法
##### reduce()、reduceRight()
这两个方法都会迭代数组的所有项，然后构建一个最终返回的值。
区别在于reduce()是从数组左边向右边迭代，reduceRight()是从数组右边向左边迭代。

**reduce()、reduceRight()接受两个参数：**
1. 每一项调用的函数
2. 作为归并基础的初始值（可选）

**每一项调用的函数接受四个参数：**
1. 前一个值
2. 当前值
3. 项的索引
4. 数组对象

数组求和例子：

```js
var nums = [1,2,3,4,5];
var xhNum = 0;
var sum = nums.reduce(function (prev, cur, index, array){
  xhNum++;
  return prev + cur
})
console.log(xhNum, sum); // 4 15
```

xhNum=4,表示循环了4次，循环第一次的时候，prev=1，cur=2,结果是3，然后第二次的时候，prev=3，cur=3,结果是6，
第三次prev=6，cur=4,结果是10，第四次prev=10，cur=5,结果是15。

### Date 类型

***Date.parse()*** :方法接受一个表示日期的字符串参数。然后根据这个字符串返回相应日期的毫秒数。

```js
var dateString = Date.parse('2023-03-01')
console.log(dateString); // 1677628800000
```

***Date.UTC()*** :方法同样也返回表示日期的毫秒数。参数分别是年份、基于0的月份（一月是0）、月中的那一天（1-31）、小时数（0-23）、分钟、秒、毫秒数。

```js
var dateString = Date.UTC(2023, 2, 1, 0, 0, 0, 0);
console.log(dateString); // 1677628800000
```

***Date.now()*** :返回表示调用这个方法时的日期和时间的毫秒数。

```js
var dateString = Date.now();
console.log(dateString); // 1689495872397

// 分析代码执行的时间
// 取的开始的时间
var start = Date.now();
// 调用函数
doSomething();
// 取得停止时间
var stop = Date.now(),
    result = stop - start;
```

#### 继承的方法
toLocalString()、toString()各个浏览器返回的样式都不相同，代码开发中没有太大的用处。
至于Date类型的valueOf(),则根本不会返回字符串，而是返回日期的毫秒数。

```js
var date1 = new Date(2023, 0, 1);
var date2 = new Date(2023, 1, 1);
console.log(date1 < date2); // true
console.log(date1 > date2); // false
```

#### 日期/时间组件方法

<img src="/images/img-folder/2023/date.png">

<!-- ### RegExp 类型
#### RegExp 实例属性
#### RegExp 实例方法
#### RegExp 构造函数属性
#### 模式的局限性 -->

### Function 类型
函数实际上也是对象，函数名也是一个指向函数对象的指针，不会与某个函数绑定。

```js
function sum(num1, num2){
  return num1 + num2;
}
console.log(sum(1, 2)); // 3
var anotherSum = sum;
console.log(anotherSum(1, 2)); // 3
sum = null;
console.log(anotherSum(1, 2)); // 3
```
以上代码，虽然将 sum 设置为null,但是只是将指针设置为 null，并没有清空引用，也是没有清空堆内存的值，只是清空了栈里面的变量 sum。

#### 没有重载（深入理解）
将函数名想象为指针，有助于理解为什么ECMAScript中没有函数重载的概念。

```js
function a(num) {
  return num + 100;
}
function a(num) {
  return num + 200;
}
a(100); // 300

基本等价于 =>

var a = function (num) {
  return num + 100;
}
a = function a(num) {
  return num + 200;
}
```
以上代码可以看出，在创建第二个函数的时候，实际上覆盖了引用第一个函数的变量 a。
#### 函数声明与函数表达式

```js
// 代码1
console.log(sum(100));
function sum(val){
  return val + 200;
}

//代码2
console.log(sum(100)); // Uncaught TypeError: sum is not a function
var sum = function (val){
  return val + 200;
}
```

以上代码1 能够正常执行，代码2 报错，应为代码1中函数 sum,是通过函数声明提升了，常说的函数名变量提升。

> 除了什么时候可以通过变量访问函数这一点区别之外，函数声明与函数表达式的语法其实是等价的。 

#### 作为值函数
因为ECMAScript中的函数名本身就是变量，所以函数也可以作为值来使用。也就是说，不仅可以像传递参数一样把一个函数传递给另一个函数，而且可以将一个函数作为另一个函数的结果返回。

```js
function callSomeFunction(someFunction, someArgument){
  return someFunction(someArgument);
}
function add10(num){
  return num + 10;
}
var result = callSomeFunction(add10, 10);
console.log(result); // 20
```

一个函数返回另一个函数，也是极为有用的一种技术。例如：按对象数组中的年龄排序。

```js
function creatComparisonFunction(propertyName){
  return function(object1, object2){
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if(value1 < value2){
      return -1;
    } else if (value1 > value2){
      return 1;
    } else {
      return 0;
    }
  }
}
var data = [{
  name: 'songsan',
  age: 30
},{
  name: 'lisi',
  age: 53
},,{
  name: 'wangwu',
  age: 49
}];
data.sort(creatComparisonFunction('age'));
console.log(data); // [{30, 49, 53}]
```

#### 函数内部属性
在函数内部有两个参数：**arguments** 和 **this**。arguments 的主要用途是保存函数的所有参数，是一个类数组对象，但这个对象还有一个 **callee** 的属性，该属性是一个指针，指向拥有这个 arguments 对象的函数。

##### arguments.callee

```js
function factorial(num) {
  if (num <= 1) {
    return 1;
  } else {
    return num * arguments.callee(num-1); // arguments.callee = 函数名factorial，函数名变化也不影响内部代码
  }
}
var factorial1 = factorial;
factorial = function() {
  return 0;
}
console.log(factorial1(5)); // 120
console.log(factorial(5)); // 0
```

以上代码：factorial1 和 factorial是两个指针，都指向了递归函数，后面重写了 factorial 返回0的函数，那就factorial指向返回0的函数，factorial1 指向原来的递归函数。另外，递归函数，如果 arguments.callee 写成 函数名 factorial，那么调用 factorial1(5) 也就会返回0，所以使用 arguments.callee 来取代函数，就解耦了函数名，使代码不再依赖函数名的束缚。

> 阶乘函数一般都要用到递归函数。

##### this

函数内部还有另一个特殊的对象是**this**。this引用的是函数据已执行的环境对象。网页全局作用域中调用函数，this对象引用的就是window。

```js
var color = 'red';
var o = {
  color: 'blue';
}
function sayColor() {
  console.log(this.color);
}
o.sayColor = sayColor;
sayColor(); // red
o.sayColor(); // blue
```

以上代码：调用函数之前，this的值并不确定，因此 this 可能会在代码执行过程中引用不同的对象。

> 牢记：函数的名字仅仅是一个包含指针的变量而已。因此，即使是在不同的环境中执行，全局的sayColor() 函数与 o.sayColor()指向的仍然是同一个函数。

#### 函数属性和方法
函数有两个属性：length 和 prototype 两个属性。
**length**表示的是函数接受参数的个数。

```js
function sayName(name) {}
function sum(num1, num2){}
function sayHi(){}
console.log(sayName.length); // 1
console.log(sum.length); // 2
console.log(sayHi.length); // 0
```

##### call()、apply()
每个函数都包含两个非继承而来的方法：call()、apply()。用途都是在特定的作用域中调用函数，实际上就是等于设置函数体内this对象的值。
**apply** 第一个参数是运行函数的作用域，另一个参数 apply是数组，也可以是arguments 对象。
**call** 第一个参数是运行函数的作用域，另一个参数——传递给函数的参数必须逐个列举出来。

```js
function sum(num1, num2){
  return num1 + num2;
}
function applySum(num1, num2){
  // return sum.apply(this, arguments); // 传入arguments 对象
  return sum.apply(this, [num1, num2]); // 传入参数
}
function callSum(num1, num2){
  return sum.call(this, num1, num2);
}
```

```js
var color = 'red';
var o = {
  color: 'blue';
}
function sayColor() {
  console.log(this.color);
}
sayColor.call(this); // red
sayColor.call(window); // red
sayColor.call(o); // blue
```

### 基本包装类型
ECMAScript提供了3个特殊的引用类型：Boolean、Number、String。
实际上，每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而让我们能够调用一些方法来操作这些数据。

```js
var s1 = 'some text';
var s2 = s1.substring(2);
```

这个例子中变量s1包含了一个字符串，字符串当然是一个基本类型值，而下一行调用了 s1 的substring()方法，并将返回结果赋值给了s2。我们知道，基本类型不是对象，因此从逻辑上讲它们不应该有方法。其实为了实现我们这种直观的操作，后台进行了一系列的处理。当第二行代码访问s1时，访问过程处于一种读取模式，也就是要从内存中读取这个字符串的值。而在读取模式中访问字符串时，后台都会自动完成下列处理。

(1) 创建String类型的一个实例；
(2) 在实例上调用指定的方法；
(3) 销毁这个实例。

可以将以上三个步骤想象成是执行了一下的代码

```js
var s1 = new String('some text');
var s2 = s1.substring(2);
s1 = null;
```

引用类型与基本包装类型的主要区别就是对象的生存期。使用new 操作符创建的引用类型的实例，在执行流离开当前作用域之前都一直保存在内存中。而自动创建的基本包装类型的对象，则只存在于一行代码的执行瞬间，然后就立即被销毁了。
#### Boolean类型

```js
var booleanObject = new Boolean(true);
```

其实，Boolean 对象在 ECMAScript中用处不大，因为他常常造成人们的误解。

```js
var falseObject = new Boolean(false);
var result = falseObject && true;
console.log(result); // true

var falseValue = false;
result = falseValue && true;
console.log(result); // false
```

以上第三行代码，我们常常会理解为false，但是打印出了true。因为布尔表达式中的所有对象都会被转化为true，因此falseObject && true 返回了true。

> 建议：除非特殊必须情况，不建议使用基本包装类型 Boolean对象。

#### Number类型

```js
var numberObject = new Number(10);
```

##### toFixed()
**toFixed()** 方法会按照指定的小数位返回数值的字符串表示。
接受的参数：一个表示显示几位小数的数字。

```js
var num = 10;
var num1 = 10.005;
console.log(num.toFixed(2)); // "10.00"
console.log(num1.toFixed(2)); // "10.01"
```

##### toExponential()
**toExponential()** 该方法返回以指数表示法（也称为e表示法）表示的数值的字符串形式。接受的参数与 toFixed 一样，改参数也是指定输出结果中的小数位数。

```js
var num = 100;
console.log(num.toExponential(2)); // 1.00e+2
```

#### String类型
##### 字符方法
###### charAt()、charCodeAt()
返回指定位置的字符或者字符编码。

```js
var str = "hello word";
console.log(str.charAt(1)); // e
console.log(str.charCodeAt(1)); // 101
```

##### 字符串操作方法
###### concat()
用于将一或多个字符串拼接起来，返回拼接得到的新字符串。接受任意多个参数。

```js
var stringVal = "hello";
var result = stringVal.concat(' word', ' my', ' name is', " song");
console.log(result); // hello word my name is song
```

###### slice()、substring()、substr()
ECMAScript 还提供了三个基于子字符串创建新字符串的方法：slice()、substr()、substring()。

这三个方法都会返回被操作字符串的一个子字符串，而且也都接受一或两个参数。第一个参数指定子字符串的开始位置，第二个参数（在指定的情况下）表示子字符串到哪结束。
具体来说，**slice()**和**substring()**的第二个参数指定的是子字符串最后一个字符后面的位置。
而**substr**的第二个参数指定的则是返回的字符个数。
如果没有传递第二个参数，则将字符串的长度作为结束位置。

```js
var stringVal = "hello world";
// 参数：(截取的开始位置（包含）, 结束位置（不包含）)
var sliceStr = stringVal.slice(3); // lo world
var sliceStr1 = stringVal.slice(3, 7); // lo w
var substringStr = stringVal.substring(3); // lo world
var substringStr1 = stringVal.substring(3, 7); // lo w

// 参数：(截取的开始位置（包含）, 截取的个数)
var substr = stringVal.substr(3); // lo world
var substr1 = stringVal.substr(3, 7); // lo worl
```

> slice()方法会将传入的负值与字符串的长度相加；
substring()方法会把所有负值参数都转化为0；
substr()方法将负的第一个参数加上字符串的长度，而将负的第二个参数转化为0.

```js
var text = "hello world";
console.log(text.slice(-3)); // rld
console.log(text.substring(-3)); // "hello world
console.log(text.substr(-3)); // rld
console.log(text.slice(3, -4)); // lo w
console.log(text.substring(3, -4)); // hel
console.log(text.substr(3, -4))); // ""(空字符串)
```
##### 字符串位置方法
###### indexOf()、lastIndexOf()
这两个方法都是从一个字符串中搜索给定的子字符串，然后返子字符串的位置（没有查到，则返回-1）。区别在于一个是从前往后查找，一个是从后往前查找。

接受的**参数**：
1). 在字符串中要查找的字符
2). 从字符串的那个位置开始搜索（可选）

```js
var stringval = "hello world";
console.log(stringval.indexOf('o')); // 4
console.log(stringval.lastIndexOf('o')); // 7
```

##### trim()方法
这个方法会创建一个字符串的副本，删除前置及后缀的所有空格，然后返回结果。

```js
var str = "    hello world     ";
var trimStr = str.trim();
console.log(str); // "    hello world     "
console.log(trimStr); // "hello world"
```
**trimLeft()**和**trimRight()**分别用于删除左右的空格。

##### 字符串大小写转化方法
###### toUpperCase()、toLowerCase()
这两个方法用来将字符串转化为大写、小写格式。

```js
var str1 = 'hello World';
var upperStr = str1.toUpperCase();
var lowerStr = str1.toLowerCase();
console.log(upperStr, lowerStr); // HELLO WORLD hello world
```

> **toLocaleUpperCase**、**toLocaleLowerCase** 方法是针对特定地区的方法与其通用方法得到结果相等。少数语言（如土耳其语）会为Unicode大小转换应用特殊的规则，这时候就必须使用此两种特殊方法来转化。
所以，在不知道自己代码在那种语言环境下运行的情况下，还是使用此两种方法更加稳妥。

##### 字符串的模式匹配方法
###### match()、search()
**match()** 接受一个参数，要么是一个正则表达式，要么是一个RegExp对象，调用返回一个数组。
**search()** 接受一个参数，要么是一个正则表达式，要么是一个RegExp对象，调用返回字符串中第一个匹配项的索引。

```js
var text = 'cat, bat, sat, fat';
var pattern = /.at/;
// 与pattern.exec(text) 相同
var matches = text.match(pattern);
console.log(matches); // ['cat', index: 0, input: 'cat, bat, sat, fat', groups: undefined]
console.log(matches.index); // 0
console.log(matches[0]); // "cat"
console.log(pattern.lastIndex); // 0
```

```js
var text = 'cat, bat, sat, fat';
var pos = text.search(/at/);
console.log(pos); // 1
```
"at"在字符串中第一次出现的位置的下标是 1。

###### replace()
**接受参数** 接受两个参数：
1). 第一个参数可以是一个RegExp对象或者一个字符串（这个字符串不会被转化为正则表达式）
2). 第二个参数可以是一个字符串或者一个函数

> 第一个参数如果是一个字符串，那么只会替换第一个子字符串。想要替换所有的字符串，唯一的办法就是提供一个正则表达式，而且要指定全局(g)标志。

```js
var text = 'cat, bat, sat, fat';
var result = text.replace("at", "ond");
console.log(result); // cond, bat, sat, fat

result = text.replace(/at/g, "ond");
console.log(result); // cond, bond, sond, fond
```

###### split()
将字符串转化为数组按照指定的分隔符。

**接受的参数** 可以接受两个参数
1). 分隔符
2). 分割数组的个数

**分隔符** 可以是字符串，也可以是一个RegExp对象。

```js
var text = 'cat, bat, sat, fat';
var textArray = text.split(','); // ['cat', ' bat', ' sat', ' fat'] 
var textArray1 = text.split(',', 2); // ['cat', ' bat']
```

##### localeCompare()
这个方法比较两个字符串，并返回下列值中的一个
+ 如果字符串在字母表中应该排在字符串参数之前，则返回一个负数(大多数情况下是-1，具体
的值要视实现而定);
+ 如果字符串等于字符串参数，则返回0;
+ 如果字符串在字母表中应该排在字符串参数之后，则返回一个正数(大多数情况下是1，具体的
值同样要视实现而定)。

下面是几个例子。

```js
var stringValue = "yellow";
alert(stringvalue.localeCompare("brick")); //1
alert(stringValue.localeCompare("yellow")); //0
alert(stringValue.localeCompare("zoo")); //-1
```

##### fromCharCode()
另外，string构造函数本身还有一个静态方法:**fromCharcode()**。这个方法的任务是接收一或
多个字符编码，然后将它们转换成一个字符串。从本质上来看，这个方法与实例方法charcodeAt()
执行的是相反的操作。来看一个例子:

```js
alert(String.fromCharCode(104, 101, 108, 108, 111)); //"hello"
```

在这里，我们给fromCharCode()传递的是字符串hello"中每个字母的字符编码。

### 单体内置对象
#### Global对象
##### encodeURLComponent()、和decodeURIComponent()  

```javascript
var url = 'http://www.baidu.com/illent value.html#start'
encodeURL(url) // http://www.baidu.com/illent%20value.html#start
encodeURLComponent(url) // http%3A%2F%2Fwww.baidu.com%2Fillent%20value.html%23start
```
> 一般来说，我们平常常用的是encodeURLComponent 方法，因为我们主要是对参数进行编码，而很少对基础url域名进行编码。

相对以上的解码方法为：decodeURI()和decodeURIComponent()    

##### eval() 
就相当于一个完整的ecscript解析器

```javascript
eval('alert(123)')
```
页面直接就会弹出alert框，显示123   

> eval 不会有变量提升，应为解析的时候，里面的内容是字符串，同时使用它的时候要谨慎，可能有用户恶意输入威胁你的站点或应用程序安全的代码。    

#### Math 对象
##### min()、max()
```javascript
var max = Math.max(3,2,23,100)
console.log(max) // 100

var arr = [3,2,23,100]
var maxNum = Math.max.apply(Math, arr)
console.log(maxNum) // 100
```

##### Math.ceil()、Math.floor()、Math.round()
舍入方法
1.Math.ceil() 执行向上舍入
2.Math.floor() 执行向下舍入
3.Math.round() 标准的四舍五入
```javascript
console.log(Math.ceil(25.9)) // 26
console.log(Math.ceil(25.5)) // 26
console.log(Math.ceil(25.1)) // 26

console.log(Math.floor(25.9)) // 25
console.log(Math.floor(25.5)) // 25
console.log(Math.floor(25.1)) // 25

console.log(Math.round(25.9)) // 26
console.log(Math.round(25.5)) // 26
console.log(Math.round(25.1)) // 25
```

##### random()
返回介于0到1之间的随机数

##### 其他方法

<img src='/images/img-folder/hps/5/1.png'>

### 小结
对象在JavaScript中被称为引用类型的值,而且有一些内置的引用类型可以用来创建特定的对象，现简要总结如下:    
口 引用类型与传统面向对象程序设计中的类相似,但实现不同;
口 object是一个基础类型,其他所有类型都从object继承了基本的行为;
口 Array类型是一组值的有序列表,同时还提供了操作和转换这些值的功能;
口 Date类型提供了有关日期和时间的信息,包括当前日期和时间以及相关的计算功能O;
口 RegExp类型是ECMAScript支持正则表达式的一个接口,提供了最基本的和一些高级正则表达式功能。
    函数实际上是Function类型的实例,因此函数也是对象;而这一点正是JavasScript最有特色的地方。由于函数也是对象,所以函数也拥有方法,可以用来增强其行为。    

    因为有了基本包装类型,所以JavaScript中的基本类型值可以被当作对象来访问。三种1型分别是: Boolean, Number和stxing。以下是它们共同的特征:    

口 每个包装类型都映射到同名的基本类型;
口 在读取模式下访问基本类型值时,就会创建对应的基本包装类型的一个对象,从而方便了解数据操作;
口 操作基本类型值的语句一经执行完毕,就会立即销毁新创建的包装对象。    

在所有代码执行之前,作用域中就已经存在两个内置对象:G1obal和Math在大多数ECMAScript实现中都不能直接访问Global对象;不过, Web浏览器实现了承担该角色的window对象量和函数都是G1obal对象的属性。Math对象提供了很多属性和方法,用于辅助完成复杂的数学计算任务。
