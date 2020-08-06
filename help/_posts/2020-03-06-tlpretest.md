---
category: help
layout: help
mirrorid: tlpretest
---

tlpretest 镜像使用帮助
===================

tlpretest 是 TeX Live 在官方镜像之外发布的测试版本，详情可见 [官方介绍](https://www.tug.org/texlive/pretest.html)。

在 TeX Live 官方版更新冻结期间（通常为每年 2 到 4 月），用户可以通过 tlpretest 提前获得新版本的 TeX Live 及其包含的宏包更新。

在命令行中执行：

```
tlmgr option repository https://{{ site.hostname }}/tlpretest
```

即可永久更改镜像源。

如果只需要临时切换，可以用如下命令：

```
tlmgr update --all --repository https://{{ site.hostname }}/tlpretest
```

其中的 `update --all` 指令可根据需要修改。

