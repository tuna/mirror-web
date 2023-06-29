---
category: help
layout: help
mirrorid: influxdata
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# Influxdata 软件仓库镜像使用帮助

<form class="form-inline">
<div class="form-group">
	<label>是否使用 HTTPS</label>
	<select id="http-select" class="form-control content-select" data-target="#content-0,#content-1,#content-2,#content-3">
	  <option data-http_protocol="https://" selected>是</option>
	  <option data-http_protocol="http://">否</option>
	</select>
</div>
</form>


<form class="form-inline">
<div class="form-group">
	<label>是否使用 sudo</label>
	<select id="sudo-select" class="form-control content-select" data-target="#content-0,#content-1,#content-2,#content-3">
	  <option data-sudo="sudo " data-sudoE="sudo -E " selected>是</option>
	  <option data-sudo="" data-sudoE="">否</option>
	</select>
</div>
</form>



本目录是 `influxdb` ， `telegraf` 等时序型数据库的相关组件的镜像软件源。

### Debian / Ubuntu 用户

首先信任来自 [influxdata](https://docs.influxdata.com/telegraf/v1.18/introduction/installation/) 的 PGP 公钥：

_注：Influxdata 在 2023-01-26 使用了新的 GPG 密钥，详情可参考[此处](https://www.influxdata.com/blog/linux-package-signing-key-rotation/)_



{% raw %}
<script id="template-0" type="x-tmpl-markup">
wget -q https://repos.influxdata.com/influxdata-archive_compat.key
cat influxdata-archive_compat.key | gpg --dearmor | {{sudo}}tee /etc/apt/trusted.gpg.d/influxdata-archive_compat.gpg > /dev/null
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-shell" data-template="#template-0" data-select="#http-select,#sudo-select">
</code>
</pre>


将下方文本框中的内容写入 `/etc/apt/sources.list.d/influxdata.list`



{% raw %}
<script id="template-1" type="x-tmpl-markup">
deb {{http_protocol}}{{mirror}}/debian/ stable main
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-1" class="language-properties" data-template="#template-1" data-select="#http-select,#sudo-select">
</code>
</pre>



即可安装相关软件，如：



{% raw %}
<script id="template-2" type="x-tmpl-markup">
{{sudo}}apt install influxdb
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-2" class="language-bash" data-template="#template-2" data-select="#http-select,#sudo-select">
</code>
</pre>


### CentOS / RedHat 用户

新建 `/etc/yum.repos.d/influxdata.repo`，内容为



<form class="form-inline">
<div class="form-group">
  <label>发行版：</label>
    <select id="select-3-0" class="form-control content-select" data-target="#content-3">
      <option data-release_name="el7-x86_64" selected>CentOS/RHEL 7 (x86_64)</option>
    </select>
</div>
</form>

{% raw %}
<script id="template-3" type="x-tmpl-markup">
[influxdata]
name = InfluxData Repository - RHEL $releasever
baseurl={{http_protocol}}{{mirror}}/yum/{{release_name}}
enabled=1
gpgcheck=1
gpgkey=https://repos.influxdata.com/influxdata-archive_compat.key
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-3" class="language-ini" data-template="#template-3" data-select="#http-select,#sudo-select,#select-3-0">
</code>
</pre>


