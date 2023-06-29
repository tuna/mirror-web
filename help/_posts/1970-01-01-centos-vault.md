---
category: help
layout: help
mirrorid: centos-vault
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# CentOS Vault 软件仓库镜像使用帮助

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



该文件夹提供较早版本的 CentOS，例如 CentOS 6；同时提供当前 CentOS 大版本的历史小版本的归档；
还提供 CentOS 各个版本的源代码和调试符号。

需要确定您所需要的小版本，如无特殊需要则使用该大版本的最后一个小版本，比如 6.10，5.11，我们将其标记为 `$minorver`，需要您在之后的命令中替换。



{% raw %}
<script id="template-0" type="x-tmpl-markup">
# CentOS 8 之前
minorver=6.10
{{sudo}}sed -e "s|^mirrorlist=|#mirrorlist=|g" \
         -e "s|^#baseurl=http://mirror.centos.org/centos/\$releasever|baseurl={{http_protocol}}{{mirror}}/$minorver|g" \
         -i.bak \
         /etc/yum.repos.d/CentOS-*.repo

# CentOS 8 之后
minorver=8.5.2111
{{sudo}}sed -e "s|^mirrorlist=|#mirrorlist=|g" \
         -e "s|^#baseurl=http://mirror.centos.org/\$contentdir/\$releasever|baseurl={{http_protocol}}{{mirror}}/$minorver|g" \
         -i.bak \
         /etc/yum.repos.d/CentOS-*.repo
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-shell" data-template="#template-0" data-select="#http-select,#sudo-select">
</code>
</pre>


注意其中的`*`通配符，如果只需要替换一些文件中的源，请自行增删。

注意，如果需要启用其中一些 repo，需要将其中的 `enabled=0` 改为 `enabled=1`。

最后，更新软件包缓存



{% raw %}
<script id="template-1" type="x-tmpl-markup">
{{sudo}}yum makecache
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-1" class="language-shell" data-template="#template-1" data-select="#http-select,#sudo-select">
</code>
</pre>


