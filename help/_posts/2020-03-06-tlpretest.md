---
category: help
layout: help
mirrorid: tlpretest
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# TeXLive Pretest 软件仓库镜像使用帮助

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



tlpretest 是 TeX Live 在官方镜像之外发布的测试版本，详情可见 [官方介绍](https://www.tug.org/texlive/pretest.html)。

在 TeX Live 官方版更新冻结期间（通常为每年 2 到 4 月），用户可以通过 tlpretest 提前获得新版本的 TeX Live 及其包含的宏包更新。

在命令行中执行：



{% raw %}
<script id="template-0" type="x-tmpl-markup">
tlmgr option repository {{http_protocol}}{{mirror}}
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-plaintext" data-template="#template-0" data-select="#http-select,#sudo-select">
</code>
</pre>


即可永久更改镜像源。

如果只需要临时切换，可以用如下命令：



{% raw %}
<script id="template-1" type="x-tmpl-markup">
tlmgr update --all --repository {{http_protocol}}{{mirror}}
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-1" class="language-plaintext" data-template="#template-1" data-select="#http-select,#sudo-select">
</code>
</pre>


其中的 `update --all` 指令可根据需要修改。

