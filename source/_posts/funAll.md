---
title: 开发常用汇总
categories: js-end
date: 2024-10-09 14:08:14
---

### css
#### 单行显示省略号
```css
text-overflow: ellipsis;
white-space: nowrap;
overflow: hidden;
```

<!-- more -->

#### 多行显示省略号
```css
display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```

#### 文本换行 断点

```css
word-break:  属性规定自动换行的处理方法
         normal     使用浏览器的默认换行方式
         break-all  允许在单词内断行
                    在使用英文多的时候能够整齐换行
         keep-all   只能在半角空格或连字符处换行

word-wrap：  允许长单词或 URL 地址换行到下一行
         normal      只在允许的断点处处理（按浏览器默认的处理方式）
         break-word  在长单词或者url内部进行换行

word-wrap： 决定句尾放不下单词时，单词是否换行
word-break: 决定单词内该怎么换行

```

#### 滚动条样式
```css
/* 滚动条整体部分 */
::-webkit-scrollbar {
  width: 10px; /* for vertical scrollbars */
  height: 10px; /* for horizontal scrollbars */
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background: #888;
}

/* 滚动条滑块在悬停时的样式 */
::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

### js
#### 用户名4-20位
```js
userName: /^[a-zA-Z0-9_@\-\.]{4,20}$/,
#### 密码（任意字符8-32位）
```js
password: /^.{8,32}$/,
```
#### 手机号码
```js
phone: /^1(3|4|5|6|7|8|9)\d{9}$/,
landline: /^(([0-9]{3,4}-)?|([0-9]{3,4})?)[0-9]{7,8}$/,
```
#### 身份证号码
```js
identityCard: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\{3}([0-9]|X)$/,
```
#### 大于0的金额
```js
gt0: /^(([1-9]\d*(\.\d{1,2})?)|(0\.\d{1}[1-9]))$/,
```
#### 大于0的整数和浮点数
```js
gt0f: /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/,
```
#### 大于等于0的金额
```js
gteq0: /^(\d+)(\.\d{1,2})?$/,
```
#### 浮点数金额
```js
number: /^(-?\d+)(\.\d{1,2})?$/,
```
#### httpUrl
```js
httpUrl: /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
```
#### 语音时间转化
```js
transformMin(min) {
  let m = parseInt(min);
  if (m > 60) {
    return parseInt(m / 60) + "'" + (m % 60) + '"';
  } else if (m > 0) {
    return m + '"';
  } else {
    return 0 + '"';
  }
}
```
#### 视频时间转化
```js
getDuration(duration) {
  let second = Number(duration).toFixed(0);
  let time = '00:00'
  if (second >= 60) {
    time =
      "0" + (second / 60).toFixed(0) + ":" + (second % 60);
  } else if (second < 10) {
    time = "00:0" + second;
  } else {
    time = "00:" + second;
  }
  return time;
}
```

#### 发帖时间转化
```js
formatTime(timestamp) {
  const now = new Date().getTime();
  const diff = (now - timestamp) / 1000; // 时间差（秒）

  if (diff < 1) {
    return '刚刚';
  } else if (diff < 60) {
    return `${Math.floor(diff)}秒钟前`;
  } else if (diff < 3600) {
    return `${Math.floor(diff / 60)}分钟前`;
  } else {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return `今天 ${hours}:${minutes}:${seconds}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `昨天 ${hours}:${minutes}:${seconds}`;
    } else if (year === today.getFullYear()) {
      return `${month}-${day} ${hours}:${minutes}:${seconds}`;
    } else {
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }
  }
}
```
