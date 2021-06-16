---
category: help
layout: help
mirrorid: nodejs-release
---

## Nodejs Release 镜像使用帮助

Nodejs Release 为各平台提供预编译的 nodejs 和 npm 等二进制文件，是
[https://nodejs.org/dist/](https://nodejs.org/dist/) 的镜像。

### 使用方法

可以手工选择下载所需的版本，也可以搭配 `n` 或者 `fnm` 等版本管理器使用，方法如下：

#### n
```
# 设定环境变量

export NODE_MIRROR=https://{{ site.hostname }}/nodejs-release/

# 然后正常使用 n 即可

sudo n stable
```

#### fnm
```
# 设定环境变量

export FNM_NODE_DIST_MIRROR=https://{{ site.hostname }}/nodejs-release/

# 然后正常使用 fnm 即可

fnm install <version>
```