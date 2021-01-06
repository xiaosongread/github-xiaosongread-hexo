---
title: 小tips-clip-蛇形跑位
categories: css-end
date: 2019-08-28 17:51:11
tags: css3 clip
---
## 效果如下
<img src="/images/img-folder/clip.gif">
<!-- more -->
```
clip 属性剪裁绝对定位元素。
rect (top, right, bottom, left)
```
> 四个参数分别设置可显示矩形上 下 左 右 的像素值。

```html
<div class="bruce flex-ct-x">
  <div class="snakelike-border"></div>
</div>
```
```css
$green: green;
$red: red;
$purple: purple;
.snakelike-border {
	position: relative;
	width: 190px;
	height: 190px;
	background-color: $green;
	&::before,
	&::after {
		position: absolute;
		left: -5px;
		right: -5px;
		top: -5px;
		bottom: -5px;
		border: 5px solid;
    content: "";
		animation: move 5s linear infinite;
		-webkit-animation: move 5s linear infinite;
}
	&::before {
		border-color: $red;
	}
	&::after {
		border-color: $purple;
		animation-delay: -2.5s;
	}
}
@keyframes move {
	0%,
	100% {
		clip: rect(0 200px 5px 0);
	}
	25% {
		clip: rect(0 200px 200px 195px);
	}
	50% {
		clip: rect(195px 200px 200px 0);
	}
	75% {
		clip: rect(0 5px 200px 0);
	}
}
```
## 单个测试
<img src="/images/img-folder/clip-1.png">
```css
clip: rect(0 200px 5px 0);
```

<img src="/images/img-folder/clip-2.png">
```css
clip: rect(0 200px 200px 195px);
```