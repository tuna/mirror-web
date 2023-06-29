---
category: help
layout: help
mirrorid: ubuntu-cloud-images
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# Ubuntu Cloud Images 镜像使用帮助

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



收录官方的云 Ubuntu 镜像，由 Canonical 定制，提供 Ubuntu 认证镜像，可 Openstack、LXD 等的公共云上运行。

收录官方对 KVM，Hyper-v，XEN 等虚拟结构的官方定制镜像

使用以下链接进行查找所需要的镜像



{% raw %}
<script id="template-0" type="x-tmpl-markup">
{{http_protocol}}{{mirror}}/locator/
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-plaintext" data-template="#template-0" data-select="#http-select,#sudo-select">
</code>
</pre>



