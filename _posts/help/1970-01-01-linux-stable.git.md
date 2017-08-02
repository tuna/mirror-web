---
category: help
layout: help
mirrorid: linux-stable.git
---

## Linux Kernel Git Stable 分支镜像使用帮助

如需克隆 linux 代码，使用

```
git clone https://mirrors.tuna.tsinghua.edu.cn/git/linux-stable.git
```

若要将 tuna mirror 加入已有代码库，可在已有仓库中运行

```
git remote add tuna https://mirrors.tuna.tsinghua.edu.cn/git/linux-stable.git
```

或运行

```
git remote set-url origin https://mirrors.tuna.tsinghua.edu.cn/git/linux-stable.git
```

将默认上游设置为 TUNA 镜像

