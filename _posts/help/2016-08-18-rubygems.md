---
category: help
layout: help
mirrorid: rubygems
---

# Ruby Gems 镜像使用帮助

## `gem`

使用以下命令替换 gems 默认源

```bash
# 添加 TUNA 源并移除默认源
gem sources --add https://{{ site.hostname }}/rubygems/ --remove https://rubygems.org/
# 列出已有源
gem sources -l
# 应该只有 TUNA 一个
```

或者，编辑 `~/.gemrc`，将 `https://{{ site.hostname }}/rubygems/` 加到 `sources` 字段。

## `bundler`

使用以下命令替换 bundler 默认源
```bash
bundle config mirror.https://rubygems.org https://{{ site.hostname }}/rubygems
```

官方文档： http://bundler.io/v1.16/man/bundle-config.1.html#MIRRORS-OF-GEM-SOURCES
