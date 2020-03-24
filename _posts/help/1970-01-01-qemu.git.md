---
category: help
layout: help
mirrorid: qemu.git
---

## QEMU Git 镜像使用帮助

如需克隆 QEMU 代码，使用

```
git clone https://{{ site.hostname }}/git/qemu.git
```

若要将 tuna mirror 加入已有代码库，可在已有仓库中运行

```
git remote add tuna https://{{ site.hostname }}/git/qemu.git
```

或运行

```
git remote set-url origin https://{{ site.hostname }}/git/qemu.git
```

将默认上游设置为 TUNA 镜像
