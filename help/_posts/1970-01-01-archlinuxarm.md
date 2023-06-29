---
category: help
layout: help
mirrorid: archlinuxarm
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# Arch Linux ARM 软件仓库镜像使用帮助

<form class="form-inline">
<div class="form-group">
	<label>是否使用 HTTPS</label>
	<select id="http-select" class="form-control content-select" data-target="#content-0,#content-1,#content-2">
	  <option data-http_protocol="https://" selected>是</option>
	  <option data-http_protocol="http://">否</option>
	</select>
</div>
</form>


<form class="form-inline">
<div class="form-group">
	<label>是否使用 sudo</label>
	<select id="sudo-select" class="form-control content-select" data-target="#content-0,#content-1,#content-2">
	  <option data-sudo="sudo " data-sudoE="sudo -E " selected>是</option>
	  <option data-sudo="" data-sudoE="">否</option>
	</select>
</div>
</form>



### 软件源

编辑 `/etc/pacman.d/mirrorlist`，在文件的最顶端添加以下配置；您可以同时注释掉其它所有镜像。



{% raw %}
<script id="template-0" type="x-tmpl-markup">
Server = {{http_protocol}}{{mirror}}/$arch/$repo
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-ini" data-template="#template-0" data-select="#http-select,#sudo-select">
</code>
</pre>


更新软件包缓存：



{% raw %}
<script id="template-1" type="x-tmpl-markup">
{{sudo}}pacman -Syy
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-1" class="language-shell" data-template="#template-1" data-select="#http-select,#sudo-select">
</code>
</pre>


### 系统镜像



{% raw %}
<script id="template-2" type="x-tmpl-markup">
{{http_protocol}}{{mirror}}
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-2" class="language-plaintext" data-template="#template-2" data-select="#http-select,#sudo-select">
</code>
</pre>


请访问 [https://archlinuxarm.org/platforms](https://archlinuxarm.org/platforms)，阅读硬件平台对应的安装指引并下载对应的系统镜像。

