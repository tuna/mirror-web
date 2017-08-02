---
category: news
layout: news
title: "暂时对 rsync 服务磁盘 I/O 进行限制"
author: Yichuan Gao
---

受近期 [中科大开源软件镜像站故障](https://servers.ustclug.org/2016/11/mirrors-services-outage/) 的影响，TUNA Mirrors 流量大幅上升，目前已接近带宽极限，对磁盘阵列的 I/O 产生了较大压力。为了保证阵列正常工作，我们将优先保证 HTTP/HTTPS 服务质量，而在高峰期对 rsync 服务的磁盘 I/O 进行限制。届时以 TUNA 为上游进行 rsync 同步速度将会下降，敬请谅解。如果方便，请尽量选择凌晨错峰同步。恢复时间将会另行通知。
