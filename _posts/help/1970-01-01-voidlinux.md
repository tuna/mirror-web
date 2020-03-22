---
category: help
layout: help
mirrorid: voidlinux
---

# Voidlinux 镜像使用帮助

使用如下命令替换为本镜像：

```
# mkdir -p /etc/xbps.d
# cp /usr/share/xbps.d/*-repository-*.conf /etc/xbps.d/
# sed -i 's|https://alpha.de.repo.voidlinux.org|https://{{ site.hostname }}/voidlinux|g' /etc/xbps.d/*-repository-*.conf
```

之后可用 `xbps-query -L` 检查是否正确替换。

参考[官方教程](https://docs.voidlinux.org/xbps/repositories/mirrors/changing.html)。
