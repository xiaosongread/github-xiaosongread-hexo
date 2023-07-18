---
title: '第四章-变量、作用域和内存问题'
categories: js-end
date: 2020-08-04 19:52:41
tag: js
---
任何语言的核心都必然会描述这门语言最基础的工作原理。而描述内容通常都要涉及这门语言的语法、操作符、数据类型、内置功能等用于构建复杂解决方案的基本概念。

<!-- more -->

[第三章-数据类型](http://shuy.cc/2020/07/12/typeOf/)
[第四章-变量、作用域和内存问题](http://shuy.cc/2020/08/13/instance/)
[第五章-引用类型](http://shuy.cc/2020/08/03/object)
[第六章-面向对象的设计程序](http://shuy.cc/2020/08/13/defineProperty/)
[第七章-函数表达式](http://shuy.cc/2020/08/28/func)
[第八章-BOM](http://shuy.cc/2020/09/03/%E7%BA%A2%E7%9A%AE%E4%B9%A6%E7%AC%AC%E5%85%AB%E7%AB%A0-BOM/)
[第十章-DOM](http://shuy.cc/2020/09/09/%E7%BA%A2%E7%9A%AE%E4%B9%A6%E7%AC%AC%E5%8D%81%E7%AB%A0-DOM/)


### 基本类型和引用类型的值
5中基本类型是按值访问的，因为可以操作保存在变量中的实际的值。
引用类型的值是保存在内存中的，操作的时候实际上是在操作对象的引用，而非内存中的值。
#### 动态的属性
只有引用类型可以动态添加属性或者方法，基本数据类型是不行的。
```js
var obj = new Object();
obj.name = "song";
// 以上代码没问题
var str = "123";
str.name = "song";
// 以上代码是不对的
```
#### 复制变量值
复制一个基本类型的时候，会在变量对象上创建一个新值，然后把值复制到为新变量分配的位置上；
复制一个引用类型的时候，也会创建一个新值，然后复制保存到内存中，但是保存的其实是一个指针，他指向的还是原来保存在内存中的值，所以改变新值，就会改变原来的值在内存的内容。
```js
var obj = new Object();
obj.name = 'song';
var obj1 = obj;
obj1.name = 'guo';
console.log(obj.name, obj1.name); // guo guo
```
<img src="/images/img-folder/2023/prototy1.png">
#### 传递参数
函数的参数都是按值传递的。也就是说，把函数外部的值复制给函数内部的参数，就和把值从一个变量复制到另一个变量一样。

```js
function setName(obj){
  obj.name = "zhang";
}
var person = new Object();
setName(person);
console.log(person.name); //zhang
```

> 有很多开发者错误的认为：在局部作用域中修改的对象会在全局作用域中反映出来，就说明参数是按照引用传递的，其实是不对的。

```js
function setName(obj){
  obj.name = "zhang";
  obj = new Object();
  obj.name = "tom";
}
var person = new Object();
setName(person);
console.log(person.name); //zhang
```
从以上代码可以看出，如果按照引用传递的，那么person传递给setName，obj = new Object();的时候，任然指针指向的是原来的，那么应该person.name应该为tom，但是结果并不是，那就说明就是按照值传递的。
#### 检测类型
typeof操作符在检测基本数据类型的时候，的确是很好用的，但是在检测对象或者null的时候，都返回了object,并且，我们通常并不是想知道是否是对象，而是想知道属于什么类型的对象，那么就需要使用 instanceof。

> typeof检测的是简单数据类型,instanceof检测的是引用数据类型

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
### 执行环境和作用域
每个函数都有自己的**执行环境**。当执行流进入一个函数的时，函数的环境就会被推入一个环境栈中。而在函数执行完之后，栈将其环境弹出，把控制权返回给之前的执行环境。ECMAScript程序的执行流正是由这个方便的机制控制的。
当代码在一个环境中执行时，会创建一个作用域链。作用域链的用途，是保证对执行环境有权访问所有变量和函数进行有序的访问。

```js
var color = "blue";
function changeColor() {
  var anotherColor = "red";
  function swapColors() {
    var tempColor = anotherColor;
    anotherColor = color;
    color = tempColor;
    // 这里可以访问anotherColor color tempColor
  }
  swapColors();
  // 这里可以访问 swapColors函数 anotherColor color,但是不能访问 tempColor
}
changeColor();
// 这里只能访问color changeColor函数
console.log(color); // red
```

这个例子的作用域链如下图：
<img src="/images/img-folder/2023/bl1.png">

> 作用域链，最底层的栈可以访问一级一级的向上访问，不能向下访问。

#### 延长作用域链
执行环境的类型有全局和局部（函数）。但是还有一下两种方法，可以用来延长作用域链。
+ try-catch
+ with语句

```js
function buildUrl() {
  var qs = "?debug=true";
  with(location){
    var url = href + qs;
  }
  return url
}
var url = buildUrl();
```

#### 没有块级作用域
ECMAScript中是没有块级作用域的概念，不想其他类似java那样，{}里面就是一个块级作用域，执行完花括号就会释放里面的变量内存。

```js
var a = 12
for(var i=0; i<3; i++){
  a = a + i;// i = 0 1 2
}
console.log(i) // 3
// for (var j=i; j<6; j++){
//   a = a + j; // j = 3 4 5
// }
// console.log(a) // 27
```
for循环内部的变量i，可以在外部全局环境中访问到。

### 垃圾收集
#### 标记清除
是目前主流的垃圾收集算法，这种算法的思想是给当前不使用的值直接加上标记，然后在回收其内存。
#### 引用计数
这种算法的思想是跟踪记录所有值被引用的次数，但是这种容易出现问题。当代吗中存在循环引用现象的时候，就会导致错误。
#### 管理内存
接触变量的引用不仅有助于消除循环引用的现象，而且对垃圾回收机制非常的友好，为了确保有效的回收内存，应该及时解除不再使用的全局对象、全局对象属性、循环引用变量的引用。

```js
function creatPerson(name){
  var localPerson = new Object();
  localPerson.name = name;
  return localPerson;
}
var globalPerson = creatPerson('zhang');
// 手动解除 globalPerson 的引用
globalPerson = null;
```

### 小结
JavaScript变量可以用来保存两种类型的值：基本类型值和引用类型值。基本类型：string、number、boolean、null、undefind,基本类型和引用类型有以下的特点：
+ 基本类型值在内存占据固定大小的空间，所有保存在了栈内存中。
+ 从一个变量复制到另一个变量中的基本类型的值，会创建这个值的一个副本。
+ 引用类型的值是对象，保存在堆内存中。
+ 包含引用类型值的变量实际上包含的是不是对象本身，而是一个指向该对象的指针。
+ 从一个变量向另一个变量复制引用类型的值，复制的其实是一个指针，因此两个变量最终都指向同一个对象。
+ 确定一个值是那种基本类型可以用typeof,而确定一个值是那种引用类型可以用instanceof。