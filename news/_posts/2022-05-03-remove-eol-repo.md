---
layout: news
title: 关于移除部分生命周期结束的软件源的通知
date: 2022-05-03
author: Hongren Zheng
category: news
---

随着 Ubuntu 22.04 LTS 的发布，大量软件源迎来更新；与此同时，我们也注意到现有的软件源中保留了一些生命周期结束的旧版本。为了更好地利用有限的存储空间，我们决定在添加新内容的同时移除部分生命周期结束的软件源，具体列表如下

1. 对使用 apt-sync.py 同步的软件源，移除 Ubuntu 16.04 LTS Xenial 部分，新增了 22.04 LTS Jammy 部分，移除了 Debian 8 Jessie 与 9 Stretch 部分，新增了 Bookworm 部分，可能受影响的软件源列表如下
    * adoptium
    * chef
    * erlang
    * gitlab-ce
    * gitlab-runner
    * influxdata
    * kubernetes
    * mongodb
    * mysql
    * proxmox
    * ros2
    * rudder
    * virtualbox
2. 对使用 yum-sync.py 同步的软件源，移除了 CentOS 6 与 CentOS 8 的部分，可能受影响的软件源列表如下
    * adoptium
    * chef
    * erlang
    * gitlab-ce
    * gitlab-runner
    * influxdata
    * mongodb
    * mysql
    * rudder
    * virtualbox
3. 移除 ELK（elasticstack 的旧名称），同时移除 elasticstack 中的 5.x 版本
4. 移除 MongoDB 的 3.6 与 4.0 版本
5. 移除 MySQL 的 5.6 版本
6. 移除 OpenMediaVault 的 Arrakis 部分

为了保证用户的兼容性，我们将在 2022/6/1 之前继续保持旧内容的可用性。请各位用户及时迁移至新的版本，以免给您的使用带来不便。
