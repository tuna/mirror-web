---
category: help
layout: help
mirrorid: chef
---

## Chef APT/YUM 镜像使用帮助

Chef 是一套自动化运维工具。

### Debian/Ubuntu 用户

再选择你的 Debian/Ubuntu 版本，文本框中内容写进 `/etc/apt/sources.list.d/chef.list`

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
deb https://{%endraw%}{{ site.hostname }}{%raw%}/chef/apt/stable {{release_name}} main
</script>
{%endraw%}


### RHEL/CentOS 用户

新建 `/etc/yum.repos.d/chef.repo`，内容为：

```
[chef-stable]
name=chef-stable
baseurl=https://{{ site.hostname }}/chef/yum/stable/stable-el$releasever-x86_64/
enabled=1
gpgcheck=1
gpgkey=https://packages.chef.io/chef.asc
```
