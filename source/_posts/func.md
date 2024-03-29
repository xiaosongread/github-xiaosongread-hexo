---
title: 第七章-函数表达式
categories: jc-end
date: 2020-08-28 14:55:37
---

**本章内容**
口 函数表达式的特征
口 使用函数实现递归
口 使用闭包定义私有变量

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

### 创建函数
#### 函数声明
```javascript
aa() // 123
function aa(){
  console.log(123)
}
```
> 函数声明变量提升：执行代码之前会先读取函数声明，这就意味着可以把调用函数放在声明函数之前。

#### 函数表达式
```javascript
aa() // 报错，变量不存在
var aa = function (){
  console.log(123)
}
```

```javascript
if (flag) {
  function aa (){
    console.log(123)
  }
} else {
  function aa (){
    console.log(456)
  }
}
```

> 以上代码坚决不能使用，在不同的浏览器解析的效果不一样，但是可以使用一下方式来实现。

```javascript
var aa
if (flag) {
  aa = function (){
    console.log(123)
  }
} else {
  aa = function (){
    console.log(456)
  }
}
```

### 递归
一个函数通过名字调用自身的情况下构成的。

```javascript
function factorial(num) {
  if (num <= 1) {
    return 1
  } else {
    return num * factorial(num - 1)
  }
}
var total = factorial(4)
console.log(total) // 24
```

以上函数如果改一下操作就会报错：

```javascript
function factorial(num) {
  if (num <= 1) {
    return 1
  } else {
    return num * factorial(num - 1)
  }
}
var myFactorial = factorial
factorial = null
myFactorial(4)
```

修改以上问题的方法

```javascript
function factorial(num) {
  if (num <= 1) {
    return 1
  } else {
    return num * arguments.callee(num - 1)
  }
}
var myFactorial = factorial
factorial = null
myFactorial(4)
```

> 使用arguments.callee 来代替函数名称，可以确保不管函数名如何变化，都可以调用到本身。   

### 闭包   
闭包就是一个函数可以访问另外一个函数内部的变量。
> 由于闭包会携带包含他的外部函数的作用域，因此比其他函数更加的占用内存，因此，不到万不得已，尽量少使用闭包。

#### 闭包与变量
```javascript
function createFunctions() {
  var result = new Array()
  for(var i=0; i<10; i++) {
    // 位置1
    result[i] = function() {
      // 位置2
      return i;
    }
  }
  return result;
}
var a = createFunctions()
for (var i = 0; i < 5; i++ ) {
  // 位置3
  console.log(a[i]()); 
}
```
> 理所当然的结果: [0,1,2,3,4], 其实的结果是[10,10,10,10,10]    

其实，在a里面保存的是[function(){return i}...],然后位置3执行的时候，是执行每一个function(){return i}匿名函数，也就是执行位置2里面的内容，但是位置里面的作用域并没有i，所以就在位置1的位置作用域找，但是这时候循环已经执行完毕，那就是10，所以每一次打印的都是10。

问题的关键就在于,我们没有立即使用i这个变量,而是把它保存在起来,需要的时候再调用,而i这个变量一直在变化,所以我们需要在循环的每一步中,实时地获取i的值,解决方案如下:
```javascript
function createFunctions() {
  var result = new Array()
  for(var i=0; i<10; i++) {
    // 位置1
    result[i] = function(num) {
      // 位置2
      return num
    }(i)
  }
  return result;
}
var a = createFunctions()
for (var i = 0; i < 5; i++ ) {
  // 位置3
  console.log(a[i]); 
}
```
得到了理想结果[0,1,2,3,4]
#### 关于this对象
this 对象是在函数运行时候基于函数执行环境绑定的，在全局函数中this指向window,而当函数被作为某个对象的方法调用时，this等于那个对象，不过匿名函数的执行环境具有全局性，因此this通常指向window,但是有时候由于闭包的编写方式不同，这一点可能没有那么明显。

```javascript
var name = "the window"
var object = {
  name: "the object",
  getNameFunc: function() {
    return function() {
      return this.name
    }
  } 
}
console.log(object.getNameFunc()()) // the window
```
每个函数在被调用的时候，都会自动生成this和arguments，内部函数在搜索这两个对象的时候，只会搜索到其活动对象为止，因此永远不可能访问外部函数中的这两个对象，但是，如果把外部函数的this对象保存到一个闭包能够访问到的变量里面，就可以让闭包访问该对象了。

```javascript
var name = "the window"
var object = {
  name: "the object",
  getNameFunc: function() {
    var that = this
    return function() {
      return that.name
    }
  } 
}
console.log(object.getNameFunc()()) // the object
```

> 通过call或者apply也是可以改变执行环境的this指向的。

在几种特殊的情况下，this可能会发生变化
```javascript
var name = "the window"
var object = {
  name: "the object",
  getNameFunc: function() {
    return this.name
  }
}
console.log(object.getNameFunc()) // the object
console.log((object.getNameFunc)()) // the object
console.log((object.getNameFunc = object.getNameFunc)()) // the window 
```
第一种调用方法是常规的，就不多说了，第二种先加了个括号，就好像是引用了一个函数，但是this得到了维持，因此和第一种方式没有打什么区别，第三种先进行了赋值在进行调用，因为这个赋值表达式的值是函数本身，所以this的值没有得到维持，结果就返回了 the window ，其实在你的代码中，大概率是不会出现第二种和第三中这种方式的。

### 模仿块级作用域

```javascript
function outputnumber() {
  for(var i=0; i< 3; i++) {
    console.log('a',i) // 0 1 2
  }
  var i
  console.log('b', i) // 3
}
outputnumber()
```

```js
var a = 1;
var a;
console.log(a); // 1
```

以上代码在for循环后面又申明了相同的变量i，但是也是可以访问到变量的，而不是undefind。

> JavaScript从来不会告诉你是否多次声明了同一个变量，遇到这种情况，它只会对后续的声明视而不见，不过，它会执行后续声明中的变量初始化。

块级作用域（通常称为私有作用域）的匿名函数的语法如下所示：

```js
(function(){
  // 这里是块级作用域
})();
```

```javascript
function outputnumber(count) {
  (function(){
    for (var i=0; i< count; i++) {
      console.log(i) // 0 1 2
    }
  })()
  console.log(i) // 报错： Uncaught ReferenceError: i is not defined
}
outputnumber(3)
```
以上代码：在循环外部添加了一个匿名函数，匿名函数在执行之后，里面所有的变量都会被销毁，因此，变量只能在匿名函数循环中使用，然后就会被销毁，而循环是在匿名函数的闭包中，是可以访问外部函数所有的变量的。

> 这种技术经常在全局作用域中被用在函数的外部，从而限制向全局作用域中添加过多的变量和函数。在多人开发的项目中，避免了变量名冲突而导致的各种问题。

```javascript
(function(){
  var now = new Date()
  if (now.getMonth()==0 && now.getDate()==1) {
    console.log('新年快乐')
  } else {
    console.log('不是过年你不好好工作')
  }
})()
var now
console.log('now', now) // undefind

var now = new Date()
if (now.getMonth()==0 && now.getDate()==1) {
  console.log('新年快乐')
} else {
  console.log('不是过年你不好好工作')
}
var now
console.log('now', now) // now Tue Sep 01 2020 17:11:05 GMT+0800 (中国标准时间)
```
以上代码充分说明了 匿名函数闭包执行完之后，销毁掉了 now 变量，避免了全局变量污染的问题。


### 私有变量
严格意义上来讲，js是没有私有成员这一说的，但是有私有变量的概念，任何在函数中定义的变量，都可以认为是私有变量。
函数中声明的所有变量，包括入参，函数内部定义的变量，函数，都只能在函数内部使用，外部访问不到的。

```js
function add(num1, num2){
  var sum = num1 + num2;
  return sum;
}
```

在这个函数中，有3个私有变量：num1，num2，sum。在函数内部可以反问这几个变量，但在函数外部则不能访问它们。如果在函数内部定义一个闭包，那么闭包可以通过自己的作用域链也可以访问到这些变量。而利用这一点，就可以创建用于访问私有变量的公有方法。

```js
function MyObject(){
  // 私有变量和私有函数
  var privateVariable = 10;
  function privateFunction(){
    return false
  }
  // 特权方法
  this.publicMethod = function(){
    privateVariable++;
    return privateFunction();
  }
}
```

这个模式在构造函数内部定义了所有私有变量和函数。然后继续创建了能够访问这些私有成员的特权方法，定义特权方法，是因为作为闭包有权访问在构造函数中定义的所有变量和函数。
利用私有和特权方法，可以隐藏那些不应该被直接修改的数据，例如：

```javascript
function Person(name) {
  this.getName = function() {
    return name
  }
  this.setName = function(value) {
    name = value
  }
}
var person = new Person('bob')
console.log(person.getName()) // bob
person.setName('dog')
console.log(person.getName()) // dog
```
以上代码 person 可以访问Person函数内部的 name 变量，是因为getName和setName是在函数中定义的两个特权方法，而作为闭包能够通过作用于链访问name属性，在构造函数中定义方法，有一个确定就是 构造函数创建的每一个实例，都会重新创建相同的变量和方法，在上一篇有说过，这个问题只能通过使用静态私有变量来实现特权方法。

#### 静态私有变量

```javascript
function aa() {
  bb = 123
}
aa()
console.log(bb) // 123
```
> 以上代码，bb打印出来的结果是123，因为初始化未经声明的变量，总是会创建一个全局的变量，但是在严格模式下，这种做法是会报错的。

```javascript
(function(){
  var name = ""
  Person = function(value) {
    name = value
  }
  Person.prototype.getName = function() {
    return name
  }
  Person.prototype.setName = function(value) {
    name = value
  }
})()
var person1 = new Person('aa')
console.log(person1.getName()) // aa
person1.setName("bb")
console.log(person1.getName()) // bb

var person2 = new Person('cc')
console.log(person1.getName()) // cc
console.log(person2.getName()) // cc
```
以上代码，因为Person getName setName 是闭包，所以都可以访问到name属性，但是getName setName是原型上面的方法，所以Person下面的所有实例都共用相同的方法，虽然这样可以复用代码，但是其中一个实例改变name值，所有的实例的name都会跟着改变，<strong>到底是使用实例变量还是使用静态私有变量，最终还是要看你自己的需求来决定。</strong>
```javascript
(function(){
  Person = function(value) {
    this.name = value
  }
  Person.prototype.getName = function() {
    return this.name
  }
  Person.prototype.setName = function(value) {
    this.name = value
  }
})()
var person1 = new Person('aa')
console.log(person1.getName()) // aa
person1.setName("bb")
console.log(person1.getName()) // bb

var person2 = new Person('cc')
console.log(person1.getName()) // bb
console.log(person2.getName()) // cc
```

<!-- #### 模块模式

#### 增强的模块模式 -->

### 总结
<strong>在JavasScipt编程中,函数表达式是一种非常有用的技术。使用函数表达式可以无须对函数命名,从而实现动态编程。匿名函数,也称为拉姆达函数,是一种使用 JavaScript函数的强大方式。以下总结了函数表达式的特点。</strong>
1.函数表达式不同于函教声明。函教声明要求有名字,但函数表达式不需要。没有名字的函数表达式也叫做匿名函数。
2.在无法确定如何引用函数的情况下,递归函数就会变得比较复杂。
3.递归函数应该始终使用 argurents.callee 来递归地调用自身,不要使用函数名(函数名可能发生变化)。
<strong>当在函数内部定义了其他函数时,就创建了闭包。闭包有权访问包含函数内部的所有变量,原理如下。</strong>
1.在后台执行环境中,闭包的作用域链包含着它自己的作用域、包含函数的作用域和全局作用域。
2.通常,函数的作用城及其所有变量都会在函数执行结束后被销毁。
3.但是,当函数返回了一个闭包时,这个函数的作用域将会一直在内存中保存到闭包不存在为止。
<strong>使用闭包可以在JavaScrip中模仿块级作用域( JavaScript本身没有块级作用域的概念),要点如下。</strong>
1.创建并立即调用一个函数,这样既可以执行其中的代码,又不会在内存中留下对该函数的引用。
2.结果就是函数内部的所有变最都会被立即销段-除非将某些变量赋值给了包含作用域（即外部作用城)中的变量。
<strong>闭包还可以用于在对象中创建私有变量,相关概念和要点如下。</strong>
1.即使 JavaScrip 中没有正式的私有对象属性的概念,但可以使用闭包来实现公有方法,而通过公有方法可以访问在包含作用域中定义的变量。
2.有权访问私有变量的公有方法叫做特权方法。
3.可以使用构造函数模式、原型模式来实现自定义类型的特权方法,也可以使用模块模式、增强的模块模式来实现单例的特权方法。
<strong>JavaScrip中的函数表达式和闭包都是极其有用的特性,利用它们可以实现很多功能。不过,因为闭包必须维护额外的作用域,所以过度使用它们可能会占用大量内存。</strong>


