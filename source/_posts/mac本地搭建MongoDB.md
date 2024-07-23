---
title: mac本地搭建MongoDB
categories: js-end
date: 2020-11-12 16:49:13
---
### 下载安装
#### 访问MongoDB官方下载地址
官网地址是：[MongoDB Download Center | MongoDB](https://www.mongodb.com/try/download/community)
<!-- more -->
<img src="/images/img-folder/mongodb/1.png">

#### 点击“DOWNLOAD(tgz)”按钮，将解压后的文件放入 /usr/local ，默认情况下在Finder中是看不到 /usr 这个目录的（终端用得溜的请略过），可以打开Finder后按 shift + command +G 输入 /usr/local 后回车便能看到这个隐藏的目录了。
<img src="/images/img-folder/mongodb/2.png">

<img src="/images/img-folder/mongodb/3.png">

#### 配置环境变量，打开终端，输入“open -e .bash_profile”，在打开的文件中加入
```javascript
export PATH=${PATH}:/usr/local/MongoDB/bin
```
<img src="/images/img-folder/mongodb/4.png">

用Command+S保存配置，关闭上面的.bash_profile编辑窗口，然后在下图中输入"source .bash_profile"使配置生效。输入"mongod -version"，回车后如果看到下面的版本号则说明MongoDB已经成功安装到了Mac上。
<img src="/images/img-folder/mongodb/5.png">

#### 在根目录下新建 data 文件夹，里面再建一个 db 文件夹，安装MongoDB时并不会自动生成，需要我们手动创建，可以在命令行输入创建，也可以直接在Finder中手动新建
```javascript
sudo mkdir -p /data/db
```
<img src="/images/img-folder/mongodb/6.png">

> 命令行不好使 删掉重新手动创建一下，我就是重新删掉手动新建了一下，具体原因不详

### 运行
#### 打开命令行输入
```javascript
mongod
```
显示等候客户端连接的界面就代表启动成功了，如果不成功就检查下 /data/db 文件夹位置对不对，不行就重新删掉建一个， 打开浏览器，输入localhost:27017 ，会出现这样一行文字。
```javascript
It looks like you are trying to access MongoDB over HTTP on the native driver port.
```
重新打开命令行，输入
```javascript
mongo
```
可以对数据库进行操作，要停止MongoDB的时候一定要正确的退出，不然下次再次连接数据库会出现问题，使用下面的两行代码可以完成这一操作。
```javascript
use admin;
db.shutdownServer();
```
### 可视化工具
RoboMongo是一个跨平台的MongoDB GUI客户端管理工具，支持Windows、MacOS、Linux。其特点是支持到MongoDB服务器的SSL连接，还支持使用SSH隧道连接。[RoboMongo](https://robomongo.org/download)的查询界面同时支持树视图、表格视图、文本视图三种，也可以保存查询结果供以后使用。 Robomongo 可以选择适合自己的版本下载。
