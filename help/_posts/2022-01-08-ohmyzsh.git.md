---
category: help
layout: help
mirrorid: ohmyzsh.git
---

## ohmyzsh Git 镜像使用帮助

### 安装

在本地克隆后获取安装脚本。

```
git clone https://{{ site.hostname }}/git/ohmyzsh.git
cd ohmyzsh/tools
REMOTE=https://{{ site.hostname }}/git/ohmyzsh.git sh install.sh
```

### 切换已有 ohmyzsh 至镜像源

```
git -C $ZSH remote set-url origin https://{{ site.hostname }}/git/ohmyzsh.git
git -C $ZSH pull
```
