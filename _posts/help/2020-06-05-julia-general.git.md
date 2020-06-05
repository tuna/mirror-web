---
category: help
layout: help
mirrorid: julia-general.git
---

## Julia 默认注册表 General 仓库镜像

该镜像仅为 Julia 默认注册表 [General](https://github.com/JuliaRegistries/General) 仓库的 Git 镜像。
若需要包括 Julia 包以及二进制依赖在内的完整的镜像，请参考 [Julia 镜像使用帮助]({{ site.url }}/help/julia/)。

## 使用方式

Julia 包注册表存放在`$JULIA_DEPOT_PATH/registries`(默认为 `~/.julia/registries`) 文件夹下。以默认情况为例：

1. 若存在的话，删除原有的 `General`: `rm -rf ~/.julia/registries/General`
2. 将该镜像克隆到对应目录下：`git clone https://{{ site.hostname }}/git/julia-general.git ~/.julia/registries/General`

对于 Julia `v1.1` 及以后版本，可以通过 Julia 内置的注册表管理功能来做到：

1. `(@v1.4) pkg> registry rm General`
2. `(@v1.4) pkg> registry add https://{{ site.hostname }}/git/julia-general.git`
