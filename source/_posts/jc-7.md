---
title: npm包模块发布
categories: gc-end
date: 2018-06-26 14:44:11
---

现在前端开发框架特别流行，vue,react,angular，在开发中，npm包是必不可少的，这就是相当于传统开发中的插件，那么如何发布自己的包？

npm i 包名称 ，就能下载一个包插件，那发布的流程是什么呢？
<!-- more -->
##### 必备的环境

>node(npm)环境是必须的;nrm是用来管理npm镜像的

```javascript
npm install -g nrm :安装nrm
nrm ls :npm镜像列表
nrm use 镜像名称 :切换镜像
```

##### 发布包

  1.npm init 一直回车，新建package.json文件
  2.注册npm账号：https://www.npmjs.com/
  3.npm login; 输入账号密码邮箱
  4.npm publish

>登陆状态中保证了，特别注意官网注册成功后要在邮箱中先确认，不然之后提交包的时候会报错

提交成功会提示，然后就可以在npm官网个人中心查看，我测试的时候会有点延迟，在使用的时候要新建项目在npm install 你的包名称，想想也是，谁会在自己这个包中在下载，我觉下了好几次，报错，仔细一看原来是包的不能在此目录下面下载此包文件.

[github:https://github.com/xiaosongread/mgd-localstorage](https://github.com/xiaosongread/mgd-localstorage)




