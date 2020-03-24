---
category: help
layout: help
mirrorid: grafana
---

## Grafana 镜像帮助

### Debian / Ubuntu 用户

首先信任 https://packages.grafana.com/ 的 GPG 公钥:

```bash
curl https://packages.grafana.com/gpg.key | sudo apt-key add -
```

确保你的 apt 支持 HTTPS:

```bash
sudo apt-get install -y apt-transport-https
```

选择你希望安装的 Grafana 版本（与你的 Debian/Ubuntu 系统版本无关），文本框中内容写进 `/etc/apt/sources.list.d/grafana.list`

<form class="form-inline">
<div class="form-group">
	<label>你的 Grafana 版本: </label>
	<select class="form-control release-select" data-template="#apt-template" data-target="#apt-content">
		<option data-release="stable">Grafana Stable Repository</option>
		<option data-release="beta">Grafana Beta Repository</option>
	</select>
</div>
</form>

<p></p>
<pre>
<code id="apt-content">
</code>
</pre>

安装 Grafana

```
sudo apt-get update
sudo apt-get install grafana
```

{% raw %}
<script id="apt-template" type="x-tmpl-markup">
deb https://{%endraw%}{{ site.hostname }}{%raw%}/grafana/apt/ {{release_name}} main
</script>
{%endraw%}


### Centos / Redhat 用户
新建 `/etc/yum.repos.d/grafana.repo`，内容为

<form class="form-inline">
<div class="form-group">
	<label>你的 Grafana 版本: </label>
	<select class="form-control release-select" data-template="#yum-template" data-target="#yum-content">
		<option data-release="rpm">Grafana Stable Repository</option>
		<option data-release="rpm-beta">Grafana Beta Repository</option>
	</select>
</div>
</form>

<p></p>
<pre>
<code id="yum-content">
</code>
</pre>


再执行

```
sudo yum makecache
sudo yum install grafana
```

{% raw %}
<script id="yum-template" type="x-tmpl-markup">
[grafana]
name=grafana
baseurl=https://{%endraw%}{{ site.hostname }}{%raw%}/grafana/yum/{{release_name}}
repo_gpgcheck=0
enabled=1
gpgcheck=0
</script>
{% endraw %}
