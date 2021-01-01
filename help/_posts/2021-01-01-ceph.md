---
category: help
layout: help
mirrorid: ceph
---

# CEPH 镜像安装帮助

[Ceph](https://ceph.io/) 是一个开源软件存储平台，在单个分布式计算机集群上实现对象存储。


请参考[Ceph 官方安装教程](https://docs.ceph.com/en/latest/install/get-packages/)，只需要把文档中出现的 `download.ceph.com` 替换为 `{{ site.hostname }}/ceph` 即可。

以 Debian Buster 为例，举例如下：

```shell
$ wget -q -O- 'https://download.ceph.com/keys/release.asc' | sudo apt-key add -
$ sudo apt-add-repository 'deb https://{{ site.hostname }}/ceph/debian-octopus/ buster main'
$ sudo apt update
```