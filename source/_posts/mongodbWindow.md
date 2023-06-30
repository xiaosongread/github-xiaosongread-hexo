---
title: mongodb windows 安装
categories: gc-end
date: 2023-06-30 18:39:03
tags: node mongodb
---

MongoDB是一个基于分布式文件存储 [1] 的数据库。由C++语言编写。旨在为WEB应用提供可扩展的高性能数据存储解决方案。它支持的数据结构非常松散，是类似json的bson格式，因此可以存储比较复杂的数据类型。Mongo最大的特点是它支持的查询语言非常强大，其语法有点类似于面向对象的查询语言，几乎可以实现类似关系数据库单表查询的绝大部分功能，而且还支持对数据建立索引。
### MongoDB下载

<!-- more -->

(mac本地搭建MongoDB)参考链接： http://shuy.cc/2020/11/12/mac%E6%9C%AC%E5%9C%B0%E6%90%AD%E5%BB%BAMongoDB/

#### 安装下载地址
https://www.mongodb.com/try/download/community

<img src="/images/img-folder/2023/mongo1.png">

然后一顿 next ,最后 install 就安装成功了。

### 配置步骤
#### 配置系统变量
首先点击电脑桌面-> 此电脑右键属性，然后按照下图设置环境变量。

> 注意：地址和你安装时候的地址匹配上

<img src="/images/img-folder/2023/mongo2.png">

#### 创建目录（创建数据库db和日志log文件的目录）
1. 在C盘的根目录去创建一个data文件夹，在里面再建一个db文件夹。
2. 我们打开cmd，输入mongod，他会跑出来一堆代码，这时候我们再去看刚刚新建的db文件夹，里面已经有东西了。
3. 在刚刚创建的data文件夹里继续新建log文件夹。

#### 创建配置文件
在mongodb的安装目录下,新建mongod.config的文件
<img src="/images/img-folder/2023/mongo3.png">

编辑内容如下：

```js
systemLog:
    destination: file
    path: c:\data\log\mongod.log
storage:
    dbPath: c:\data\db
```

#### 安装 MongoDB服务
打开cmd,在安装目录bin下，通过执行mongod.exe，使用–install选项来安装服务，使用–config选项来指定之前创建的配置文件。

```js
mongod.exe --config "C:\Program Files\MongoDB\Server\6.0\mongod.config" --install
```

#### 启动/关闭服务

以管理员的身份运行cmd,命令如下：

```js
启动服务
net start MongoDB
关闭服务
net stop MongoDB
```

或者直接点击

<img src="/images/img-folder/2023/mongo4.png">

启动服务之后， 在浏览器中输入地址和端口号（27017是默认端口号），http://localhost:27017

<img src="/images/img-folder/2023/mongo5.png">

显示以上内容就表示成功了！
