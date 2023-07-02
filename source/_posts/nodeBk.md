---
title: 项目-博客-插件库（jq22）
categories: gc-end
date: 2023-07-01 18:39:03
tags: node mongodb
---

该博客是本人5年前写的，主要技术栈用的是node+mongodb+swig模板引擎+vue+boot+微信小程序。
### 主要实现的功能如下：
#### 后台管理系统
+ 网站用户管理
+ 网站菜单管理(包括pc和h5)
+ 内容管理(博客的创建、列表、编辑、删除)
+ 视频管理(视频的上传、编辑、删除)
+ 菜单管理(jq22功能网站)
+ 资源管理(jq22功能网站)(资源的上传、pdf文件书籍的上传、zip插件的上传)
#### 网站
+ 博客列表
+ 登陆入口
+ 热点文章
+ 静态资源链接汇总展示
+ 视频列表页
+ 前端资料库(类jq22)，资源的列表页、资源的功能演示页、资源的下载页
#### 手机端网站(vue)
+ 纯博客网站
#### 微信小程序
+ 纯博客微信小程序

<!-- more -->
### 功能页面
<div style="display: flex;flex-wrap: wrap;justify-content:flex-start;">
  <a href="https://www.wm-motor.com/" style="display:block;width:450px;height:257px;position:relative; margin: 0 30px 50px 0;background:rgba(0,0,0,.5);">
    <img src="/images/img-folder/2023/n1.png" style="height: 100%;position:absolute;top:0;left:0;right:0;bottom:0;">
    <div style="width:100%;line-height:25px;background:rgba(0,0,0,.5);color:#fff;position:absolute;bottom:-25px;left:0;font-size: 14px;text-align:center;">博客列表</div>
  </a>
  <a href="https://www.wm-imotor.com/" style="display:block;width:450px;height:257px;position:relative; margin: 0 30px 50px 0;background:rgba(0,0,0,.5);">
    <img src="/images/img-folder/2023/n2.png" style="height: 100%;margin:0 auto;display:block;position:absolute;top:0;left:0;right:0;bottom:0;">
    <div style="width:100%;line-height:25px;background:rgba(0,0,0,.5);color:#fff;position:absolute;bottom:-25px;left:0;font-size: 14px;text-align:center;">博客详情</div>
  </a>
  <a href="https://www.wm-motor.com/" style="display:block;width:450px;height:257px;position:relative; margin: 0 30px 50px 0;background:rgba(0,0,0,.5);">
    <img src="/images/img-folder/2023/n3.png" style="height: 100%;position:absolute;top:0;left:0;right:0;bottom:0;">
    <div style="width:100%;line-height:25px;background:rgba(0,0,0,.5);color:#fff;position:absolute;bottom:-25px;left:0;font-size: 14px;text-align:center;">插件库列表</div>
  </a>
  <a href="https://www.wm-imotor.com/" style="display:block;width:450px;height:257px;position:relative; margin: 0 30px 50px 0;background:rgba(0,0,0,.5);">
    <img src="/images/img-folder/2023/n4.png" style="height: 100%;margin:0 auto;display:block;position:absolute;top:0;left:0;right:0;bottom:0;">
    <div style="width:100%;line-height:25px;background:rgba(0,0,0,.5);color:#fff;position:absolute;bottom:-25px;left:0;font-size: 14px;text-align:center;">插件详情页</div>
  </a>
  <a href="https://www.wm-imotor.com/" style="display:block;width:450px;height:257px;position:relative; margin: 0 30px 50px 0;background:rgba(0,0,0,.5);">
    <img src="/images/img-folder/2023/n5.png" style="height: 100%;margin:0 auto;display:block;position:absolute;top:0;left:0;right:0;bottom:0;">
    <div style="width:100%;line-height:25px;background:rgba(0,0,0,.5);color:#fff;position:absolute;bottom:-25px;left:0;font-size: 14px;text-align:center;">管理系统-内容编辑</div>
  </a>
</div>

### 项目要点
#### 项目目录
<img src="/images/img-folder/2023/n6.png">

#### 项目的启动文件
```js
//加载express模块
var express = require('express');
//加载数据库模块,记录登陆状态
var mongoose = require('mongoose');
//通过express创建app应用 => nodejs Http.createServer();
var app = express();
//用户请求的url，如果是以public开头的，他就会去public下面找对应请求的文件
app.use('/public',express.static(__dirname + "/public"));
app.use('/static/css',express.static(__dirname + "/views/main/dist/static/css"));
app.use('/static/js',express.static(__dirname + "/views/main/dist/static/js"));
app.use('/ueditor',express.static(__dirname + "/ueditor"));
//连接数据库
mongoose.connect('mongodb://localhost:27017/data',function(err){
	if(err){
		console.log("数据库连接失败");
	}else{
		console.log("数据库连接成功");
        console.log("please open localhost:8080")
        // child_process.exec(cmd + ' "'+url + '"');
        //监听http请求
		app.listen(8080);
	}
});
```
#### 创建表、读取数据
##### 1.模型类
```js
// modal
/*
 * 文章模型类
 */
var mongoose = require('mongoose');
//引入对应schemas的表结构
var contentSchema = require('../schemas/contents');
//创建模型
module.exports = mongoose.model('Content',contentSchema);
```
##### 2.表结构
```js
/*
 * 文章内容的表的结构
 *
 * category  文章所属分类的id
 *
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//分类的表结构
module.exports = new mongoose.Schema ({
	//关联字段
	 category:{
		type: mongoose.Schema.Types.ObjectId,
		ref:'Category'//引用另一张表
	 },
	 title:  String,
     posted:{
		type:Boolean,
		default:true
	 },
	 description: {
		 type: String,
		 default:''//默认值
	 },
	 content: {
		 type: String,
		 default:''//默认值
	 },
	//评论的内容,应该是数组格式
	 comments:{
	 	type:Array,
		default:[]
	 },
	//浏览量
	 views:{
		 type:Number,
		 default:0
	 },
	 startTime: {
		 type:Date,
		 default:new Date()
	 }
})
```
##### 3.数据的读取
```js
Category.find().then(function(categories){
    //查询数据库中的数据的条数
    Content.count().then(function(count) {
        pages = Math.ceil(count / limte);//客户端应该显示的总页数
        page = Math.min(page, pages);//page取值不能超过pages
        page = Math.max(page, 1);//page取值不能小于1
        var skip = (page - 1) * limte;
        //sort()排序  -1 降序 1 升序
        //populate('category')  填充关联内容的字段的具体内容(关联字段在指定另一张表中的具体内容)
        Content.find({
            posted: true
        }).sort({_id: -1}).limit(limte).skip(skip).populate('category').then(function (contents) {
            var deviceAgent = req.headers["user-agent"].toLowerCase();
            var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
            if(agentID){
                res.render('webApp/index.html')
            }else{
                res.render('main/index.html', {
                    categories:categories,
                    userInfo: req.userInfo,
                    contents: contents,
                    page: page,
                    count: count,
                    pages: pages,
                    limte: limte
                });
                // res.render('main/dist/index.html')
            }

        })
    })
})
```
#### swig模板引擎使用
```js
<!--文章的列表-->
<ul class="contentList">
    {% for content in contents %}
    <a href="/contentInfo?id={{content._id.toString()}}">
    <li id="{{content._id.toString()}}">
        <h3>{{content.title}}</h3>
        <div class="contentInfo">
            <i class="fa fa-navicon"></i><span>{{content.category.name}}</span><i class="fa fa-clock-o"></i><span>{{content.startTime|date('Y年m月d日 H:i:s', -480, 'CCT')}}</span>
            <nav class="eyeNum"><i class="fa fa-eye"></i><span>{{content.views}}</span></nav>
        </div>
        <div class="content_description">
            <p>{{content.description}}</p>
        </div>
    </li>
    </a>
    {% endfor%}
</ul>
```
#### 功能点实现
##### 1.图片上传
```js
router.post('/apply/upload',function(req,res,next){
	var cacheFolder = './public/images/uploadcache/';
	var currentUser = req.userInfo.username;
	var userDirPath =cacheFolder+ currentUser;
	// 检测目录是否存在
	if (!fs.existsSync(userDirPath)) {
		// 同步创建目录
		fs.mkdirSync(userDirPath);
	}
	var form = new formidable.IncomingForm(); //创建上传表单
	form.encoding = 'utf-8'; //设置编辑
	form.uploadDir = userDirPath; //设置上传目录
	form.keepExtensions = true; //保留后缀
	form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
	form.type = true;
	var displayUrl;
	form.parse(req, function(err, fields, files) {
		if (err) {
			res.send(err);
			return;
		}
		var extName = ''; //后缀名
		console.log(files.upload.type)
		switch (files.upload.type) {
			case 'image/jpeg':
				extName = 'jpg';
				break;
			case 'image/jpeg':
				extName = 'jpg';
				break;
			case 'image/png':
				extName = 'png';
				break;
			case 'image/x-png':
				extName = 'png';
				break;
		}
		if (extName.length === 0) {
			res.send({
				code: 202,
				msg: '只支持png和jpg格式图片'
			});
			return;
		} else {
			var avatarName = '/' + Date.now() + '.' + extName;
			var newPath = form.uploadDir + avatarName;
			displayUrl = currentUser;
			fs.renameSync(files.upload.path, newPath); //重命名
			newPath = newPath.substring(1);
			res.send({
				code: 200,
				msg: displayUrl,
				url: "https://www.songyanbin.com" + newPath
			});
		}
	});
})
```
##### 2.zip解压—实现zip插件浏览器预览插件效果
```js
//上传zip插件资源并解压
router.post('/apply/addZip',function(req,res,next){
	console.log(res)
	var cacheFolder = './public/source/zip/';
	var currentUser = req.userInfo.username;
	var userDirPath =cacheFolder+ currentUser;
	if (!fs.existsSync(userDirPath)) {
		fs.mkdirSync(userDirPath);
	}
	var form = new formidable.IncomingForm(); //创建上传表单
	form.encoding = 'utf-8'; //设置编辑
	form.uploadDir = userDirPath; //设置上传目录
	form.keepExtensions = true; //保留后缀
	form.maxFieldsSize = 2 * 1024 * 1024; //文件大小
	form.type = true;
	var displayUrl;
	form.parse(req, function(err, fields, files) {
		if (err) {
			res.send(err);
			return;
		}
		var extName = ''; //后缀名
		console.log("类型：")
		console.log(files.upload.type)
		switch (files.upload.type) {
			case 'application/zip':
				extName = 'zip';
				break;
		}
		if (extName.length === 0) {
			res.send({
				code: 202,
				msg: '只支持zip资源上传'
			});
			return;
		} else {
			var avatarName = '/' + Date.now() + '.' + extName;
			var newPath = form.uploadDir + avatarName;
			displayUrl = currentUser;
			fs.renameSync(files.upload.path, newPath); //重命名
			var jyName = avatarName.substring(1,avatarName.length - 4);//解压后的文件名字
			newPath = newPath.substring(2);
			var path = userDirPath.substring(2) + '/';
			console.log(userDirPath)
            // 解压
			Minizip.unzip(newPath, path + jyName, function(err) {
				if (err){
					console.log(err);
				}else{
					console.log('unzip successfully.');
				}
			});
			res.send({
				code: 200,
				msg: displayUrl,
				url: "https://www.songyanbin.com" + '/' + newPath,
				lookUrl: "https://www.songyanbin.com" + '/' + path + jyName + '/'
			});
		}
	});
})
```
##### 3.用户登录注册实现
```js
/*
 * 用户注册逻辑
 */
router.post('/user/register',function(req,res,next){
	var username =  req.body.username;
	var password = req.body.password;
	var repassword = req.body.repassword;
	var time = req.body.time;
	console.log("注册的时间：",time)
	console.log(username)
	console.log(password)
	console.log(repassword)
	if(username == ''){
		responseData.code = 01;
		responseData.message = '用户名不能为空';
		res.json(responseData);
		return;
	}
    if(username.length > 10){
        responseData.code = 02;
        responseData.message = '用户名不能超过10个字符';
        res.json(responseData);
        return;
    }
    if(password.length < 6){
        responseData.code = 03;
        responseData.message = '密码不能少于6位';
        res.json(responseData);
        return;
    }
	if(password == ''){
		responseData.code = 04;
		responseData.message = '密码不能为空';
		res.json(responseData);
		return;
	}
	if(repassword != password){
		responseData.code = 05;
		responseData.message = '两次输入的密码不一致';
		res.json(responseData);
		return;
	}
	// 查找数据库是否有同名的用户 两种方法其实一个意思
	User.findOne({
		username:username
	}).then(function(userInfo){
		if(userInfo){//有的话就标示数据库里面有这个用户
			responseData.code = 4;
			responseData.message = '用户名重复';
			res.json(responseData);
			return;
		}
		//保存用户注册的账号到数据库中
		var user = new User({
			username:username,
			password:password,
            time:time
		});
		return user.save();
	}).then(function(newUserInfo){
		responseData.code = 8;
		responseData.message = '注册成功';
		res.json(responseData);
	})
})
/*
 * 登录逻辑
 */
router.post('/user/login',function(req,res,next){
	var username =  req.body.username;
	var password = req.body.password;
	if(username == ''){
		responseData.code = 5;
		responseData.message = '用户名不能为空';
		res.json(responseData);
		return;
	}
	if(password == ''){
		responseData.code = 6;
		responseData.message = '密码不能为空';
		res.json(responseData);
		return;
	}
	//查找数据库中是否有相似的用户名
	User.findOne({
		username:username,
		password:password
	}).then(function(userInfo){
		if(!userInfo){
			responseData.code = 7;
			responseData.message = '用户名不存在,请先注册';
			res.json(responseData);
			return;
		}
		responseData.code = 9;
		responseData.message = '登陆成功';
		responseData.data = {
			username : userInfo.username
		}

        res.cookie("account", username);


        // res.cookie('asd', userInfo.username);
        // 设置cookies 返回给客户端
		req.cookies.set('userInfo',JSON.stringify({
			_id : userInfo._id,
			username : userInfo.username
		}));
		res.json(responseData);
		return;
	})
})
```
##### 4.微信小程序注册
```js
/*
 * 用户注册 -- 小程序
 */
router.get('/user/WeChat/register',function(req,res,next){
	var header = req.query.header;
	var username = req.query.username;
    var appid = req.query.appid;
	var secret = req.query.secret;
	var jscode = req.query.jscode;
	var openid;
    https.get('https://api.weixin.qq.com/sns/jscode2session?appid='+appid+'&secret='+secret+'&js_code='+jscode+'&grant_type=authorization_code', function(wxRes) {
        wxRes.on('data', function(d) {
            openid = JSON.parse(d.toString()).openid
			console.log(openid)
            // 查找数据库是否有同名的用户 两种方法其实一个意思
            Wechatusers.findOne({
                openid:openid
            }).then(function(userInfo){
                if(userInfo){//有的话就标示数据库里面有这个用户
                    responseData.code = 4;
                    responseData.message = '用户名重复';
                    responseData.data = userInfo;
                    console.log("00000")
					console.log(responseData)
                    res.json(responseData);
                    return;
                }
                console.log("别走了")
                //保存用户注册的账号到数据库中
                var wechatusers = new Wechatusers({
                    openid:openid,
                    header:header,
                    username:username
                });
                return wechatusers.save().then(function(userInfo){
                    responseData.code = 38;
                    responseData.message = '注册成功';
                    responseData.data = userInfo;
                    res.json(responseData);
                })
            })
		});
	}).on('error', function(e) {
        console.error(e);
	});
})
```
### 项目部署-[使用博客代码做你的博客网站]
1.安装node环境（node版本为12）
2.安装mongodb数据库，安装教程如下：
windows: http://shuy.cc/2023/06/30/mongodbWindow/
mac: http://shuy.cc/2020/11/12/mac%E6%9C%AC%E5%9C%B0%E6%90%AD%E5%BB%BAMongoDB/
3.在项目目录下面启动shell，运行npm i,安装项目相关依赖
4.运行node app.js,启动项目。