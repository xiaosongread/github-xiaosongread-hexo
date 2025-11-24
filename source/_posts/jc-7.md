---
title: npm包模块发布
categories: gc-end
date: 2018-06-26 14:44:11
tags: npm webpack es6
---

现在前端开发框架特别流行，vue,react,angular，在开发中，npm 包是必不可少的，这就是相当于传统开发中的插件，那么如何发布自己的包？

npm i 包名称 ，就能下载一个包插件，那发布的流程是什么呢？

<!-- more -->

#### 必备的环境

> node(npm)环境是必须的;nrm 是用来管理 npm 镜像的

```javascript
npm install -g nrm :安装nrm
nrm ls :npm镜像列表
nrm use 镜像名称 :切换镜像
```

#### 发布包

1.npm init 一直回车，新建 package.json 文件 2.注册 npm 账号：https://www.npmjs.com/
3.npm login; 输入账号密码邮箱
4.npm publish

> 登陆状态中保证了，特别注意官网注册成功后要在邮箱中先确认，不然之后提交包的时候会报错

提交成功会提示，然后就可以在 npm 官网个人中心查看，我测试的时候会有点延迟，在使用的时候要新建项目在 npm install 你的包名称，想想也是，谁会在自己这个包中在下载，我觉下了好几次，报错，仔细一看原来是包的不能在此目录下面下载此包文件.

[github:https://github.com/xiaosongread/mgd-localstorage](https://github.com/xiaosongread/mgd-localstorage)

#### ---- 补充 ----

本地搭建属于自己的 npm 库（用于管理自定义组件 / 工具函数），核心是 “创建 npm 包 → 开发组件 → 本地调试 → 发布 / 私用”，全程可基于 npm 官方工具链实现，无需复杂服务器，适合团队内部复用或个人项目沉淀。以下是 step-by-step 完整教程，包含「本地私有库」和「公开库」两种场景，适配 Vue/React/ 原生 JS 组件。

##### 一、前置准备

**1.环境要求：**安装 Node.js（v14+ 推荐，自带 npm），验证：

```bash
node -v  # 输出版本号即可
npm -v
```

**2. npm 账号（可选）：**若要发布到 npm 官网（公开 / 私有包），需注册 npm 账号；仅本地使用可跳过。
**3.工具选择：**

- 打包工具：Rollup（推荐，适合组件库 / 工具库，打包体积小）、Webpack（功能全，适合复杂组件）；
- 开发环境：Vue CLI/Vite（Vue 组件）、Create React App/Vite（React 组件）；
- 类型支持：TypeScript（可选，提升组件可维护性）。

##### 二、第一步：创建 npm 包工程（核心骨架）

先搭建一个标准的 npm 包目录结构，无论 Vue/React 组件，基础结构一致。
**1. 初始化项目**

```bash
# 1. 创建文件夹（自定义包名，如 my-custom-components）
mkdir my-custom-components && cd my-custom-components

# 2. 初始化 npm 包（生成 package.json，核心配置文件）
npm init -y  # -y 快速生成默认配置，后续可修改
```

**2. 调整 package.json 核心配置**
打开 `package.json`，修改以下关键字段（决定包的发布、引入方式）：

```json
{
  "name": "my-custom-components", // 包名（npm 官网需唯一，本地可用自定义名）
  "version": "1.0.0", // 版本号（遵循语义化：主版本.次版本.补丁，如 1.0.0）
  "description": "自定义组件库（Vue/React/JS）", // 描述
  "main": "dist/index.umd.js", // 入口文件（打包后的核心文件，优先被引入）
  "module": "dist/index.esm.js", // ES 模块入口（支持 Tree Shaking）
  "unpkg": "dist/index.umd.js", // 支持 unpkg CDN 引入（如 <script src="https://unpkg.com/xxx"></script>）
  "types": "dist/types/index.d.ts", // TypeScript 类型声明（可选）
  "files": [
    // 发布时包含的文件（避免冗余）
    "dist", // 打包产物
    "src/components", // 源组件（可选，方便调试）
    "package.json",
    "README.md"
  ],
  "keywords": ["自定义组件", "Vue组件", "React组件"], // npm 搜索关键词
  "author": "你的名字",
  "license": "MIT", // 开源协议（MIT 最常用）
  "peerDependencies": {
    // peer 依赖（声明组件依赖的核心库版本，避免重复安装）
    "vue": "^3.0.0" // 若为 Vue3 组件，需声明 Vue 版本
    // "react": "^18.0.0"          // 若为 React 组件，替换为 React 版本
  }
}
```

**3. 目录结构设计（以 Vue3 组件为例，React 类似）**
最终目录如下，可根据需求调整：

```plaintext
my-custom-components/
├── src/                  # 源码目录
│   ├── components/       # 自定义组件（核心）
│   │   ├── MyButton/     # 单个组件（文件夹形式，方便存放样式/类型）
│   │   │   ├── index.vue # 组件逻辑
│   │   │   └── style.css # 组件样式
│   │   └── index.js      # 组件入口（统一导出所有组件）
│   └── utils/            # 工具函数（可选，如格式化、请求工具）
├── dist/                 # 打包产物（自动生成，无需手动创建）
├── package.json          # npm 包配置
├── rollup.config.js      # Rollup 打包配置（核心）
├── .npmignore            # 发布时忽略的文件（类似 .gitignore）
└── README.md             # 组件库使用文档
```

##### 三、第二步：开发自定义组件（以 Vue3 为例）

**1. 安装依赖**

```bash
# 安装核心依赖（Vue3 示例，React 替换为 react/react-dom）
npm install vue@3 --save-peer  # peer 依赖，让用户自己安装 Vue，避免冲突

# 安装开发依赖（打包/编译用）
npm install rollup @rollup/plugin-babel @rollup/plugin-node-resolve rollup-plugin-vue rollup-plugin-css-only --save-dev
```

**2. 编写组件**
以 MyButton 组件为例：

```vue
<!-- src/components/MyButton/index.vue -->
<template>
  <button class="my-button" :style="{ backgroundColor: color }">
    <slot></slot>
    <!-- 插槽，支持自定义按钮文本 -->
  </button>
</template>

<script setup>
// 定义 props
const props = defineProps({
  color: {
    type: String,
    default: "#42b983", // 默认 Vue 绿色
  },
});
</script>

<style scoped>
.my-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
}
</style>
```

**3. 统一导出组件（入口文件）**
编辑 src/components/index.js，方便用户批量引入：

```javascript
// 导出单个组件（支持按需引入）
export { default as MyButton } from "./MyButton/index.vue";

// 导出组件库（支持全局引入）
export default {
  install: (app) => {
    app.component("MyButton", MyButton); // 全局注册组件
  },
};
```

##### 四、第三步：配置打包工具（Rollup 示例）

组件库需要打包为「UMD（兼容浏览器 / Node）」和「ES Module（支持 Tree Shaking）」格式，确保在不同环境下可引入。
**1. 创建 rollup.config.js**

```javascript
import { defineConfig } from "rollup";
import vue from "rollup-plugin-vue"; // 处理 Vue 组件
import babel from "@rollup/plugin-babel"; // 编译 ES6+
import resolve from "@rollup/plugin-node-resolve"; // 解析 node_modules 依赖
import css from "rollup-plugin-css-only"; // 提取 CSS（避免样式内联）

export default defineConfig({
  input: "src/components/index.js", // 入口文件
  output: [
    // 1. ES Module 格式（支持 import 引入，Tree Shaking）
    {
      file: packageJson.module,
      format: "esm",
      name: "my-custom-components",
    },
    // 2. UMD 格式（支持 script 标签引入、CommonJS 引入）
    {
      file: packageJson.main,
      format: "umd",
      name: "my-custom-components", // 全局变量名（浏览器中 window.myCustomComponents）
      globals: {
        vue: "Vue", // 声明外部依赖（Vue 由用户环境提供，不打包进组件库）
      },
    },
  ],
  external: ["vue"], // 外部依赖（不打包进组件库，减少体积）
  plugins: [
    resolve(), // 解析依赖
    vue(), // 处理 Vue 组件（Vue3 需用 rollup-plugin-vue@6+）
    babel({
      exclude: "node_modules/**", // 排除 node_modules
      presets: ["@babel/preset-env"],
    }),
    css({ output: "index.css" }), // 提取 CSS 到 dist/index.css
  ],
});
```

**2. 添加打包脚本**
在 package.json 中添加 scripts，方便执行打包：

```json
"scripts": {
  "build": "rollup -c rollup.config.js", // 打包
  "dev": "rollup -c rollup.config.js -w" // 开发模式（监听文件变化，自动重新打包）
}
```

**3. 执行打包**

```bash
npm run build  # 打包后生成 dist 目录，包含 index.esm.js、index.umd.js、index.css
```

##### 五、第四步：本地调试（关键！避免发布后才发现问题）

开发完成后，先在本地项目中测试组件库，再发布。npm 提供 link 命令，实现 “本地包映射”，无需发布即可在其他项目中引入。
**1. 本地链接组件库**
在组件库根目录执行（将本地包注册到 npm 全局）：

```bash
npm link  # 执行后，全局可通过包名（package.json 中的 name）引用该包
```

**2. 在测试项目中使用本地包**
新建一个 Vue/React 测试项目（或用现有项目），执行：

```bash
npm link my-custom-components
```

3. 测试引入组件
   以 Vue3 测试项目为例：

```vue
<!-- App.vue -->
<template>
  <div>
    <MyButton color="#ff4400">自定义按钮</MyButton>
  </div>
</template>

<script setup>
// 按需引入
import { MyButton } from "my-custom-components";
// 引入样式（若组件样式已提取为单独 CSS 文件）
import "my-custom-components/dist/index.css";
</script>
```

**4. 解除链接（测试完成后）**

```bash
# 1. 在测试项目中解除关联
npm unlink my-custom-components

# 2. 在组件库根目录解除全局注册
npm unlink
```

##### 六、第五步：发布 npm 包（公开 / 私有）

本地测试无问题后，可发布到 npm 官网，方便团队共享或个人跨项目使用。
**1. 发布前检查**
确保 package.json 中的 name 唯一（npm 官网搜索确认，避免重名）；
确保 dist 目录已生成（执行 npm run build）；
配置 .npmignore（忽略不需要发布的文件）：

```txt
# .npmignore
node_modules/
src/
rollup.config.js
.git/
.gitignore
.DS_Store
```

**2. 登录 npm 账号**

```bash
npm login  # 输入 npm 用户名、密码、邮箱（若开启 2FA，需输入验证码）
```

注意：若之前切换过 npm 镜像（如淘宝镜像），需先切回官方镜像（否则登录失败）：

```bash
npm config set registry https://registry.npmjs.org/
```

**3. 发布包**

```bash
npm publish  # 发布公开包
# 若发布私有包（需 npm 付费账号），添加 --access private：
# npm publish --access private
```

**4. 版本更新（后续迭代）**
每次修改组件后，需更新版本号（遵循语义化版本），再重新发布：

```bash
# 补丁更新（修复 bug，如 1.0.0 → 1.0.1）
npm version patch

# 次版本更新（新增功能，向下兼容，如 1.0.0 → 1.1.0）
npm version minor

# 主版本更新（不兼容修改，如 1.0.0 → 2.0.0）
npm version major

# 更新版本后，重新发布
npm publish
```

**5. 撤销发布（紧急情况）**
发布后 72 小时内可撤销某个版本（不推荐频繁使用，影响用户）：

```bash
npm unpublish my-custom-components@1.0.0  # 指定版本撤销
```

##### 七、本地私有库（无需发布到 npm 官网）

若组件仅团队内部使用，不想公开，可搭建「本地私有 npm 库」，无需依赖 npm 官网。推荐工具：
Verdaccio（轻量、易搭建）：基于 Node.js，可本地部署，支持用户管理、包权限控制；
Nexus（企业级）：功能更全，支持 Maven/npm 等多种仓库。
简易私有库搭建（Verdaccio）

```bash
# 1. 全局安装 Verdaccio
npm install -g verdaccio

# 2. 启动私有库（默认端口 4873）
verdaccio

# 3. 访问私有库：http://localhost:4873（可在网页端管理包）
```

**发布包到私有库**

```bash
# 1. 切换 npm 镜像到私有库
npm config set registry http://localhost:4873/

# 2. 在私有库注册账号（按提示输入用户名、密码、邮箱）
npm adduser

# 3. 发布包（和发布到 npm 官网流程一致）
npm publish
```

**从私有库安装包**

```bash
# 切换镜像到私有库，再安装
npm config set registry http://localhost:4873/
npm install my-custom-components
```

##### 八、常见问题排查

本地调试时组件引入失败：
检查 package.json 的 main/module 路径是否正确（指向 dist 目录的入口文件）；
确保 npm link 执行成功（可通过 npm ls -g 查看全局包是否存在）。
发布时提示 “包名已存在”：修改 package.json 的 name（npm 官网包名唯一）。
安装时提示 “权限不足”：避免使用 sudo，可修复 npm 权限：

```bash
sudo chown -R $USER ~/.npm
```

组件样式丢失：确保打包时提取了 CSS（Rollup 用 rollup-plugin-css-only，Webpack 用 mini-css-extract-plugin），并在使用时手动引入样式文件。

##### 九、总结

搭建自定义 npm 组件库的核心流程：
初始化 npm 包，配置 package.json；
开发组件 / 工具函数，统一导出；
用 Rollup/Webpack 打包为兼容格式；
本地 link 调试，确保无问题；
发布到 npm 官网（公开 / 私有）或本地私有库。
按此流程，可沉淀自己的组件资产，实现跨项目复用，提升开发效率。如果是 React 组件，只需替换依赖（vue → react/react-dom）和打包配置（rollup-plugin-vue → @rollup/plugin-react），流程完全一致。
