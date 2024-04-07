---
layout: news
title: 关于更换 Erlang Solutions 镜像上游的通知
date: 2024-04-07
author: Shengqi Chen
category: news
---

由于 Erlang Solutions 软件源上游发生变化（详见 [tuna/issues#1830](https://github.com/tuna/issues/issues/1830)，TUNA 相应更新了同步方式。
目前 `erlang-solutions` 镜像的 HTTP(S)、rsync 服务将使用新的结构提供，与上游保持一致。具体使用方式可参见 [Erlang Solutions 软件仓库 使用帮助](/help/erlang-solutions/)。

原有的 Erlang Solutions 软件仓库内容将于 [`/erlang-solutions-old/`](/erlang-solutions-old/) 目录下继续保留至 2024/05/31。保留期间仅提供 HTTP(S) 访问，不再提供 rsync 服务。
