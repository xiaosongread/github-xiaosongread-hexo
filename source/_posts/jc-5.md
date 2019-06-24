---
title: 文本溢出显示... 和文本的断点换行
categories: css-end
date: 2017-12-14 11:32:00
---

文本的显示在前端算是比较X疼的一件事，如何处理断行和在手机端的显示内容呢？

### 文本换行 断点

```css
word-break:  属性规定自动换行的处理方法
         normal     使用浏览器的默认换行方式
         break-all  允许在单词内断行
                    在使用英文多的时候能够整齐换行
         keep-all   只能在半角空格或连字符处换行

word-wrap：  允许长单词或 URL 地址换行到下一行
         normal      只在允许的断点处处理（按浏览器默认的处理方式）
         break-word  在长单词或者url内部进行换行
```

<!-- more -->

#### 自己的看法
```css
word-wrap： 决定句尾放不下单词时，单词是否换行
word-break: 决定单词内该怎么换行
```

#### 单行显示省略号

```css
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
```

#### 多行显示省略号

```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```