---
title: git clone的时候 github链接前面加上了 https://ghproxy.com
categories: js-end
date: 2024-04-11 19:24:00
---

### 问题：
github git clone 项目代码的时候发现报错

```
mac unable to access 'https://ghproxy.com/https://github.com/xiaosongread/vue-pc-cli.git/': recv failure
```

<!-- more -->

刚开始各种找问题，以为是电脑加上了什么代理，查看电脑代理配置，网络配置，都没有发现问题，网上找全让我执行一下代码（不好使！！！）

```
grep -i proxy
unset http_proxy  
unset https_proxy  
```

发现不好使

### 解决办法

```js
// 查看本地级别配置文件
$ git config --local  --list
```

发现在全局config文件里面有相关的配置，也不知道自己什么时候手欠执行了看不懂的命令行！

执行一下命令解决删除就可以：

1.
```
vi ~/.gitconfig
```
2.进入编辑模式：按下键盘上的“i”键进入编辑模式
3.显示如下内容,删除代理相关的配置
```
修改配置项：在打开的文件中，可以看到类似以下格式的配置项：

   “`
   [user]
     name = Your Name
     email = your.email@example.com
   “`
```
4.保存并退出：按下键盘上的“Esc”键退出编辑模式，然后输入冒号（:）并输入命令“wq”以保存并退出。

完美解决！！！差点就搞得我重装系统了。