---
category: help
layout: help
mirrorid: git-repo
---

## Git Repo 镜像使用帮助

> Repo is a tool that we built on top of Git. Repo helps us manage the many Git repositories, does the uploads to our revision control system, and automates parts of the Android development workflow. Repo is not meant to replace Git, only to make it easier to work with Git in the context of Android. The repo command is an executable Python script that you can put anywhere in your path.

当前repo主要用于同步AOSP、chromium及chromium OS。

### 下载

```
curl https://{{ site.hostname }}/git/git-repo -o repo
chmod +x repo
```

为了方便可以将其拷贝到你的`PATH`里。

### 更新

repo的运行过程中会尝试访问官方的git源更新自己，如果想使用tuna的镜像源进行更新，可以将如下内容复制到你的`~/.bashrc`里

```
export REPO_URL='https://{{ site.hostname }}/git/git-repo'
```

并重启终端模拟器。
