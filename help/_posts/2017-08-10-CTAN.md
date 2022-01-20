---
category: help
layout: help
mirrorid: CTAN
---

CTAN 镜像使用帮助
=================

CTAN (The Comprehensive TeX Archive Network) 是所有 TeX 排版系统相关材料的汇集地，收录了编译引擎、宏包及字体等的源代码与说明文档。目前，绝大多数 LaTeX 宏包会被上传至 CTAN 核心站点，随后同步到遍布全球的各个镜像。

- CTAN 主页：<https://www.ctan.org/>
- TUNA 镜像：<https://{{ site.hostname }}/CTAN/>

本文提供了 TeX Live 和 MiKTeX 两大主要发行版的镜像配置方法。

### TeX Live

TeX Live 是目前使用最为广泛的 TeX 发行版，支持 Windows、Linux 和 macOS。其中，在 macOS 上发行的版本称为 MacTeX。

#### 安装

TeX Live 发行版的常见安装方法可以参考[此文档](https://{{ site.hostname }}/CTAN/info/install-latex-guide-zh-cn/install-latex-guide-zh-cn.pdf)。

除每年更新的完整版 ISO 镜像以外，CTAN 镜像中也包含在线安装器。这种方法可以使安装的所有宏包均为最新版本，但受网络连接状况影响较大。操作方法为（*很可能需要管理员权限*）：

1. 下载 [`install-tl.zip`](https://{{ site.hostname }}/CTAN/systems/texlive/tlnet/install-tl.zip) 并解压缩
1. Windows 下双击运行其中的 `install-tl.bat`。如果有图形化界面，可以在进入安装器前的右下角按钮指定使用镜像源。

    Linux 下使用如下命令：

    ```
    perl install-tl --repository https://{{ site.hostname }}/CTAN/systems/texlive/tlnet
    ```

#### 切换镜像

TeX Live 使用的 CTAN 镜像源可以从内置的包管理器 `tlmgr` 更改（*很可能需要管理员权限*）。

在命令行中执行

```
tlmgr option repository https://{{ site.hostname }}/CTAN/systems/texlive/tlnet
```

即可永久更改镜像源。

如果只需要临时切换，可以用如下命令：

```
tlmgr update --all --repository https://{{ site.hostname }}/CTAN/systems/texlive/tlnet
```

其中的 `update --all` 指令可根据需要修改。

### MiKTeX

MiKTeX 发行版的特点在于仅安装用户需要的宏包，节省了磁盘空间占用，但在部分实现细节上与 TeX Live 有所出入。该发行版支持 Windows、Linux 和 macOS。

#### 安装

MiKTeX 仅提供 Windows 和 macOS 的独立安装包，前往 TeX 排版系统下载页即可。在 Linux 下的安装请参考[官方文档](https://miktex.org/howto/install-miktex-unx)。

#### 切换镜像

MiKTeX 使用的 CTAN 镜像源可以从内置的 MiKTeX Console 图形化应用程序进行切换，也可以使用如下命令：

```
mpm --set-repository=https://{{ site.hostname }}/CTAN/systems/win32/miktex/tm/packages/
```
