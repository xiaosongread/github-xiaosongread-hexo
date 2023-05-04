---
title: 如何禁用谷歌浏览器的自动填充?
categories: css-end
date: 2021-09-20 13:30:03
tags: css html
---

#### 当网页中表单中，如果有密码项。谷歌浏览器的密码填充机制就会启动，会对页面样式造成一定的影响。
### 如下图，密码会自动补充上，底色会变色
<img src="/images/img-folder/2021/1.png">
<!-- more -->

### 其实我们想要达到的效果是
<img src="/images/img-folder/2021/2.png">

### 关键是他填充的密码，是系统的登录密码，和这块的密码风马牛不相及!
### 经过网络搜索，一般思路是

```html
<imput type="text" onfocus="this.type=password" />
```

经过测试，大部分都是好用的，但如果遇到一个表单，弹窗的方式显示的话（表单多次出现），经过测试发现，自动填充仍然会启动

### 经过今天测试，网上搜集，发现下面的方法特别好用
```html
<imput type="text" onfocus="this.removeAttribute('readonly');this.type='password'" autocomplate="off" id="aa"  />
<script>
  // 每次弹框都执行一次
  $('#aa').val('');
  $('#aa').attr('readonly', 'true')
</script>
```

```
1.每次启动弹窗，将密码框的初始数据清空，防止密码记忆
2.窗体加载的时候，将密码框readonly 设置为true,只读状态。自动填充机制无法启动
3.密码框得到焦点的时候，只读窗台去掉掉，代码为 this.removeAttribute('readonly')
4.关于 autocomplete=”off” ，禁用自动填充。这个属性好像是firefox 发起的，并不是标准属性，所以这块主要是针对ie和获取浏览器生效。谷歌不承认这个属性
```

### iphone6s 遇到readonly 有可能会导致，软键盘不能弹出的问题，所以如果在手机端，还是不使用readonly 。建议如下面所示
```html
<imput type="text" onfocus="this.type='password'" autocomplate="off" autocomplate="off" id="aa"  />
```