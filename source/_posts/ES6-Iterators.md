---
title: 简单易懂的 ES6 Iterators 指南和示例
categories: js-end
date: 2019-09-30 16:49:18
tags: ES6 Iterators
---

## 简介

遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。

<!-- more -->

## 作用

Iterator 的作用有三个：
1、是为各种数据结构，提供一个统一的、简便的访问接口；   
2、是使得数据结构的成员能够按某种次序排列；   
3、是 ES6 创造了一种新的遍历命令for...of循环，Iterator 接口主要供for...of消费。   
## 执行过程

Iterator 的遍历过程是这样的。

1、创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。

2、第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。

3、第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。

4、不断调用指针对象的next方法，直到它指向数据结构的结束位置。

每一次调用next方法，都会返回数据结构的当前成员的信息。具体来说，就是返回一个包含value和done两个属性的对象。其中，value属性是当前成员的值，done属性是一个布尔值，表示遍历是否结束。

## 简单demo
```javascript
function makeIterator(arr) {
  var nextIndex = 0;
  return {
    next: function () {
      return nextIndex < arr.length ? 
        {value: arr[nextIndex++], done: false, index: nextIndex} : 
        {value: undefined, done: true, index: nextIndex};
    }
  }
}

var it = makeIterator(['a','b']);
console.log(it.next()) // {value: "a", done: false, index: 1}
console.log(it.next()) // {value: "b", done: false, index: 2}
console.log(it.next()) // {value: undefined, done: true, index: 2}
```

```javascript
var str = 'asdzxc123'
for (let val of str) {
  console.log(val)
}

var obj = {
  a: 'a',
  b: 'b'
}
for (let val of obj) {
  console.log(val) // Uncaught TypeError: obj is not iterable
}

let arr = ['a', 'b', 'c'];
let iter = arr[Symbol.iterator]();
console.log(iter.next()) // { value: 'a', done: false }
console.log(iter.next()) // { value: 'b', done: false }
console.log(iter.next()) // { value: 'c', done: false }
console.log(iter.next()) // { value: undefined, done: true }

let arr = ['a', ['b','c'], 'd'];
let iter = arr[Symbol.iterator]();
console.log(iter.next()) // { value: 'a', done: false }
console.log(iter.next()) // {value: Array(2), done: false}
console.log(iter.next()) // { value: 'd', done: false }
```

## 需求

```javascript
allAuthors: {
    fiction: [
      'Agatha Christie', 
      'J. K. Rowling',
      'Dr. Seuss'
    ],
    scienceFiction: [
      'Neal Stephenson',
      'Arthur Clarke',
      'Isaac Asimov', 
      'Robert Heinlein'
    ],
    fantasy: [
      'J. R. R. Tolkien',
      'J. K. Rowling',
      'Terry Pratchett'
    ],
  }
```
将以上的对象中的数组的每一项都打印出来
```javascript
const myFavouriteAuthors = {
  allAuthors: {
    fiction: [
      'Agatha Christie', 
      'J. K. Rowling',
      'Dr. Seuss'
    ],
    scienceFiction: [
      'Neal Stephenson',
      'Arthur Clarke',
      'Isaac Asimov', 
      'Robert Heinlein'
    ],
    fantasy: [
      'J. R. R. Tolkien',
      'J. K. Rowling',
      'Terry Pratchett'
    ],
  },
  [Symbol.iterator]() {
    let genres = Object.values(this.allAuthors)
    let currentGenreIndex = 0 // 0 1 2 自增控制判断当前数组是否遍历完成 
    let currentAuthorIndex = 0 // 每一小项的循环的指针 控制整个循环什么时候结束（返回{value: undefined,,done: true}）
    return {
      next() {
        const authors = genres[currentGenreIndex] // fiction scienceFiction fantasy

        console.log(authors, currentGenreIndex, currentAuthorIndex)
        
        // 遍历authors,当没有子项的时候，doNothaveMoreAuthors为true,
        const doNothaveMoreAuthors = !(currentAuthorIndex < authors.length)
        if (doNothaveMoreAuthors) {
          currentGenreIndex++
          currentAuthorIndex = 0
        }
        // 如果genres都遍历完了，那么我们需要告诉迭代器不能提供更多的值。
        const doNotHaveMoreGenres = !(currentGenreIndex < genres.length)
        if (doNotHaveMoreGenres) {
          return {
            value: undefined,
            done: true
          }
        }
        // 如果一切正常，从当genre 返回 作者和当前作者索引，以便下次，下一个作者可以返回。
        return {
          value: genres[currentGenreIndex][currentAuthorIndex++],
          done: false
        }
      }
    }
  }
}
for (const author of myFavouriteAuthors) {
  console.log(author);
}
```

[完整学习Iterator 和 for...of 循环](http://es6.ruanyifeng.com/#docs/iterator)