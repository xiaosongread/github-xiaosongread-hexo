---
title: 大厂使用框架的分析
categories: js-end
date: 2024-08-05 11:20:05
---

## 大厂使用框架的分析

### 1. 框架的对比

#### 1.1. Vue

- Vue.js 是一个渐进式 JavaScript 框架，用于构建用户界面。它允许开发者使用简单的语法和声明式模板来构建复杂的单页应用程序（SPA）。
- Vue.js 的核心特性包括响应式数据绑定、组件化开发、虚拟 DOM 等。它还提供了丰富的生态系统，包括 Vue Router（路由管理）、Vuex（状态管理）等工具。

#### 1.2. React

- React 是一个用于构建用户界面的 JavaScript 库，由 Facebook 开发和维护。它使用组件化的方式来构建用户界面，并提供了丰富的生态系统，包括 React Router（路由管理）、Redux（状态管理）等工具。
- React 的核心特性包括虚拟 DOM、JSX 语法、组件化开发等。它还提供了丰富的生态系统，包括 React Router（路由管理）、Redux（状态管理）等工具。

<!-- more -->

### 2. 框架的优缺点

#### 2.1. Vue

- 优点：简单易学、轻量级、灵活、社区活跃、生态系统丰富。
- 缺点：性能相对较低、不适合大型项目、学习曲线较陡。

#### 2.2. React

- 优点：高性能、灵活、社区活跃、生态系统丰富。
- 缺点：学习曲线较陡、代码可维护性较差、不适合小型项目。

### 3.大厂的选择

#### vue的选择

[小米官网/小米商城](https://www.mi.com/)  小米官网/小米商城使用的是 Vue.js、nuxt.js 框架。

[百度官网](https://www.baidu.com/) 百度官网使用的是 Vue 框架。

[哔哩哔哩官网](https://www.bilibili.com/) 哔哩哔哩官网使用的是 vue 框架。

[搜狐官网](https://www.sohu.com/) 搜狐官网使用的是 vue 框架。

[360官网](https://saas.360.cn/introduce/swxwgl?src=guanwang_tj_sjyp) 360官网使用的是 vue + nuxt 框架。

[微信公众平台](https://mp.weixin.qq.com/cgi-bin/loginpage?url=%2Fwxamp%2Findex%2Findex%3Flang%3Dzh_CN%26token%3D1883064951) 微信公众平台使用的是 vue + AntV G2。

[腾讯游戏官网](https://start.qq.com/?ADTAG=0) 腾讯游戏官网使用的是 vue。

[小红书](https://www.xiaohongshu.com/explore) 小红书使用的是 vue 框架。

#### react的选择

[京东官网](https://list.jd.com/list.html?cat=1316,1387,16851) 京东官网使用的是 react。

[淘宝官网搜索结果页](https://s.taobao.com/search?commend=all&ie=utf8&initiative_id=tbindexz_20170306&localImgKey=&page=1&q=%E5%84%BF%E7%AB%A5%E5%BA%8A&search_type=item&sourceId=tb.index&spm=a21bo.jianhua%2Fa.201867-main.d4_3_1.3a912a89uRq6h1&ssid=s5-e&tab=all) 淘宝官网使用的是 React + preact。

[阿里巴巴官网](https://www.alibaba.com/) 阿里巴巴官网使用的是 react 框架。

[字节跳动官网](https://bytedance.com/) 字节跳动官网使用的是 React + next.js 框架。

[美团官网](https://www.meituan.com/) 美团官网使用的是 react + next 框架。

[拼多多官网](https://www.pinduoduo.com/) 拼多多官网使用的是 React + next.js 框架。

[优酷官网](https://www.youku.com/channel/webmovie) 优酷官网使用的是 React + ant Desgin 框架。

[理想汽车官网](https://www.lixiang.com/?chjchannelcode=103932#li) 理想汽车官网使用的是 React 框架。

[小鹏汽车官网](https://www.xiaopeng.com/?reserve_source=168801) 小鹏汽车官网使用的是 React + next.js 框架。
<!-- [网易官网](https://www.163.com/) 网易官网使用的是 jQuery + core.js。 -->
<!-- [新浪官网](https://www.sina.com.cn/) 新浪官网使用的是 backbone.js + require.js 框架。 -->

### 4. 总结

有人说vue适合小型项目，react适合大型项目，我觉得并不正确，从技术的角度，我觉得，react的确比vue的门槛高，Vue因为是渐进式框架，所以入门门槛比较低，但是同样也是特别优秀的前端框架，他的社区其实相对来说也是很庞大和完善的。项目的选型，其实还是主要取决于团队的技术栈和业务需求，而不是框架本身的好坏。更没有low不low这么一说，只要能解决业务需求，就是好的框架。
