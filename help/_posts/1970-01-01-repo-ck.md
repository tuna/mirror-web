---
category: help
layout: help
mirrorid: repo-ck
---

## Archlinux repo-ck 镜像使用帮助

[repo-ck](http://repo-ck.com/) 是
[Arch](https://archlinux.org/) 的非官方仓库，内有包含 ck
补丁、BFS
调度器等，通用或为特定CPU架构优化过的内核，以及内核相关的软件包，是居家旅行，优化折腾的必备良药。更多内容，参考
[ArchWiki](https://wiki.archlinux.org/index.php/repo-ck)。

### 食用方法

在 `/etc/pacman.conf` 里添加

```
[repo-ck]							
Server = https://{{ site.hostname }}/repo-ck/$arch
```

再增加 GPG 信任:

```
pacman-key -r 5EE46C4C && pacman-key --lsign-key 5EE46C4C
```

之后 `pacman -Sy` 即可。
