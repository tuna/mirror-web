---
category: help
layout: help
mirrorid: archlinuxcn
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# Arch Linux CN 软件仓库镜像使用帮助

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



Arch Linux 中文社区仓库 是由 Arch Linux
中文社区驱动的非官方用户仓库。包含中文用户常用软件、工具、字体/美化包等。

完整的包信息列表（包名称/架构/维护者/状态）请[点击这里](https://github.com/archlinuxcn/repo)查看。

*  官方仓库地址：https://repo.archlinuxcn.org

使用方法：在 `/etc/pacman.conf` 文件末尾添加以下两行：



{% raw %}
<script id="template-0" type="x-tmpl-markup">
[archlinuxcn]
Server = {{http_protocol}}{{mirror}}/$arch
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-ini" data-template="#template-0" data-select="#http-select,#sudo-select">
</code>
</pre>


之后通过一下命令安装 `archlinuxcn-keyring` 包导入 GPG key。



{% raw %}
<script id="template-1" type="x-tmpl-markup">
{{sudo}}pacman -Sy archlinuxcn-keyring
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-1" class="language-bash" data-template="#template-1" data-select="#http-select,#sudo-select">
</code>
</pre>


