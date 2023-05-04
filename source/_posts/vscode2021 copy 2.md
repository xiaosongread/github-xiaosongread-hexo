---
title: test5
categories: gc-end
date: 2022-10-10 13:30:03
tags: vscode github
---

#### 准备工作：电脑上需安装VSCode，拥有一个github账户。实现同步的功能主要依赖于VSCode插件 "Settings Sync"
### Setting Sync 可同步包含的所有扩展和完整的用户文件夹
1) 设置文件

2) 快捷键设置文件

3) Launch File

4) Snippets Folder

5) VSCode 扩展设置

6) 工作空间
<!-- more -->

### Setting Sync 快捷键：
1) 上传： Shift + Alt + U (Sync: Update / Upload Settings)

2) 下载： Shift + Alt + D (Sync: Download  Settings)

如果快捷键有冲突，可Ctrl + K + S快捷键设置配置其它快捷键 或 Ctrl + P / F1 在命令窗口输入 >sync 即会出现相应命令供选择
<img src="/images/img-folder/2021/3.png">

### Step1. 安装 同步插件"Settings Sync"
<img src="/images/img-folder/2021/4.png">

### Step2. 进入github -> Settings 在左侧 Developer settings -> Personal access tokens 
<img src="/images/img-folder/2021/5.png">

### Step3. 点击按钮 Generate new token 新增一个token
图1：
<img src="/images/img-folder/2021/6.png">
图2：
<img src="/images/img-folder/2021/7.png">
图3：
<img src="/images/img-folder/2021/8.png">

```
记住你自己生成的token值，在VSCode配置上回用得到，最好找个笔记保存下来。
```

### Step4. 回到VSCode配置将token配置到本地
(Sync: Update / Uplaod Settings) Shift + Alt + U 在弹窗里输入你的token， 回车后会生成syncSummary.txt文件
<img src="/images/img-folder/2021/9.png">

syncSummary.txt文件会存储VSCode的设置及所安装的插件列表

有点类似package.json这样形式的文件

可以将自己的token分享到自己的团队里面去，这样团队可以共用一套设置。 

### Step5.设置上同步下载设置

(Sync: Download  Settings) Shift + Alt + D 在弹窗里输入你的gist值，稍后片刻便可同步成功

### Step6. 如果要重置同步设置，变更其它token

Ctrl+P / F1 弹出输入>sync,即可重新配置你的其它token来同步

