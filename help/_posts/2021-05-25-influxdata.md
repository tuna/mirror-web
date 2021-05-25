---
category: help
layout: help
mirrorid: influxdata
---

## Influxdata 镜像帮助

本目录是 `influxdb` ， `telegraf` 等时序型数据库的相关组件的镜像软件源。

### Debian / Ubuntu 用户

首先信任来自 [influxdata](https://docs.influxdata.com/telegraf/v1.18/introduction/installation/) 的PGP公钥：

```shell
curl -s https://repos.influxdata.com/influxdb.key | sudo apt-key add -
```

将下方文本框中的内容写入 `/etc/apt/sources.list.d/influxdb.list`

<form class="form-inline">
<div class="form-group">
	<label>你的 Debian / Ubuntu 版本: </label>
	<select class="form-control release-select" data-template="#apt-template" data-target="#apt-content">
		<option data-os="debian" data-release="jessie">Debian 8 (Jessie)</option>
		<option data-os="debian" data-release="stretch">Debian 9 (Stretch)</option>
		<option data-os="debian" data-release="buster">Debian 10 (Buster)</option>
		<option data-os="ubuntu" data-release="trusty">Ubuntu 14.04 LTS</option>
		<option data-os="ubuntu" data-release="xenial">Ubuntu 16.04 LTS</option>
		<option data-os="ubuntu" data-release="bionic">Ubuntu 18.04 LTS</option>		
		<option data-os="ubuntu" data-release="focal" selected>Ubuntu 20.04 LTS</option>
</select>
</div>
</form>

<p></p>
<pre>
<code id="apt-content">
</code>
</pre>


{% raw %}
<script id="apt-template" type="x-tmpl-markup">
deb https://{%endraw%}{{ site.hostname }}{%raw%}/influxdata/{{os_name}}/ {{release_name}} stable
</script>
{%endraw%}

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
		<option data-release="el6-x86_64">6</option>
		<option data-release="el7-x86_64">7</option>
		<option data-release="el8-x86_64">8 / Stream</option>
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
gpgkey = https://{%endraw%}{{ site.hostname }}{%raw%}/influxdata/influxdb.key
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
