---
category: help
layout: help
mirrorid: homebrew-bottles
---

## Homebrew-bottles 镜像使用帮助

**注:该镜像是 Homebrew 二进制预编译包的镜像。本镜像站同时提供 Homebrew 的 formula 索引的镜像（即 `brew update` 时所更新内容），请参考 [Homebrew 镜像使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)。**

### 临时替换
```bash
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles
```

### 长期替换
```bash
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles' >> ~/.bash_profile
source ~/.bash_profile
```
