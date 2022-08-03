---
category: help
layout: help
mirrorid: wine-builds
---

## wine-builds 镜像使用帮助

由于上游并未提供 rsync，镜像站只同步了 ubuntu/debian 部分。

首先启用 32 位架构

```bash
sudo dpkg --add-architecture i386
```

之后信任来自 <https://dl.winehq.org/> 的公钥

```
sudo wget -nc -O /usr/share/keyrings/winehq-archive.key https://dl.winehq.org/wine-builds/winehq.key
```

新增 `/etc/apt/sources.list.d/winehq.list`，内容为

<form class="form-inline">
<div class="form-group">
	<label>选择你的版本: </label>
	<select class="form-control release-select" data-template="#apt-template" data-target="#apt-content">
		<option data-os="ubuntu" data-release="bionic">Ubuntu 18.04 LTS</option>
		<option data-os="ubuntu" data-release="focal">Ubuntu 20.04 LTS</option>
		<option data-os="ubuntu" data-release="jammy" selected>Ubuntu 22.04 LTS</option>
		<option data-os="debian" data-release="buster">Debian 10</option>
		<option data-os="debian" data-release="bullseye">Debian 11</option>
	</select>
</div>
</form>

{% raw %}
<script id="apt-template" type="x-tmpl-markup">
deb [arch=amd64,i386 signed-by=/usr/share/keyrings/winehq-archive.key] https://{%endraw%}{{ site.hostname }}{%raw%}/wine-builds/{{os_name}}/ {{release_name}} main
</script>
{% endraw %}

<p></p>

<pre>
<code id="apt-content">
</code>
</pre>

通过以下命令安装 winehq

```bash
sudo apt update
sudo apt install --install-recommends winehq-stable
```
