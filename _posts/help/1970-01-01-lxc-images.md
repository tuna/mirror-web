---
category: help
layout: help
mirrorid: lxc-images
---

## LXC Images 镜像帮助

LXC 1.0 以上版本增加了 `download` 模版，支持下载定义好的系统镜像。

欲使用 TUNA 镜像进行下载加速，可以在 `lxc-create -t download` 的选项部分，
增加 `--server {{ site.hostname }}/lxc-images` 即可，例如:

```
# lxc-create -t download -n my-container -- --server {{ site.hostname }}/lxc-images
```

**LXD/LXC 2.0使用镜像加速的方法**:

创建一个remote链接，指向镜像站即可，或替换掉默认的images链接。

```
# lxc remote add tuna-images https://{{ site.hostname }}/lxc-images/ --protocol=simplestreams --public
# lxc image list tuna-images:
```
