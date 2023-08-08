---
title: nvm windwos 安装、使用、切换node找不到npm的问题
categories: js-end
date: 2023-08-08 22:24:14
---

### 需求
前端开发经常要切换不同node版本的需求，但是windows下安装nodejs比较麻烦，所以使用nvm来安装nodejs，可以自如的管理切换node的不同版本。

### 安装
1. 下载nvm-setup.exe
下载地址：https://github.com/coreybutler/nvm-windows/releases
2. 安装
3. 安装完成后，在cmd中输入nvm，如果出现如下信息，说明安装成功

<!-- more -->

```
C:\Users\Administrator>nvm
Node Version Manager  
Usage:
  nvm arch                     : Show architecture
  nvm current                  : Show current version
  nvm install <version>        : Install a version of node
  nvm list [available]         : List available versions
  nvm on                       : Turn on nvm
  nvm off                      : Turn off nvm
  nvm proxy [url]              : Set the proxy for nvm
  nvm uninstall <version>      : Uninstall a version of node
  nvm use <version>            : Modify PATH to use <version>
  nvm version                  : Show version

Example:
  nvm install v0.10.32          
  nvm use 0.10
  nvm alias default 0.10
  nvm uninstall v0.10.32  
```

### 问题
安装完成之后，切换另一个node版本的时候，出现找不到 npm 的问题。

<img src="/images/img-folder/2023/vpn.png" />

### 解决

按照错误描述，应该是在对应的目录中没有找到npm-cli.js这个文件。于是去NVM的安装路径下（通常为c:\users<your user>\AppData\Roaming\nvm）查看了一下。
需要在 node 的官网，找到你切换找不到npm对应的node包，下载下来，然后复制到你对应的 nvm 目录下。

<img src="/images/img-folder/2023/nvm-2.png" />

NVM将所有安装的Node.js的不同版本存放在这个目录下，当使用nvm use命令时，会将对应版本的Node.js目录中的内容拷贝到C:\Program Files\nodejs目录中，从而达到切换不同Node.js版本的目的。但是这个目录下的node_modules目录是空的！怎么回事？

从Node.js官网下载对应版本的压缩包，将其中node_modules目录下的内容拷贝到NVM目录下对应Node.js安装目录中的node_modules中。如果NVM目录下有多个Node.js版本，则需要手动拷贝每个Node.js版本中node_modules目录的内容。

如https://nodejs.org/download/release/v11.15.0/是Node.js v11.15.0版本的下载地址。下载之后打开压缩包，将其中的node_modules/npm目录解压并拷贝到NVM目录下对应Node.js下的node_modules目录中。

再次使用nvm use命令切换不同版本的Node.js，然后在命令行通过node -v查看当前Node.js版本，同时输入npm看看该命令是否有效。

