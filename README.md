之前买的阿里的云服务器，太贵了没钱续费，github的博客免费，代码托管上去，只需要买个域名甚至不买也行，挺合适，就是访问速度慢点，百度也不收录，但是这些也有解决的办法，具体的解决办法本文不介绍了，以后有时间可以再具体说一说，暂时也可以自己用，反正主要也是自己记录，不求他能有多高的baidu排名。

1.[准备条件](#准备条件)   
2.[设置本地博客的配置](#设置本地博客的配置)      
3.[初始化hexo](#初始化hexo)    
4.[上传项目](#上传项目)   
5.[文件目录](#文件目录)   
6.[更换主题](#更换主题)   
7.[使用方法](#使用方法)   
8.[常见使用疑问](#常见使用疑问)   
9.[配置自定义域名](#配置自定义域名)    

## 准备条件：

```
	1.node 环境
	2.git 环境 配置公钥私钥
	3.npm 安装
	4.github 账号
```

> ##### 如果您是开发人员，这应该都有，不会的可以网上找，依照一大堆的。

## 设置本地博客的配置：

1.全局安装hexo
```javascript
	npm install -g hexo
```
2.新建一个文件夹，cd到当前文件夹，
```javascript
	npm install hexo --save
```
然后
```javascript
	hexo v
```
出现以下，说明安装成功   

![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/1.png)

> 别着急，就快成功了，再坚持一小小下

## 初始化hexo：   
1.继续输入
```javascript
	hexo init
```
实现初始化   
2.下载好了，再输入
```javascript
	hexo s
```
![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/2.png)   
>这时候我们就可以打开浏览器了，在地址栏中输入http://localhost:400/，我们就可以看到如下图的界面   

![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/3.png)   

> #### **基本搭建完成，其实你才完成了一半**

## 上传项目：   
1.在github上面先创建一个项目，特别注意，名称的命名
>github的用户名要和创建的博客的项目名称一致，如下：   

![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/5.png)

> **名称格式：username.github.io**

2.打开项目中_config.yml（配置文件），对它做如下修改，repository后面的内容是 git@gitbub.com:username/库地址 的形式    

> **type、repository、branch冒号的后面都有一个空格**

![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/6.jpg)

3.#### 回到shell，输入：
```javascript
	npm install hexo-deployer-git --save   
	hexo g   
	hexo d   
```

##### 部署完之后将代码中的 **public**下的文件传到你创建的git项目下面，这样别人也可以通过域名访问我们博客了。在地址栏输入http://域名就可以访问。比如：http://xiaosongread.github.io

## 文件目录：

![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/4.png)   

## 更换主题：   
我更换的主题是：https://github.com/Sanonz/hexo-theme-concise，将次项目clone下来，其他主题：[hexo主题](https://hexo.io/themes/)   

将下载下来的主题中的所有文件copy到你的代码中的themes文件夹中(可以新建一个主题文件夹，比如landscape1),修改文件根目录的配置文件的主题名，如下   
![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/7.jpg)   

> **此主题可能最后样式可以不起作用，应为此模板用了less，需要安装 npm install hexo-renderer-less --save**

##### 然后重新打包项目
``` 
hexo g
hexo d
```
接着重新将public文件上传到你的github项目中。

## 使用方法：   

shell|表头
---|:--:
hexo s|本地启动服务
hexo new 'filename'|创建md文件
hexo s hexo g|修改内容打包文件

## 常见使用疑问：
1.此项目没有后台系统如何录数据？
此系统录入数据的步骤是：
* hexo new 'filename'（新建.md文件）
* 用markdown格式排版内容
* hexo d hexo g 重新打包上传就页面可以看见你添加的文章    

2.如何为文章分类？
添加分类列表，设置文章的 categories 字段然后访问 /categories/front-end

```
---
title: Hello World
date: 2017-10-20 20:00:00
categories: front-end
---
```
如何设置分页，截断文章等不会的问题可以在本项目提交issues,或者访问[本主题](https://github.com/sanonz/hexo-theme-concise)查看

> **需要了解markdown的基本语法**

[常用markdown语法](https://github.com/xiaosongread/markdow)   


## 配置自定义域名：
此过程比较麻烦，有需要的可以提issure,有时间可以补充一下... ...




















<!-- [点击查看参考博客](https://www.cnblogs.com/trista222/p/8017300.html)

```shell
hexo new page 'tags'
hexo new 'filename'   
hexo g   
hexo d   
``` -->