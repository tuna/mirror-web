---
category: help
layout: help
mirrorid: homebrew-bottles
---

## Homebrew-bottles 镜像使用帮助

**注:该镜像是 Homebrew 二进制预编译包的镜像。本镜像站同时提供 Homebrew 的 formula 索引的镜像（即 `brew update` 时所更新内容），请参考 [Homebrew 镜像使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/homebrew/)。**
> 若要更新已安装程序，应使用`brew upgrade`

### 临时替换
```bash
export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles
```

### 长期替换
> macOS下的 bash 不会在运行`.bash_profile`的场合运行`.bashrc`，故初次遇见这类长期替换时，需
> ```bash
> echo 'if [ -f ~/.bashrc ]; then
>   source ~/.bashrc
> fi' >> ~/.bash_profile
> ```
> 以确保后者跟着前者一起运行

```bash
echo 'export HOMEBREW_BOTTLE_DOMAIN=https://mirrors.tuna.tsinghua.edu.cn/homebrew-bottles' >> ~/.bashrc
source ~/.bashrc
```
