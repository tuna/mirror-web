---
category: help
layout: help
mirrorid: flutter-sdk.git
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# Flutter SDK 镜像使用帮助

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



Flutter SDK 默认从 Github 获取更新，如您访问 Github 速度慢，可以在 Flutter 目录下运行命令：



{% raw %}
<script id="template-0" type="x-tmpl-markup">
git remote set-url origin {{http_protocol}}{{mirror}}
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-plaintext" data-template="#template-0" data-select="#http-select,#sudo-select">
</code>
</pre>


将上游设置为镜像站。

或者通过下面的命令，直接从 Master 构建渠道检出 Flutter 的 SDK：



{% raw %}
<script id="template-1" type="x-tmpl-markup">
git clone -b master {{http_protocol}}{{mirror}}
./flutter-sdk/bin/flutter --version
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-1" class="language-plaintext" data-template="#template-1" data-select="#http-select,#sudo-select">
</code>
</pre>


您也可以替换上述代码中 `git clone -b` 之后的 `master` 为 `beta` 获取 Beta 渠道的构建、替换为 `dev` 获取 Dev 渠道的构建。

Flutter 镜像使用方法参见 [Flutter 镜像安装帮助](/help/flutter)。

