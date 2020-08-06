---
category: help
layout: help
mirrorid: archlinux
---

## Arch Linux 软件仓库镜像使用帮助

编辑 /etc/pacman.d/mirrorlist， 在文件的最顶端添加：
```
Server = https://{{ site.hostname }}/archlinux/$repo/os/$arch
```

更新软件包缓存：
```
sudo pacman -Syy
```

## Arch Linux Rollback Machine使用帮助

因为 Arch Linux 的软件仓库和 iso 列表是不维护旧版本的，在少数情况下可能会需要安装旧版本的软件或系统，
因此TUNA维护了一个[Arch Linux Rollback Machine](https://{{ site.arch_archive }}/)来满足这种情况。

Arch Linux Rollback Machine的使用方法请参照 [wiki](https://wiki.archlinux.org/index.php/Arch_Linux_Archive)。

**需要注意的是，TUNA的Rollback Machine的目录结构与wiki中的目录结构并不相同，配置时请自行替代。**
