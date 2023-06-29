---
category: help
layout: help
mirrorid: raspberrypi
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# Raspberrypi 软件仓库镜像使用帮助

<form class="form-inline">
<div class="form-group">
	<label>是否使用 HTTPS</label>
	<select id="http-select" class="form-control content-select" data-target="#content-0">
	  <option data-http_protocol="https://" selected>是</option>
	  <option data-http_protocol="http://">否</option>
	</select>
</div>
</form>


<form class="form-inline">
<div class="form-group">
	<label>是否使用 sudo</label>
	<select id="sudo-select" class="form-control content-select" data-target="#content-0">
	  <option data-sudo="sudo " data-sudoE="sudo -E " selected>是</option>
	  <option data-sudo="" data-sudoE="">否</option>
	</select>
</div>
</form>



主要参考 [Raspbian 帮助](/help/raspbian)

编辑 `/etc/apt/sources.list.d/raspi.list` 文件。



<form class="form-inline">
<div class="form-group">
  <label>选择你的 Raspbian 对应的 Debian 版本：</label>
    <select id="select-0-0" class="form-control content-select" data-target="#content-0">
      <option data-release_name="bullseye" selected>Debian 11 (bullseye)</option>
      <option data-release_name="buster">Debian 10 (buster)</option>
      <option data-release_name="stretch">Debian 9 (stretch)</option>
    </select>
</div>
</form>

{% raw %}
<script id="template-0" type="x-tmpl-markup">
deb {{http_protocol}}{{mirror}}/ {{release_name}} main
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-properties" data-template="#template-0" data-select="#http-select,#sudo-select,#select-0-0">
</code>
</pre>


