---
title: focus-preventScroll
categories: js-end
date: 2019-09-20 11:01:30
tags: focus preventScroll 滚动
---

<img src="/images/img-folder/focus.gif" width="400"/>

<!-- more -->

## api
```
button.focus({ 
    preventScroll: true 
});
```

```html
<button id="button1">点击我获取焦点会定位</button>
<button id="button2">点击我获取焦点但不会定位</button>
<p class="remind">提示：浏览器可视区域的下面有两个输入框。</p>
<div style="margin-top: calc(100vh - 180px);">
    <input id="input1" size="10">
    <input id="input2" size="10">
</div>
```
```javascript
button1.onclick = function () {
    input1.focus();
};
button2.onclick = function () {
    input2.focus({ 
        preventScroll: true 
    });
};
```
## demo
[猛戳查看](http://www.shuy.cc/demo/focus.html)
## 兼容情况
<img src="https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/icon/chrome.png" width="40" hegiht="40" align=center /> |<img src="https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/icon/firefox.png" width="40" hegiht="40" align=center />|<img src="https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/icon/ie.png" width="40" hegiht="40" align=center />|<img src="https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/icon/edge.png" width="40" hegiht="40" align=center />|<img src="https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/icon/opera.png" width="40" hegiht="40" align=center />|<img src="https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/icon/safari.png" width="40" hegiht="40" align=center />
---|:--:|:--:|:--:|:--:|:--:
64+ ✔|68+ ✔|✘|✘|51+ ✔|✘