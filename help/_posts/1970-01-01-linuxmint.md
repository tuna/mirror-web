---
category: help
layout: help
mirrorid: linuxmint
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# Linux Mint 软件仓库镜像使用帮助

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



Linux Mint 也采用 apt 作为包管理器，与 Ubuntu 和 Debian 类似，你需要编辑 `/etc/apt/sources.list` 和 `/etc/apt/sources.list.d/*` 中的路径。对于来自 Ubuntu 与 Debian 的部分源，可以参考 [Ubuntu 帮助](/help/ubuntu)与 [Debian 帮助](/help/debian)进行修改。

需要修改 `/etc/apt/sources.list.d/official-package-repositories.list`（注意备份），把 `packages.linuxmint.com` 替换为镜像源



<form class="form-inline">
<div class="form-group">
  <label>Linux Mint 版本：</label>
    <select id="select-0-0" class="form-control content-select" data-target="#content-0">
      <option data-release_name="vera" selected>21.1</option>
      <option data-release_name="vanessa">21</option>
      <option data-release_name="una">20.3</option>
      <option data-release_name="uma">20.2</option>
      <option data-release_name="ulyssa">20.1</option>
    </select>
</div>
</form>

{% raw %}
<script id="template-0" type="x-tmpl-markup">
deb {{http_protocol}}{{mirror}}/ {{release_name}} main upstream import backport
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-properties" data-template="#template-0" data-select="#http-select,#sudo-select,#select-0-0">
</code>
</pre>


然后运行 `apt update` 即可。

注：完成后请不要再使用 mintsources（自带的图形化软件源设置工具）进行任何操作，因为在操作后，无论是否有按“确定”，mintsources 均会复写 `/etc/apt/sources.list.d/official-package-repositories.list`。

