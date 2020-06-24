---
title: slice-splice-用法区别
categories: js-end
date: 2020-06-24 16:54:30
tags: js
---
## slice(start,end)：方法可从已有数组中返回选定的元素，返回一个新数组，包含从start到end（不包含该元素）的数组元素

> 该方法不会改变原有数组
```javascript
var a = [1,2,3,4,5]
var b = a.slice(0,1)
console.log(a,b)
// [1, 2, 3, 4, 5] [1]
```

<!-- more -->

> 同时slice(start,end)可以作用于字符串的切割
```javascript
var a = 'asdzxc123'
var b = a.slice(0,3)
console.log(a, b)
// asdzxc123 asd
```

## splice（index,howmany,item1,...itemX）：该方法向或者从数组中添加或者删除项目，返回被删除的项目。（该方法会改变原数组）

> index参数：必须，整数，规定添加或者删除的位置，使用负数，从数组尾部规定位置。   
howmany参数：必须，要删除的数量，如果为0，则不删除项目。   
tem1,...itemX参数：可选，向数组添加的新项目。

```javascript
var c = [1,2,3,4,5]
var d = c.splice(0,4)
console.log(c,d)
// [5] [1,2,3,4]
```

```javascript
var a = [1,2,3,4]
var b = a.splice(1,0,'a')
console.log(a,b)
// [1, "a", 2, 3, 4] []
```