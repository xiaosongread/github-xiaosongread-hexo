---
title: 微信获取用户头像昵称，并保存永久链接的方法
categories: js-end
date: 2025-10-29 14:20:08
---
在微信小程序中获取的用户头像（avatarUrl）默认是 临时文件路径（有效期2小时），要将其转为永久可用的图片，需通过 上传至服务器 保存。

```html
<button class="avatar-wrapper" open-type="chooseAvatar" bind:chooseavatar="onChooseAvatar">
  <image class="avatar" src="{{avatarUrl}}"></image>
</button> 
<input type="nickname" class="weui-input" placeholder="请输入昵称"/>
```

<!-- more -->

```js
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Page({
  data: {
    avatarUrl: defaultAvatarUrl,
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  }
})
```
<div style="display: flex;">
<img src="/images/img-folder/09f33e519b40e411b38c3bbb823f6ac9.jpg" width="260">
<img src="/images/img-folder/ce2aa0bbd6ee36f26876ad3a0aad2e4f.jpg" width="260">
</div>

**微信头像的临时路径，如何转成永久可用的图片**

1. 获取临时头像路径（有效期2小时）
```js
Page({
  onChooseAvatar(e) {
    const tempPath = e.detail.avatarUrl // 示例: "wxfile://tmp_avatar.png"
    this.uploadToServer(tempPath) // 立即上传
  }
})
```
2. 上传到永久存储（3种方案）
方案A：微信云开发（最简单）
```js
wx.cloud.uploadFile({
  cloudPath: `avatars/${Date.now()}.jpg`, // 云端路径
  filePath: tempPath,
  success: res => {
    const permanentUrl = res.fileID // 永久文件ID
    wx.cloud.getTempFileURL({ fileList: [permanentUrl] }) // 转为HTTP链接
  }
})
```
方案B：自有服务器（Node.js+OSS示例）
```js
wx.uploadFile({
  url: 'https://yourserver.com/upload', // 自有服务器地址
  filePath: tempPath, // 要上传文件资源的路径 (本地路径)
  name: 'avatar', // 文件对应的 key，开发者在服务端可以通过这个 key 获取文件的二进制内容
  success(res) {
    // 假设返回格式: { "url": "https://oss.com/avatar.jpg" }
    console.log('永久链接:', JSON.parse(res.data).url)
  }
})
```
对应Node.js后端代码：
```js
const multer = require('multer')
const OSS = require('ali-oss')

const upload = multer({ dest: 'tmp/' })
app.post('/upload', upload.single('avatar'), async (req, res) => {
  const client = new OSS({ /* 你的OSS配置 */ })
  const result = await client.put(`avatars/${Date.now()}.jpg`, req.file.path)
  res.json({ url: result.url }) // 返回OSS永久地址
})
```
方案C：Base64本地缓存（不推荐）
```js
wx.getFileSystemManager().readFile({
  filePath: tempPath,
  encoding: 'base64',
  success: res => {
    const base64 = `data:image/png;base64,${res.data}`
    wx.setStorageSync('avatarBase64', base64) // 仅适合小图缓存
  }
})
```

**方案对比（根据需求选择）**
| 方案 | 适用场景 | 存储成本 | 访问速度 | 代码复杂度 |
|------|----------|----------|----------|------------|
| 微信云开发 | 个人小程序 | 免费额度 | 中 | ⭐️⭐️ |
| 自建服务器+OSS | 企业级应用 | ￥0.01/GB/月 | 快（CDN加速） | ⭐️⭐️⭐️⭐️ |
| Base64缓存 | 临时测试 | 无 | 慢 | ⭐️ |

**完整流程图**
```text
小程序端                      服务器/云存储
   │                             │
   ├─ 1. 获取临时路径 ─────────────┤
   │                             │
   ├─ 2. 上传文件 ────────────────▶│
   │                             ├─ 3. 生成永久URL
   │                             │
   ◀─ 4. 接收永久链接 ─────────────┤
   │                             │
   └─ 5. 存储到本地/数据库 ─────────┘
```