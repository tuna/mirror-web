---
category: help
layout: help
mirrorid: fedora
---

Fedora 镜像使用帮助
===================

Fedora 默认使用 [Metalink](https://zh.fedoracommunity.org/2018/04/05/fedora-secures-package-delivery.html) 给出推荐的镜像列表，保证用户使用的镜像仓库足够新，并且能够尽快拿到安全更新，从而提供更好的安全性。所以通常情况下使用默认配置即可，无需更改配置文件。

由于 Metalink 需要从国外的 Fedora 项目服务器上获取元信息，所以对于校园内网、无国外访问等特殊情况，metalink 并不适用，此时可以如下修改配置文件。

Fedora 的软件源配置文件可以有多个，其中：
系统默认的 `fedora` 仓库配置文件为 `/etc/yum.repos.d/fedora.repo`，系统默认的 `updates` 仓库配置文件为 `/etc/yum.repos.d/fedora-updates.repo` 。将上述两个文件先做个备份，根据 Fedora 系统版本分别替换为下面内容，之后通过 `sudo dnf makecache` 命令更新本地缓存，即可使用 TUNA 的软件源镜像。

## Fedora 29 或更旧版本

Fedora 29 及更旧版本已不再受官方支持，Fedora 官方已将 Fedora 29 及更旧版本的软件仓库从主镜像中移除，并转移至了 archive 镜像中。故Fedora 29 及更旧版本无法使用 TUNA 的镜像。请使用默认配置文件，以使 `yum` / `dnf` 自动获取可用的镜像源。

## Fedora 30 或更新版本

**`fedora` 仓库 (/etc/yum.repos.d/fedora.repo)**

```
[fedora]
name=Fedora $releasever - $basearch
failovermethod=priority
baseurl=https://{{ site.hostname }}/fedora/releases/$releasever/Everything/$basearch/os/
metadata_expire=28d
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$releasever-$basearch
skip_if_unavailable=False
```

**`updates` 仓库 (/etc/yum.repos.d/fedora-updates.repo)**

```
[updates]
name=Fedora $releasever - $basearch - Updates
failovermethod=priority
baseurl=https://{{ site.hostname }}/fedora/updates/$releasever/Everything/$basearch/
enabled=1
gpgcheck=1
metadata_expire=6h
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$releasever-$basearch
skip_if_unavailable=False
```

**`fedora-modular` 仓库 (/etc/yum.repos.d/fedora-modular.repo)**

```
[fedora-modular]
name=Fedora Modular $releasever - $basearch
failovermethod=priority
baseurl=https://{{ site.hostname }}/fedora/releases/$releasever/Modular/$basearch/os/
enabled=1
metadata_expire=7d
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$releasever-$basearch
skip_if_unavailable=False
```

**`updates-modular` 仓库 (/etc/yum.repos.d/fedora-updates-modular.repo)**

```
[updates-modular]
name=Fedora Modular $releasever - $basearch - Updates
failovermethod=priority
baseurl=https://{{ site.hostname }}/fedora/updates/$releasever/Modular/$basearch/
enabled=1
gpgcheck=1
metadata_expire=6h
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$releasever-$basearch
skip_if_unavailable=False
```
