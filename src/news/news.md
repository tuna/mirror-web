<span id="gitlab-ce-mirror"></span>
### # Chakra, Mageia, gitlab-ce 镜像 
<span class="fa fa-calendar"></span> 2015-11-11

TUNA mirrors 新增 Chakra, Mageia 和 GitLab Community Edition 镜像。

- Chakra 是衍生自 Arch Linux 的，以 KDE 和 Qt 为一等公民的轻量级 Linux 发行版
- Mageia 被认为是对显卡驱动支持最好的发行版之一，distrowatch 上排名前十且汉化很好
- gitlab-ce 是 GitLab 的社区版，详情见 [gitlab-ce 使用帮助](/help/#gitlab-ce)


<span id="cygwin-mirror"></span>
### # Cygwin 镜像 
<span class="fa fa-calendar"></span> 2015-11-04

TUNA mirrors 新增 cygwin 镜像。

---

<span id="aosp-doc-update"></span>
### # AOSP 文档更新
<span class="fa fa-calendar"></span> 2015-10-13

经用户反馈，原 AOSP 文档建立次级镜像部分有误，现已更正。详情见 [AOSP 镜像帮助](/help/#AOSP)。

---

<span id="docker-update"></span>
### # Docker APT/YUM 镜像更新
<span class="fa fa-calendar"></span> 2015-10-10

Docker 官方部署了[新的 docker 源](https://blog.docker.com/2015/07/new-apt-and-yum-repos/), 我们也对
docker 镜像作出相应调整。

现在的镜像地址为:

- APT: http://mirrors.tuna.tsinghua.edu.cn/docker/apt/repo
- YUM: http://mirrors.tuna.tsinghua.edu.cn/docker/yum/repo

请根据 [docker镜像帮助](/help/#docker) 调整至正确的打开方式。

----

<span id="aosp-maintenance"></span>
### # AOSP 镜像调整
<span class="fa fa-calendar"></span> 2015-10-09

国庆长假后，AOSP镜像业务量激增，造成 mirrors 服务器严重超载。

我们尝试了如下策略降低服务器负载:

- 将服务更改为对 https://android.googlesource.com/ 的反向代理，但一段时间后即被 Google 做了流量限制
- 更新 Git 版本，使用 Git 2.0+ 引入的 Bitmap 索引对所有仓库进行了一次 repack

经过接近两天的折腾，Bitmap 索引显著降低了服务器负载，在 10 月 10 日 AOSP 占满服务器带宽的情况下，Git 服务
的CPU和内存占用率都在合理范围内。

目前 AOSP 镜像业务已完全恢复。

我们顺便完善了 AOSP 镜像的文档，如果你是团队用户，我们强烈建议你通过 TUNA 镜像建立次级镜像，减小 TUNA mirrors
负载。详情请参考 [AOSP 镜像帮助](/help/#AOSP)。
