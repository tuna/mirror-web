---
category: help
layout: help
mirrorid: CRAN
---

CRAN 镜像使用帮助
===================

[CRAN](https://cran.r-project.org/) (The Comprehensive R Archive Network) 镜像源配置文件之一是 `.Rprofile` (linux 下位于 `~/.Rprofile` )。


在文末添加如下语句:

```
options("repos" = c(CRAN="https://{{ site.hostname }}/CRAN/"))
```

打开 R 即可使用该 CRAN 镜像源安装 R 软件包。

Ubuntu 下添加CRAN镜像安装r
====================================
参考[(README里的步骤)](https://{{ site.hostname }}/CRAN/bin/linux/ubuntu/README.html)

例如 `Ubuntu 18.04` 编辑  `sudo vim /etc/apt/sources.list.d/r-tuna.list` 输入
`deb https://{{ site.hostname }}/CRAN/bin/linux/ubuntu bionic-cran40/`  (注意根据你的发行版替换`bionic`，根据需要的版本号替换`cran40`)

然后运行
```
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys E298A3A825C0D65DFD57CBB651716619E084DAB9
sudo apt-get update
sudo apt-get install r-base-dev
```
