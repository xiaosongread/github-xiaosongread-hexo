---
layout: TypeScript
title: TypeScript 深入浅出
date: 2023-10-04 11:18:41
tags: TypeScript js
---

### 什么是 TypeScript?
TypeScript 是一种由微软开发的自由和开源的编程语言。它是 JavaScript 的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。

> 简而言之，TypeScript是JavaScript的超集，具有可选的类型并可以编译为纯JavaScript。从技术上讲TypeScript就是具有静态类型的 JavaScript 。

<!-- more -->

### 为什么需要 TypeScript?
+ TypeScript 具有类型系统，可以捕获在JavaScript中可能出现的类型错误。
+ TypeScript 还具有 ECMAScript 6（ES6）的所有功能，如类，模块，迭代器和生成器。
+ TypeScript 还具有 JavaScript 中没有的许多功能，如接口，类型断言，类型保护，类型别名，命名空间和模块重定向。

### TypeScript 安装
TypeScript 安装非常简单。

首先，你需要安装 Node.js。Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时。

安装 Node.js 后，你就可以使用 npm 命令安装 TypeScript。

```bash
npm install -g typescript
```

#### TypeScript 编译
TypeScript 编译器将 TypeScript 代码转换为 JavaScript 代码。

TypeScript 编译器在命令行上运行，如下所示：

```bash
tsc hello.ts
```

#### 生成 tsconfig.json 配置文件

```bash
tsc --init ​
```

#### 开启了监听模式 实时监测app.ts 同步到app.js

```bash
tsc app.ts -w
```
接着执行

```bash
node app.js 
```

#### TypeScript 编译选项
TypeScript 编译器有多个编译选项。

```bash
tsc --help
```
#### TypeScript 编译选项示例
```bash
tsc --target es5 --module commonjs hello.ts
```
#### TypeScript 编译选项
| 选项 | 描述 |
| --- | --- |
| --help | 显示帮助消息 |
| --version | 显示版本号 |
| --declaration | 生成相应的 .d.ts 文件 |
| --watch | 监视文件改变 |
| --removeComments | 删除所有注释 |
| --noImplicitAny | 在表达式和声明上有隐含的 any类型时报错 |
| --noImplicitThis | this 表达式的类型为 any 时报错 |
| --alwaysStrict | 以严格模式检查每个模块，并把“use strict”添加到每个输出文件 |
| --strictNullChecks | 启用严格的 Null 检查 |
| --strictFunctionTypes | 启用严格函数类型检查 |
| --strictPropertyInitialization | 启用严格检查属性初始化 |
| --strictBindCallApply | 启用严格检查 call、bind和apply的参数匹配和返回值 |
| --strictNullPropertyInitialization | 启用严格检查属性初始化 |
| --strict | 启用所有严格检查选项 |
| --noEmitOnError | 在有错误的情况下不生成输出文件 |
| --noEmit | 不生成输出文件 |
| --preserveConstEnums | 保留使用 const 和 enum 声明的枚举 |
| --allowJs | 允许编译 javascript 文件 |
| --checkJs | 报告 javascript 文件中的错误 |
| --nocheckJs | 不检查 javascript 文件 |
| --allowSyntheticDefaultImports | 允许从没有设置默认导出的模块中默认导入 |
| --noImplicitReturns | 函数表达式和函数声明必须有返回值 |
| --noFallthroughCasesInSwitch | 报告 switch 语句的 fallthrough 错误 |
| --noUnusedLocals | 报告未使用的本地变量 |
| --noUnusedParameters | 报告未使用的参数 |

### TypeScript 基础类型
js的数据类型 

```bash
number 、string、 null 、 undefined、 boolean、 object、  function、 array
```

ts新增的数据类型
```bash
any任意类型 enum 枚举 联合类型 字面量类型 unknown void
```

#### Boolean 类型
声明一个变量flag，同时指定它的类型为boolean
```ts
const flag: boolean = true;
```
#### Number 类型
声明一个变量a，同时指定它的类型为number
```ts
const count: number = 10;
```
#### String 类型
声明一个变量str，同时指定它的类型为string
```ts
let name: string = "树哥";
```
#### Array 类型
声明一个变量arr，同时指定它的类型为array
```ts
let arr: number[] = [1, 2, 3];
```
#### Enum 枚举类型
枚举类型用于定义数值集合，使用枚举我们可以定义一些带名字的常量。 使用枚举可以清晰地表达意图或创建一组有区别的用例。，如周一到周日，方位上下左右等

+ 普通枚举

```ts
enum Color {
  Red,
  Green,
  Blue
}
const c: Color = Color.Red;
const c1: Color = Color.Green;
console.log(c, c1); // 0 1
```
以上代码转化后的代码为：
```js
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Red;
var c1 = Color.Green;
console.log(c, c1);
```

> 初始值默认为 0 其余的成员会会按顺序自动增长 可以理解为数组下标

+ 设置初始值

```ts
enum Color {
  RED = 2,
  PINK,
  BLUE,
}
const pink: Color = Color.PINK;
console.log(pink); // 3
```

+ 字符串枚举

```ts
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue",
}
const Red: Color = Color.Red;
console.log(Red) // "red"
```

+ 常量枚举

使用 **const 关键字修饰的枚举**，
常量枚举与普通枚举的区别是，整个枚举会在编译阶段被删除 我们可以看下编译之后的效果

```ts
const enum Color {
  Red,
  Green,
  Blue,
}
const color: Color[] = [Color.Red, Color.Green, Color.Blue];
console.log(color); //[0, 1, 2]

// 编译后、
const enum Color {
  Red,
  Green,
  Blue,
}
const color: Color[] = [Color.Red, Color.Green, Color.Blue];
console.log(color); //[0, 1, 2]
```

#### Array 数组类型
对数组类型的定义有两种方式:

```ts
const arr: number[] = [1, 2, 3];
const arr1:Array<number> = [1, 2, 3];
```

#### 元组（tuple）类型
上面数组类型的方式，只能定义出内部全为同种类型的数组。对于内部不同类型的数组可以使用元组类型来定义
元组（ Tuple ）表示一个已知数量和类型的数组,可以理解为他是一种特殊的数组

元组，就是固定长度的数组     语法：`[类型, 类型, 类型]`

  `const tuple: [number, string] = [1, "zhangmazi"];`

> 需要注意的是，元组类型只能表示一个已知元素数量和类型的数组，长度已指定，越界访问会提示错误。例如，一个数组中可能有多种类型，数量和类型都不确定，那就直接`any[]`。

#### null、undefined 类型
默认情况下 `null` 和 `undefined` 是所有类型的子类型。 也就是说你可以把 `null` 和 `undefined` 赋值给其他类型。
```ts
  let a: undefined = undefined;
  let b: null = null;
 
  let str: string = 'zhangmazi';
  str = null; // 编译正确
  str = undefined; // 编译正确
```

如果你在`tsconfig.json`指定了"strictNullChecks":true ，即开启严格模式后， `null` 和 `undefined` 只能赋值给 `void` 和它们各自的类型。 

> `null` 和 `undefined` 只能给它们自己的类型赋值
```ts
// 启用 --strictNullChecks
let x: number;
x = 1; // 编译正确
x = undefined;    // 编译错误
x = null;    // 编译错误

// 但是 undefined 可以给 void 赋值

let c:void = undefined // 编译正确
let d:void = null // 编译错误
```

#### any 类型
+ any会跳过类型检查器对值的检查，任何值都可以赋值给any类型 any类型就是js（建议不要用）
+ ts会有命名规范，不能命名为any
+ any 表示的是任意类型，一个变量设置类型为any后相当于对该变量关闭了TS的类型检测
+ 声明变量如果不指定类型，则TS解析器会自动判断变量的类型为any （隐式的any）
+ any是可以赋值任何类型

```ts
let value: any = 1;
value = "zhangmazi"; // 编译正确
value = []; // 编译正确
value = {};// 编译正确
```
#### void 类型
`void` 意思就是无效的, 一般只用在函数上，告诉别人这个函数没有返回值。

```ts
function sayHello(): void {
  console.log("hello 啊，树哥！");
}
```

#### never 类型
抛出异常

never 类型表示的是那些永不存在的值的类型。 
例如never 类型是那些总是会**抛出异常**或根本就不会有返回值的**函数表达式**或**箭头函数表达式**的返回值类型

值会永不存在的两种情况：
1. 如果一个函数执行时抛出了异常，那么这个函数永远不存在返回值（因为抛出异常会直接中断程序运行，这使得程序运行不到返回值那一步，即具有不可达的终点，也就永不存在返回了）
2. 函数中执行无限循环的代码（死循环），使得程序永远无法运行到函数返回值那一步，永不存在返回。

```ts
// 异常
function error(msg: string): never { // 编译正确
  throw new Error(msg); 
}
 
// 死循环
function loopForever(): never { // 编译正确
  while (true) {};
}
```
#### Unknown 类型

`unknown` 与 `any` 一样，所有类型都可以分配给 `unknown`:
`unknown` 表示未知类型的值
只能赋值给`unkonwn` `any`
```ts
  let value: unknown = 1;
  value = "zhangmazi"; // 编译正确
  value = false; // 编译正确
```
`unknown`与`any`的最大区别是：

> 任何类型的值可以赋值给`any`，同时`any`类型的值也可以赋值给任何类型。
`unknown` 任何类型的值都可以赋值给它，但它只能赋值给`unknown`和`any`

### 对象类型
这里所说的对象类型，就是我们常说的函数、{}、数组、类

#### object、 Object 、 {} 类型

+ object
`object` 类型用于表示所有的非原始类型，即我们不能把 `number`、`string`、`boolean`、`symbol`等 原始类型赋值给`object`。在严格模式下，`null` 和 `undefined` 类型也不能赋给 `object`。

```ts

let object: object;
object = 1; // 报错
object = "a"; // 报错
object = true; // 报错
object = null; // 报错
object = undefined; // 报错
object = {}; // 编译正确
```

+ Object
大 `Object` 代表所有拥有 `toString`、`hasOwnProperty` 方法的类型 所以所有原始类型、非原始类型都可以赋给 `Object`(严格模式下 `null` 和 `undefined` 不可以)

```ts
let bigObject: Object;
bigObject = 1; // 编译正确
bigObject = "a"; // 编译正确
bigObject = true; // 编译正确
bigObject = null; // 报错
bigObject = undefined; // 报错
bigObject = {}; // ok
```

+ {}
{} 空对象类型和大 Object 一样 也是表示原始类型和非原始类型的集合

#### 类
在 TypeScript 中，我们通过 `Class` 关键字来定义一个类

```ts
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  sayHello():void {
    console.log(`Hi, ${this.name}`);
  }
}
// 编译后的代码
var Person = /** @class */ (function () {
    function Person(name, age) {
        this.name = name;
        this.age = age;
    }
    Person.prototype.sayHello = function () {
        console.log("Hi, ".concat(this.name));
    };
    return Person;
}());
```

#### 数组
```ts
const arr: number[] = [1, 2, 3];
const arr1: Array<number> = [1, 2, 3];
```

#### 函数
##### 函数声明
```ts
function add(x: number, y: number): number {
  return x + y;
}
```

##### 函数表达式
```ts
let add = function (x: number, y: number): number {
  return x + y;
}
```
##### 接口定义函数
```ts
interface Add{
  (x: number, y: number): number;
}
```
##### 可选参数
```ts
function Add(x: number, y: number, z?: number): number {
  if (z) {
    return x + y + z;
  } else {
    return x + y;
  }
}
```
##### 默认参数
```ts
function add(x: number, y: number = 0): number {
  return x + y;
}
```
##### 剩余参数
```ts
function add(...numbers: number[]): number {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}
```

##### 函数重载
函数重载或方法重载是使用相同名称和不同参数数量或类型创建多个方法的一种能力。
```ts
function add(x: number, y: number): number;
function add(x: string, y: string): string;
function add(x: any, y: any): any {
  return x + y;
}
```

上面示例中，我们给同一个函数提供多个函数类型定义，从而实现函数的重载

> **函数重载**真正执行的是同名函数***最后定义的函数体*** 在最后一个函数体定义之前全都属于函数类型定义 ***不能写具体的函数实现方法，只能定义类型***

### 类型推论
如果没有明确的指定类型，那么 TypeScript 会依照类型推论的规则推断出一个类型。
```ts
let x = 1;
x = true; // 报错
// 上面的代码等价于

let x: number = 1;
x = true; // 报错
```
通过上述示例我们可以看出，我们没有给 x 指定明确类型的时候，typescript 会推断出 x 的类型是 number。
而如果定义的时候没有赋值，不管之后有没有赋值，都会被推断成 any 类型而完全不被类型检查：
```ts
let x;
x = 1; // 编译正确
x = true; // 编译正确
```
### 类型断言
某些情况下，我们可能比typescript更加清楚的知道某个变量的类型，所以我们可能希望手动指定一个值的类型
类型断言有两种方式:
1. 尖括号语法
```ts
let str = "my name is zhangsan"
let strLength: number = (<string>str).length
console.log(strLength)
```
2. as语法
```ts
let str = "my name is zhangsan"
let strLength: number = (str as string).length
console.log(strLength)
```
#### 非空断言
在上下文中当类型检查器无法断定类型时，可以使用缀表达式操作符 ! 进行断言操作对象是非 null 和非 undefined 的类型，**即x!的值不会为 null 或 undefined**

```ts
let user: string | null | undefined;
console.log(user!.toUpperCase()); // 编译正确
console.log(user.toUpperCase()); // 错误
```
#### 确定赋值断言

```ts
let value:number
console.log(value); // Variable 'value' is used before being assigned.
```

我们定义了变量, 没有赋值就使用，则会报错
通过 let x!: number; 确定赋值断言，TypeScript 编译器就会知道该属性会被明确地赋值。

```ts
let value!:number
console.log(value); // undefined 编译正确
```

### 联合类型
联合类型用` | `分隔，表示取值可以为多种类型中的一种

可以使用` | `来连接多个类型（联合类型）
```ts
let n:string|number
n = 'to be or not to be'
n = 1
console.log(n) // 1
```

### 类型别名
类型别名用来给一个类型起个新名字。它只是起了一个新名字，并没有创建新类型。类型别名常用于联合类型。

```ts
type count = number | number[];
function hello(value: count) {}
```

### 交叉类型
交叉类型就是跟联合类型相反，用` & `操作符表示，交叉类型就是两个类型必须存在
```ts
interface IpersonA{
  name: string,
  age: number
}
interface IpersonB {
  name: string,
  gender: string
}
 
let person: IpersonA & IpersonB = { 
    name: "师爷",
    age: 18,
    gender: "男"
};
```
`person` 即是 `IpersonA` 类型，又是 `IpersonB` 类型

注意：交叉类型取的多个类型的并集，但是如果key相同但是类型不同，则该key为 `never` 类型

```ts
interface IpersonA {
    name: string
}
 
interface IpersonB {
    name: number
}
 
function testAndFn(params: IpersonA & IpersonB) {
    console.log(params)
}
 
testAndFn({name: "黄老爷"}) // error TS2322: Type 'string' is not assignable to type 'never'.

// 一下代码不会报错，因为取的是并集，没有冲突

interface IpersonA {
    name: string
}
 
interface IpersonB {
    age: number
}
 
function testAndFn(params: IpersonA & IpersonB) {
    console.log(params)
}
 
testAndFn({name: "黄老爷", age: 18})
```

### 类型守卫
**类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内**。 换句话说，类型保护可以保证一个字符串是一个字符串，尽管它的值也可以是一个数值。类型保护与特性检测并不是完全不同，其主要思想是尝试检测属性、方法或原型，以确定如何处理值。

换句话说：**类型守卫是运行时检查，确保一个值在所要类型的范围内**。

目前主要有四种的方式来实现类型保护：

#### · in 关键字

```ts
interface InObj1 {
    a: number,
    x: string
}
interface InObj2 {
    a: number,
    y: string
}
function isIn(arg: InObj1 | InObj2) {
    // x 在 arg 打印 x
    if ('x' in arg) console.log('x')
    // y 在 arg 打印 y
    if ('y' in arg) console.log('y')
}
isIn({a:1, x:'xxx'});
isIn({a:1, y:'yyy'});
```
#### · typeof 关键字

```ts
function isTypeof( val: string | number): string{
  if (typeof val === "number") return 'number'
  if (typeof val === "string") return 'string'
  return '啥也不是'
}
console.log(isTypeof('bool')) // string
```

> typeof 只支持：typeof 'x' === 'typeName' 和 typeof 'x' !== 'typeName'，x 必须是 'number', 'string', 'boolean', 'symbol'。

#### · instanceof

```ts
function creatDate(date: Date | string){
    console.log(date)
    if(date instanceof Date){
        date.getDate()
    }else {
        return new Date(date)
    }
}
console.log(creatDate('2020-01-01')) // 2020-01-01T00:00:00.000Z
```
#### · 自定义类型保护的类型谓词

```ts
function isNumber(num: any): num is number {
    return typeof num === 'number';
}
function isString(str: any): str is string{
    return typeof str=== 'string';
}

console.log(isNumber(1), isString(1)) // true false
console.log(isNumber('1'), isString('1')) // // false true
```

### 接口
我们使用接口来定义对象的类型。接口是对象的状态(属性)和行为(方法)的抽象(描述)
简单理解就是：为我们的代码提供一种约定
我们使用关键字 `interface` 来声明接口

```ts
interface Person {
  name: string
  age: number
}
let song:Person = {
  name: 'song',
  age: 32
}
```
我们定义了一个接口 Person，接着定义了一个变量 song，它的类型是 Person。这样，我们就约束了 song 的形状必须和接口 Person 一致。

> **接口一般首字母大写**。(当然挺多人也习惯 I 大写字母开头，用来表示这是一个接口)

#### 设置接口可选|只读

```ts
interface Person {
  readonly name: string
  age?: number
  [propName: string]: any
}
let song:Person = {
  name: 'song'
}
// song.name = 'zhang' // 无法为“name”赋值，因为它是只读属性。ts(2540)
```

+ 可选属性，我们最常见的使用情况是，不确定这个参数是否会传，或者存在。

+ 只读属性用于限制只能在对象刚刚创建的时候修改其值。此外 TypeScript 还提供了 ReadonlyArray 类型，它与 Array 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改。

#### 索引签名
有时候我们希望一个接口中除了包含必选和可选属性之外，还允许有其他的任意属性，这时我们可以使用 索引签名 的形式来满足上述要求。

需要注意的是，一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集
```ts
interface Person {
  name: string
  [prop: string]: any; //  prop字段必须是 string类型 or number类型。 值是any类型，也就是任意的

}
let song:Person = {
  name: 'song'
}
song.sex = '男'
// song[true] = true // 类型“true”不能作为索引类型使用。ts(2538)
song[1] = false
console.log(song) // { '1': false, name: 'song', sex: '男', flag: true }
```
#### 接口与类型别名的区别
实际上，在大多数的情况下使用接口类型和类型别名的效果等价，但是在某些特定的场景下这两者还是存在很大区别。

> TypeScript 的核心原则之一是对值所具有的结构进行类型检查。 而接口的作用就是为这些类型命名和为你的代码或第三方代码定义数据模型。

> type(类型别名)会给一个类型起个新名字。 type 有时和 interface 很像，但是可以作用于原始值（基本类型），联合类型，元组以及其它任何你需要手写的类型。起别名不会新建一个类型 - 它创建了一个新名字来引用那个类型。给基本类型起别名通常没什么用，尽管可以做为文档的一种形式使用。

+ 接口和类型别名都可以用来描述对象或函数的类型，只是语法不同

```ts
type MyType = {
  name: string;
  say(): void;
}
 
interface MyInterface {
  name: string;
  say(): void;
}

function getMyType(obj: MyType): MyType {
  return obj;
}
function getMyInterface(obj: MyInterface): MyInterface {
  return obj;
}

getMyType({ name: 'song', say: () => { } })
getMyInterface({ name: 'song', say: () => { } })
```

+ 都允许扩展

1. interface 用 extends 来实现扩展
```ts
interface MyInterface {
  name: string;
  say(): void;
}
 
interface MyInterface2 extends MyInterface {
  sex: string;
}
 
let person:MyInterface2 = {
  name:'树哥',
  sex:'男',
  say(): void {
    console.log("hello 啊，树哥！");
  }
}
```
2. type 使用 & 实现扩展
```ts

type MyType = {
  name:string;
  say(): void;
}
type MyType2 = MyType & {
  sex:string;
}
let value: MyType2 = {
  name:'树哥',
  sex:'男',
  say(): void {
    console.log("hello 啊，树哥！");
  }
}
```
#### 不同点
+ interface能够合并声明，而type不行
```ts
interface Person {
  name: string
}
interface Person {
  age: number
}
// 此时Person同时具有name和age属性
```
+ type可以声明基本数据类型别名/联合类型/元组等，而interface不行
```ts
// 基本类型别名
type UserName = string;
type UserName = string | number;
// 联合类型
type Animal = Pig | Dog | Cat;
type List = [string, boolean, number];
```

### 泛型
泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。

举个例子，比如我们现在有个这样的需求，我们要实现一个这样的函数，函数的参数可以是任何值，返回值就是将参数原样返回，并且参数的类型是 string，函数返回类型就为 string？

你很容易写下：
```ts
function getValue(arg:string):string  {
  return arg;
}
```
现在需求有变，需要返回一个 `number` 类型的值，你会说，联合类型就完事了：
```ts
function getValue(arg:string | number):string | number  {
  return arg;
}
```
但是这样又有一个问题，就是如果我们需要返回一个 boolean 类型，string 数组甚至任意类型呢，难道有多少个就写多少个联合类型？

是的，我们直接用 `any` 就行了！
```ts
function getValue(arg:any):any  {
  return arg;
}
```
尽管 any 大法好，很多时候 any 也确实能够解决不少问题，但是这样也不符合我们的需求了，传入和返回都是 any 类型，**传入和返回并没有统一**。

***这个时候就要祭出我们的泛型了***。
#### 基本使用
泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

上面的需求，我们如果用泛型来解决的话：
```ts
function getValue<T>(arg:T):T  {
  return arg;
}
```
泛型的语法是尖括号 <> 里面写类型参数，一般用 T 来表示第一个类型变量名称，其实它可以用任何有效名称来代替,比如我们用NIUBI也是编译正常的

> 泛型就像一个占位符一个变量，在使用的时候我们可以将定义好的类型像参数一样传入，原封不动的输出。

#### 使用
我们有两种方式来使用：

+ 定义要使用的类型，比如：
```ts
getValue<string>('树哥'); // 定义 T 为 string 类型
```
+ 利用 typescript 的类型推断，比如：
```ts
getValue('树哥') // 自动推导类型为 string
```

#### 多个参数
其实并不是只能定义一个类型变量，我们可以引入希望定义的任何数量的类型变量。比如我们引入一个新的类型变量 U
```ts
function getValue<T, U>(arg:[T,U]):[T,U] {
  return arg;
}
 
// 使用
const str = getValue(['树哥', 18]);
```

ts 自动识别以上代码为:

> function getValue<string, number>(arg: [string, number]): [string, number]
**typescript 给我们自动推断出输入、返回的类型**

#### 泛型约束
因为泛型 T 不一定包含属性 length，那么我想 getLength 这个函数只允许传入包含 length 属性的变量，该怎么做呢

这时，我们可以使用 `extends` 关键字来对泛型进行约束
```ts
interface Lengthwise {
  length: number;
}
 
function getLength<T extends Lengthwise>(arg:T):T  {
  console.log(arg.length); 
  return arg;
}
```
使用：

```ts
const str = getLength('树哥')
const arr = getLength([1,2,3])
const obj = getLength({ length: 5 })
```

> 这里可以看出，不管你是 str，arr 还是obj，只要具有 length 属性，都可以

#### 泛型接口

```ts
interface KeyValue<T,U> {
  key: T;
  value: U;
}
 
const person1:KeyValue<string,number> = {
  key: '树哥',
  value: 18
}
const person2:KeyValue<number,string> = {
  key: 20,
  value: '张麻子'
}
```

#### 泛型类
```ts
class Test<T> {
  value: T;
  add: (x: T, y: T) => T;
}
 
let myTest = new Test<number>();
myTest.value = 0;
myTest.add = function (x, y) {
  return x + y;
};
```
#### 泛型类型别名
```ts
type Cart<T> = { list: T[] } | T[];
let c1: Cart<string> = { list: ["1"] };
let c2: Cart<number> = [1];
```
#### 泛型参数的默认类型
我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。有点 js 里函数默认参数的意思。

```ts
function createArray<T = string>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
```
#### 泛型工具类型
+ typeof

关键词除了做类型保护，还可以从实现推出类型

```ts
//先定义变量，再定义类型
let p1 = {
  name: "树哥",
  age: 18,
  gender: "male",
};
type People = typeof p1;
function getName(p: People): string {
  return p.name;
}
getName(p1);
```
+ keyof

可以用来获取一个对象接口中的所有 key 值

```ts
interface Person {
  name: string;
  age: number;
  gender: "male" | "female";
}
 
type PersonKey = keyof Person; //type PersonKey = 'name'|'age'|'gender';
 
function getValueByKey(p: Person, key: PersonKey) {
  return p[key];
}
let val = getValueByKey({ name: "树哥", age: 18, gender: "male" }, "name");
console.log(val); // 树哥
```
+ in

用来遍历枚举类型：

```ts
type Keys = "a" | "b" | "c"
type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any, c: any }

const obj: Obj = {
  a: 1,
  b: 2,
  c: '3'
}
const keys: Keys[] = ["a", "b", "c"]
```
+ infer

在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用。

```ts
type ReturnType<T> = T extends (
  ...args: any[]
) => infer R ? R : any;
```

+ extends

有时候我们定义的泛型不想过于灵活或者说想继承某些类等，可以通过 `extends` 关键字添加泛型约束。

```ts
interface Lengthwise {
  length: number;
}
 
function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：
```ts
loggingIdentity(3);  // Error, number doesn't have a .length property
```

当我们传入合法的类型的值，即包含 length 属性的值时：
```ts
loggingIdentity({length: 10, name: '张麻子'}); // 编译正确
```

+ 索引访问操作符

使用 [] 操作符可以进行索引访问：
```ts
interface Person {
  name: string;
  age: number;
}
 
type x = Person["name"]; // x is string
```
#### 内置工具类型
+ Required

将类型的属性变成必选

```ts
interface Person {
    name?: string,
    age?: number,
    hobby?: string[]
}
 
const user: Required<Person> = {
    name: "树哥",
    age: 18,
    hobby: ["code"]
}
```
+ Partial

与 Required 相反，将所有属性转换为可选属性
```ts
interface Person {
    name: string,
    age: number,
}
const shuge:Person = {
  name:'树哥'
} // error  Property 'age' is missing in type '{ name: string; }' but required in type 'Person'.
```

从上面知道，如果必传而我们少穿传了的话，就会报错

我们使用 `Partial` 将其变为可选

```ts
type User = Partial<Person>
 
const shuge: User={
  name:'树哥'
} // 编译正确
```

+ Exclude

Exclude<T, U> 的作用是将某个类型中属于另一个的类型移除掉,剩余的属性构成新的类型

```ts
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```
+ Extract

和 Exclude 相反，Extract<T,U> 从 T 中提取出 U。

```ts
type T0 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type T1 = Extract<string | number | (() => void), Function>; // () =>void
```

+ Readonly

把数组或对象的所有属性值转换为只读的，这就意味着这些属性不能被重新赋值。

```ts
interface Person {
  name: string;
  age: number;
  gender?: "male" | "female";
}
 
let p: Readonly<Person> = {
  name: "hello",
  age: 10,
  gender: "male",
};
p.age = 11; // error  Cannot assign to 'age' because it is a read-only property.
```

+ Record

`Record<K extends keyof any, T> `的作用是将 K 中所有的属性的值转化为 T 类型。

```ts
type Property = 'key1'|'key2'
type Person = Record<Property, string>;
 
const p: Person = {
  key1: "hello 啊",
  key2: "树哥",
};
```

+ Pick

从某个类型中挑出一些属性出来

```ts
type Person = {
  name: string;
  age:number;
  gender:string
}
 
type P1 = Pick<Person, "name" | "age">; // { name: string; age: number; }
 
const user:P1={
  name:'树哥',
  age:18
}
```

+ Omit

与Pick相反，Omit<T,K> 从T中取出除去K的其他所有属性

```ts
interface Person {
  name: string,
  age: number,
  gender: string
}
type P1 = Omit<Person, "age" | "gender">
const user:P1  = {
  name: '树哥'
}
```

+ NonNullable

去除类型中的 null 和 undefined

```ts
type P1 = NonNullable<string | number | undefined>; // string | number
type P2 = NonNullable<string[] | null | undefined>; // string[]
```

+ ReturnType

用来得到一个函数的返回值类型

```ts
type Func = (value: string) => string;
const test: ReturnType<Func> = "1";
```

+ Parameters

用于获得函数的参数类型所组成的元组类型。

```ts
type P1 = Parameters<(a: number, b: string) => void>; // [number, string]
```

+ InstanceType

返回构造函数类型T的实例类型

```ts
class C {
  x = 0;
  y = 0;
}
 
type D = InstanceType<typeof C>;  // C
```

### tsconfig.json
在文章开头环境安装部分，记得我们有生成一个 tsconfig.json 文件，那么这个文件究竟有什么用呢

tsconfig.json 是 TypeScript 项目的配置文件。

tsconfig.json 包含 TypeScript 编译的相关配置，通过更改编译配置项，我们可以让 TypeScript 编译出 ES6、ES5、node 的代码。

#### 重要字段
+ files - 设置要编译的文件的名称；
+ include - 设置需要进行编译的文件，支持路径模式匹配；
+ exclude - 设置无需进行编译的文件，支持路径模式匹配；
+ compilerOptions - 设置与编译流程相关的选项。

#### compilerOptions 选项

```js
{
  "compilerOptions": {
 
    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.
 
    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'
 
    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）
 
    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。
 
    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性
 
    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```
### 补充

#### 构造函数
```ts
//ts构造函数
class Dog {
    //ts规范 属性的类型 
    name: string;
    age: number;
    //构造函数 什么时候调用 创建实例的时候调用
    //可以通过this在新建的对象中添加属性
    //this.name = "旺财"
    constructor(name1: string, age1: number) {
        this.name = name1;
        this.age = age1;
    }
    bark() {
        alert("汪汪汪～～～～")
    }
}
const dog = new Dog('小黑', 2)
console.log("🚀 ~ file: 01-构造函数.ts ~ line 33 ~ dog", dog)
const dog1 = new Dog('小白', 6)
console.log("🚀 ~ file: 01-构造函数.ts ~ line 35 ~ dog1", dog1)
 
dog.bark();
dog1.bark();
```
#### 继承

设置一个父级class用来继承

```ts
(function () {
    class Animal {
        //ts规范 属性的类型 
        name: string;
        age: number;
        //构造函数 什么时候调用 创建实例的时候调用
        //可以通过this在新建的对象中添加属性
        //this.name = "旺财"
        constructor(name1: string, age1: number) {
            this.name = name1;
            this.age = age1;
        }
        bark() {
            console.log("汪汪汪～～～～")
        }
    }
    /*Dog extends Animal 
      - Animal 父类
      - Dog被称为子类
      - 使用继承后 子类拥有父类所有的属性和方法
      - 如果子类和父类有同名的方法 则会覆盖父类的方法  叫做方法重写
    */
    class Dog extends Animal {
 
    }
    class Cat extends Animal {
        bark() {
            console.log('喵喵喵～～～～');
 
        }
 
    }
    
    const dog = new Dog('大黄', 8)
    dog.bark()
    console.log("🚀 ~ file: 02-继承.ts ~ line 24 ~ dog", dog)
    const cat = new Cat('布丁', 1)
    cat.bark()
    console.log("🚀 ~ file: 02-继承.ts ~ line 42 ~ cat", cat)
})()
```
#### super

当子类需要添加需求时，用super把父组件的数据继承过来，不然容易造成覆盖

```ts

(function () {
    class Animal {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
        sayHello() {
            console.log("动物在叫～～～")
        }
    }
    class Dog extends Animal {
        age: number;
        constructor(name: string, age: number) {
            super(name)//父类 
            this.age = age
        }
        //1:重写
        // sayHello(): void {
        //     console.log('汪汪汪～～')
        // }
        // super调用
        sayHello(): void {
            super.sayHello()
        }
    }
 
    const dog = new Dog('旺财', 3)
    dog.sayHello();
})()
```
#### 抽象

abstract：

以abstract开头的类是抽象类， 抽象类和其他类区别不大，只是不能用来创建对象，抽象类就是专门用来被继承的类， 抽象类中可以添加抽象方法（但有一个坑就是ts他只会提醒你，还是会被浏览器识别的，我们用ts就是为了规范代码，添加这个数据可以提醒你这个类是父类，不能修改使用的）

```ts
(function () {
    /*
*   以abstract开头的类是抽象类，
*       抽象类和其他类区别不大，只是不能用来创建对象
*       抽象类就是专门用来被继承的类
*
*       抽象类中可以添加抽象方法
* */
    abstract class Animal {
        name: string;
        constructor(name: string) {
            this.name = name;
        }
        // 定义一个抽象方法
        // 抽象方法使用 abstract开头，没有方法体
        // 抽象方法只能定义在抽象类中，子类必须对抽象方法进行重写
        abstract sayHello(): void
        eat() {
            console.log("吃小孩～～～～")
        }
    }
    class Dog extends Animal {
        sayHello(): void {
            console.log('汪汪汪汪！');
        }
    }
    class Cat extends Animal {
        sayHello(): void {
            console.log('喵喵喵喵！');
        }
    }
    const dog = new Dog('旺财')
    const cat = new Cat('布丁')
    dog.sayHello();
 
})()
```
