---
layout: news
title: 关于移除若干软件镜像的通知
author: Shengqi Chen
category: news
---

由于存储资源严重受限，为保证服务正常运行，TUNA 镜像站已经移除了如下镜像：

- Anaconda
- OpenWrt
- Flutter（`flutter-sdk.git` 依旧保留）
- GitLab EE

这些镜像的 rsync 服务已经停止提供。为避免影响用户，对 HTTP(S) 路径的访问将被跳转至 [教育网联合镜像站](https://mirrors.cernet.edu.cn/) 或各软件对应的上游。我们推荐下游用户及时切换镜像站，以免给您的使用带来不便。

TUNA 镜像站将不定期检视空间利用情况，并可能在未来继续不加通知地移除任何内容。
