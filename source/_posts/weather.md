---
title: box-shadow属性-天气预报
categories: js-end
date: 2022-07-31 17:13:10
tags: box-shadow
---
## 效果如下：

<img src="/images/img-folder/weather.gif">

<!-- more -->

```shell
box-shadow: h-shadow v-shadow blur spread color inset;
 参数详解：
 h-shadow: 阴影的水平偏移量。
 v-shadow: 阴影的垂直偏移量。
 blur: 模糊距离(就是渐变的距离，设为0就没有渐变)。
 spread: 投影的尺寸，通过这个控制“影分身”的大小。
 color: 投影颜色，通过这个实现后方的乌云。
 inset: 改为内阴影。这里用不到。
```

### 晴天
```html
<div class="weather sunny"></div>
```
```css
@keyframes sunScale {
  0% {
      transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
      transform: scale(1);
  }
}
.sunny {
  &:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: #F6D963;
    border-radius: 50%;
    box-shadow: 0 0 20px #ff0;
    z-index: 2;
  }
  &:after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -45px 0 0 -45px; 
    width: 90px;
    height: 90px;
    background: #FFEB3B;
    clip-path: polygon(
      50% 0%,
        64.43% 25%,
        93.3% 25%,
        78.87% 50%,
        93.3% 75%,
        64.43% 75%,
        50% 100%,
        35.57% 75%,
        6.7% 75%,
        21.13% 50%,
        6.7% 25%,
        35.57% 25%);
    z-index: 1;
    animation: sunScale 2s linear infinite;
  }
}
```

### 多云
```html
<div class="weather cloudy"></div>
```
```css
.cloudy:before,
.rainy:before,
.snowy:before {
    content: "";
    position: absolute;
    top: 50%;
    left: 25%;
    transform: translate(-50%, -50%);
    width: 36px;
    height: 36px;
    background: #fff;
    border-radius: 50%;
    z-index: 2;
    box-shadow: #fff 22px -15px 0 6px,
              #fff 22px -15px 0 6px,
              #fff 57px -6px 0 2px, 
              #fff 87px 4px 0 -4px,
              #fff 33px 6px 0 6px,
              #fff 61px 6px 0 2px,
              #ccc 29px -23px 0 6px,
              #ccc 64px -14px 0 2px,
              #ccc 94px -4px 0 -4px;
}
```

### 雨天
```html
<div class="weather rainy"></div>
```
```css
@keyframes rainy{
  from {
    transform: translate(0, 0) rotate(10deg);
  }
  to {
    transform: translate(-4px, 24px) rotate(10deg);
    box-shadow:
           #fff 25px -10px 0,
           #fff 50px 0 0,
           #fff 75px -10px 0,
           #fff 0 25px 0,
           #fff 25px 15px 0,
           #fff 50px 25px 0,
           #fff 75px 15px 0,
           rgba(255, 255, 255, 0) 0 50px 0,
           rgba(255, 255, 255, 0) 25px 40px 0,
           rgba(255, 255, 255, 0) 50px 50px 0,
           rgba(255, 255, 255, 0) 75px 40px 0;
  }
}
.rainy{
  &:after
  {
    content: "";
    position: absolute;
    top:50%;
    left: 25%;
    width: 4px;
    height: 14px;
    background: #fff;
    border-radius: 2px;
    box-shadow:    	    #fff 25px -10px 0,    	    #fff 50px 0 0,    	    #fff 75px -10px 0,    	    #fff 0 25px 0,    	    #fff 25px 15px 0,    	    #fff 50px 25px 0,    	    #fff 75px 15px 0,    	    #fff 0 50px 0,    	    #fff 25px 40px 0,    	    #fff 50px 50px 0,    	    #fff 75px 40px 0;
    -webkit-animation: rainy 2s linear infinite;
    animation: rainy 2s linear infinite;
  }
}
```

### 雪天
```html
<div class="weather snowy"></div>
```
```css
@keyframes snowDrop {
  0% {
      transform: translateY(0);
  }
  100% {
      transform: translateY(25px);
      box-shadow:
      #fff 25px -10px 0,
      #fff 50px 0 0,
      #fff 75px -10px 0,
      #fff 0 25px 0,
      #fff 25px 15px 0,
      #fff 50px 25px 0,
      #fff 75px 15px 0,
      rgba(255, 255, 255, 0) 0 50px 0,
      rgba(255, 255, 255, 0) 25px 40px 0,
      rgba(255, 255, 255, 0) 50px 50px 0,
      rgba(255, 255, 255, 0) 75px 40px 0;
  }
}
.snowy:after {
  content: "";
  position: absolute;
  top:50%;
  left: 25%;
  width: 8px;
  height: 8px;
  background: #fff;
  border-radius: 50%;
  box-shadow:
      #fff 25px -10px 0,
      #fff 50px 0 0,
      #fff 75px -10px 0,
      #fff 0 25px 0,
      #fff 25px 15px 0,
      #fff 50px 25px 0,
      #fff 75px 15px 0,
      #fff 0 50px 0,
      #fff 25px 40px 0,
      #fff 50px 50px 0,
      #fff 75px 40px 0;
  animation: snowDrop 2s linear infinite; 
}
```

### github
https://github.com/xiaosongread/gulp-cli