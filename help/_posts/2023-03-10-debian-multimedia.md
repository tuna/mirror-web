---
category: help
layout: help
mirrorid: debian-multimedia
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# Deb Multimedia 软件仓库镜像使用帮助

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



Debian 第三方多媒体软件源

该项目以前的名字为 Debian Multimedia，现改名为 Deb Multimedia。注意这不是 Debian 官方项目，
是为 deb-multimedia.org 的镜像，与 Debian 官方的 Multimedia 小组的区别见
https://wiki.debian.org/DebianMultimedia/FAQ

在 `/etc/apt/sources.list` 中加入



<form class="form-inline">
<div class="form-group">
  <label>Debian 版本：</label>
    <select id="select-0-0" class="form-control content-select" data-target="#content-0">
      <option data-release_name="bullseye" data-has_backports="" selected>Debian 11 (bullseye)</option>
      <option data-release_name="bookworm" data-has_backports="# ">Debian 12 (bookworm)</option>
      <option data-release_name="sid" data-has_backports="# ">sid</option>
      <option data-release_name="testing" data-has_backports="# ">testing</option>
      <option data-release_name="buster" data-has_backports="">Debian 10 (buster)</option>
      <option data-release_name="stretch" data-has_backports="">Debian 9 (stretch)</option>
      <option data-release_name="jessie" data-has_backports="">Debian 8 (jessie)</option>
    </select>
</div>
</form>

<form class="form-inline">
<div class="form-group">
  <label>启用源码镜像：</label>
    <select id="select-0-1" class="form-control content-select" data-target="#content-0">
      <option data-enable_source="# " selected>否</option>
      <option data-enable_source="">是</option>
    </select>
</div>
</form>

{% raw %}
<script id="template-0" type="x-tmpl-markup">
deb {{http_protocol}}{{mirror}}/ {{release_name}} main non-free
{{enable_source}}deb-src {{http_protocol}}{{mirror}}/ {{release_name}} main non-free
{{has_backports}}deb {{http_protocol}}{{mirror}}/ {{release_name}}-backports main
{{has_backports}}{{enable_source}}deb-src {{http_protocol}}{{mirror}}/ {{release_name}}-backports main
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-properties" data-template="#template-0" data-select="#http-select,#sudo-select,#select-0-0,#select-0-1">
</code>
</pre>


更改完 `sources.list` 文件后请导入 deb-multimedia-keyring



{% raw %}
<script id="template-1" type="x-tmpl-markup">
wget {{http_protocol}}{{mirror}}/pool/main/d/deb-multimedia-keyring/deb-multimedia-keyring_2016.8.1_all.deb
{{sudo}}dpkg -i deb-multimedia-keyring_2016.8.1_all.deb
{{sudo}}apt-get update
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-1" class="language-bash" data-template="#template-1" data-select="#http-select,#sudo-select">
</code>
</pre>


然后更新索引以生效。


