---
category: help
layout: help
mirrorid: erlang-solutions
---

## erlang-solutions 镜像使用指南

### Debian/Ubuntu 用户

首先信任 erlang-solutions 的 GPG 公钥:

```
# Debian 用户
curl -s https://packages.erlang-solutions.com/debian/erlang_solutions.asc | sudo apt-key add -
# Ubuntu 用户
curl -s https://packages.erlang-solutions.com/ubuntu/erlang_solutions.asc | sudo apt-key add -
```

再选择你的 Debian / Ubuntu 版本，文本框中内容写进 `/etc/apt/sources.list.d/erlang-solutions.list`

<form class="form-inline">
<div class="form-group">
	<label>你的 Debian/Ubuntu 版本: </label>
	<select class="form-control release-select" data-template="#apt-template" data-target="#apt-content">
	  <option data-os="debian" data-release="jessie">Debian 8 (Jessie)</option>
	  <option data-os="debian" data-release="stretch">Debian 9 (Stretch)</option>
	  <option data-os="debian" data-release="buster">Debian 10 (Buster)</option>
	  <option data-os="ubuntu" data-release="xenial">Ubuntu 16.04 LTS</option>
	  <option data-os="ubuntu" data-release="bionic">Ubuntu 18.04 LTS</option>
	  <option selected data-os="ubuntu" data-release="focal">Ubuntu 20.04 LTS</option>
	</select>
</div>
</form>

<p></p>
<pre>
<code id="apt-content">
</code>
</pre>

<script id="apt-template" type="x-tmpl-markup">
deb https://{{ site.hostname }}/erlang-solutions/{%raw%}{{os_name}} {{release_name}}{%endraw%} contrib
</script>

安装 `erlang` 即可

```
sudo apt-get update
sudo apt-get install -y erlang
```

### CentOS 用户

首先信任 erlang-solutions 的 GPG 公钥:

```
rpm --import https://packages.erlang-solutions.com/rpm/erlang_solutions.asc
```

新建 `/etc/yum.repos.d/erlang-solutions.repo`，内容为

```
[erlang-solutions]
name=CentOS $releasever - Erlang Solutions
baseurl=https://{{ site.hostname }}/erlang-solutions/centos/$releasever/
gpgcheck=1
gpgkey=https://packages.erlang-solutions.com/rpm/erlang_solutions.asc
enabled=1
```

刷新缓存并安装 `erlang` 即可。

```
sudo yum makecache
sudo yum install erlang
```
