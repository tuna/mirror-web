---
category: help
layout: help
mirrorid: centos
---

## CentOS 镜像使用帮助

**请注意，CentOS 8 （非 Stream 版）已提前进入 EOL 停止服务阶段，因此镜像已被官方移动。如果您正在寻找关于这些系统的镜像，请参考 centos-vault 的帮助。**

该文件夹只提供 CentOS 7 与 8，架构仅为 `x86_64` ，如果需要较早版本的 CentOS，请参考 centos-vault 的帮助，若需要其他架构，请参考 centos-altarch 的帮助。

建议先备份 `/etc/yum.repos.d/` 内的文件。

然后编辑 `/etc/yum.repos.d/` 中的相应文件，在 `mirrorlist=` 开头行前面加 `#` 注释掉；并将 `baseurl=` 开头行取消注释（如果被注释的话）。
对于 CentOS 7 ，请把该行内的域名（例如`mirror.centos.org`）替换为 `{{ site.hostname }}`。
对于 CentOS 8 ，请把 `mirror.centos.org/$contentdir` 替换为 `{{ site.hostname }}/centos`。

以上步骤可以被下方的命令一步完成

```
# 对于 CentOS 7
sudo sed -e 's|^mirrorlist=|#mirrorlist=|g' \
         -e 's|^#baseurl=http://mirror.centos.org|baseurl=https://{{ site.hostname }}|g' \
         -i.bak \
         /etc/yum.repos.d/CentOS-*.repo

# 对于 CentOS 8
sudo sed -e 's|^mirrorlist=|#mirrorlist=|g' \
         -e 's|^#baseurl=http://mirror.centos.org/$contentdir|baseurl=https://{{ site.hostname }}/centos|g' \
         -i.bak \
         /etc/yum.repos.d/CentOS-*.repo
```

注意其中的`*`通配符，如果只需要替换一些文件中的源，请自行增删。

注意，如果需要启用其中一些 repo，需要将其中的 `enabled=0` 改为 `enabled=1`。

最后，更新软件包缓存

```
sudo yum makecache
```
