---
category: help
layout: help
mirrorid: elrepo
---

## ELRepo 镜像使用帮助

首先按照[官网的安装说明](https://elrepo.org/tiki/tiki-index.php)，配置 ELRepo：

```bash
> rpm --import https://www.elrepo.org/RPM-GPG-KEY-elrepo.org
```

接着，按照你的系统版本，如果是 RHEL-8 或者 CentOS-8 则运行：

```bash
> yum install https://www.elrepo.org/elrepo-release-8.el8.elrepo.noarch.rpm
```

RHEL-7, SL-7 或者 CentOS-7：

```bash
> yum install https://www.elrepo.org/elrepo-release-7.el7.elrepo.noarch.rpm
```

RHEL-6, SL-6 或者 CentOS-6：

```bash
> yum install https://www.elrepo.org/elrepo-release-6.el6.elrepo.noarch.rpm
```

建议先备份 `/etc/yum.repos.d/elrepo.repo` ：

```
sudo cp /etc/yum.repos.d/elrepo.repo /etc/yum.repos.d/elrepo.repo.bak
```

然后编辑 /etc/yum.repos.d/elrepo.repo 文件，在 `mirrorlist=` 开头的行前面加 `#` 注释掉；并将 `elrepo.org/linux` 替换为 `{{ site.hostname }}/elrepo`。

最后，更新软件包缓存

```
sudo yum makecache
```
