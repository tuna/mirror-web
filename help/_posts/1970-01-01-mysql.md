---
category: help
layout: help
mirrorid: mysql
---

## Mysql Community Edition 镜像使用帮助


### Debian/Ubuntu 用户


再选择你的 Debian/Ubuntu 版本，文本框中内容写进 `/etc/apt/sources.list.d/mysql-community.list`

<form class="form-inline">
<div class="form-group">
	<label>你的Debian/Ubuntu版本: </label>
	<select class="form-control release-select" data-template="#apt-template" data-target="#apt-content">
		<option data-os="debian" data-release="jessie">Debian 8 (Jessie)</option>
		<option data-os="debian" data-release="stretch">Debian 9 (Stretch)</option>
		<option data-os="debian" data-release="buster" selected>Debian 10 (Buster)</option>
		<option data-os="debian" data-release="bullseye">Debian 11 (Bullseye)</option>
		<option data-os="ubuntu" data-release="trusty">Ubuntu 14.04 LTS</option>
		<option data-os="ubuntu" data-release="xenial">Ubuntu 16.04 LTS</option>
		<option data-os="ubuntu" data-release="bionic">Ubuntu 18.04 LTS</option>
		<option data-os="ubuntu" data-release="focal">Ubuntu 20.04 LTS</option>
</select>
</div>
</form>

<p></p>
<pre>
<code id="apt-content">
</code>
</pre>

参考文档：[https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/](https://dev.mysql.com/doc/mysql-apt-repo-quick-guide/en/)

{% raw %}
<script id="apt-template" type="x-tmpl-markup">
deb https://{%endraw%}{{ site.hostname }}{%raw%}/mysql/apt/{{os_name}} {{release_name}} mysql-5.6 mysql-5.7 mysql-8.0 mysql-tools
</script>
{%endraw%}


### RHEL/CentOS 用户

新建 `/etc/yum.repos.d/mysql-community.repo`，内容如下：

注：`mysql-8.0`, `mysql-connectors`和`mysql-tools`在RHEL 7/8上还提供了`aarch64`版本。

<form class="form-inline">
<div class="form-group">
	<label>你的CentOS/RHEL版本: </label>
	<select class="form-control release-select" data-template="#yum-template" data-target="#yum-content">
		<option data-release="el6">CentOS/RHEL 6</option>
		<option data-release="el7" selected>CentOS/RHEL 7</option>
		<option data-release="el8">CentOS/RHEL 8</option>
	</select>
</div>
</form>

<p></p>
<pre>
<code id="yum-content">
</code>
</pre>

参考文档：[https://dev.mysql.com/doc/mysql-yum-repo-quick-guide/en/](https://dev.mysql.com/doc/mysql-yum-repo-quick-guide/en/)

{% raw %}
<script id="yum-template" type="x-tmpl-markup">
[mysql-connectors-community]
name=MySQL Connectors Community
baseurl=https://{%endraw%}{{ site.hostname }}{%raw%}/mysql/yum/mysql-connectors-community-{{release_name}}-$basearch/
enabled=1
gpgcheck=1
gpgkey=https://repo.mysql.com/RPM-GPG-KEY-mysql

[mysql-tools-community]
name=MySQL Tools Community
baseurl=https://{%endraw%}{{ site.hostname }}{%raw%}/mysql/yum/mysql-tools-community-{{release_name}}-$basearch/
enabled=1
gpgcheck=1
gpgkey=https://repo.mysql.com/RPM-GPG-KEY-mysql
{{if release_name|notequals>el8}}
[mysql-5.6-community]
name=MySQL 5.6 Community Server
baseurl=https://{%endraw%}{{ site.hostname }}{%raw%}/mysql/yum/mysql-5.6-community-{{release_name}}-$basearch/
enabled=0
gpgcheck=1
gpgkey=https://repo.mysql.com/RPM-GPG-KEY-mysql

[mysql-5.7-community]
name=MySQL 5.7 Community Server
baseurl=https://{%endraw%}{{ site.hostname }}{%raw%}/mysql/yum/mysql-5.7-community-{{release_name}}-$basearch/
enabled=1
gpgcheck=1
gpgkey=https://repo.mysql.com/RPM-GPG-KEY-mysql
{{/if}}
[mysql-8.0-community]
name=MySQL 8.0 Community Server
baseurl=https://{%endraw%}{{ site.hostname }}{%raw%}/mysql/yum/mysql-8.0-community-{{release_name}}-$basearch/
enabled=1
gpgcheck=1
gpgkey=https://repo.mysql.com/RPM-GPG-KEY-mysql
</script>
{% endraw %}
