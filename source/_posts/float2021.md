---
title: javascript浮点型的一些坑
categories: js-end
date: 2021.10.10 20:30:10
tags: js
---

javascript浮点型运算有很多问题，不管是加减还是乘除，还是四舍五入，都可能出现问题。本文简单介绍一些解决办法，都是工作中总结出来的，有简单，有麻烦。下面就总结一下。
## 加发运算
### 例如常见的：
```javascript
0.1+0.2 //0.30000000000000004
1.4+2.8 //4.199999999999999
```

### 解决方案一
<!-- more -->

简单方法：
这个方法要你知道保留小数点位数，好多情况不是很适用，特殊四舍五入的情况也不准确！ 假如保留1位小数

```javascript
(((0.1+0.2)*10).toFixed(1))/10
```

保留2位小数

```javascript
(((0.1+0.2)*100).toFixed(2))/100
```

### 解决方案二
精确方法： 定义函数
```javascript
function accAdd(arg1,arg2){
  var r1,r2,m;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2))
  return (arg1*m+arg2*m)/m
}
accAdd(0.1,0.2)
```

## 减法运算
### 例如常见的：
```javascript
0.3-0.1 //0.19999999999999998
```

### 解决方案
```javascript
function accSub(arg1,arg2){
    var r1,r2,m,n;
    try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
    try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
    m=Math.pow(10,Math.max(r1,r2));
    //last modify by deeka
    //动态控制精度长度
    n=(r1>=r2)?r1:r2;
    return ((arg1*m-arg2*m)/m).toFixed(n);
}
```

## 乘法运算
```javascript
0.69*10 //6.8999999999999995
11*22.9 //251.89999999999998
```

### 解决方案一
如果在知道小数位个数的前提下，可以考虑通过将浮点数放大倍数到整型(最后再除以相应倍数)，再进行运算操作，这样就能得到正确的结果了。 例如
```javascript
0.69*10*10/10
11*(22.9*10)/10
```

### 解决方案二
封装函数方法
```javascript
function accMul(arg1,arg2)
  {
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
  }
accMul(0.69,10) //6.9
```

## 除法运算
```javascript
6.9/10 //0.6900000000000001
```
### 函数
```javascript
function acc(arg1,arg2){
  var t1=0,t2=0,r1,r2;
  try{t1=arg1.toString().split(".")[1].length}catch(e){}
  try{t2=arg2.toString().split(".")[1].length}catch(e){}
  with(Math){
    r1=Number(arg1.toString().replace(".",""))
    r2=Number(arg2.toString().replace(".",""))
    return (r1/r2)*pow(10,t2-t1);
  }
}
```

## 四舍五入方法
```javascript
10.145.toFixed(2) ---> "10.14"
```
四舍五入之后应该是10.15，最后却变成了10.14

原因是因为

```javascript
10.145.toPrecision(21) ---> "10.1449999999999995737"
```

### 解决方案一：
简单解决方案还是先乘以100，然后，四舍五入。最后再除以100
```javascript
Math.round(10.145*100)/100
```

### 方案二

```javascript
Number.prototype.toFixed = function (n) {
    if (n > 20 || n < 0) {
        throw new RangeError('toFixed() digits argument must be between 0 and 20');
    }
    const number = this;
    if (isNaN(number) || number >= Math.pow(10, 21)) {
        return number.toString();
    }
    if (typeof (n) == 'undefined' || n == 0) {
        return (Math.round(number)).toString();
    }

    let result = number.toString();
    const arr = result.split('.');

    // 整数的情况
    if (arr.length < 2) {
        result += '.';
        for (let i = 0; i < n; i += 1) {
            result += '0';
        }
        return result;
    }

    const integer = arr[0];
    const decimal = arr[1];
    if (decimal.length == n) {
        return result;
    }
    if (decimal.length < n) {
        for (let i = 0; i < n - decimal.length; i += 1) {
            result += '0';
        }
        return result;
    }
    result = integer + '.' + decimal.substr(0, n);
    const last = decimal.substr(n, 1);

    // 四舍五入，转换为整数再处理，避免浮点数精度的损失
    if (parseInt(last, 10) >= 5) {
        const x = Math.pow(10, n);
        result = (Math.round((parseFloat(result) * x)) + 1) / x;
        result = result.toFixed(n);
    }

    return result;
};
```
### 小结
处理此类问题，其实都有简单办法，不过，有时候在某种场景下面，简单办法不一定适用罢了。 简单办法一般是： 将浮点数乘以（扩大）10的n次方倍，把浮点数变为整数后再进行相应的运算，最后将得到的结果除以（缩小）10的n次方倍。 但是有时候我们并不知道浮点数的位数，及要精确的小数位数，因此，面对这种场景，我们就要用函数了！