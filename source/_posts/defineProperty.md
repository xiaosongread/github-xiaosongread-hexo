---
title: 第六章-面向对象的设计程序
categories: jc-end
date: 2020-08-13 10:10:43
---
### 属性类型
#### 数据属性(Object.defineProperty())
1) [[Configurable]]: 表示能否通过delete删除属性，从而重新定义属性，，默认值为true    
2) [[Enumerable]]: 表示能否通过for-in循环返回属性，，默认值为true    
3) [[Writable]]: 表示能否修改属性的值，，默认值为true    
4) [[Value]]: 包含这个属性的值，默认值为undefined    

> 修改对象属性的默认特性，必须使用Object.defineProperty()方法。

<!-- more -->
[第三章-数据类型](http://shuy.cc/2020/07/12/typeOf/)
[第四章-变量、作用域和内存问题](http://shuy.cc/2020/08/13/instance/)
[第五章-引用类型](http://shuy.cc/2020/08/03/object)
[第六章-面向对象的设计程序](http://shuy.cc/2020/08/13/defineProperty/)
[第七章-函数表达式](http://shuy.cc/2020/08/28/func)
[第八章-BOM](http://shuy.cc/2020/09/03/%E7%BA%A2%E7%9A%AE%E4%B9%A6%E7%AC%AC%E5%85%AB%E7%AB%A0-BOM/)
[第十章-DOM](http://shuy.cc/2020/09/09/%E7%BA%A2%E7%9A%AE%E4%B9%A6%E7%AC%AC%E5%8D%81%E7%AB%A0-DOM/)

```javascript
var person = {}
Object.defineProperty(person, 'name', {
  writable: false,
  value: 'ceshi'
})
console.log(person.name) // ceshi
person.name = "xiugai"
console.log(person.name) // ceshi
```
#### 访问器属性(getter 和 setter函数)   
访问器属性不包含数据值，他们包含一对getter 和 setter函数，在读取访问器属性值得时候，会调用getter函数，在写入访问器属性的时候，调用setter函数。    

1) [[Configurable]]: 表示能否通过delete删除属性，从而重新定义属性，，默认值为true    
2) [[Enumerable]]: 表示能否通过for-in循环返回属性，，默认值为true    
3) [[Get]]: 在读取属性的时调用的函数，默认值为undefined  
4) [[Set]]: 在写入属性的时调用的函数，默认值为undefined   

> 访问器属性不能直接定义，必须使用Object.defineProperty()方法来定义。

```javascript
var book = {
  _year: 2004,
  edition: 1
}
Object.defineProperty(book, 'year', {
  get: function(){
    return this._year
  },
  set: function (newValue) {
    if (newValue > 2004) {
      this._year = newValue;
      this.edition += newValue - 2004;
    }
  }
})
book.year = 2005;
console.log(book.edition) // 2
console.log(book._year) // 2005
console.log(book.year) // 2005
```
> 不一定同时指定getter和setter函数，只指定getter函数，意味着属性是不能写的。   

#### 定义多个属性(Object.defineProperties())
由于定义对象多个属性的可能性很大，所以ECMCscript5又定义了defineProperties()方法，利用这个方法可以通过描述符定义多个属性。
```javascript
var book = {}
Object.defineProperties(book, {
  _year: {
    value: 2004
  },
  edition: {
    value: 1
  },
  year: {
    get: function() {
      return this._year
    },
    set: function (newValue) {
      if (newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    }
  }
})
```
#### 读取属性的特性(Object.getOwnPropertyDescriptor())
```javascript
var book = {}
Object.defineProperties(book, {
  _year: {
    value: 2004
  },
  edition: {
    value: 1
  },
  year: {
    get: function() {
      return this._year
    },
    set: function (newValue) {
      if (newValue > 2004) {
        this._year = newValue;
        this.edition += newValue - 2004;
      }
    }
  }
})
var descriptor = Object.getOwnPropertyDescriptor(book, "_year")
console.log(descriptor.value) // 2004
console.log(descriptor.configurable) // false
console.log(typeof descriptor.get) //undefined
var descriptor1 = Object.getOwnPropertyDescriptor(book, "year")
console.log(descriptor1.value) //undefined
console.log(descriptor1.enumerable) //false
console.log(typeof descriptor1.get) //function
```
### 创建对象
已知的创建对象，有构造函数和字面量来创建单个对象，但是用同一个接口来创建多个对象的话，就会产生大量重复的代码，为解决这个问题，人们开始使用工厂模式的一种变体。    
#### 工厂模式
```javascript
function createPerson(name, age, job){
  var o = new Object();
  o.name = name;
  o.age = age;
  o.job = job;
  o.sayName = function (){
    console.log(o.name)
  };
  return o;
}
var person1 = createPerson('a', 29, 'teacher')
var person2 = createPerson('b', 19, 'doctor')
```
> 工厂模式解决了创建对象产生大量重复代码的问题，但是没有解决对象识别的问题（即怎么知道一个对象的类型），这个方法构造函数模式解决了这个问题。

#### 构造函数模式
```javascript
function Person(name, age, job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = function (){
    console.log(this.name)
  };
}
var person1 = new Person('a', 29, 'teacher')
var person2 = new Person('b', 19, 'doctor')
console.log(person1.constructor == Person) // true
console.log(person2.constructor == Person) // true
console.log(person1 instanceof Object) // true
console.log(person1 instanceof Person) // true
```
> 1.构造函数名第一个字母是大写的，这个是用来区分普通函数。
> 2.创建自定义的构造函数意味着将来可以将它的实例标识作为一种特定的类型。  

##### 将构造函数当做函数
```javascript
// 作为构造函数
var person1 = new Person('a', 29, 'teacher')
person1.sayName() // a
// 作为普通函数
Person('a',  29, 'teacher')
window.sayName() // a
// 在另一个对象的作用域中调用
var o = new Object()
Person.call(o, 'a', 29, 'teacher')
o.sayName() // a
```
##### 构造函数的问题
构造函数的主要问题，就是每一个实例，都重新创建了一次构造函数的方法，比如下方例子
```javascript
var person1 = new Person('a', 29, 'teacher')
var person2 = new Person('b', 19, 'doctor')
console.log(person1.sayName == person2.sayName) // false
```
通过把函数定义到对象的外部，可以解决这个问题。
```javascript
function Person(name, age, job){
  this.name = name;
  this.age = age;
  this.job = job;
  this.sayName = sayName
}
function sayName(){
  console.log(this.name)
};
var person1 = new Person('a', 29, 'teacher')
var person2 = new Person('b', 19, 'doctor')
console.log(person1.sayName == person2.sayName) // true
```
> 将函数放到对象的外部，也就是全局环境中，this.sayName就相当于一个指针，person1,person2实例sayName指针指向了同一个方法，就实现了每一个实例不需要再去创建每一个方法，但是这样有一个坏处就是所有的方法放到全局作用域中，一定程度上污染了全局作用域，好在这个问题可以用原型模式来解决。

#### 原型模式
我们创建的每个函数都有一个 prototype (原型)属性,这个属性是一个指针,指向一个对象,而这个对象的用途是包含可以由特定类型的所有实例共享的属性和方法。如果按照字面意思来理解,那么 prototype就是通过调用构造函数而创建的那个对象实例的原型对象。使用原烈对象的好处是可以让所有对象实例共享它所包含的属性和方法。换句话说,不必在构造函数中定义对象实例的信息,而是可以将这些信息直接添加到原型对象中,如下面的例子所示。
```javascript
function Person(){}
Person.prototype.name = 'Nicholas'
Person.prototype.age = 29
Person.prototype.job = 'software Engineer'
Person.prototype.sayName = function() {
  console.log(this.name)
}
var person1 = new Person()
var person2 = new Person()
console.log(person1.sayName === person2.sayName) // true
```
##### 理解原型对象
<img src='/images/img-folder/hps/5/2.png'>

图6-1展示了 Person构造函数、Person的原型属性以及Person现有的两个实例之间的关系。在此, Pereon.prototype指向了原型对象,而 Person.prototype. constructor又指回了Person。原型对象中除了包含constructor属性之外,还包括后来添加的其他属性。Person的每个实例person1和pereon2都包含一个内部属性,该属性仅仅指向了Person.prototype；换句话说, 它们与构造函数没有直接的关系。此外,要格外注意的是,虽然这两个实例都不包含属性和方法,但我们却可以调用person1.sayName()。这是通过查找对象属性的过程来实现的。   

###### getPrototypeOf()：获取对象的原型
```javascript
console.log(Object.getPrototypeOf(person1) == Person.prototype) // true
console.log(Object.getPrototypeOf(person1).name) // Nicholas
```
第一行代码说明getPrototypeOf()获取到了对象的原型，第二行代码取到了对象原型的name属性，使用Object.getPrototypeOf()方便的取到了对象的原型，这在利用原型实现继承是非常重要的。    

```javascript
var person1 = new Person()
var person2 = new Person()
person1.name = 'Greg'
console.log(person1.name) // Greg
console.log(person2.name) // Nicholas
person1.name = null
console.log(person1.name) // null
delete person1.name
console.log(person1.name) // Nicholas
```
访问person1的name的时候，解析器发现person1实例上面有name属性'Greg'，而访问person2的name的时候，实例上面没有发现name属性，就继续访问person的原型构造函数Person，发现在原型上面有name属性'Nicholas',说明我们在给原型实例添加相同属性名字的时候，在访问此实例的时候阻止向下继续访问原型的相同属性，而不会修改原型相同属性的属性值。    
如果使用delete，就会完全删除实例上面的属性，从而解析器继续访问原型上面的属性。    
###### hasOwnProperty(): 返回指定属性是否存在于实例中，存在于实例就返回true，否在返回false。
```javascript
var person1 = new Person()
var person2 = new Person()
console.log(person1.hasOwnProperty('name')) // false
person1.name = 'Greg'
console.log(person1.hasOwnProperty('name')) // true
delete person1.name
console.log(person1.hasOwnProperty('name')) // false
```
##### 原型与in操作符
###### 在单独使用的时候，in操作符会通过对象访问指定的属性，能访问到就返回true,不管改属性是实例上面的还是原型上面。
```javascript
var person1 = new Person()
var person2 = new Person()
console.log('name' in person1) // true
person1.name = 'Greg'
console.log('name' in person1) // true
console.log('name' in person2) // true
```
```javascript
function hasPrototypeProperty(object, name) {
  return !object.hasOwnProperty(name) && (name in object)
}
var person1 = new Person()
console.log(hasPrototypeProperty(person1, 'name')) // true
person1.name = 'Greg'
console.log(hasPrototypeProperty(person1, 'name')) // false
```
由于in操作符通过对象能访问到就返回true，并且hasOwnProperty(attr)只要返回true，就说明当前属性在实例上面，取反就说明不在实例上面，两个条件同时符合，就说明当前属性在原型上面。    
###### for-in 循环返回的是能通过对象访问到的所有可以枚举的属性，不管是实例上面的还是原型上面的。
###### Object.keys()返回的是实例上面的属性的数组。
```javascript
function Person(){}
Person.prototype.name = 'Nicholas'
Person.prototype.age = 29
Person.prototype.job = 'software Engineer'
Person.prototype.sayName = function() {
  console.log(this.name)
}
var person1 = new Person()
person1.sex = 'man'
for (var attr in person1) {
  console.log(attr) // sex name age job sayName
}
console.log(Object.keys(person1)) // ["sex"]
```
##### 更简单的原型语法
```javascript
function Person(){}
Person.prototype = {
  name : 'Nicholas',
  age : 29,
  job : 'software Engineer',
  sayName : function() {
    console.log(this.name)
  }
}
```
此种语法看起来比上一种感觉书写起来更简单，同时这个和上面还是有一定的差异性的：
```javascript
var firend = new Person()
console.log(firend instanceof Object) // true
console.log(firend instanceof Person) // true
console.log(firend.constructor == Person) // false
console.log(firend.constructor == Object) // true
```
上面的代码能看到，用这种字面量的对象赋值给函数的原型，检测它的实例，是等于Object和Person的，但是实例的constructor却等于Object，不等于Person了，前面我们提过，没声明一个函数，同时也会创建一个prototype，并自动获取constructor，但是我们使用字面量这种方式，其实是重写了他的prototype，因此constructor重新指向了这个对象，那么他的constructor也就是Object，而不是Person，如果constructor你比较在意，可以使用如下方式重新指定：
```javascript
function Person(){}
Person.prototype = {
  name : 'Nicholas',
  age : 29,
  job : 'software Engineer',
  sayName : function() {
    console.log(this.name)
  }
}
Object.defineProperty(Person.prototype, 'constructor',{
  enumerable: false,
  value: person
})
```
##### 原型的动态性
由于在原型中在找值的过程是一次搜索,因此我们对原型对象所做的任何修改都使够立即从实例上反映出来———即使是先创建了实例后修改原型也照样如此,请看下面的例子。
```javascript
// 案例1
function Person(){}
var friend = new Person()
Person.prototype.name = 'Nicholas'
Person.prototype.age = 29
Person.prototype.job = 'software Engineer'
Person.prototype.sayName = function() {
  console.log(this.name)
}
friend.sayName() //Nicholas
```
以上代码先创建了Person的一个实例,并将其保存在friend,然后添加了一个方法
方法sayName。即使person实例是在添加新方法之前创建的,但它任然可
以访同这个新方法。其原因可以归结为实例与原型之间的松散连接关系,当我们调用friend.sayName()时，首先会在实例中搜索名为sayName的属性,在没找到的情况下,会继续技索原。.因为实例与原型之间的连接只不过是一个指针，而非一个副本,因此就可以在原型中找到新的sayName属性并返回保存在那里的函数。
尽管可以随时为原型添加属性性和方法,并且修改能够立即在所有对象实例中反映出来,但如果是重写整个原型对象,那情况就不一样了。我们知道，调用构造函数会为实例添加一个指向最初原型的[[Prototype]]指针，而把原型修改为另一个对象，就等于切断了构造函数与最初原型之间的联系。

> 实例中的指针仅指向原型,而不指向构造函数。看下面的例子。

```javascript
// 案例2
function Person(){}
var friend = new Person()
Person.prototype = {
  name : 'Nicholas',
  age : 29,
  job : 'software Engineer',
  sayName : function() {
    console.log(this.name)
  }
}
friend.sayName() //Uncaught TypeError: friend.sayName is not a function
```
<img src='/images/img-folder/hps/6/1.png'>


##### 原生对象的原型
```javascript
String.prototype.startsWith = function(text) {
  returnthis.indexOf(text) == 0;
}
var msg = "Hello word"
console.log(msg.startsWith('Hello')) // true
```
> 给原生对象添加方法理论上是可行的，但是不推荐这样做，这样做无意中修改了原生对象方法，造成方法的混乱和污染。

##### 原型对象的问题
```javascript
function Person(){}
var friend = new Person()
Person.prototype = {
  name : 'Nicholas',
  age : 29,
  job : 'software Engineer',
  friends: ['a','b','c'],
  sayName : function() {
    console.log(this.name)
  }
}
var person1 = new Person()
var person2 = new Person()
person1.friends.push('d')
console.log(person1.friends) // ["a", "b", "c", "d"]
console.log(person2.friends) // ["a", "b", "c", "d"]
```
#### 组合使用构造函数模式和原型模式
创建自定义类型的最常见方式,就是组合使用构造甬致模式与原型模式。构造函数模式于定义实例属性,而原型模式用于定义方法和共享的属性。结果,每个实例都会有自己的一份实例属性的副本,但同时又共享着对方方法的引用,最大限度地节省了内存。另外,这种混成模式还支持向构造函数传递参数;可谓是集两种模式之长。
```javascript
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.firends = ['a', 'b']
}
Person.prototype = {
  constructor: Person,
  sayName: function() {
    console.logh(this.name)
  }
}
var person1 = new Person('Nicholas', 29, 'software Engineer')
var person2 = new Person('Nicholas1', 27, 'doctor')
person1.firends.push('c')
console.log(person1.firends)
console.log(person2.firends)
```
在这个例子中,实例属性都是在构造函数中定义的,而由所有实例共享的属性 constructor和方法sayName ()则是在原型中定义的。而修改了person.friends(向其中添加一个新字符申),并不会影响到 person2.triends,因为它们分别可引用了不同的数组。
这种构造函数与原型混成的模式,是目前在 ECMAScript中使用最广泛、认同度最高的一种创建自定义类型的方法,可以说,这是用来定义引用类型的一种默认模式。
#### 动态原型模式
动态原型模式解决的问题是：有OO语言（面向对象）的经验开发者来说，看见独立的构造函数和原型时，会感到非常的困惑。这种模式，把所有信息封装到函数中，而通过在函数中初始化原型（必要的情况下）,保持了同时使用构造函数和原型的好处，换句话说，就是和上一个模式没什么区别，就是换了一种写法。
```javascript
function Person(name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.firends = ['a', 'b']
  if (typeof this.sayName != 'function') {
    Person.prototype.sayName = function() {
      console.log(this.name)
    }
  }
}
var person1 = new Person('Nicholas', 29, 'software Engineer')
person1.firends.push('c')
var person2 = new Person('Nicholas1', 27, 'doctor')
person1.sayName()
console.log(person1.sayName === person2.sayName) // true
console.log(person1.firends) // ["a", "b", "c"]
console.log(person2.firends) // ["a", "b"]
```
> 在使用动态模式的时候，千万不能使用对象重写函数的原型，前面说过，这样重写的话，就会切断所有实例与新原型之间的关系。

#### 寄生构造函数模式
```javascript
function SpecialArray(){
    var values = new Array();
    values.push.apply(values, arguments);
    values.toPipedString = function(){
        return this.join("|");
    }
    return values;
}
var a = new SpecialArray(2,6,8,9,4);
a.toPipedString();
var b = SpecialArray(2,6,8,9,4);
b.toPipedString();
```
此模式个人感觉和工厂模式没有什么大的区别，仅个人观点，也觉得没有什么大的用处，知道听说过这个概念得了。
#### 稳妥构造函数模式
> 道格拉斯·克罗克福德发明了JavaScript中稳妥对象（durable objects）这一概念。
所谓稳妥是指没有公共属性，而且其方法也不引用this的对象。
稳妥构造函数遵循与寄生构造函数类似的模式，但有两点不同：一是新创建对象的实例方法不引用this，二是不使用new操作符调用构造函数。

```javascript
function Person(name,age,job){
    //创建要返回的对象
    var o=new Object();
    //可以在这里定义私有变量和函数
    //添加方法
    o.sayName=function(){
      alert(name);
    }
    //返回对象
    return o;
}
var friend=Person("Nicholas",29,"Software Engineer");
friend.sayName();//"Nicholas"
```
##### 稳妥构造函数模式特点
1.函数会返回的对象，通过对象的方法我们可以访问或修改内部数据。
2.不可以通过为函数添加方法来访问、修改函数的内部数据。

> 以这种模式创建的对象中，除了使用sayName()方法之外，没有其他办法访问name的值。即使有其他代码会给这个对象添加方法或数据成员，但也不可能有别的方法访问传入到构造函数中的原始数据。稳妥构造函数模式提供的这种安全性，使得它非常适合在某些安全执行环境提供的环境下使用。

这个模式具体了解，请访问：https://blog.csdn.net/maomaolaoshi/article/details/73928094

### 继承
ECMAScript的继承，主要是用原型链来实现的。
#### 原型链
ECMAScript中描述了原型链的概念,并将原型链作为实现维承的主要方法。其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法。简单回顾一下构造函数、原型和实例的关系:每个构造函数都有一个原型对象,原型对象都包含一个指向构造函数的指针,而实例都包含一个指向原型对象的内部指针。那么,假如我们让原型对象等于另一个类型的实例,结果会怎么样呢?显然,此时的原型对象将包含一个指向另一个原型的指针,相应地,另一个原型中也包含着一个指向另一个构造函数的指针。假如另一个原型又是另一个类型的实例,那么上述关系依然成立,如此层层递进,就构成了实例与原型的链条。这就是所谓原型链的基本概念。
```javascript
function SuperType(){
  this.property = true;
}
SuperType.prototype.getSuperValue = function() {
  return this.property;
}
function SubType() {
  this.subproperty = false;
}
SubType.prototype = new SuperType()
SubType.prototype.getSubValue = function() {
  return this.subproperty;
}
var instance = new SubType();
console.log(instance.getSuperValue()) // true
console.log(instance.getSubValue()) // false
```
以上代码定义了两个类型: BuperType和SubTye,每个类型分别有一个属性和一个方法。它们的主要区别是subype继承了superType,而维承是通过创建Superlype的实例,并将该实例赋给subrype,prototype实现的,实现的本质是重写原型对象,代之以一个新类型的实例。换句话说,1来存在于super'ype的实例中的所有属性和方法,现在也存在于subType. prototype中了。在确立了维承关系之后,我们给subrype, prototype添加了一个方法,这样就在维承了superType的属性和方法的基础上义添加了一个新方法,这个例子中的实例以及构造函数和原型之间的关系如图6-4所示。
<img src='/images/img-folder/hps/6/2.png'>

在上面的代码中,我们没有使用subType认提供的原重,而是给它换了一个新原型:这个新原型就是Supertype的实例。于是,新原型不仅具有作为一个supertype的实例所拥有的全部属性和方法,而且其内部还有一个指针,指向了 Supertype 的原型。最终结果就是这样的;instance指向subype的原型,Subtype的原型又指向supertype的原型。getSuperValue()方法仍然还在Supertype.prototype 中,但property则位于subType.prototype中。这是因为property是一
个实例属性、而 getsuperValue()则是一个原型方法。既然 Subrype.prototype 现在是 supertype的实例,那么 property 当然就位于该实例中了。此外,要注意instance.constructor现在指向的是SuperType,这是因为原来subrype.prototype中的constructor被重写了的缘故。    

通过实现原型链,本质上扩展了本章前面介绍的原型搜索机制。读者大概还记得,当以读取模式访问一个实例属性时,首先会在实例中搜索该属性,如果没有找到该属性,则会继续搜索实例的原型。在通过原型链实现继承的情况下,搜索过程就得以沿着原型链继续向上,就拿上面的例子来说,调用Instance.getSuperVaiue()会经历三个搜索步骤:1)搜索实例;2)搜索 Subtype.prototype3)搜索 Supertype.prototype, 最后一步才会找到该方法。在找不到属性或方法的情况下,搜索过总是要一环一环地前行到原型做末端才会停下来。



