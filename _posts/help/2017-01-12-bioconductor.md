---
category: help
layout: help
mirrorid: bioconductor
---

[Bioconductor](https://www.bioconductor.org) 镜像使用帮助
===================

Bioconductor镜像源配置文件是`.Rprofile`(linux下位于```~/.Rprofile```)。


在文末添加如下语句
```
options(BioC_mirror="https://mirrors.tuna.tsinghua.edu.cn/bioconductor")
```
打开R即可使用该Bioconductor镜像源安装Bioconductor软件包。
