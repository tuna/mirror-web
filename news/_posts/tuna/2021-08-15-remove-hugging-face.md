---
category: news
layout: news
title: "关于移除 hugging-face-models 镜像的通知"
author: Shengqi Chen
---

由于 Hugging Face 官方不再提供 AWS S3 形式的模型存储，转而使用 Git LFS（详见 [相关讨论](https://github.com/tuna/issues/issues/937)），并且日常下载量逐渐下降，我们将于近期移除 `hugging-face-models` 仓库。

具体实施计划如下：

* 2021/8/15：停止该仓库同步、移除使用帮助、从主页隐藏该仓库（已经执行）
* 2021/8/31：从服务器中移除仓库内容

请各位用户及时迁移至官方上游，以免给您的使用带来不便。
