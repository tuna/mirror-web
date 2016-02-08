---
category: news
layout: news
title: "AOSP 每月打包"
author: Justin Wong
---

由于从 TUNA 初始化 AOSP 工程时需要下载 36GB 数据，过程中任何网络故障都可能造成同步失败，因此我们决定每月对
AOSP 完整工程进行一次打包，用户可以通过 HTTP 下载。解压后使用 Android 的 `repo` 工具直接同步即可。

首先到 http://mirrors.tuna.tsinghua.edu.cn/aosp-monthly/ 选择合适自己的构建包，aosp-latest.tar.xz 经过了 xz 压缩，
体积相对 aosp-latest.tar 小一些，但是也有 27G 大小，请权衡自己的网络带宽和计算能力。

使用方法如下:

```
wget http://mirrors.tuna.tsinghua.edu.cn/aosp-monthly/aosp-latest.tar # 下载初始化包
tar xf aosp-latest.tar
cd AOSP   # 解压得到的 AOSP 工程目录
repo sync # 正常同步
```

初始化完之后，以后每次就只需要执行 `repo sync` 和 TUNA 保持同步就可以了。

详情参考 [AOSP 镜像使用帮助](/help/AOSP)。
