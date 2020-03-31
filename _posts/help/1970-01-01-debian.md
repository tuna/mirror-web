---
category: help
layout: help
mirrorid: debian
---

Debian 镜像使用帮助
===================

Debian 的软件源配置文件是
`/etc/apt/sources.list`。将系统自带的该文件做个备份，将该文件替换为下面内容，即可使用
TUNA 的软件源镜像。

如果遇到无法拉取 https 源的情况，请先使用 http 源并安装：

```
$ sudo apt install apt-transport-https ca-certificates
```

再使用 TUNA 的软件源镜像。


<form class="form-inline">
<div class="form-group">
	<label>选择你的 Debian 版本: </label>
	<select class="form-control release-select" data-template="#apt-template" data-target="#apt-content">
	  <option data-release="sid" data-security="-security">sid</option>
	  <option data-release="testing" data-security="-security">testing</option>
	  <option data-release="bullseye" data-security="-security">bullseye</option>
	  <option data-release="buster" data-security="/updates" selected>buster</option>
	  <option data-release="stretch" data-security="/updates">stretch</option>
	  <option data-release="jessie" data-security="/updates">jessie</option>
	</select>
</div>
</form>

{% raw %}
<script id="apt-template" type="x-tmpl-markup">
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://{%endraw%}{{ site.hostname }}{%raw%}/debian/ {{release_name}} main contrib non-free
# deb-src https://{%endraw%}{{ site.hostname }}{%raw%}/debian/ {{release_name}} main contrib non-free{{if release_name|notequals>sid}}
deb https://{%endraw%}{{ site.hostname }}{%raw%}/debian/ {{release_name}}-updates main contrib non-free
# deb-src https://{%endraw%}{{ site.hostname }}{%raw%}/debian/ {{release_name}}-updates main contrib non-free
deb https://{%endraw%}{{ site.hostname }}{%raw%}/debian/ {{release_name}}-backports main contrib non-free
# deb-src https://{%endraw%}{{ site.hostname }}{%raw%}/debian/ {{release_name}}-backports main contrib non-free
deb https://{%endraw%}{{ site.hostname }}{%raw%}/debian-security {{release_name}}{{release_security}} main contrib non-free
# deb-src https://{%endraw%}{{ site.hostname }}{%raw%}/debian-security {{release_name}}{{release_security}} main contrib non-free
{{/if}}

</script>
{% endraw %}

<p></p>

<pre>
<code id="apt-content">
</code>
</pre>
