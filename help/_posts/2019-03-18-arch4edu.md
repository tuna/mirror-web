---
category: help
layout: help
mirrorid: arch4edu
---

## Arch4edu 镜像使用帮助

Arch4edu 是面向高校用户推出的非官方软件仓库，
支持 Arch Linux 和 Arch Linux ARM，
主要包含高校用户常用的科研、教学及开发软件。

*  项目地址：<https://github.com/arch4edu/arch4edu>
*  镜像地址：<https://{{ site.hostname }}/arch4edu>

### 使用方法

* 导入 GPG key

```
$ pacman-key --recv-keys 7931B6D628C8D3BA
$ pacman-key --finger 7931B6D628C8D3BA
$ pacman-key --lsign-key 7931B6D628C8D3BA
```

* 在 `/etc/pacman.conf` 文件末尾添加以下内容：

```
[arch4edu]
Server = https://{{ site.hostname }}/arch4edu/$arch
```

* [**不推荐**] 不导入 GPG key，并直接在 `/etc/pacman.conf` 文件末尾添加以下内容：

```
[arch4edu]
SigLevel = Never
Server = https://{{ site.hostname }}/arch4edu/$arch
```
