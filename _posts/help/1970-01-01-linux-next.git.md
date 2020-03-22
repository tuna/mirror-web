---
category: help
layout: help
mirrorid: linux-next.git
---

## Linux Kernel Git Next 分支镜像使用帮助

如需克隆 linux 代码，使用

```
git clone https://{{ site.hostname }}/git/linux-next.git
```

若要将 tuna mirror 加入已有代码库，可在已有仓库中运行

```
git remote add tuna https://{{ site.hostname }}/git/linux-next.git
```

或运行

```
git remote set-url origin https://{{ site.hostname }}/git/linux-next.git
```

将默认上游设置为 TUNA 镜像。


