---
title: vue3 项目实现兼容pc和H5的基本实现
tags:
  - vue3
  - rem
  - 移动端
  - 兼容pc和H5
categories: js-end
date: 2024-05-08 20:30:55
---

先来抛出一个简单的问题：

如果我们的750的设计稿上面，有一个375px，那么这个元素在750的屏幕上面就是宽度的一半，那么，如果我们设置为375px，在375px的设备上面，就沾满了屏幕，而不是屏幕的一半了，那我们应该如何实现呢？

大家不要说用百分比，我们也不讨论视口宽度单位，我们今天聊一聊rem这个单位。

> rem 是 CSS 中的一个长度单位，全称是 “root em”。它是相对于根元素（即HTML元素）的字体大小来计算的。例如，如果 HTML 元素的字体大小是 16px，那么 1rem 就等于 16px。如果 HTML 元素的字体大小改变，那么使用 rem 作为单位的元素的大小也会相应地改变。

那么，我们在750的设备上面，更元素的字体大小设置为100，就是1rem=100px,在375的设备上面，设置为50，就是1rem=50px，这样，我们就可以实现不同设备上面的元素宽度自适应了。

<!-- more -->

```js
function setRem() {
  // 默认设计稿尺寸是750px 实现动态设置fontsize
  const width = document.documentElement.clientWidth
  let size = (width / 750) * 100;
  //低于1200就认为是移动端
  document.documentElement.style.fontSize = (width > 1200 ? 100 : size) + 'px'
}
setRem();
window.addEventListener('resize', setRem)
```

这时候我们就实现了动态设置根元素的字体大小，但是，我们总不能去写代码的时候，一直去计算rem的值，这样太麻烦了，那么，我们就可以使用postcss-pxtorem这个插件来帮助我们实现这个功能。

## 1. 安装postcss-pxtorem

```bash
npm install postcss-pxtorem --save
```

## 2. 配置postcss.config.js

```js
// vite.config.ts
export default function ({ command }: ConfigEnv): UserConfigExport {
  const isProduction = command === 'build';
  const root = process.cwd();

  return {
    root,
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
      ],
    },
    server: {
      host: true,
      hmr: true,
    },
    plugins: createVitePlugins(isProduction),
    css: {
      postcss: {
        plugins: [
          // autoprefixer({
          //   overrideBrowserslist: [
          //     "Android 4.1",
          //     "iOS 7.1",
          //     "Chrome > 31",
          //     "ff > 31",
          //     "ie >= 8",
          //   ],
          // }),
          postCssPxToRem({
            // 自适应，px>rem转换
            rootValue: 100, // 根元素字体大小，用于将像素转换为rem的基准值
            unitPrecision: 10, // rem的小数位数
            propList: ["*"], // 需要转换的属性列表，['*']表示所有属性都会被转换
            minPixelValue: 2, // 小于或等于该值的像素单位不被转换
            mediaQuery: false, // 是否在媒体查询的css代码中也进行转换，默认false
            replace: true, // 是否转换后直接更换属性值
            exclude: /node_modules/i,
            selectorBlackList: [/^\.PC/] // 过滤掉.norem-开头的class，不进行rem转换
          }),
        ],
      },
    },
  };
}
```

```html
<div class="box"></div>
.box {
  width: 375px;
  height: 200px;
  background: red;
}
```

此时就实现是，在小于1200px的，永远都是保持的屏幕的一半。

<video src="/images/img-folder/2024/rem.mp4" controls="controls" width="500" height="300"></video>