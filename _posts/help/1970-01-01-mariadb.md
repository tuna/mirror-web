---
category: help
layout: help
mirrorid: mariadb
---

## MariaDB 镜像使用帮助

由于 MariaDB 版本较多，建议在[官方页面](https://downloads.mariadb.org/mariadb/repositories)上生成配置文件内容。

### Debian/Ubuntu 等基于 apt 的系统


新建 `/etc/apt/sources.list.d/MariaDB.list`，填入工具生成的配置内容，并将其中的地址部分，例如：

```
https://apt.mariadb.org/mariadb/repo
```

换为

```
https://{{ site.hostname }}/mariadb/repo
```

### RHEL/CentOS 等基于 yum 的系统

新建 `/etc/yum.repos.d/MariaDB.repo`，填入工具生成的配置内容，并将`baseurl=`后的地址部分，例如：

```
http://yum.mariadb.org
```

换为

```
https://{{ site.hostname }}/mariadb/yum
```
