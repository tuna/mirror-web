---
category: help
layout: help
mirrorid: packagist
---

## PHP 包仓库 Packagist 索引镜像使用帮助

执行以下命令即可将 Composer 默认仓库设置为本站：

```
composer config -g repos.packagist composer https://{{ site.hostname }}/packagist/index
```

该镜像只包含包索引，不含包的内容，主要目的是加快 composer 读取软件包索引的速度。
