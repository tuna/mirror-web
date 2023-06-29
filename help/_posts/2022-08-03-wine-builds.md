---
category: help
layout: help
mirrorid: wine-builds
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# Wine builds 软件仓库镜像使用帮助

<form class="form-inline">
<div class="form-group">
	<label>是否使用 HTTPS</label>
	<select id="http-select" class="form-control content-select" data-target="#content-0,#content-1,#content-2,#content-3">
	  <option data-http_protocol="https://" selected>是</option>
	  <option data-http_protocol="http://">否</option>
	</select>
</div>
</form>


<form class="form-inline">
<div class="form-group">
	<label>是否使用 sudo</label>
	<select id="sudo-select" class="form-control content-select" data-target="#content-0,#content-1,#content-2,#content-3">
	  <option data-sudo="sudo " data-sudoE="sudo -E " selected>是</option>
	  <option data-sudo="" data-sudoE="">否</option>
	</select>
</div>
</form>



由于上游并未提供 rsync，镜像站只同步了 ubuntu/debian 部分。

首先启用 32 位架构



{% raw %}
<script id="template-0" type="x-tmpl-markup">
{{sudo}}dpkg --add-architecture i386
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-bash" data-template="#template-0" data-select="#http-select,#sudo-select">
</code>
</pre>


之后信任来自 https://dl.winehq.org/ 的公钥



{% raw %}
<script id="template-1" type="x-tmpl-markup">
{{sudo}}wget -nc -O /usr/share/keyrings/winehq-archive.key https://dl.winehq.org/wine-builds/winehq.key
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-1" class="language-bash" data-template="#template-1" data-select="#http-select,#sudo-select">
</code>
</pre>


新增 `/etc/apt/sources.list.d/winehq.list`，内容为



<form class="form-inline">
<div class="form-group">
  <label>发行版：</label>
    <select id="select-2-0" class="form-control content-select" data-target="#content-2">
      <option data-os_name="debian" data-release_name="bookworm" selected>Debian 12</option>
      <option data-os_name="debian" data-release_name="bullseye">Debian 11</option>
      <option data-os_name="debian" data-release_name="buster">Debian 10</option>
      <option data-os_name="ubuntu" data-release_name="jammy">Ubuntu 22.04 LTS</option>
      <option data-os_name="ubuntu" data-release_name="focal">Ubuntu 20.04 LTS</option>
      <option data-os_name="ubuntu" data-release_name="bionic">Ubuntu 18.04 LTS</option>
    </select>
</div>
</form>

{% raw %}
<script id="template-2" type="x-tmpl-markup">
deb [arch=amd64,i386 signed-by=/usr/share/keyrings/winehq-archive.key] {{http_protocol}}{{mirror}}/{{os_name}}/ {{release_name}} main
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-2" class="language-properties" data-template="#template-2" data-select="#http-select,#sudo-select,#select-2-0">
</code>
</pre>


通过以下命令安装 winehq



{% raw %}
<script id="template-3" type="x-tmpl-markup">
{{sudo}}apt update
{{sudo}}apt install --install-recommends winehq-stable
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-3" class="language-bash" data-template="#template-3" data-select="#http-select,#sudo-select">
</code>
</pre>


