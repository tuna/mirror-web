---
category: help
layout: help
mirrorid: AdoptOpenJDK
---

## AdoptOpenJDK 镜像使用帮助

### Windows/macOS 用户

打开[下载页面](https://{{ site.hostname }}/AdoptOpenJDK/)，选择所需的版本，下载独立安装包。

### Debian/Ubuntu 用户

首先信任 GPG 公钥:

```
wget -qO - https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public | sudo apt-key add -
```

再选择你的 Debian/Ubuntu 版本，文本框中内容写进 `/etc/apt/sources.list.d/AdoptOpenJDK.list`

<form class="form-inline">
<div class="form-group">
	<label>你的Debian/Ubuntu版本: </label>
	<select class="form-control release-select" data-template="#apt-template" data-target="#apt-content">
		<option data-os="debian" data-release="jessie">Debian 8 (Jessie)</option>
		<option data-os="debian" data-release="stretch">Debian 9 (Stretch)</option>
		<option data-os="debian" data-release="buster" selected>Debian 10 (Buster)</option>
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


再执行

```
sudo apt-get update
```

{% raw %}
<script id="apt-template" type="x-tmpl-markup">
deb {{if os_name|equals>ubuntu}}https{{else}}http{{/if}}://{%endraw%}{{ site.hostname }}{%raw%}/AdoptOpenJDK/deb {{release_name}} main
</script>
{%endraw%}

### CentOS/RHEL

新建 `/etc/yum.repos.d/AdoptOpenJDK.repo`，内容为

```
[AdoptOpenJDK]
name=AdoptOpenJDK
baseurl=https://{{ site.hostname }}/AdoptOpenJDK/rpm/centos$releasever-$basearch/
enabled=1
gpgcheck=1
gpgkey=https://adoptopenjdk.jfrog.io/adoptopenjdk/api/gpg/key/public
```

再执行

```
sudo yum makecache
```
