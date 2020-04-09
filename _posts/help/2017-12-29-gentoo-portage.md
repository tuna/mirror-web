---
category: help
layout: help
mirrorid: gentoo-portage
---

## [Gentoo Linux](https://www.gentoo.org/) 的镜像配置方法如下：

### Gentoo Portage 镜像配置：

修改`/etc/portage/repos.conf/gentoo.conf`,将

```
sync-uri = rsync://rsync.gentoo.org/gentoo-portage
```

修改为

```
sync-uri = rsync://{{ site.hostname }}/gentoo-portage
```

### Distfiles 配置：

在 `/etc/portage/make.conf` 中加入：

```
GENTOO_MIRRORS="https://{{ site.hostname }}/gentoo"
```

配置好以上两项后,执行 `emerge --sync` 进行更新。
