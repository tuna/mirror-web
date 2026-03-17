本目录是 `influxdb` ， `telegraf` 等时序型数据库的相关组件的镜像软件源。

### Debian / Ubuntu 用户

首先信任来自 [influxdata](https://docs.influxdata.com/telegraf/v1.18/introduction/installation/) 的 PGP 公钥：

_注：Influxdata 在 2023-01-26 使用了新的 GPG 密钥，详情可参考[此处](https://www.influxdata.com/blog/linux-package-signing-key-rotation/)_

<tmpl z-lang="bash">
wget -q https://repos.influxdata.com/influxdata-archive_compat.key
cat influxdata-archive_compat.key | gpg --dearmor | {{sudo}}tee /etc/apt/trusted.gpg.d/influxdata-archive_compat.gpg > /dev/null
</tmpl>

将下方文本框中的内容写入 `/etc/apt/sources.list.d/influxdata.list`

<tmpl z-path="/etc/apt/sources.list.d/influxdata.list">
deb {{endpoint}}/debian/ stable main
</tmpl>


即可安装相关软件，如：

<tmpl z-lang="bash">
{{sudo}}apt install influxdb
</tmpl>

### CentOS / RedHat 用户

新建 `/etc/yum.repos.d/influxdata.repo`，内容为

<tmpl z-lang="ini" z-input="release" z-path="/etc/yum.repos.d/influxdata.repo">
[influxdata]
name = InfluxData Repository - RHEL $releasever
baseurl={{endpoint}}/yum/{{release}}
enabled=1
gpgcheck=1
gpgkey=https://repos.influxdata.com/influxdata-archive_compat.key
</tmpl>

再执行

<tmpl z-lang="bash">
{{sudo}}yum makecache
</tmpl>

即可安装相关软件，如：

<tmpl z-lang="bash">
{{sudo}}yum install influxdb
</tmpl>
