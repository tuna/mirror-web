---
layout: help
category: help
mirrorid: anaconda
---

## Anaconda 镜像使用帮助

Anaconda 是一个用于科学计算的 Python 发行版，支持 Linux, Mac, Windows, 包含了众多流行的科学计算、数据分析的 Python 包。

Anaconda 安装包可以到 <{{ site.url }}/anaconda/archive/> 下载。

TUNA 还提供了 Anaconda 仓库与第三方源（conda-forge、msys2、pytorch等，[查看完整列表]({{ site.url }}/anaconda/cloud/)）的镜像，各系统都可以通过修改用户目录下的 `.condarc` 文件。Windows 用户无法直接创建名为 `.condarc` 的文件，可先执行 `conda config --set show_channel_urls yes` 生成该文件之后再修改。

注：由于更新过快难以同步，我们不同步`pytorch-nightly`, `pytorch-nightly-cpu`, `ignite-nightly`这三个包。

```
channels:
  - defaults
show_channel_urls: true
channel_alias: {{ site.url }}/anaconda
default_channels:
  - {{ site.url }}/anaconda/pkgs/main
  - {{ site.url }}/anaconda/pkgs/free
  - {{ site.url }}/anaconda/pkgs/r
  - {{ site.url }}/anaconda/pkgs/pro
  - {{ site.url }}/anaconda/pkgs/msys2
custom_channels:
  conda-forge: {{ site.url }}/anaconda/cloud
  msys2: {{ site.url }}/anaconda/cloud
  bioconda: {{ site.url }}/anaconda/cloud
  menpo: {{ site.url }}/anaconda/cloud
  pytorch: {{ site.url }}/anaconda/cloud
  simpleitk: {{ site.url }}/anaconda/cloud
```

即可添加 Anaconda Python 免费仓库。

运行 `conda clean -i` 清除索引缓存，保证用的是镜像站提供的索引。

运行 `conda create -n myenv numpy` 测试一下吧。

## Miniconda 镜像使用帮助

Miniconda 是一个 Anaconda 的轻量级替代，默认只包含了 python 和 conda，但是可以通过 pip 和 conda 来安装所需要的包。

Miniconda 安装包可以到 <{{ site.url }}/anaconda/miniconda/> 下载。

### 其他三方源

对于conda的其他三方源，如有需要请修改[anaconda.py](https://github.com/tuna/tunasync-scripts/blob/master/anaconda.py)文件，并提交pull request，我们会综合考虑多方因素来酌情增减。
