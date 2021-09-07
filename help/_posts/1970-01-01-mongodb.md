---
category: help
layout: help
mirrorid: mongodb
---

## MongoDB 镜像使用帮助

MongoDB 镜像自 MongoDB [官方仓库](https://repo.mongodb.org/)， 目前有 RHEL/CentOS, Ubuntu, Debian 的镜像，支持 amd64, i386, arm64 架构。

更详细的内容，可以参考 [官方文档](https://docs.mongodb.org/master/administration/install-on-linux/)

### Debian/Ubuntu 用户

首先信任 MongoDB 的 GPG 公钥: 

```
wget -qO - https://www.mongodb.org/static/pgp/server-5.0.asc | sudo apt-key add -
```

再选择你的 Debian / Ubuntu 版本，文本框中内容写进 `/etc/apt/sources.list.d/mongodb.list`

<form class="form-inline">
<div class="form-group">
	<label>你的 Debian/Ubuntu 版本: </label>
	<select class="form-control release-select" data-template="#apt-template" data-target="#apt-content">
	  <option data-os="debian" data-release="jessie" data-opt='{"repo-name": "main"}'>Debian 8 (Jessie)</option>
	  <option data-os="debian" data-release="stretch" data-opt='{"repo-name": "main"}'>Debian 9 (Stretch)</option>
	  <option data-os="debian" data-release="buster" data-opt='{"repo-name": "main"}'>Debian 10 (Buster)</option>
	  <option data-os="debian" data-release="bullseye" data-opt='{"repo-name": "main"}'>Debian 11 (Bullseye)</option>
	  <option data-os="ubuntu" data-release="xenial" data-opt='{"repo-name": "multiverse"}'>Ubuntu 16.04 LTS</option>
	  <option data-os="ubuntu" data-release="bionic" data-opt='{"repo-name": "multiverse"}'>Ubuntu 18.04 LTS</option>
	  <option selected data-os="ubuntu" data-release="focal" data-opt='{"repo-name": "multiverse"}'>Ubuntu 20.04 LTS</option>
	</select>
</div>
</form>

<p></p>
<pre>
<code id="apt-content">
</code>
</pre>

<script id="apt-template" type="x-tmpl-markup">
deb https://{{ site.hostname }}/mongodb/apt/{%raw%}{{os_name}} {{release_name}}{%endraw%}/mongodb-org/5.0 {%raw%}{{repo-name}}{%endraw%}
</script>

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
