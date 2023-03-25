---
layout: news
title: 关于移除 julia、openresty 仓库与 mysql 部分内容的通知
date: 2023-03-25
author: Hongren Zheng
category: news
---

参考 [#1677](https://github.com/tuna/issues/issues/1677)，julia 镜像占用大，利用率低；通过与 Julia 中文社区和[北京大学开源镜像站](https://mirrors.pku.edu.cn/)的讨论，我们决定移除该镜像并重定向相关请求到北京大学开源镜像站；在此我们感谢 Julia 中文社区与北京大学开源镜像站的理解与支持。

参考 [openresty/openresty.org#217](https://github.com/openresty/openresty.org/issues/217)，openresty 上游无法同步，我们决定移除该镜像并重定向相关请求到上游。

参考 [#1555](https://github.com/tuna/issues/issues/1555) 与 [ustclug/mirrorrequest#356](https://github.com/ustclug/mirrorrequest/issues/356)，mysql 镜像中的 rsync 部分内容（即 downloads 目录）的上游不再维护，我们决定移除该部分内容。
