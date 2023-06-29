---
category: help
layout: help
mirrorid: blackarch
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# Black Arch 软件仓库镜像使用帮助

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



BlackArch 是一款基于 ArchLinux 的为渗透测试及安全研究人员开发的发行版，相当于 Arch 版的 BackTrack/Kali。

仓库地址：https://blackarch.org/blackarch/

## 使用说明

在 `/etc/pacman.conf` 文件末尾添加两行：



{% raw %}
<script id="template-0" type="x-tmpl-markup">
[blackarch]
Server = {{http_protocol}}{{mirror}}/$repo/os/$arch
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-ini" data-template="#template-0" data-select="#http-select,#sudo-select">
</code>
</pre>


由于一些软件依赖 32 位的库，需要取消掉 `/etc/pacman.conf` 中 `multilib` 的注释，详见 https://wiki.archlinux.org/index.php/Official_repositories#Enabling_multilib

然后请安装 ``blackarch-keyring`` 包以导入 GPG key。



{% raw %}
<script id="template-1" type="x-tmpl-markup">
{{sudo}}pacman -Sy blackarch-keyring
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-1" class="language-plaintext" data-template="#template-1" data-select="#http-select,#sudo-select">
</code>
</pre>


注：Black Arch 软件源仅包含其打包的工具等软件。如果需要更换 Arch Linux 基础系统的软件源，请查看 [Arch Linux 帮助](/help/archlinux)。

