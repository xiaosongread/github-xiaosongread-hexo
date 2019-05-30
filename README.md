
#### 一、准备条件：

	1.node 环境
	2.git 环境 配置公钥私钥
	3.npm 安装
	4.github 账号

> ##### 如果您是开发人员，这应该都有，不会的可以网上找，依照一大堆的。

#### 二、设置本地博客的配置：

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

#### 三、初始化hexo：   
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

#### 四、上传项目：   
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

#### 五、文件目录：

![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/4.png)   

#### 六、：更换主题：   






















<!-- [点击查看参考博客](https://www.cnblogs.com/trista222/p/8017300.html)

```shell
hexo new page 'tags'
hexo new 'filename'   
hexo g   
hexo d   
``` -->