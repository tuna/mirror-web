---
category: help
layout: help
mirrorid: rudder
---

## Rudder APT/YUM 镜像使用帮助


### Debian/Ubuntu 用户


再选择你的 Debian/Ubuntu 版本，文本框中内容写进 `/etc/apt/sources.list.d/rudder.list`

<form class="form-inline">
<div class="form-group">
	<label>你的Debian/Ubuntu版本: </label>
	<select class="form-control release-select" data-template="#apt-template" data-target="#apt-content">
		<option data-os="debian" data-release="jessie">Debian 8 (Jessie)</option>
		<option data-os="debian" data-release="stretch">Debian 9 (Stretch)</option>
		<option data-os="debian" data-release="buster" selected>Debian 10 (Buster)</option>
		<option data-os="ubuntu" data-release="trusty">Ubuntu 14.04 LTS</option>
		<option data-os="ubuntu" data-release="xenial">Ubuntu 16.04 LTS</option>
		<option data-os="ubuntu" data-release="bionic">Ubuntu 18.04 LTS</option>		
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
deb https://{%endraw%}{{ site.hostname }}{%raw%}/rudder/apt/6.0 {{release_name}} main
</script>
{%endraw%}


### RHEL/CentOS 用户

新建 `/etc/yum.repos.d/rudder.repo`，内容为：

```
[Rudder_6.0]
name=Rudder 6.0
baseurl=https://{{ site.hostname }}/rudder/rpm/rudder6.0-RHEL_$releasever/
enabled=1
gpgcheck=1
gpgkey=https://repository.rudder.io/rpm/rudder_rpm_key.pub
```
