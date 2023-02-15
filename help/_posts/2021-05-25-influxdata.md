---
category: help
layout: help
mirrorid: influxdata
---

## Influxdata 镜像帮助

本目录是 `influxdb` ， `telegraf` 等时序型数据库的相关组件的镜像软件源。

### Debian / Ubuntu 用户

首先信任来自 [influxdata](https://docs.influxdata.com/telegraf/v1.18/introduction/installation/) 的PGP公钥：

_注：Influxdata 在 2023-01-26 使用了新的 GPG 密钥，详情可参考[此处](https://www.influxdata.com/blog/linux-package-signing-key-rotation/)_

```shell
wget -q https://repos.influxdata.com/influxdata-archive_compat.key
cat influxdata-archive_compat.key | gpg --dearmor | sudo tee /etc/apt/trusted.gpg.d/influxdata-archive_compat.gpg > /dev/null
```

将下方文本框中的内容写入 `/etc/apt/sources.list.d/influxdata.list`

```
deb [signed-by=/etc/apt/trusted.gpg.d/influxdata-archive_compat.gpg] https://{{ site.hostname }}/influxdata/debian stable main
```

即可安装相关软件，如：

```shell
sudo apt install influxdb
```

### Centos / Redhat 用户

新建 `/etc/yum.repos.d/influxdb.repo`，内容为

<form class="form-inline">
<div class="form-group">
	<label>你的 CentOS / RHEL 版本: </label>
	<select class="form-control release-select" data-template="#yum-template" data-target="#yum-content">
		<option data-release="el7-x86_64">7</option>
	</select>
</div>
</form>

<p></p>
<pre>
<code id="yum-content">
</code>
</pre>


{% raw %}
<script id="yum-template" type="x-tmpl-markup">
[influxdb]
name = InfluxDB Repository - RHEL $releasever
baseurl=https://{%endraw%}{{ site.hostname }}{%raw%}/influxdata/yum/{{release_name}}
enabled=1
gpgcheck=1
gpgkey = https://repos.influxdata.com/influxdata-archive_compat.key
</script>
{% endraw %}

再执行

```shell
sudo yum makecache
```

即可安装相关软件，如：

```shell
sudo yum install influxdb
```
