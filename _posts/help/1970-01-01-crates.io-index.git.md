---
category: help
layout: help
mirrorid: crates.io-index.git
---

## Rust crates.io 索引镜像使用帮助

编辑 `~/.cargo/config` 文件，添加以下内容：

```
[source.crates-io]
replace-with = 'tuna'

[source.tuna]
registry = "https://{{ site.hostname }}/git/crates.io-index.git"
```

该镜像可加快 cargo 读取软件包索引的速度。
