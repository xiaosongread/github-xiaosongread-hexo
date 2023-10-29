---
title: h5移动端和大屏适配
categories: js-end
date: 2018-07-27 20:49:41
---

**rem适配原理**

+ 将设备分成 n 等分，n 可以是任意正确的值（比如 `flexible.js` 中的 n = 10 ）。
+ + 设置 `html` 元素的 `font-size` 为 `设备宽度 / 10`，即得到 设备视口 1 rem 到底表示 多少设备视口 px。
+ 将设计稿也分成 n 等分，此时设计稿中的某个元素a 的 px 对应 设备中这个元素的 rem 的计算方式为
+ + ?rem = 设计稿 a px / (`设计稿的宽度 / n`(表示1rem为多少px像素))

<!-- more -->

举个例子：
比如你的设计稿是 750px，然后你分成了10，那么 1rem = 75px，此时设计稿中某个元素的大小为 30px，
那么在设备中这个元素的大小就是 30/75 = 0.4rem。

常用插件：
`lib-flexible` 和 `postcss-px2rem-exclude`

使用postcss-px2rem-exclude可以将项目中的px自动转换成rem
amfe-flexible则可以根据不同型号的手机，进行相应的HTML根节点(font-szie)的初始化。

1. 安装 postcss-px2rem-exclude
```js
npm install postcss-px2rem-exclude --save
```
2. 安装 amfe-flexible
```js
npm install amfe-flexible --save
```
3. 在vue项目中的main.js导入amfe-flexible
```js
import ‘amfe-flexible’; / /引入amfe-flexible做rem适配
```
4. 在vue项目中的vue.config.js中配置postcss-px2rem-exclude
```js
module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-px2rem-exclude")({
          	// 在这里，由于我的设计稿尺寸的屏幕分辨率是1920，具体原因如下：
            remUnit: 192, // 设计稿尺寸/10
          }),
        ],
 },}},}
```
5. 有个问题：如何配置remUnit的数值：

> 通常我们是根据设计图来定这个值, 原因很简单，便于开发。假如设计图给的宽度是1920，我们通常就会把remUnit设置为192（设计图宽度的十分之一），这样我们写样式时，可以直接按照设计图标注的宽高来1:1还原开发。

行内样式不能转化rem的问题？
我们可以写一个px2rem方法，放在全局，在src/main.js里写如下代码：
```js
function px2rem(px){
  if(/%/ig.test(px)){ // 有百分号%，特殊处理，表述pc是一个有百分号的数，比如：90%
    return px
  }else{
    return (parseFloat(px) / 192) + 'rem'
  }
}
Vue.prototype.$px2rem = px2rem // 放到全局
```
对应的页面的使用方式：
```html
 <div class="left">今天是2022年9月16日，天气晴</div>
 <div class="center" :style="{fontSize:$px2rem('30px')}">距离国庆还有14天</div>
 <div class="right">哈哈哈哈哈</div>
```

