---
title: volta -> n -> nvm -> node 版本管理工具
categories: js-end
date: 2025-03-08 14:56:15
---

做为 NVM/N 的忠实用户，无意中在网上看到了更方便的管理 node 版本的工具 volta。本来觉得没啥东西，无非就是 nvm 的仿品或者替代品而已，既然我已经可以随意切换我的 node 了，为什么还要换个工具去管理我的开发环境，没甚意思。但是当我细细探究之时才发现，这个东西将来必然会取代 nvm 的地位，成为包管理的主流，设想一个场景， 在维护一个旧的项目，比如用node@12.3.0可以跑的项目，使用node@16.0.0就跑不起来，会报错。但这时手上还有其他的新项目，例如使用的是 node@18，突然需要把公司这个旧项目跑起来(node@12.3.0)，当前电脑所在环境为 node@18，这时启动旧项目，突然显示报错，唉，原来忘了切换 node 环境，手动切换 nvm use xxxxxx 后，才把项目起起来，这时又需要启动新项目的环境，噢噢，尴尬，起不起来了，这时我们就可以使用 volta
volta 和 nvm 都是跨平台支持的，这里我介绍下 volta 在 mac 和 win 上的安装方法。

## volta

### volta 安装

#### 1、mac 安装 nvm 和 volta 都很简单，这里直接使用官方的安装方法。

```
curl https://get.volta.sh | bash
```

<!-- more -->

使用以上命令就可以安装好 volta 了，使用命令验证 volta 安装是否成功。

```
volta -v  // 可以输出当前版本
```

#### 2、windows 安装旧更加简单，去官网下载即可(https://github.com/volta-cli/volta/releases/download/v1.1.1/volta-1.1.1-windows-x86_64.msi)，一路next安装

### 使用

#### 如何使用 volta 安装 node?

```
volta install node   // 安装最新的node
volta install node@14.5.0   // 安装指定版本
volta list // 查看当前环境依赖
volta list all // 查看所有环境依赖
```

当我们有了多个版本的 node，就可以到项目中进行对应的设置了

1、比如我们有个 vue2 的老项目，就可以在当前项目下执行命令

```
volta pin node@14.5.0
```

2、在 package.json 中添加配置
此时我们的项目 package.json 中会多一个配置

```
"volta": {
  "node": "14.5.0"
}
```

> tips：如果在 package.json 将这一块手动删除，那么 volta 将找不到他想使用的版本.

当然，volta 不止可以设置 node 环境，还可以设置项目所使用的是 npm、yarn

```
volta pin npm@8.0.0
```

执行完成之后，package.json 中会多一个配置

```
"volta": {
  "node": "14.5.0",
  "npm": "8.0.0"
}
```

> 如果我们电脑安装了 volta，但是没有安装该项目相应的 node 或者 npm，不用着急，直接启动项目，然后 volta 会帮我们下载所需要的环境再启动项目(这里不需要我们停下来去安装当前项目环境，再启动项目)

以下是 volta 常用的命令

```
volta list //查看当前环境的版本
volta list all //查看存在的所有版本
volta install node //安装最新版的nodejs
volta install node@12.2.0 //安装指定版本
volta install node@12 //volta将选择合适的版本安装
volta uninstall node@12.2.0 //安装指定版本
volta pin node@10.15 //将更新项目的package.json文件以使用工具的选定版本
volta pin yarn@1.14 //将更新项目的package.json文件以使用工具的选定版本
```

总结：在开发中，我们经常拿到一个老项目时，在安装依赖时会各种报错，这时，即使像我之前使用 nvm 来管理 node，常常也不能确定这个项目到底是在哪个 node 环境下才能运行，如果我们引入了 volta，这是我们就可以在
package.json 文件中看到我们具体使用了哪个 node 环境，即使拿到这个项目开发的人不使用 volta，也可以自己手动通过 nvm 确定切换到具体的 node 环境，不需要再去和之前的开发人员或者测试人员去询问到底使用哪个
环境才能跑起来项目.

### 重点：

> 如果你安装了 volta,并且在项目中执行了 volta pin node@12.2.0,那么 volta 会自动下载 12.2.0 版本的 node，并且自动切换到 12.2.0 版本的 node 环境，当你再次启动项目时，volta 会自动切换到 12.2.0 版本的 node 环境，如果没有切换到 12.2.0 版本的 node 环境，那么大概率是你也安装了 nvm 或者 N，互相影响了，你需要删除 nvm 或者 N，重新安装 volta 或者修改环境 volta 的环境变量到最高优先级.


## n

### n 安装

#### 1、mac 安装 n 很简单，这里直接使用官方的安装方法。

```
curl -L https://git.io/n-install | bash
```
使用以上命令就可以安装好 n 了，使用命令验证 n 安装是否成功。

```
n -v  // 可以输出当前版本
```

#### 2、windows 安装旧更加简单，去官网下载即可(https://github.com/tj/n/releases)，一路next安装

### 使用

#### 如何使用 n 安装 node?

```
n // 安装最新的node
n 12.2.0 // 安装指定版本
n 12 //volta将选择合适的版本安装
```

当我们有了多个版本的 node，就可以到项目中进行对应的设置了
1、比如我们有个 vue2 的老项目，就可以在当前项目下执行命令

```
n 12.2.0
```

2、在 package.json 中添加配置
此时我们的项目 package.json 中会多一个配置

```
"n": {
  "node": "12.2.0"
}
```

> tips：如果在 package.json 将这一块手动删除，那么 n 将找不到他想使用的版本.

以下是 n 常用的命令

```
n // 进入交互式菜单，选择版本
n latest // 安装最新稳定版 Node.js
n lts // 安装最新 LTS 版 Node.js
n 12.2.0 // 安装指定版本
n 12 //volta将选择合适的版本安装
n ls // 查看所有版本
n use 12.2.0 // 切换到指定版本
n rm 12.2.0 // 删除指定版本
npm uninstall -g n // 卸载 n
```
总结：n 和 volta 的使用方法基本一致，只是 n 的使用更加简单，但是 volta 的功能更加强大，比如可以设置 npm 的版本，而 n 则不可以，所以大家可以根据自己的需求选择使用哪个工具。

#### 卸载 n 或 Node.js

##### 卸载 n

```
npm uninstall -g n
rm -rf /usr/local/n
```

##### 卸载 Node.js

```
# 删除 n 管理的版本
sudo n prune
# 手动删除残留（如果 n 未完全卸载）
rm -rf /usr/local/bin/npm
rm -rf /usr/local/bin/node
```

## nvm

### nvm 安装

#### 1、mac 安装 nvm 很简单，这里直接使用官方的安装方法。

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

#### 2、windows 安装 nvm 也很简单，去官网下载即可(https://github.com/coreybutler/nvm-windows/releases)，一路next安装

### 使用

#### 如何使用 nvm 安装 node?

```
nvm install 12.2.0 // 安装指定版本
nvm install 12 //nvm将选择合适的版本安装
```

#### 如何使用 nvm 切换 node 版本?

```
nvm use 12.2.0 // 切换到指定版本
```

#### 如何使用 nvm 查看已安装的 node 版本?

```
nvm ls // 查看所有版本
```

#### 如何使用 nvm 卸载 node 版本?

```
nvm uninstall 12.2.0 // 删除指定版本
```

#### 如何使用 nvm 查看可安装的 node 版本?

```
nvm ls-remote // 查看所有版本
```

#### 如何使用 nvm 切换 node 版本?

```
nvm use 12.2.0 // 切换到指定版本
```

#### 如何使用 nvm 查看当前使用的 node 版本?

```
nvm current // 查看当前版本
```

#### 如何使用 nvm 切换 node 版本?

```
nvm use 12.2.0 // 切换到指定版本
```