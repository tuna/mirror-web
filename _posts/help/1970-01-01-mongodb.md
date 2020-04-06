---
category: help
layout: help
mirrorid: mongodb
---

## MongoDB 镜像使用帮助

MongoDB 镜像自 mongodb [官方仓库](https://repo.mongodb.org/)， 目前有 RHEL/CentOS, Ubuntu, Debian 的镜像，仅支持 x86-64 架构。
更详细内容，可以参考 [官方文档](https://docs.mongodb.org/master/administration/install-on-linux/)

### Debian/Ubuntu 用户

首先信任 MongoDB 的 GPG 公钥: 

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
```

再选择你的 Debian/Ubuntu 版本，文本框中内容写进 `/etc/apt/sources.list.d/mongodb.list`

<form class="form-inline">
<div class="form-group">
	<label>你的Debian/Ubuntu版本: </label>
	<select class="form-control release-select" data-template="#apt-template" data-target="#apt-content">
	  <option data-os="debian" data-release="jessie" data-opt='{"repo-name": "main"}'>Debian 8 (Jessie)</option>
	  <option data-os="debian" data-release="stretch" data-opt='{"repo-name": "main"}'>Debian 9 (Stretch)</option>
	  <option data-os="debian" data-release="buster" data-opt='{"repo-name": "main"}'>Debian 10 (Buster)</option>
	  <option data-os="ubuntu" data-release="trusty" data-opt='{"repo-name": "multiverse"}' >Ubuntu 14.04 LTS</option>
	  <option data-os="ubuntu" data-release="xenial" data-opt='{"repo-name": "multiverse"}'>Ubuntu 16.04 LTS</option>
	  <option selected data-os="ubuntu" data-release="bionic" data-opt='{"repo-name": "multiverse"}'>Ubuntu 18.04 LTS</option>
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
deb {{if os_name|equals>ubuntu}}https{{else}}http{{/if}}://{%endraw%}{{ site.hostname }}{%raw%}/mongodb/apt/{{os_name}} {{release_name}}/mongodb-org/stable {{repo-name}}
</script>
{%endraw%}

安装 `mongodb-org` 即可

```
sudo apt-get update
sudo apt-get install -y mongodb-org
```

### RHEL/CentOS 用户


新建 `/etc/yum.repos.d/mongodb.repo`，内容为

```
[mongodb-org]
name=MongoDB Repository
baseurl=https://{{ site.hostname }}/mongodb/yum/el$releasever/
gpgcheck=0
enabled=1
```

刷新缓存并安装 `mongodb-org` 即可。

```
sudo yum makecache
sudo yum install mongodb-org
```
