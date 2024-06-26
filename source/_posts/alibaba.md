---
title: 阿里云服务器安装node环境，pm2控制node进程服务
categories: js-end
date: 2024-06-26 14:22:17
---

### 部署node环境

#### 1.账号密码或者控制台远程链接上服务器
#### 2.部署Node.js环境

> 使用NVM安装多个Node.js版本

<!-- more -->

NVM（Node Version Manager）是Node.js的版本管理软件，使您可以轻松在Node.js各个版本间进行切换。适用于长期做node开发的人员或有快速更新node版本、快速切换node版本的场景。具体操作步骤如下：

##### a. 安装分布式版本管理系统Git。

```
yum install git -y
```

##### b. 使用Git将NVM的源码克隆到本地的~/.nvm目录下，并检查最新版本。

> 说明：由于网络原因，可能会出现无法克隆的问题，建议您多尝试几次。

```
git clone https://gitee.com/mirrors/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
```
##### c. 依次运行以下命令，配置NVM的环境变量。

```
echo ". ~/.nvm/nvm.sh" >> /etc/profile
source /etc/profile
```

##### d. 运行以下命令，修改npm镜像源为阿里云镜像，以加快Node.js下载速度。
```
export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node
```
##### e. 运行以下命令，查看Node.js版本。
```
nvm list-remote
```

##### f. 安装多个Node.js版本。

+ i. 安装v14.0.0版本。
```
nvm install v14.0.0
```
+ ii. 安装v16.0.0版本。
```
nvm install v16.0.0
```
+ g. 查看已安装的Node.js版本。
```
nvm ls
```
返回结果如下所示，表示当前已安装v14.0.0、v16.0.0两个版本，正在使用的是v16.0.0版本。

```
        v14.0.0
->      v16.0.0
default -> v14.0.0
iojs -> N/A (default)
unstable -> N/A (default)
node -> stable (-> v16.0.0) (default)
stable -> 16.0 (-> v16.0.0) (default)
lts/* -> lts/hydrogen (-> N/A)
lts/argon -> v4.9.1 (-> N/A)
lts/boron -> v6.17.1 (-> N/A)
lts/carbon -> v8.17.0 (-> N/A)
lts/dubnium -> v10.24.1 (-> N/A)
lts/erbium -> v12.22.12 (-> N/A)
lts/fermium -> v14.21.3 (-> N/A)
lts/gallium -> v16.20.1 (-> N/A)
lts/hydrogen -> v18.16.1 (-> N/A)
```

> 说明：您可以运行nvm use <版本号>命令切换Node.js的版本。例如，切换至Node.js v18.0.0版本的命令为nvm use v18.0.0。

### 部署测试项目

在服务器找个文件夹，新建app11.js

```
var http = require('http');

http.createServer(function (request, response) {

    response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});//只需要设置响应头的编码格式就好,解决中文乱码问题的代码
    // response.writeHead(200, { 'Content-Type': 'text/plain' }); // 原有代码


    response.end('Hello World--测试\n');
}).listen(8090);

console.log('Server running at http://127.0.0.1:8090/')
```

<p><img src="/images/img-folder/n1.jpg"></p>
<p><img src="/images/img-folder/n2.jpg"></p>

> 在当前文件夹下面执行 `node app11.js`

此时说明你的node已经可以全局使用了。

### 安装pm2
<p><img src="/images/img-folder/n3.jpg"></p>

在这里 /root/.nvm/.cache/bin (这个按照你的路径) 安装pm2,建立软连接

```
npm install pm2 -g
ln -s /root/.nvm/.cache/bin/pm2 /usr/local/bin/ 
```

#### 杀掉刚刚那个启动，重新使用PM2启动并输出日志：

```
pm2 start app11.js -e err.log -o out.log
```

#### 执行pm2重启命令

```
pm2 restart app11
```

> 另外说一下：如果你需要不断修改代码，有热更新功能的话，建议使用supervisor，supervisor的功能是自动重启的话，pm2是永生.

<p><img src="/images/img-folder/n4.jpg"></p>

### pm2 常用命令
+ pm2 查看启动了哪些进程

```
pm2 list
```

+ 关闭id 为pm2 list 显示的对应的pm2进程的id
```

pm2 stop #id 
```

+ 重启pm2进程

```
pm2 restart #id
```

+ 关闭所有

```
pm2 stop all  
```

+ 启动所有

```
pm2 start all
```

+ 删除pm2进程

```
pm2 delete #id
```

+ 删除所有pm2进程
```
pm2 delete all
```

+ pm2 可以启动任何类型的进程

```
pm2 start app.js        //启动js文件
pm2 start echo.php      //启动php文件
pm2 start echo.py       //启动py文件
pm2 start echo.sh       //启动sh文件
pm2 start echo.rb       //启动ruby文件
pm2 start app.json      //启动json文件
pm2 start ./binary-app  //启动二进制代码
```


### 安装参考

+ [图文并茂基于阿里云linux服务器部署nodejs项目并添加pm2守护nodejs项目运行进程（Linux version 4.19.81-17.1.al7.x86_64）](https://blog.51cto.com/u_15127500/4116095)
+ [一文带你了解Node.js进程管理工具PM2](https://www.jb51.net/javascript/2935886yl.htm)
