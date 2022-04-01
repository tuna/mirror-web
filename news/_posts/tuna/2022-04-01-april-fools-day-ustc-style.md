---
layout: news
title: 镜像站主页故障通知
date: 2022-04-01
author: TUNA Maintainers
category: news
---
广搜大学推出[”破镜重圆“服务](/news/april-fools-day-cd-delivery/)后，因其稳定性与便捷性受到众多客户青睐。在镜像站例行维护作业中，TUNA 与 USTC 使用
one-click<sup>TM</sup> mirror 服务代替 rsync 进行数据同步。由于数据同步时没有加锁，两站点的同步出现了竞争状态，恰巧同时完成同步，
覆盖了主页相关数据。经查，镜像站数据一切正常。关于主页的问题正在紧急抢修，将在收到新光盘后修正。
