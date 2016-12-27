---
layout: help
category: help
mirrorid: chromiumos
permalink: /help/chromiumos/
---

## Chromium OS 镜像使用帮助

#### 准备工作

下载 repo 工具:

```bash
mkdir ~/bin
PATH=~/bin:$PATH
curl https://storage.googleapis.com/git-repo-downloads/repo > ~/bin/repo
chmod a+x ~/bin/repo
```

或者使用tuna的[git-repo镜像](https://mirrors.tuna.tsinghua.edu.cn/help/git-repo/)

#### 下载代码

建立工作目录:

```
mkdir WORKING_DIRECTORY
cd WORKING_DIRECTORY
```

初始化仓库:

```
repo init -u https://mirrors.tuna.tsinghua.edu.cn/git/chromiumos/chromiumos/manifest
```

**注意: 本镜像是 Chromium OS 的 master 分支的镜像，如果使用本镜像下载 Chromium OS 的其他版本很大概率会失败**

接着使用编辑器打开`.repo/manifests/_remotes.xml`这个文件，将

```
"https://chromium.googlesource.come"
```

替换为

```
"https://mirrors.tuna.tsinghua.edu.cn/git/chromiumos/"
```

将

```
"https://android.googlesource.come"
```

替换为

```
"https://aosp.tuna.tsinghua.edu.cn/"
```

将

```
"https://weave.googlesource.come"
```

替换为

```
"https://mirrors.tuna.tsinghua.edu.cn/git/weave/"
```

即可。


如果提示无法连接到 gerrit.googlesource.com，可以先运行如下指令：

```
export REPO_URL = 'https://mirrors.tuna.tsinghua.edu.cn/git/git-repo'
```

同步源码树（以后只需执行这条命令来同步）：

```
repo sync
```
