-
category: help
layout: help
mirrorid: gentoo-portage
---

(Gentoo Linux)[https://www.gentoo.org/] 的镜像配置方法如下：

Distfiles 配置：
===============

在 `/etc/portage/make.conf` 中加入：

```
GENTOO_MIRRORS="https://mirrors.tuna.tsinghua.edu.cn/gentoo"
```

执行 `emerge --sync` 或者 `eix-sync` 进行更新。
