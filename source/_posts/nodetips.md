---
title: nodetips
categories: js-end
date: 2019-08-30 16:08:59
tags: node
---

## 需求
设计师给了一堆任务头像，文件名乱七八糟的，我这边其实就一个循环就渲染出来了，所以得统一按下标重新命名一下，五百多张不可能一张一张改吧，那只能通过程序来循环改了，前端页面仔这可怎么搞？

<!-- more -->

那还不简单嘛这简单的需求，node轻松搞定

## fs.readdir

fs.readdir(path[, options], callback)
+ path <string> | <Buffer> | <URL>
+ options <string> | <Object>
  + encoding <string> 默认值: 'utf8'。
  + withFileTypes <boolean> 默认值: false。
+ callback <Function>

异步的 readdir(3)。 读取目录的内容。 回调有两个参数 (err, files)，其中 files 是目录中的文件名的数组（不包括 '.' 和 '..'）。

可选的 options 参数可以是指定编码的字符串，也可以是具有 encoding 属性的对象，该属性指定用于传给回调的文件名的字符编码。 如果 encoding 设置为 'buffer'，则返回的文件名是 Buffer 对象。

如果 options.withFileTypes 设置为 true，则 files 数组将包含 fs.Dirent 对象。

---

## rename
fs.rename(oldPath, newPath, callback)
+ oldPath <string> | <Buffer> | <URL>
+ newPath <string> | <Buffer> | <URL>
+ callback <Function>

异步地将 oldPath 上的文件重命名为 newPath 提供的路径名。 如果 newPath 已存在，则覆盖它。 除了可能的异常，完成回调没有其他参数。

```javasctipt
fs.rename('旧文件.txt', '新文件.txt', (err) => {
  if (err) throw err;
  console.log('重命名完成');
});
```
---

好了吧，比较简单，直接贴实现以上需求的js代码
```javascript
/** 
 * use: 批量修改本地文件的文件名
 * 
 * conditions: 本地一定要全局安装node环境
 * 
*/
let fs = require("fs");
// 操作的文件的文件名
let src = 'imgs';

// 读取指定目录下的文件
fs.readdir(src, function(err, files){
  console.log(files) // [ '2.png', '5.png', '7.png' ]
  files.forEach(function(fileName, index){
    let oldPath = src + '/' + fileName
    let newPath = src + '/' + (index + 1) + '.' + fileName.split('.')[1]
    // 重新命名文件名称
    fs.rename(oldPath, newPath, function(err){
      // throw new Error('asdasdad') 
      // 返回 error: asdasdad,error_code: 500,
      if (err) throw err
      console.log('重命名成功！')
    })
  })
})
```
> 命令行执行 node 文件名.js

