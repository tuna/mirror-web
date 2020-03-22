---
category: help
layout: help
mirrorid: glibc.git
---

## GNU C Library Git 镜像使用帮助

如需克隆 GNU C Library 代码，使用

```
git clone https://{{ site.hostname }}/git/glibc.git
```

若要将 tuna mirror 加入已有代码库，可在已有仓库中运行

```
git remote add tuna https://{{ site.hostname }}/git/glibc.git
```

或运行

```
git remote set-url origin https://{{ site.hostname }}/git/glibc.git
```

将默认上游设置为 TUNA 镜像
