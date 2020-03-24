---
category: help
layout: help
mirrorid: linux-firmware.git
---

## Linux 固件仓库 Git 镜像使用帮助

如需克隆 Linux 固件仓库，使用

```
git clone https://{{ site.hostname }}/git/linux-firmware.git
```

若要将 tuna mirror 加入已有仓库，可在已有仓库中运行

```
git remote add tuna https://{{ site.hostname }}/git/linux-firmware.git
```

或运行

```
git remote set-url origin https://{{ site.hostname }}/git/linux-firmware.git
```

将默认上游设置为 TUNA 镜像。


