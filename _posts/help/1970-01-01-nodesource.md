---
category: help
layout: help
mirrorid: nodesource
---

## Nodesource 镜像使用帮助

Nodesource 为 debian, ubuntu, fedora, RHEL 等发行版提供预编译的 nodejs
和 npm 等软件包。

### debian/ubuntu 使用方法

运行

```
curl -sL https://deb.nodesource.com/setup | sudo bash -
```

编辑 `/etc/apt/sources.list.d/nodesource.list`，把
`https://deb.nodesource.com/node/` 替换为
`https://mirrors.tuna.tsinghua.edu.cn/nodesource/deb/` 即可。
