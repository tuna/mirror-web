---
category: help
layout: help
mirrorid: openwrt
---

## OpenWRT (LEDE) 镜像使用帮助

OpenWRT（曾用名 LEDE）是一款广泛应用于路由器的嵌入式操作系统。本站提供 OpenWRT 的包管理器 `opkg` 的 release 部分镜像。

本站不包含 snapshots 镜像，如果需要 snapshots，可以前往[校园网联合镜像站](https://mirrors.cernet.edu.cn/list/openwrt)寻找替代。

### 手工替换

登录到路由器，并编辑 `/etc/opkg/distfeeds.conf` 文件，将其中的 `downloads.openwrt.org` 替换为 `{{ site.hostname }}/openwrt` 即可。

### 自动替换

执行如下命令自动替换

```
sed -i 's_downloads.openwrt.org_{{ site.hostname }}/openwrt_' /etc/opkg/distfeeds.conf
```
