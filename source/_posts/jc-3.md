---
title: git把功能开发错了分支莫慌/恢复误删的本地分支
date: 2018-09-11 15:32:20
categories: gc-end
tags: git
---

开发风风火火，功能开发完了，git branch一看，靠，在线上分支开发的，顿时瘫坐在椅子上，还得复制代码？不用，几步搞定，顿时觉得git是天下最伟大的发明。

## 第一种场景

你开发的功能还没有提交代码，像我这种喜欢开发完一次性提交的人会经常用到，这种习惯其实是不好的。

```shell
git add .  // 把所有改动放到暂存
git stash  // 把暂存的文件提交到git的暂存栈
git checkout 本该提交代码的分支  // 切换到正确的分支
git stash pop  // 将暂存栈中的代码放出来
```
<!-- more -->
## 第二种场景

其实最常见的是这种问题，特别是喜欢用idea插件的童鞋，一顿操作猛如虎，一看结果心里哭。git  checkout 不该提交代码提交了代码的分支

```shell
git reset HEAD~1 // 最近一次提交放回暂存区, 并取消此次提交
git stash // 把暂存的文件提交到git的暂存栈
git checkout 该提交代码的分支
git stash pop
```

下面一顿操作随你猛了，等你把代码提交到了正确的分支后，再次切到刚刚错的分支

```shell
git push origin 错误的分支 -f  (把不该上去的文件回退掉)
```

## 恢复误删的本地分支

```shell
git log -g // 找回之前提交的commit,并记下commit_id
git branch newbranch commit_id // 切换到newbranch分支，检查文件是否存在
```
