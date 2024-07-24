---
title: nodejs生成图片验证码
categories: js-end
date: 2024-07-23 11:32:04
---

### nodejs生成图片验证码

#### 1. 安装依赖

```bash
npm i svg-captcha
```
<!-- more -->

#### 2. 后端接口

```js
const express = require('express')
const router = express.Router()
// 解析以 application/json 和 application/x-www-form-urlencoded 提交的数据
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const svgCaptcha = require('svg-captcha')

const cookieParser = require('cookie-parser')
router.use(cookieParser())
// res.cookie()设置cookie值, req.cookies获取cookie值
// 获取图行验证码
router.get('/captcha', (req, res) => {
  const captcha = svgCaptcha.create({
    inverse: false, // 翻转颜色
    fontSize: 48, // 字体大小
    noise: 2, // 干扰线条数
    width: req.query.width || 150, // 宽度
    height: req.query.height || 50, // 高度
    size: 4, // 验证码长度
    ignoreChars: '0o1i', // 验证码字符中排除 0o1i
    color: true, // 验证码是否有彩色
    background: '#cc9966', // 验证码图片背景颜色
  })
  //保存到cookie,忽略大小写
  res.cookie('captcha', captcha.text.toLowerCase())
  res.type('svg')
  res.send(captcha.data)
})

// 登录校验验证码
router.post('/login', (req, res) => {
const { account, password, captcha } = req.body
 if (captcha.toLowerCase() !== req.cookies.captcha) {
    res.send({ success: false, code: 0, msg: '验证码输入错误', data: null })
    return
  }
})
```

#### 3. 前端页面

```html
<template>
  <div>
   < img :src="captchaUrl" alt="" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      captchaUrl: '',
    }
  },
  mounted() {
    this.captchaUrl = `https://×××.××××.cn/pc/captcha?width=100&height=40&t=${new Date().getTime()}`
  },
}
</script>
```