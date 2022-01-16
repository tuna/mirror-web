---
category: help
layout: help
mirrorid: postmarketOS
---

## postmarketOS 镜像使用帮助

### pmbootstrap

需要在每个 `pmbootstrap` 命令中都指定镜像

```console
pmbootstrap --mirror-pmOS=http://{{ site.hostname }}/postmarketOS/ --mirror-alpine=http://{{ site.hostname }}/alpine/ init
pmbootstrap --mirror-pmOS=http://{{ site.hostname }}/postmarketOS/ --mirror-alpine=http://{{ site.hostname }}/alpine/ install
```

### 安装后的 postmarketOS

将 `/etc/apk/repositories` 替换为以下的内容

```
http://{{ site.hostname }}/postmarketOS/master
http://{{ site.hostname }}/alpine/edge/main
http://{{ site.hostname }}/alpine/edge/community
```

可以按照需要使用不同的 channel，例如 `postmarketOS/v21.12`，`alpine/v3.15/main`
