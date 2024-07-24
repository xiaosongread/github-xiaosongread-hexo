---
title: 记录 mac charles安装破解抓包手机接口
categories: js-end
date: 2021-01-05 11:45:26
---
### mac安装包地址
https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/ruanjian/charles-proxy-4.5.6.dmg
### 官网地址：http://www.charlesproxy.com
<!-- more -->
### 破解方法
打开Charles，help→Registered to，输入账号和key提交破解成功就可以正常使用啦！
<img src="/images/img-folder/pj-1.png">
#### Charles激活码：
Registered Name: https://zhile.io
License Key: 48891cf209c6d32bf4
### 配置
#### 电脑配置
1.打开Charles软件 -> Proxy / Proxy Settings
<img src="/images/img-folder/pj-2.jpg">
2.Port填写8888(或者其他你喜欢的端口号)，勾选"Enable transparent HTTP proxying"，OK确定
<img src="/images/img-folder/pj-3.jpg">
#### 手机配置
##### 手机和电脑连接同一个无线网络（wifi）
##### 点击该无线网络 -> 在最底下选择"高级设置" 
代理: 选择"手动"
代理服务器主机名: 填写mac电脑IP地址 (使用命令ifconfig查看, en0显示的结果)
代理服务器端口: 8888 (电脑上设置的端口)
##### 手机浏览器访问: http://www.charlesproxy.com/getssl/ ，下载安装ssl证书
### 电脑浏览器抓包
#### 取消电脑上的代理（如果有的话）: Open Network Preference -> Advanced... -> Proxies, 取消勾选"Automatic Proxy Configuration"
#### 访问网页即可进行抓包
### 手机无法安装pem的证书
https://jingyan.baidu.com/article/2a138328eb6448074b134f7c.html
#### 第一种方法
<img src="/images/img-folder/pj-4.png">

#### 第二种方法（亲测有效）
<img src="/images/img-folder/pj-5.png">

