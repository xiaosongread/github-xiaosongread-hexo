---
title: openclaw-小龙虾安装
categories: js-end
date: 2026-03-15 00:32:11
---

# Mac 安装「小龙虾（openclaw）」完整步骤

本文详细记录从环境准备到安装 openclaw（小龙虾）的全流程，包含 Homebrew、Git、Node.js 及小龙虾的安装，步骤清晰可直接操作。

## 一、安装 Homebrew

<!-- more -->

Homebrew 是 Mac 必备的包管理工具，先完成它的安装：

1. 打开 Mac 终端（可通过 Spotlight 搜索「终端」）；
2. 输入以下命令并回车，执行 Homebrew 国内源安装脚本：

```bash
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

3. 脚本执行后，选择「1」（通过清华大学源下载 brew）；
4. 按提示输入电脑开机密码（输入时终端无显示，正常输入即可），回车；
5. 若提示「是否删除之前的 Homebrew 相关文件」，输入「Y」并回车；
6. 继续按回车确认默认配置，过程中若再次要求输入密码，输入后回车；
7. 选择「阿里巴巴国内源」，等待安装完成（网络快慢决定耗时）；
8. 安装完成后，关闭当前终端窗口，重新打开终端使配置生效。

## 二、安装 Git

通过 Homebrew 快速安装 Git：

1. 打开新的终端窗口；
2. 输入以下命令并回车：

```bash
brew install git
```

3. 等待安装完成（首次安装可能需下载依赖，耗时稍久，耐心等待即可）。

## 三、安装 Node.js

Node.js 是运行小龙虾的基础环境，按以下步骤安装：

1. 打开浏览器，访问 Node.js 官方下载地址：
   - 官方地址：https://nodejs.org/zh-cn/
   - 若 Mac OS 版本过低，访问适配版本地址：https://nodejs.org/dist/v18.19.1/
2. 若访问官方地址，选择对应 Mac 版本的安装包；若访问适配版本地址，下载「node-v18.19.1.pkg」文件；
3. 双击下载的 pkg 文件，按安装向导完成 Node.js 安装；
4. 验证安装是否成功：打开终端，输入以下命令并回车：

```bash
node -v
```

5. 若终端输出 v18.19.1（或对应安装版本号），说明安装成功。

## 四、安装小龙虾（openclaw）

完成前置环境后，安装 openclaw：

1. 打开终端，先配置 npm 国内镜像（加快下载速度），输入命令并回车：

```bash
npm config set registry https://registry.npmmirror.com
```

2. 配置 Git 地址替换（解决 GitHub 克隆慢 / 失败问题），输入命令并回车：

```bash
git config --global url."https://github.com/".insteadOf ssh://git@github.com/
```

3. 全局安装 openclaw 最新版本，输入命令并回车（需输入开机密码）：

```bash
sudo npm install -g openclaw@latest
```

4. 等待安装完成，无报错即代表小龙虾安装成功。

## 总结

- 安装 Homebrew 需选择国内源（清华 / 阿里），安装后需重启终端生效；
- Node.js 安装后需用 node -v 验证版本，确保环境正常；
- 安装小龙虾前需配置 npm 和 Git 国内源，避免下载失败

## 参考资料

- [Homebrew 官方文档](https://brew.sh/index_zh-cn)
- [Node.js 官方下载地址](https://nodejs.org/zh-cn/)
- [openclaw 官方文档](https://docs.openclaw.ai/install#npm-pnpm)
- [openclaw 安装视频](https://www.bilibili.com/video/BV1UsP1zqEWc/?spm_id_from=333.788.videopod.sections&vd_source=7fea06b6db0f65605bf97603e544d620)

## 安装完成截图

<img src="/images/img-folder/o1.png" style="width: 600px;float: left;">
<img src="/images/img-folder/o2.png" style="width: 500px;float: left;">
<div style="clear: both;"></div>
<img src="/images/img-folder/o3.jpg" style="width: 330px;float: left;">
<img src="/images/img-folder/o4.jpg" style="width: 330px;float: left;">
<img src="/images/img-folder/o5.jpg" style="width: 330px;float: left;">
<div style="clear: both;"></div>
