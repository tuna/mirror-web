---
category: help
layout: help
mirrorid: erlang-solutions
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# Erlang Solutions 软件仓库镜像使用帮助

<form class="form-inline">
<div class="form-group">
	<label>是否使用 HTTPS</label>
	<select id="http-select" class="form-control content-select" data-target="#content-0,#content-1,#content-2,#content-3,#content-4">
	  <option data-http_protocol="https://" selected>是</option>
	  <option data-http_protocol="http://">否</option>
	</select>
</div>
</form>


<form class="form-inline">
<div class="form-group">
	<label>是否使用 sudo</label>
	<select id="sudo-select" class="form-control content-select" data-target="#content-0,#content-1,#content-2,#content-3,#content-4">
	  <option data-sudo="sudo " data-sudoE="sudo -E " selected>是</option>
	  <option data-sudo="" data-sudoE="">否</option>
	</select>
</div>
</form>



### Debian/Ubuntu 用户

首先信任 erlang-solutions 的 GPG 公钥：



<form class="form-inline">
<div class="form-group">
  <label>发行版：</label>
    <select id="select-0-0" class="form-control content-select" data-target="#content-0">
      <option data-os_name="debian" selected>Debian</option>
      <option data-os_name="ubuntu">Ubuntu</option>
    </select>
</div>
</form>

{% raw %}
<script id="template-0" type="x-tmpl-markup">
curl -s https://packages.erlang-solutions.com/{{os_name}}/erlang_solutions.asc | {{sudo}}apt-key add -
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-bash" data-template="#template-0" data-select="#http-select,#sudo-select,#select-0-0">
</code>
</pre>


再选择你的 Debian / Ubuntu 版本，文本框中内容写进 `/etc/apt/sources.list.d/erlang-solutions.list`



<form class="form-inline">
<div class="form-group">
  <label>发行版：</label>
    <select id="select-1-0" class="form-control content-select" data-target="#content-1">
      <option data-os_name="debian" data-release_name="bullseye" selected>Debian 11</option>
      <option data-os_name="debian" data-release_name="buster">Debian 10</option>
      <option data-os_name="debian" data-release_name="stretch">Debian 9</option>
      <option data-os_name="debian" data-release_name="jessie">Debian 8</option>
      <option data-os_name="ubuntu" data-release_name="focal">Ubuntu 20.04 LTS</option>
      <option data-os_name="ubuntu" data-release_name="bionic">Ubuntu 18.04 LTS</option>
      <option data-os_name="ubuntu" data-release_name="xenial">Ubuntu 16.04 LTS</option>
    </select>
</div>
</form>

{% raw %}
<script id="template-1" type="x-tmpl-markup">
deb {{http_protocol}}{{mirror}}/{{os_name}} {{release_name}} contrib
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-1" class="language-properties" data-template="#template-1" data-select="#http-select,#sudo-select,#select-1-0">
</code>
</pre>



安装 `erlang` 即可



{% raw %}
<script id="template-2" type="x-tmpl-markup">
{{sudo}}apt-get update
{{sudo}}apt-get install -y erlang
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-2" class="language-bash" data-template="#template-2" data-select="#http-select,#sudo-select">
</code>
</pre>


### CentOS 用户

首先信任 erlang-solutions 的 GPG 公钥：

```bash
{{sudo}}rpm --import https://packages.erlang-solutions.com/rpm/erlang_solutions.asc
```

新建 `/etc/yum.repos.d/erlang-solutions.repo`，内容为



{% raw %}
<script id="template-3" type="x-tmpl-markup">
[erlang-solutions]
name=CentOS $releasever - Erlang Solutions
baseurl={{http_protocol}}{{mirror}}/centos/$releasever/
gpgcheck=1
gpgkey=https://packages.erlang-solutions.com/rpm/erlang_solutions.asc
enabled=1
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-3" class="language-ini" data-template="#template-3" data-select="#http-select,#sudo-select">
</code>
</pre>


刷新缓存并安装 `erlang` 即可。



{% raw %}
<script id="template-4" type="x-tmpl-markup">
{{sudo}}yum makecache
{{sudo}}yum install erlang
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-4" class="language-bash" data-template="#template-4" data-select="#http-select,#sudo-select">
</code>
</pre>


