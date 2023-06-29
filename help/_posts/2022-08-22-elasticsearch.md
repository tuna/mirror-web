---
category: help
layout: help
mirrorid: elasticstack
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# Elastic Stack 软件仓库镜像使用帮助

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



[Elasticsearch](https://www.elastic.co/cn/what-is/elasticsearch) 是位于 Elastic Stack 核心的分布式搜索和分析引擎。

请参考[elasticsearch 官方安装教程](https://www.elastic.co/guide/en/elasticsearch/reference/current/deb.html)。

以 Debian/Ubuntu 安装为例，举例如下：



<form class="form-inline">
<div class="form-group">
  <label>版本：</label>
    <select id="select-0-0" class="form-control content-select" data-target="#content-0">
      <option data-version="8.x" selected>8.x</option>
      <option data-version="7.x">7.x</option>
      <option data-version="6.x">6.x</option>
    </select>
</div>
</form>

{% raw %}
<script id="template-0" type="x-tmpl-markup">
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | {{sudo}}gpg --dearmor -o /usr/share/keyrings/elasticsearch-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/elasticsearch-keyring.gpg] {{http_protocol}}{{mirror}}/{{version}}/apt/ stable main" | {{sudo}}tee /etc/apt/sources.list.d/elastic-{{version}}.list
{{sudo}}apt-get update && {{sudo}}apt-get install elasticsearch
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-bash" data-template="#template-0" data-select="#http-select,#sudo-select,#select-0-0">
</code>
</pre>


