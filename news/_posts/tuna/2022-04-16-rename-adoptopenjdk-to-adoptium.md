---
layout: news
title: 关于重命名 AdoptOpenJDK 镜像为 Adoptium 的通知
date: 2022-04-16
author: Hongren Zheng
category: news
---

上游 AdoptOpenJDK 已经更名为 Adoptium，详细情况可以参考其[博客](https://blog.adoptopenjdk.net/2021/03/transition-to-eclipse-an-update/)。

遵循上游的改动，我们将镜像目录从 [/AdoptOpenJDK](https://mirrors.tuna.tsinghua.edu.cn/AdoptOpenJDK/) 更改为 [/Adoptium](https://mirrors.tuna.tsinghua.edu.cn/Adoptium/)。

值得注意的是，Adoptium 不再提供 OpenJ9 的实现，为此我们在 [/github-release/ibmruntimes](https://mirrors.tuna.tsinghua.edu.cn/github-release/ibmruntimes/) 提供了单独的镜像；另外，Adoptium 提供的版本相对较少。

为了保证用户的兼容性，我们将在 2022/6/1 之前继续保持 [/AdoptOpenJDK](https://mirrors.tuna.tsinghua.edu.cn/AdoptOpenJDK/) 的可用性。请各位用户及时迁移至新的目录结构，以免给您的使用带来不便。
