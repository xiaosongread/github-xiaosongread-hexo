---
title: Claude Code 完全指南：从安装到 Skill 进阶实战
date: 2026-05-24 11:00:00
categories:
  - 开发工具
tags:
  - Claude Code
  - AI 编程
  - CLI 工具
  - 效率工具
  - Anthropic
---

> 作为一名前端开发者，日常工作中除了写代码，还需要处理大量的命令行操作、代码审查、项目配置等任务。最近深度使用了 Anthropic 推出的 **Claude Code**，发现它不仅仅是一个简单的 AI 聊天工具，而是一个真正能融入开发工作流的**命令行智能助手**。本文将从零开始，带你全面了解 Claude Code 的安装、配置以及最强大的 Skill 功能。

<!-- more -->

## 一、Claude Code 是什么？

**Claude Code** 是 Anthropic 官方推出的命令行界面（CLI）工具，它将 Claude 大模型的能力直接集成到终端中。与传统的 AI 聊天工具不同，Claude Code 的核心设计理念是**"Agentic AI"**——它不仅能回答你的问题，还能**主动执行操作**。

### 核心特性

| 特性 | 说明 |
|------|------|
| **终端原生集成** | 直接在命令行中使用，无需切换窗口 |
| **文件系统感知** | 可以读取、编辑、创建项目中的文件 |
| **命令执行能力** | 能运行 Shell 命令、Git 操作、测试脚本 |
| **上下文理解** | 自动读取项目结构、配置文件、代码上下文 |
| **Skill 扩展系统** | 支持自定义技能，扩展其能力边界 |

### 适用场景

- **代码审查与重构**：分析代码逻辑，提出优化建议并直接修改
- **自动化脚本编写**：根据需求生成 Shell/Python 脚本
- **项目初始化**：快速搭建项目结构、配置 CI/CD
- **Bug 排查**：分析错误日志，定位问题根源
- **学习与探索**：快速理解陌生代码库或技术文档

---

## 二、如何安装 Claude Code

### 前置要求

- **Node.js 18+**（推荐 LTS 版本）
- **Git**（用于版本控制集成）
- **Anthropic API Key**（需要有 Claude API 的访问权限）

### 安装步骤

#### 1. 全局安装 CLI

```bash
# 使用 npm 安装
npm install -g @anthropic-ai/claude-code

# 或使用 yarn
yarn global add @anthropic-ai/claude-code

# 或使用 pnpm
pnpm add -g @anthropic-ai/claude-code
```

#### 2. 配置 API Key

安装完成后，首次运行需要配置 API Key：

```bash
claude config set apiKey sk-ant-xxxxx
```

或者设置环境变量：

```bash
export ANTHROPIC_API_KEY=sk-ant-xxxxx
```

> **建议**：将 API Key 添加到 `~/.bashrc` 或 `~/.zshrc` 中，避免每次重启终端都需要重新设置。

#### 3. 验证安装

```bash
claude --version
# 输出示例：claude-code 1.x.x
```

### 快速启动

在项目目录下执行：

```bash
claude
```

你会进入交互式会话界面，此时 Claude 已经加载了当前项目的上下文。

---

## 三、基础使用技巧

### 1. 常用命令速查

```bash
# 进入交互模式
claude

# 执行单条指令（非交互式）
claude -p "解释这个项目的架构"

# 指定模型版本
claude --model claude-opus-4-7

# 快速模式（使用更快的模型）
claude --fast

# 查看配置
claude config list

# 查看帮助
claude --help
```

### 2. 交互模式快捷键

进入 `claude` 交互界面后，可以使用以下快捷键：

| 快捷键 | 功能 |
|--------|------|
| `Ctrl + C` | 取消当前生成 |
| `Ctrl + D` | 退出会话 |
| `Tab` | 补全命令或文件路径 |
| `↑ / ↓` | 浏览历史消息 |
| `/clear` | 清除当前会话上下文 |

### 3. 常用 Slash 命令

Claude Code 支持类似 Slack 的 Slash 命令：

```
/help          # 查看帮助
/clear         # 清空当前对话
/config        # 查看或修改配置
/exit          # 退出会话
```

---

## 四、Skill 系统：Claude Code 的进阶武器

**Skill** 是 Claude Code 最强大的扩展机制。通过 Skill，你可以让 Claude 掌握特定领域的能力，比如代码审查规范、项目特定的脚本、或者与外部系统的集成。

### 什么是 Skill？

Skill 本质上是一组**预定义的提示词（Prompt）+ 可选的脚本工具**，它告诉 Claude：
- 在什么场景下触发
- 如何理解用户的意图
- 使用什么工具来完成任务
- 输出应该遵循什么格式

### Skill 的存储位置

Claude Code 会从以下位置加载 Skill：

1. **内置 Skill**：Claude Code 自带的核心技能
2. **项目级 Skill**：当前项目 `.claude/skills/` 目录下的自定义技能
3. **用户级 Skill**：`~/.claude/skills/` 目录下的全局技能

### 如何安装 Skill

#### 方式一：使用内置 Skill

Claude Code 已经内置了许多常用 Skill，直接通过斜杠命令调用：

```
/code-review      # 代码审查
/verify           # 验证代码变更
/run              # 启动项目并验证
```

#### 方式二：安装第三方 Skill

社区有许多开源的 Skill 可供使用。以安装 `code-review` Skill 为例：

```bash
# 克隆 Skill 仓库到项目目录
cd your-project
git clone https://github.com/example/claude-code-review-skill .claude/skills/code-review

# 或者克隆到用户级目录（全局可用）
git clone https://github.com/example/claude-code-review-skill ~/.claude/skills/code-review
```

#### 方式三：创建自定义 Skill

在你的项目根目录创建 Skill：

```bash
mkdir -p .claude/skills/my-skill
```

然后创建 `skill.md` 文件：

```markdown
# My Custom Skill

## 描述
这是一个自定义 Skill 的示例。

## 触发条件
当用户提到"优化性能"或"性能分析"时触发。

## 工具
- read_file: 读取项目中的文件
- bash: 执行 shell 命令
- edit_file: 编辑文件

## 工作流程
1. 首先分析 package.json 中的依赖
2. 检查是否有明显的性能瓶颈
3. 提出具体的优化建议

## 输出格式
- 使用中文回复
- 列出 3-5 个可执行的优化点
- 每个优化点包含：问题描述、解决方案、预期收益
```

### Skill 配置示例：前端项目代码审查

以下是一个实用的前端代码审查 Skill 配置：

**文件路径**：`.claude/skills/fe-review/skill.md`

```markdown
---
name: fe-review
description: 前端代码审查规范，自动检查 Vue/React 项目中的常见问题
triggers:
  - /fe-review
  - 代码审查
  - 前端审查
---

# 前端代码审查 Skill

## 检查清单

### Vue 项目
- [ ] 组件名是否使用大驼峰（PascalCase）
- [ ] v-for 是否绑定了 key
- [ ] 是否避免了 v-if 和 v-for 同时使用
- [ ] 计算属性是否有副作用
- [ ] 生命周期钩子是否正确清理副作用

### React 项目
- [ ] 组件是否是纯函数（尽量使用函数组件）
- [ ] useEffect 依赖项是否完整
- [ ] 是否有不必要的 re-render
- [ ] key 属性是否正确使用

### 通用
- [ ] 是否有未使用的变量/导入
- [ ] 是否有 console.log 未清理
- [ ] 异步操作是否有错误处理
- [ ] 敏感信息是否硬编码

## 工具调用
1. 使用 `read_file` 读取用户指定的文件或当前 diff
2. 使用 `bash` 运行 eslint/prettier 检查
3. 使用 `edit_file` 提供修复建议（需用户确认）

## 输出规范
- 按严重程度分级：Critical / Warning / Suggestion
- 提供修改前后的代码对比
- 解释 "Why"，而不仅仅是 "What"
```

### 使用自定义 Skill

配置完成后，在 Claude Code 交互模式中：

```
/fe-review
```

或描述你的需求：

```
帮我审查一下刚才提交的代码，重点看 Vue 组件的规范问题
```

---

## 五、实战案例

### 案例 1：快速初始化一个 Vue 3 项目

```bash
claude -p "帮我初始化一个 Vue 3 + TypeScript + Vite 的项目，包含：
1. ESLint + Prettier 配置
2.  Vue Router 和 Pinia
3.  一个基础的登录页面组件
4.  配置好 git 忽略规则"
```

Claude Code 会：
1. 执行 `npm create vue@latest`
2. 安装额外依赖
3. 生成配置文件
4. 创建基础组件

### 案例 2：代码重构

```bash
claude
```

进入交互模式后：

```
> 这个文件里的函数太长了，帮我拆分成多个小函数，并添加类型定义
> /read src/utils/helpers.js
> /edit src/utils/helpers.js
```

### 案例 3：使用 Skill 做自动化部署检查

配置一个部署前检查的 Skill：

```markdown
# deploy-check Skill
---
name: deploy-check
triggers:
  - /deploy-check
  - 部署检查
---

## 检查项
1. 确认当前分支是 main/master
2. 确认没有未提交的变更
3. 运行测试套件
4. 检查环境变量配置
5. 构建项目确认无错误

## 执行流程
```

使用时：

```
/deploy-check
```

---

## 六、最佳实践与注意事项

### 1. 成本控制

Claude Code 的 API 调用是按 Token 计费的，注意：

- **上下文长度**：项目文件越多，每次请求的 Token 消耗越大
- **工具调用循环**：复杂的任务可能触发多次工具调用，消耗较多 Token
- **模型选择**：日常任务用 `fast` 模式（Sonnet），复杂任务再用 Opus

### 2. 安全建议

- **审查变更**：Claude Code 可以修改文件，重要操作前务必 review diff
- **敏感信息**：不要将 API Key、密码等提交到 Git，使用 `.env` 文件
- **权限控制**：CI/CD 场景中，限制 Claude Code 的执行权限

### 3. 与现有工具链集成

```bash
# 配合 Git Hooks，提交前自动检查
echo '#!/bin/bash\nclaude -p "检查本次提交的代码是否有明显问题"' > .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

# 配合 Makefile，定义常用命令
cat >> Makefile << 'EOF'
claude-review:
	claude -p "审查最近的代码变更"

claude-test:
	claude -p "运行测试并分析失败原因"
EOF
```

---

## 七、总结

Claude Code 代表了 AI 辅助编程的下一个阶段——从**"问答式助手"**进化为**"代理式协作者"**。通过 Skill 系统，你可以将它训练成符合团队规范的专业助手，无论是代码审查、项目初始化还是自动化脚本，都能显著提升开发效率。

如果你还没有尝试过，强烈建议在下一个项目中引入 Claude Code，从简单的代码解释开始，逐步探索 Skill 的自定义能力。

---

**参考链接：**
- [Claude Code 官方文档](https://docs.anthropic.com/en/docs/claude-code/overview)
- [Anthropic API 文档](https://docs.anthropic.com/en/api/getting-started)
- [Claude Code GitHub 社区](https://github.com/anthropics/claude-code)

---

> 本文系作者基于实际使用经验整理，如有错误或补充，欢迎在评论区留言交流！
