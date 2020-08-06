---
category: help
layout: help
mirrorid: julia-releases
---

## Julia 二进制安装程序

Julia 是一个全新的以科学计算为核心的通用编程语言，其二进制程序可以到 <{{ site.url }}/julia-releases/bin/> 下载。

这里仅镜像 [JuliaLang Downloads](https://julialang.org/downloads/) 中提供的稳定发行版以及 rc 版本。每日构建的测试版 (nightlies) 以及 
[Juno](http://junolab.org/)/[Julia Pro](https://juliacomputing.com/products/juliapro)等 IDE 版本不包括在内。

尽管一些包管理工具（例如 `apt`, `pacman`, `conda`, `choco`) 中提供有 Julia，但是这些工具或多或少都存在一些由二进制
依赖导致的问题，因此官方推荐的方式是根据自己的使用平台下载相应的二进制程序，然后通过解压的方式进行手动安装。

## Julia 一键安装

对于习惯命令行的用户而言，[jill.py](https://github.com/johnnychen94/jill.py) 是一个社区维护的全平台下一键安装
Julia 的命令行工具。

安装/更新 `jill`： `pip install jill --user -U` (需要 Python `3.6` 或更新的版本)

* 安装 Julia：`jill install [VERSION] [--upstream UPSTREAM] [--confirm]`
  * `jill install`：最新的 `x.y.z` 版本
  * `jill install --confirm`：无需交互确认直接安装
  * `jill install --upstream BFSU`：从北外镜像下载并安装
  * `jill install 1.4`：安装最新的 `1.4.z` 版本
* 查询现存的上游镜像：`jill upstream`
* 帮助文档：`jill [COMMAND] --help`
  * `jill --help`：查询存在的 `jill` 命令
  * `jill install --help`：查询 `install` 命令的使用方式

利用 `jill` 安装完成后即可通过在命令行执行 `julia`/`julia-1`/`julia-1.4` 来启动不同版本的 Julia.
