# git 基础操作

## 查看远程分支
```
➜ git branch -a
* develop
  master
  remotes/origin/HEAD -> origin/master
  remotes/origin/develop
  remotes/origin/master
```

## 查看本地分支
```
➜ git branch 
* develop
  master
```

## 创建分支
```
➜ git branch testing
➜ git branch 
* develop
  master
  testing
```

## 把分支推到远程分支
```
➜ git push origin testing
```

## 切换分支到testing
```
➜ git checkout testing
```

## 删除本地分支
```
➜ git branch -d develop
Deleted branch test (was 17d28d9). 
```

## 查看本地和远程分支 -a。前面带*号的代表你当前目录所处的分支
```
➜ git branch -a
```
这个是执行 git remote -v 的结果，看出来origin其实就是远程的git地址的一个别名。
```
➜ git remote -v
origin	https://***.com/blog (fetch)
origin	https://***.com/blog (push)
```

## 删除远程版本
```
➜ git push origin :br-1.0.0
```
```
删除远程分支
➜ git branch -r -d origin/branch-name  
➜ git push origin :branch-name  
```

## 参考
- [git 查看远程分支、本地分支、创建分支、把分支推到远程repository、删除本地分支](http://blog.csdn.net/arkblue/article/details/9568249/)
