---
layout: help
category: help
mirrorid: lineageOS
permalink: /help/lineageOS/
---

## lineageOS 源代码镜像使用帮助

**注意: 本镜像是 lineageOS 源代码的镜像，如果是希望下载lineage的rom，请访问 <https://{{ site.hostname }}/help/lineage-rom/>。**

### 过程摘录

下载 repo 工具:

```bash
mkdir ~/bin
PATH=~/bin:$PATH
curl https://storage.googleapis.com/git-repo-downloads/repo > ~/bin/repo
chmod a+x ~/bin/repo
```

或者使用tuna的[git-repo镜像](https://{{ site.hostname }}/help/git-repo/)

建立工作目录:

```
mkdir WORKING_DIRECTORY
cd WORKING_DIRECTORY
```

初始化仓库:

```
repo init -u https://{{ site.hostname }}/git/lineageOS/LineageOS/android.git -b cm-14.1
```

(如果已经有从github同步的lineageOS源代码，可以从这里直接开始）

打开`.repo/manifest.xml`，将

```xml
  <remote  name="github"
           fetch=".."
           review="review.lineageos.org" />

```

改成

```xml
  <remote  name="github"
           fetch="https://github.com/" />

  <remote  name="lineage"
           fetch="https://{{ site.hostname }}/git/lineageOS/"
           review="review.lineageos.org" />
```

将

```xml
  <remote  name="aosp"
           fetch="https://android.googlesource.com"
```

改成

```xml
  <remote  name="aosp"
           fetch="https://{{ site.aosp }}"
```

将

```xml
  <default revision="..."
           remote="github"
```

改成

```xml
  <default revision="..."
           remote="lineage"
```

同步源码树（以后只需执行这条命令来同步）：

```
repo sync
```

### 异常处理
	
1. 部分仓库例如`Lineage_framework_base`同步的时候会出现bundle错误，这时候可以使用命令`repo sync --no-clone-bundle`进行同步就没有问题了
