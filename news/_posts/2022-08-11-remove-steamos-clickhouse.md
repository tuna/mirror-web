---
layout: news
title: 关于移除 steamos 与 clickhouse 仓库的通知
date: 2022-08-11
author: Hongren Zheng
category: news
---

参考 [#1549](https://github.com/tuna/issues/issues/1549)，镜像站中现有的 steamos 仓库为过时版本，我们决定移除该镜像。

参考 [#1488](https://github.com/tuna/issues/issues/1488)，clickhouse 上游切换了分发方式，暂无有效的同步方式，我们决定移除该仓库；为了保证用户的兼容性，我们会将用户的请求重定向至上游。
