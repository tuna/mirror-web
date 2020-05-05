---
category: help
layout: help
mirrorid: gentoo-portage
---

## [Gentoo Linux](https://www.gentoo.org/) 的镜像配置方法如下：

### Gentoo Portage 镜像配置：

#### `rsync` 方式

修改 `/etc/portage/repos.conf/gentoo.conf` ,将

```
sync-uri = rsync://rsync.gentoo.org/gentoo-portage
```

修改为

```
sync-uri = rsync://{{ site.hostname }}/gentoo-portage
```

#### `git` 方式

第一次使用 `git` 同步方式的用户需要进行如下操作：

- 修改 `/etc/portage/repos.conf/gentoo.conf`
		- 将 `sync-type` 改為 `git`
		- 將 `sync-uri` 改為 `https://{{ site.hostname }}/git/gentoo-portage.git`
- 刪除 `/var/db/repos/gentoo`
- 執行 `emerge --sync`

已經配置 `git` 同步的用戶只需：

- 修改 `/etc/portage/repos.conf/gentoo.conf`
		- 將 `sync-uri` 改為 `https://{{ site.hostname }}/git/gentoo-portage.git`
- 於 `/var/db/repos/gentoo` 下，執行 `git remote set-url origin https://{{ site.hostname }}/git/gentoo-portage.git`
- 執行 `emerge --sync`

### Distfiles 配置：

在 `/etc/portage/make.conf` 中加入：

```
GENTOO_MIRRORS="https://{{ site.hostname }}/gentoo"
```

配置好以上两项后,执行 `emerge --sync` 进行更新。
