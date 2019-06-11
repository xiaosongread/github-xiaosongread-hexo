---
title: import和require的区别
categories: js-end
date: 2019-06-11 11:55:32
---

node编程中最重要的思想就是模块化，import和require都是被模块化所使用。

#### 遵循规范
+ require 是 AMD规范引入方式
+ import是es6的一个语法标准，如果要兼容浏览器的话必须转化成es5的语法
<!-- more -->
#### 调用时间
+ require是运行时调用
+ import是编译时调用

#### 本质
+ require是赋值过程，其实require的结果就是对象、数字、字符串、函数等，再把require的结果赋值给某个变量
+ import是解构过程，但是目前所有的引擎都还没有实现import，我们在node中使用babel支持ES6，也仅仅是将ES6转码为ES5再执行，import语法会被转码为require

### require / exports
```javascript
// CommonJS模块
let { stat, exists, readFile } = require('fs');

// 等同于
let _fs = require('fs');
let stat = _fs.stat;
let exists = _fs.exists;
let readfile = _fs.readfile;

const fs = require('fs')
exports.fs = fs
module.exports = fs
```

### import / export
```javascript
import fs from 'fs'
import {default as fs} from 'fs'
import * as fs from 'fs'
import {readFile} from 'fs'
import {readFile as read} from 'fs'
import fs, {readFile} from 'fs'

export default fs
export const fs
export function readFile
export {readFile, read}
export * from 'fs'
```

1.通过require引入基础数据类型时，属于复制该变量。
2.通过require引入复杂数据类型时，数据浅拷贝该对象。
3.出现模块之间的循环引用时，会输出已经执行的模块，而未执行的模块不输出（比较复杂）
4.CommonJS模块默认export的是一个对象，即使导出的是基础数据类型

加载方式|规范|命令|特点
---|:--:|---:
运行时加载|CommonJS/AMD|require|社区方案，提供了服务器/浏览器的模块加载方案。非语言层面的标准。只能在运行时确定模块的依赖关系及输入/输出的变量，无法进行静态优化。
编译时加载|ESMAScript6+|import|语言规格层面支持模块功能。支持编译时静态分析，便于JS引入宏和类型检验。动态绑定