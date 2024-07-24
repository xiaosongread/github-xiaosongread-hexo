---
title: vue-router-打开新页面
categories: gc-end
date: 2020-06-23 16:21:44
tags: vue router
---
## vue-router 如何在新窗口打开页面

### 1. <router-link>标签实现新窗口打开   
官方文档中说 v-link 指令被 <router-link> 组件指令替代，且 <router-link> 不支持 target="_blank" 属性，如果需要打开一个新窗口必须要用<a>标签，但事实上vue2版本的 <router-link> 是支持 target="_blank" 属性的(tag="a")，如下：
```html
<router-link target="_blank" :to="{path:'/home',query:{id:'1'}}">新页面打开home页</router-link>
```

### 2.编程式导航
有些时候需要在单击事件或者在函数中实现页面跳转，那么可以借助router的示例方法，通过编写代码实现。我们常用的是 $router.push 和 $router.go 但是vue2.0以后，这种方式就不支持新窗口打开的属性了，这个时候就需要使用this.$router.resolve,如下：
```html
seeShare(){
  let routeUrl = this.$router.resolve({
      path: "/share",
      query: {id:96}
  });
  window.open(routeUrl .href, '_blank');
}
```