---
category: help
layout: help
mirrorid: lxc-images
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# LXC Images 软件仓库镜像使用帮助

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



LXC 1.0 以上版本增加了 `download` 模版，支持下载定义好的系统镜像。

欲使用镜像站进行下载加速，可以在 `lxc-create -t download` 的选项部分，
增加 `--server` 即可，例如：



{% raw %}
<script id="template-0" type="x-tmpl-markup">
lxc-create -t download -n my-container -- --server {{mirror}}
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-bash" data-template="#template-0" data-select="#http-select,#sudo-select">
</code>
</pre>


**LXD/LXC 2.0 及以上版本使用镜像加速的方法**:

创建一个 remote 链接，指向镜像站即可，或替换掉默认的 images 链接。



{% raw %}
<script id="template-1" type="x-tmpl-markup">
lxc remote add mirror-images {{http_protocol}}{{mirror}}/ --protocol=simplestreams --public
lxc image list mirror-images:
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-1" class="language-bash" data-template="#template-1" data-select="#http-select,#sudo-select">
</code>
</pre>


