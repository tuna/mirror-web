---
category: help
layout: help
mirrorid: gentoo-portage-prefix
---

## [Gentoo Prefix](https://wiki.gentoo.org/wiki/Project:Prefix) 的镜像配置方法如下：

### Gentoo Prefix 镜像配置：

在 `$EPREFIX/etc/portage` 目录下创建名为 `repos.conf` 的目录，在 `$EPREFIX/etc/portage/repos.conf/gentoo.conf` 中加入如下内容：

```
[gentoo_prefix]
sync-uri = rsync://mirrors.tuna.tsinghua.edu.cn/gentoo-portage-prefix
```

### Distfiles 配置：

这部分与在 Gentoo Linux 中配置无异，在 `$EPREFIX/etc/portage/make.conf` 中加入：

```
GENTOO_MIRRORS="https://mirrors.tuna.tsinghua.edu.cn/gentoo"
```

配置好以上两项以后，执行 `emerge --sync` 或者 `eix-sync` 进行更新。
