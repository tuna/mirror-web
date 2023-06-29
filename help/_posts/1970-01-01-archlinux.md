---
category: help
layout: help
mirrorid: archlinux
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# Arch Linux 软件仓库镜像使用帮助

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



Arch Linux 是通用 x86-64 GNU/Linux 发行版。Arch 采用滚动升级模式，尽全力提供最新的稳定版软件。初始安装的 Arch 只是一个基本系统，随后用户可以根据自己的喜好安装需要的软件并配置成符合自己理想的系统。

Pacman 以 `mirrorlist` 中 Server 的顺序作为优先级，因此添加镜像需要在文件的最顶端添加；您可以同时注释掉其它所有镜像。

有关 Arch Linux 使用镜像的详细说明请见[官方文档](https://wiki.archlinux.org/title/mirrors)

编辑 `/etc/pacman.d/mirrorlist`，在文件的最顶端添加：



{% raw %}
<script id="template-0" type="x-tmpl-markup">
Server = {{http_protocol}}{{mirror}}/$repo/os/$arch
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
{{sudo}}pacman -Syyu
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-1" class="language-shell" data-template="#template-1" data-select="#http-select,#sudo-select">
</code>
</pre>


两次 `y` 能避免从**损坏的**镜像切换到**正常的**镜像时出现的问题。

如果您从一个较新的镜像切换到较旧的镜像，以下命令可以降级部分包，以避免系统的部分更新。



{% raw %}
<script id="template-2" type="x-tmpl-markup">
{{sudo}}pacman -Syyuu
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-2" class="language-shell" data-template="#template-2" data-select="#http-select,#sudo-select">
</code>
</pre>


## Arch Linux Rollback Machine 使用帮助

因为 Arch Linux 的软件仓库和 iso 列表是不维护旧版本的，在少数情况下可能会需要安装旧版本的软件或系统，
因此镜像站维护了一个 [Arch Linux Rollback Machine](https://{{ site.arch_archive }}/)来满足这种情况。

Arch Linux Rollback Machine 的使用方法请参照 [wiki](https://wiki.archlinux.org/index.php/Arch_Linux_Archive)。

**需要注意的是，本镜像站的 Rollback Machine 的目录结构与 wiki 中的目录结构并不相同，配置时请自行替代。**

