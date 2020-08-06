---
category: help
layout: help
mirrorid: binutils-gdb.git
---

## GNU Binutils 和 GDB 等项目 Git 镜像使用帮助

如需克隆 Binutils 等项目的代码，使用

```
git clone https://{{ site.hostname }}/git/binutils-gdb.git
```

若要将 tuna mirror 加入已有代码库，可在已有仓库中运行

```
git remote add tuna https://{{ site.hostname }}/git/binutils-gdb.git
```

或运行

```
git remote set-url origin https://{{ site.hostname }}/git/binutils-gdb.git
```

将默认上游设置为 TUNA 镜像
