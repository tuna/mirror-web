---
category: help
layout: help
mirrorid: voidlinux
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# Void Linux 软件仓库镜像使用帮助

<form class="form-inline">
<div class="form-group">
	<label>是否使用 HTTPS</label>
	<select id="http-select" class="form-control content-select" data-target="#content-0,#content-1">
	  <option data-http_protocol="https://" selected>是</option>
	  <option data-http_protocol="http://">否</option>
	</select>
</div>
</form>


<form class="form-inline">
<div class="form-group">
	<label>是否使用 sudo</label>
	<select id="sudo-select" class="form-control content-select" data-target="#content-0,#content-1">
	  <option data-sudo="sudo " data-sudoE="sudo -E " selected>是</option>
	  <option data-sudo="" data-sudoE="">否</option>
	</select>
</div>
</form>



使用如下命令替换为本镜像：



{% raw %}
<script id="template-0" type="x-tmpl-markup">
mkdir -p /etc/xbps.d
cp /usr/share/xbps.d/*-repository-*.conf /etc/xbps.d/
sed -i 's|https://repo-default.voidlinux.org|{{http_protocol}}{{mirror}}|g' /etc/xbps.d/*-repository-*.conf
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-bash" data-template="#template-0" data-select="#http-select,#sudo-select">
</code>
</pre>


若报错可尝试



{% raw %}
<script id="template-1" type="x-tmpl-markup">
sed -i 's|https://alpha.de.repo.voidlinux.org|{{http_protocol}}{{mirror}}|g' /etc/xbps.d/*-repository-*.conf
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-1" class="language-bash" data-template="#template-1" data-select="#http-select,#sudo-select">
</code>
</pre>


之后可用 `xbps-query -L` 检查是否正确替换。

参考[官方教程](https://docs.voidlinux.org/xbps/repositories/mirrors/changing.html)。

