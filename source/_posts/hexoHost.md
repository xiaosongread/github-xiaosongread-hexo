---
title: hexo 域名相关的问题
categories: gc-end
date: 2021-08-13 18:35:43
tags: vue router
---

#### 国内主机需要备案，国外主机不用
github 上面的博客空间属于国外空间，绑定域名可以 不用备案
### 购买域名
国内域名我选择了阿里云，登陆阿里云网站，直接购买域名就行，不需要买云解析
<!-- more -->
### 域名实名认证
购买域名后需要对域名进行实名认证，只是上传 身份证 的正反面图片而已，很简单，一般1-2天就可以解决了，或者在阿里云APP，非常简单。
### 为github增加解析
解析只需要增加如下格式就好：
<img src="/images/img-folder/aliyun1.png">
数字 ip 是 ping 自己 github pages 得到的：
<img src="/images/img-folder/aliyun2.png">

### 为自己的github pages 绑定域名
在自己的博客里面增加文件 CNAME:
<img src="/images/img-folder/aliyun3.png">

里面的内容只是自己刚才购买的域名
### 验证域名是否添加成功
进入自己的 github pages 设置，如果以下内容变化就代表成功了：
<img src="/images/img-folder/aliyun4.png">


