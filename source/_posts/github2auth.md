---
title: github 访问要求 2次验证的问题
categories: js-end
date: 2024-07-10 14:13:27
---

github现在登录，需要要求用户进行2次验证。这个验证，需要用户在手机上安装一个app，然后使用手机app扫描github的二维码，才能完成登录。

这个验证，对于用户来说，是一个麻烦的事情。但是，对于github来说，这是一个安全措施。因为，如果用户没有安装手机app，那么就无法完成登录，这样就避免了用户账号被恶意登录的风险。

<!-- more -->

### 问题截图
<img src="/images/img-folder/2024/git1.webp">

### 解决方案
1. 在手机上安装一个app，比如Google Authenticator或者Authy。
<img src="/images/img-folder/2024/git2.webp">
2. 打开app，扫描github的二维码。
3. 输入app生成的验证码，完成登录。