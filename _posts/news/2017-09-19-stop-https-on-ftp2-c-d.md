---
category: news
layout: news
title: "停用 ftp2.cn.debian.org 的 HTTPS 访问"
author: Miao Wang
---

由于 Debian 将给 \<CC\>.debian.org 域名设置 CAA 记录，并禁止给 *.\<CC\>.debian.org 签署 HTTPS 证书，所以我们无法再提供 https://ftp2.cn.debian.org 的访问。

由于国内 ISP 经常会错误地缓存镜像站的内容，所以我们不鼓励用户使用 HTTP 访问镜像站，请大家把地址更改为 [https://mirrors.tuna.tsinghua.edu.cn](https://mirrors.tuna.tsinghua.edu.cn)

目前 ftp2.cn.debian.org 的证书将于 2017 年 11 月 25 日 过期，我们会在此之前取消 https://ftp2.cn.debian.org 的访问。

备注：镜像站的安全性**不靠** HTTPS 保证，提供 HTTPS 访问仅为了避免 ISP 错误缓存内容，引起各种缓存不一致的问题。

Debian 的公告见 [https://lists.debian.org/debian-mirrors-announce/2017/09/msg00000.html](https://lists.debian.org/debian-mirrors-announce/2017/09/msg00000.html)，以下为邮件摘录：

> Hi,
> 
> the debian mirrors team needs to be able to point the
> ftp.\<CC\>.debian.org aliases at different backends based on their  status.
> As such, the only service that is guaranteed to be available at these
> names is HTTP. Offering HTTPS on these names means breakage whenever
they are pointed at a different mirror.
> 
> Accordingly, we have set CAA records (RFC 6844) on the \<CC\>.debian.org
> domains to disallow any certificate issuance, and we’d like to ask
> mirror operators who were offering HTTPS under these names to stop doing
> so. They are of course free to continue offering the service under a
non-debian.org domain name.
> 
> Thanks,
> 
> Julien
