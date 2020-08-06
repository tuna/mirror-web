---
category: help
layout: help
mirrorid: linux.git
---

## Linux Kernel Git 镜像使用帮助

本项目包含三个镜像：`linux.git`, `linux-next.git`, `linux-stable.git`，分别是主分支、稳定版分支和开发分支。在使用时，请自行更改路径中相应的仓库名称。

如需克隆主线 linux 代码，使用

```
git clone https://{{ site.hostname }}/git/linux.git
```

若要将 tuna mirror 加入已有代码库，可在已有仓库中运行

```
git remote add tuna https://{{ site.hostname }}/git/linux.git
```

或运行

```
git remote set-url origin https://{{ site.hostname }}/git/linux.git
```

将默认上游设置为 TUNA 镜像

### 增量下载

如果需要其它 linux 分支的代码（如树莓派内核代码），可以在 clone 本项目基础上增量下载分支的代码，从而加速下载

以树莓派为例，具体操作为

```
git clone https://{{ site.hostname }}/git/linux.git
git remote add rasp https://github.com/raspberrypi/linux.git
git fetch rasp
```
