---
title: Vue预渲染prerender-spa-plugin+vue-meta-info
categories: js-end
date: 2024-08-27 14:04:19
---

vue设计之初就是单页面应用，他对于有SEO需求的项目并不友好，因为搜索引擎爬虫并不会执行js，所以vue项目在搜索引擎中的排名并不理想，为了解决这个问题，我们可以使用预渲染的方式，将vue项目中的页面渲染成静态页面，这样搜索引擎爬虫就可以爬取到这些静态页面，从而提高项目的排名。

预渲染的方式有很多种，比如使用prerender-spa-plugin插件，或者使用vue-meta-info插件，本文将介绍这两种方式的使用方法。

<!-- more -->

## prerender-spa-plugin插件

prerender-spa-plugin是一个vue插件，它可以预渲染vue项目中的页面，并将渲染后的页面保存为静态页面。使用prerender-spa-plugin插件，可以解决vue项目在搜索引擎中的排名问题。

### 安装

```js
//  npm
npm install prerender-spa-plugin --save-dev
//  yarn
yarn add prerender-spa-plugin --dev
```

### 配置

在vue项目的根目录下，创建一个`vue.config.js`文件，并在其中添加以下配置：

```javascript

const PrerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
  //配置绝对路径
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  configureWebpack: config=> {
    //在开发环境不进行预渲染操作
    if(process.env.NODE_ENV === 'production'){
      const plugins=[
          new PrerenderSPAPlugin({
              //根目录
              staticDir: resolve('dist'),
              //需要预渲染的路由
              routes:['/','/about','/contact'],
              renderer: new Renderer({
                ignoreJSErrors: true,
                // 需要注入一个值，这样就可以检测页面当前是否是预渲染的
                inject: {
                  foo: 'bar'
                },
                //渲染时显示浏览器窗口,建议直接为true
                headless: true,
                //最大渲染路由数量
                maxConcurrentRoutes:20,
                //延迟多长时间进行渲染
                renderAfterTime: 5000,
                //main.js中进行对应配置
                renderAfterDocumentEvent: 'render-event'
              })
          })
      ]
      config.plugins.push(...plugin)
    }
  }
}
```

### main.js 配置

在main.js中添加以下代码：

```javascript
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  //重要部分
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
})
```

### router.js 配置

> 一定要设置 `mode: 'history'` 模式.

```js
export default new Router({
  mode: 'history', // 路由模式
  routes: constantRoutes,
})
```

打包后的文件，看见每个路由生成了对应的 html 文件。

## vue-meta-info插件

vue-meta-info是一个vue插件，它可以设置vue项目中的页面标题、描述、关键词等元信息，从而提高项目的排名。

### 安装

```js
//  npm
npm install vue-meta-info --save-dev
//  yarn
yarn add vue-meta-info --dev
```

### main.js引用

在vue项目的根目录下，创建一个`vue-meta-info.js`文件，并在其中添加以下配置：

```javascript
import MetaInfo from 'vue-meta-info'
// 注册 
Vue.use(MetaInfo)
```

### 页面使用

```javascript
//单个页面配置
<template>
    <div>首页</div>
</template>
export default {
    name:'首页'
    metaInfo:{
        title:'首页',
        meta:[
            {
                name: 'keyWords',
                content:'关键字'
            },
            {
                name:'description',
                content:'描述'
            }
        ]
    }
}
//多页面配置
<template>
    <div>首页</div>
</template>
export default {
    name:'index'
    metaInfo():{
        return{
            meta:this.metaData
        }
    },
    data(){
        return{
            metaData:''
        }
    },
    watch:{
        $route(to,form){
        //通过跳转页面配置每个页面的关键字和描述，这只是个例子
        //注意如果通过to.path去判断 需要进行兼容判断 因为渲染后的访问路径会在末尾自动添加/ 例如 loclhost:3000/index/,这个时候就需要 to.path === '/index' || to.path==='/index/'
            if(to.name === 'index'){
                this.metaData=[
                    {
                        name: 'keyWords',
                        content:'关键字'
                    },
                    {
                        name:'description',
                        content:'描述'
                    }
                ]
            }
            //当然也可以封装一个方法去返回每个页面的文案
            //this.metaData = metaSetFuc(to.name)
        }
    }
}
```

