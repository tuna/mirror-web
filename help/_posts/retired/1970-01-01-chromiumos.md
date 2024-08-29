---
layout: help
category: help
mirrorid: chromiumos
---

## Chromium OS 镜像使用帮助

> Chromium OS is an open-source project that aims to build an operating system that provides a fast, simple, and more secure computing experience for people who spend most of their time on the web.

#### 准备工作

下载 repo 工具:

```bash
mkdir ~/bin
PATH=~/bin:$PATH
curl https://storage.googleapis.com/git-repo-downloads/repo > ~/bin/repo
chmod a+x ~/bin/repo
```

或者使用tuna的[git-repo镜像](https://{{ site.hostname }}/help/git-repo/)

#### 下载代码

建立工作目录:

```
mkdir WORKING_DIRECTORY
cd WORKING_DIRECTORY
```

初始化仓库:

```
repo init -u https://{{ site.hostname }}/git/chromiumos/chromiumos/manifest
```

**注意: 本镜像是 Chromium OS 的 master 分支的镜像，如果使用本镜像下载 Chromium OS 的其他版本很大概率会失败**

**如果提示无法连接到 gerrit.googlesource.com，请参照[git-repo的帮助页面](/help/git-repo)的更新一节。**

接着使用编辑器打开`.repo/manifests/_remotes.xml`这个文件，将

```
"https://chromium.googlesource.com"
```

替换为

```
"https://{{ site.hostname }}/git/chromiumos"
```

接着将

```
"https://android.googlesource.com"
```

替换为

```
"https://{{ site.hostname }}/git/AOSP"
```


即可。

最后同步源码树（以后只需执行这条命令来同步）：

```
repo sync
```
