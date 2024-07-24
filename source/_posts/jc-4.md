---
title: JS replace()方法全文替换，遇到变量怎么办？
date: 2018-05-23 16:14:16
categories: js-end
tags: js replace
---

## replace 替换变量文本，改如何处理？

### js 替换字符窜，一般情况下是
```javascript
let string = "aaabbbsssf";
let a = string.replace("a","我");
```
<!-- more -->
#### 以上只能替换第一个，全局替换
```javascript
let string = "aaabbbsssf";
let a = string.replace(/a/g,"我");
```
#### 这样没问题，但是如果需要替换的字段不确定，是变量的话，如何写？

#### 以上只能替换第一个，全局替换
```javascript
let string = "aaabbbsssf";
let key = "a";
let a = string.replace(/key/g,"我");
或者
let a = string.replace(/\key/g,"我");
再或者拼接？
```

##### 经过我的各种奇怪尝试都是不好使的，没办法，查看文档

```javascript
replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
​
​stringObject.replace(regexp/substr,replacement)
​
​regexp/substr：必需。规定子字符串或要替换的模式的 RegExp 对象。
                请注意，如果该值是一个字符串，则将它作为要检索的直接量文本模式，而不是首先被转换为 RegExp 对象。
replacement：必需。一个字符串值。规定了替换文本或生成替换文本的函数。
```

##### 是不是有点明白了，对了就是

```javascript
let string = "aaabbbsssf";
let key = "a";
let a = string.replace(new RegExp(key,'g'),"我");
```


