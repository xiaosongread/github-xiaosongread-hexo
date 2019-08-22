---
title: git-常用出错命令
categories: gc-end
date: 2019-08-22 10:20:42
---
![blockchain](https://raw.githubusercontent.com/xiaosongread/github-xiaosongread-hexo/master/img-folder/git.jpg)
<!-- more -->
## 删除远程分支
```javascript
git push origin --delete 远程分支名称
```

## 拉去远程分支到本地
```javascript
git checkout -b 本地分支名 origin/远程分支名
```
## 远程分支删除 git branch -a 还有的问题
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

