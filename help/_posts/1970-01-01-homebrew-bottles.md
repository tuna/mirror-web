---
category: help
layout: help
mirrorid: homebrew-bottles
---

## Homebrew-bottles 镜像使用帮助

**注：该镜像是 Homebrew 二进制预编译包的镜像。本镜像站同时提供 Homebrew 的 formula 索引的镜像（即 `brew update` 时所更新内容），请参考 [Homebrew 镜像使用帮助](https://{{ site.hostname }}/help/homebrew/)。**

### 临时替换

```bash
export HOMEBREW_BOTTLE_DOMAIN="https://{{ site.hostname }}/homebrew-bottles"
```

### 长期替换

如果你使用 bash：

```bash
echo 'export HOMEBREW_BOTTLE_DOMAIN="https://{{ site.hostname }}/homebrew-bottles"' >> ~/.bash_profile
export HOMEBREW_BOTTLE_DOMAIN="https://{{ site.hostname }}/homebrew-bottles"
```

如果你使用 zsh：

```bash
echo 'export HOMEBREW_BOTTLE_DOMAIN="https://{{ site.hostname }}/homebrew-bottles"' >> ~/.zprofile
export HOMEBREW_BOTTLE_DOMAIN="https://{{ site.hostname }}/homebrew-bottles"
```

**注：Linuxbrew 核心仓库（`linuxbrew-core`）自 2021 年 10 月 25 日（`brew` 版本 3.3.0 起）被弃用，Linuxbrew 用户应迁移至 `homebrew-core`。Linuxbrew 用户请依本镜像说明重新设置镜像。**
