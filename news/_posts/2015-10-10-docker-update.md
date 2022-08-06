---
category: news
layout: news
title: "Docker APT/YUM 镜像更新"
author: Justin Wong
---

Docker 官方部署了[新的 docker 源](https://blog.docker.com/2015/07/new-apt-and-yum-repos/), 我们也对
docker 镜像作出相应调整。

现在的镜像地址为:

- APT: http://{{ site.hostname }}/docker/apt/repo
- YUM: http://{{ site.hostname }}/docker/yum/repo

请根据 [docker镜像帮助](/help/docker) 调整至正确的打开方式。

**Update1**: 以上链接已失效，docker 镜像已被 docker-ce 镜像替代，可参考 [docker-ce 镜像帮助](/help/docker-ce)。
