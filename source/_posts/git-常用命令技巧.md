---
title: git-常用命令技巧
categories: gc-end
date: 2019-08-22 10:20:42
tags: git
---
<img src="/images/img-folder/git.jpg">
<!-- more -->
## 单独合并某个分支的某个文件
branch-a分支有个文件的功能要合并到branch-b的上面
```javascript
git checkout branch-b
git checkout --patch branch-b src/views/index/Index.vue
弹出修改确认提示：Apply this hunk to index and worktree [y,n,q,a,d,/,K,g,e,?]?
在弹出的都选  y 即可。最后提交代码完成更新合并同步
```

## 删除远程分支
```javascript
git push origin --delete 远程分支名称
```

## 拉去远程分支到本地
```javascript
git checkout -b 本地分支名 origin/远程分支名
```

## 查看当前详细分支信息（可看到当前分支与对应的远程追踪分支）
```javascript
git branch -vv
```

## 远程分支删除 git branch -a 还有的问题
### 1.查看remote地址，远程分支，还有本地分支与之相对应关系等信息
```javascript
git remote show origin 
```
### 2.删除远程没有的分支
```javascript
git remote prune origin  
```

## 回退远程分支
```javascript
// 本地分支回退
git reset --hard 107d5976407c2e544db8f19cfe425502b7670d6b 
// 强推代码到远程
git push -f origin test 
```
---
## 打tag

### 列出已有的tag
```shall
git tag
```

### 新建tag
```shall
git tag v1.0
```
还可以加上-a参数来创建一个带备注的tag，备注信息由-m指定。如果你未传入-m则创建过程系统会自动为你打开编辑器让你填写备注信息。
```shall
git tag -a tagName -m "my tag"
```

### 查看tag详细信息
```shall
git show tagName
```

### 给指定的某个commit号加tag
打tag不必要在head之上，也可在之前的版本上打，这需要你知道某个提交对象的校验和（通过git log获取，取校验和的前几位数字即可）。

```shall
git tag -a v1.2 9fceb02 -m "my tag"
```
### 将tag同步到远程服务器
同提交代码后，使用git push来推送到远程服务器一样，tag也需要进行推送才能到远端服务器。
使用git push origin [tagName]推送单个分支。
```shall
git push origin v1.0
```
推送本地所有tag，使用

```shall
git push origin --tags
```

### 切换到某个tag

> 跟分支一样，可以直接切换到某个tag去。这个时候不位于任何分支，处于游离状态，可以考虑基于这个tag创建一个分支。

```shall
git checkout tagname
```

### 删除某个tag

++ 本地删除
```shall
git tag -d v0.1.2 
```

++ 远端删除
```shall
// git push origin :refs/tags/<tagName>
git push origin :refs/tags/v0.1.2
```

