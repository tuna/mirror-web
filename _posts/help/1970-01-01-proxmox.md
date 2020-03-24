---
category: help
layout: help
mirrorid: proxmox
---

## Proxmox 镜像使用帮助

新建 `/etc/apt/sources.list.d/pve-no-subscription.list`，内容为：

<form class="form-inline">
<div class="form-group">
	<label>你的Debian版本: </label>
	<select class="form-control release-select" data-template="#apt-template" data-target="#apt-content">
		<option data-os="debian" data-release="jessie">Debian 8 (Jessie)</option>
		<option data-os="debian" data-release="stretch">Debian 9 (Stretch)</option>
		<option data-os="debian" data-release="buster" selected>Debian 10 (Buster)</option>
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
deb https://{%endraw%}{{ site.hostname }}{%raw%}/proxmox/{{os_name}} {{release_name}} pve-no-subscription
</script>
{%endraw%}

ISO安装文件下载：[https://{{ site.hostname }}/proxmox/iso/](https://{{ site.hostname }}/proxmox/iso/)
