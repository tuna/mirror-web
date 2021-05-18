---
category: help
layout: help
mirrorid: centos-vault
---

## centos-vault 镜像使用帮助

该文件夹提供较早版本的 CentOS，例如 CentOS 6；同时提供当前 CentOS 大版本的历史小版本的归档；
还提供 CentOS 各个版本的源代码和调试符号。

建议先备份 `/etc/yum.repos.d/` 内的文件。

需要确定您所需要的小版本，如无特殊需要则使用该大版本的最后一个小版本，比如 6.10，5.11，我们将其标记为 `$minorver`，需要您在之后的命令中替换。

然后编辑 `/etc/yum.repos.d/` 中的相应文件，在 `mirrorlist=` 开头行前面加 `#` 注释掉；并将 `baseurl=` 开头行取消注释（如果被注释的话），把该行内的域名及路径（例如`mirror.centos.org/centos/$releasever`）替换为 `{{ site.hostname }}/centos-vault/$minorver`。

以上步骤可以被下方的命令完成

```
minorver=6.10
sudo sed -e "s|^mirrorlist=|#mirrorlist=|g" \
         -e "s|^#baseurl=http://mirror.centos.org/centos/\$releasever|baseurl=https://{{ site.hostname }}/centos-vault/$minorver|g" \
         -i.bak \
         /etc/yum.repos.d/CentOS-*.repo
```

注意其中的`*`通配符，如果只需要替换一些文件中的源，请自行增删。

注意，如果需要启用其中一些 repo，需要将其中的 `enabled=0` 改为 `enabled=1`。

最后，更新软件包缓存

```
sudo yum makecache
```
