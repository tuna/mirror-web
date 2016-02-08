---
category: news
layout: news
title: "AOSP 镜像调整"
author: Justin Wong
---

国庆长假后，AOSP镜像业务量激增，造成 mirrors 服务器严重超载。

我们尝试了如下策略降低服务器负载:

- 将服务更改为对 https://android.googlesource.com/ 的反向代理，但一段时间后即被 Google 做了流量限制
- 更新 Git 版本，使用 Git 2.0+ 引入的 Bitmap 索引对所有仓库进行了一次 repack

经过接近两天的折腾，Bitmap 索引显著降低了服务器负载，在 10 月 10 日 AOSP 占满服务器带宽的情况下，Git 服务
的CPU和内存占用率都在合理范围内。

目前 AOSP 镜像业务已完全恢复。

我们顺便完善了 AOSP 镜像的文档，如果你是团队用户，我们强烈建议你通过 TUNA 镜像建立次级镜像，减小 TUNA mirrors
负载。详情请参考 [AOSP 镜像帮助](/help/AOSP)。
