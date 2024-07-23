---
title: 一文了解js深拷贝和浅拷贝
categories: js-end
date: 2019-08-04 10:28:36
tags: 深浅拷贝
---

## 深浅拷贝的区别
简单点来说，就是假设B复制了A，当修改A时，看B是否会发生变化，如果B也跟着变了，说明这是浅拷贝，拿人手短，如果B没变，那就是深拷贝，自食其力。
<!-- more -->
## 浅拷贝
```javascript
var obj = {
  age: 13
}
let obj1 = obj
obj1.age = 100
console.log(obj.age) // 100

var arr = [1,2,3]
var arr1 = arr
arr1[0] = 100
console.log(arr[0]) // 改变 12 obj2
```
### 1.直接复制对象就是浅拷贝

```javascript
var obj = {
  age: 13
}
let obj1 = obj
obj1.age = 100
console.log(obj.age) // 100

var arr = [1,2,3]
var arr1 = arr
arr1[0] = 100
console.log(arr[0]) // 改变 12 ["allonAge"] obj2
```
### 2.Object.assign()
> Object.assign() 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。但是 Object.assign() 进行的是浅拷贝，拷贝的是对象的属性的引用，而不是对象本身。

> 注意：当object只有一层的时候并且不是数组的时候，Object.assign()是深拷贝

```javascript
var obj1 = {
  age: 12,
  person: {
    name: 'obj1'
  }
}
var obj2 = Object.create(obj1)
obj2.age = 13;
obj2.person.name = '改变'
console.log(obj2.age, obj2.person.name) // 13 "allonAge" "改变"
console.log(obj1.age, obj1.person.name) // 12 "allonAge" "改变"
```
### 3.Object.create(): 一级的看似是深拷贝(不能是数组)，深层级浅拷贝

## 深拷贝
### 1. JSON.parse(JSON.stringify())
```javascript
var obj1 = {
  age: 12,
  person: {
    name: 'obj1'
  }
}
var obj2 = JSON.parse(JSON.stringify(obj1))
obj2.age = 120
obj2.person.name = '改变'
console.log(obj1.age, obj1.person.name) // 12 "obj1"
console.log(obj2.age, obj2.person.name) // 120 "改变"
```

### 2. jquery 有提供一个$.extend可以用来做 Deep Copy

### 3. 另外一个很热门的函数库lodash，也有提供_.cloneDeep用来做 Deep Copy。

