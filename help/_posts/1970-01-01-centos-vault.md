---
category: help
layout: help
mirrorid: centos-vault
---

## centos-vault 镜像使用帮助

该文件夹提供较早版本的 CentOS，例如 CentOS 6；同时提供当前 CentOS 大版本的历史小版本的归档；
还提供 CentOS 各个版本的源代码和调试符号。

建议先备份 `/etc/yum.repos.d/` 内的文件。

然后编辑 `/etc/yum.repos.d/` 中的相应文件，在 `mirrorlist=` 开头行前面加 `#` 注释掉；并将 `baseurl=` 开头行取消注释（如果被注释的话），把该行内的域名及路径（例如`mirror.centos.org/centos`）替换为 `{{ site.hostname }}/centos-vault`。

以上步骤可以被下方的命令一步完成

```
sudo sed -e 's|^mirrorlist=|#mirrorlist=|g' \
         -e 's|^#baseurl=http://mirror.centos.org/centos/|baseurl=https://{{ site.hostname }}/centos-vault/|g' \
         -i.bak \
         /etc/yum.repos.d/CentOS-*.repo
```

注意其中的`*`通配符，如果只需要替换一些文件中的源，请自行增删。

注意，如果需要启用其中一些 repo，需要将其中的 `enabled=0` 改为 `enabled=1`。

最后，更新软件包缓存

```
sudo yum makecache
```
