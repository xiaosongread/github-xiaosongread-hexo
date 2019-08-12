---
title: 奇妙的 CSS shapes(CSS图形)
categories: css-end
date: 2019-08-12 15:37:22
---

## 三角形
![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/traingle.png)
```css
.traingle {
 width: 0;
 height: 0;
 border-left: 50px solid transparent;
 border-right: 50px solid transparent;
 border-bottom: 100px solid yellowgreen;
}
```
<!-- more -->
## 切角
![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/notching.png)
```css
.notching {
 width: 40px;
 height: 40px;
 padding: 40px;
 background: linear-gradient(135deg, transparent 15px, yellowgreen 0) top left,
 linear-gradient(-135deg, transparent 15px, yellowgreen 0) top right,
 linear-gradient(-45deg, transparent 15px, yellowgreen 0) bottom right,
 linear-gradient(45deg, transparent 15px, yellowgreen 0) bottom left;
 background-size: 50% 50%;
 background-repeat: no-repeat;
}
```

## 梯形
![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/trapezoid.png)
```css
.trapezoid{
 position: relative;
 width: 60px;
 padding: 60px;
}

.trapezoid::before{
 content:"";
 position: absolute;
 top: 0; right: 0; bottom: 0; left: 0;
 transform: perspective(20px) scaleY(1.3) rotateX(5deg);
 transform-origin: bottom;
 background: yellowgreen;
}
// ---2---
.trapezoid {
 position: relative;
 width: 60px;
 border-top: 60px solid yellowgreen;
 border-left: 40px solid transparent;
 border-right: 40px solid transparent;
}
```

## 五边形
![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/pentagon-1.png)
```css
.pentagon {
 position: relative;
 width: 60px;
 border-bottom: 60px solid yellowgreen;
 border-left: 40px solid transparent;
 border-right: 40px solid transparent; 
}

.pentagon::before {
 content:"";
 position: absolute;
 top: 60px;
 left: -40px;
 border-top: 60px solid yellowgreen;
 border-left: 70px solid transparent;
 border-right: 70px solid transparent;
}
```

## 六边形
![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/pentagon-2.png)
```css
.pentagon {
 position: relative;
 width: 60px;
 border-bottom: 60px solid yellowgreen;
 border-left: 40px solid transparent;
 border-right: 40px solid transparent;
}
.pentagon::before {
 content: "";
 position: absolute;
 width: 60px;
 height: 0px;
 top: 60px;
 left: -40px;
 border-top: 60px solid yellowgreen;
 border-left: 40px solid transparent;
 border-right: 40px solid transparent;
}
```

## 八边形
![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/octagon.png)
```css
.octagon {
 position: relative;
 width: 40px;
 height: 100px;
 background: yellowgreen;
}
.octagon::before {
 content: "";
 height: 60px;
 position: absolute;
 top: 0;
 left: 40px;
 border-left: 30px solid yellowgreen;
 border-top: 20px solid transparent;
 border-bottom: 20px solid transparent;
}
.octagon::after {
 content: "";
 height: 60px;
 position: absolute;
 top: 0;
 left: -30px;
 border-right: 30px solid yellowgreen;
 border-top: 20px solid transparent;
 border-bottom: 20px solid transparent;
}
```

## 五角星
> 这里使用 3 个三角形叠加旋转在一起实现。

![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/star.png)
```css
.star {
 margin: 50px 0;
 position: relative;
 width: 0;
 border-right: 100px solid transparent;
 border-bottom: 70px solid yellowgreen;
 border-left: 100px solid transparent;
 transform: rotate(35deg) scale(.6);
}
.star:before {
 content: '';
 position: absolute;
 border-bottom: 80px solid yellowgreen;
 border-left: 30px solid transparent;
 border-right: 30px solid transparent;
 top: -45px;
 left: -65px;
 transform: rotate(-35deg);
}
.star:after {
 content: '';
 position: absolute;
 top: 3px;
 left: -105px;
 border-right: 100px solid transparent;
 border-bottom: 70px solid yellowgreen;
 border-left: 100px solid transparent;
 transform: rotate(-70deg);
}
```

## 六角星
![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/sixstar.png)
```css
.sixstar {
 position: relative;
 width: 0;
 border-left: 50px solid transparent;
 border-right: 50px solid transparent;
 border-bottom: 100px solid yellowgreen;
}
.sixstar:after {
 content: "";
 position: absolute;
 border-left: 50px solid transparent;
 border-right: 50px solid transparent;
 border-top: 100px solid yellowgreen;
 top: 30px;
 left: -50px;
}

```

## 八角形
> 八角星呢？八个角那么多呢。其实使用两个矩形进行旋转拼接就可以了。

![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/eightstar.png)
```css
.eightstar {
 position: relative;
 width: 100px;
 height: 100px;
 background-color: yellowgreen;
 transform: rotate(30deg);
}

.eightstar::before {
 content: "";
 position: absolute;
 top: 0;
 left: 0;
 width: 100px;
 height: 100px;
 transform: rotate(45deg);
 background-color: yellowgreen;
}
```

## 十二角形
> 好。最后多角星再来一个十二级角星。在八角星的基础上，再增加一个矩形，就能得到十二角啦。也就是要过第一个伪元素。

![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/twelvestar.png)
```css
.twelvestar {
 position: relative;
 width: 100px;
 height: 100px;
 margin-bottom: 100px!important;
 background-color: yellowgreen;
 transform: rotate(30deg);
}

.twelvestar::before {
 content: "";
 position: absolute;
 top: 0;
 left: 0;
 width: 100px;
 height: 100px;
 transform: rotate(30deg);
 background-color: yellowgreen;
}

.twelvestar::after {
 content: "";
 position: absolute;
 top: 0;
 left: 0;
 width: 100px;
 height: 100px;
 transform: rotate(60deg);
 background-color: yellowgreen;
}
```
