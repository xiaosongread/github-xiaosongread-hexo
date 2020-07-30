---
title: 修改element源码，发布属于自己的element包，实现自定义并修改element源码的bug，来实现线上使用自己的包来打包文件
categories: gc-end
date: 2020-07-30 12:01:26
---
我们在项目中，在采用element框架的时候，框架本身也是有bug的或者不符合我们产品需求需要我们改动的，但是，如果是本地打包完上传到服务器的话，可以修改本地的element源码，如果是服务器打包的话，那我们就得自己发一个npm的包来进行打包了。
### 案例：修改element Cascader 级联选择器，清空数据，下拉框仍然回显最后选择的数据的问题
修改前的效果：
![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/npm-1.png)
修改后的效果：
![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/npm-2.png)

<!-- more -->

### 修改源代码
#### 1.首先把elementUI的项目从git上克隆下来
```javascript
git clone https://github.com/ElemeFE/element.git
```
#### 2.然后进入element文件夹
```javascript
cd element
```
#### 3.安装相关的依赖
```javascript
npm install
```
#### 4.修改源码，我修改的部分在packages里面的 cascader-panel.vue 文件，
```javascript
clearCheckedNodes() {
  const { config, leafOnly } = this;
  const { multiple, emitPath } = config;
  if (multiple) {
    this.getCheckedNodes(leafOnly)
      .filter(node => !node.isDisabled)
      .forEach(node => node.doCheck(false));
    this.calculateMultiCheckedValue();
  } else {
    this.checkedValue = emitPath ? [] : null;
    this.activePath = []; // add this line
    this.calculateCheckedNodePaths(); // add this line
    this.syncActivePath(); // add this line
  }
}

value() {
  this.clearCheckedNodes(); // add this line
  this.syncCheckedValue();
  this.checkStrictly && this.calculateCheckedNodePaths();
}
```
添加了上面的’add this line‘4行代码，问题完美解决。
#### 5.生成lib文件夹
```javascript
npm run dist
```
就会生成一个lib文件夹，这部分是我们调试用的，刚克隆下来没有run dist之前是没有lib文件夹的，我修改完源码之后,运行run dist 后将生产的lib文件夹拷贝到项目中的node_modules中的element-ui文件夹中去，效果OK。

### 如何将npm包发布到npm上
#### 1.首先注册一个npm账号密码
npm 官网：https://www.npmjs.com/
#### 2.修改原element-ui的文件名为自己的包名字
需要修改里面的config.js文件里面的名字和package.json里面的包名就可以了，我修改了之后上传后结果是报了40多个路径错误，全局全词匹配到element-ui之后进行全局替换为我设置的包名
#### 3.npm init
```javascript
npm init 
```
#### 4.登录自己的账号
```javascript
npm login 
```
依次根据提示输入username、password、e-mail其他的都可以敲回车完事（记得改element文件夹中package.json文件中的包名和版本号啊）。
需要强调的是包名不能重复，不然npm会给你报一堆乱七八糟的错误。
#### 5.上传npm包
```javascript
npm publish
```
#### 6.修改自己项目的配置
到项目中将项目中的package.json中的dependencies中的："element-ui": "^2.4.11"修改为："你的包名": "^你的版本号"。
然后进行依赖安装：npm install
启动项目，效果OK。