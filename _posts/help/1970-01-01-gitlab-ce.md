---
category: help
layout: help
mirrorid: gitlab-ce
---

## Gitlab Community Edition 镜像使用帮助

**注意: gitlab-ce 镜像仅支持 x86-64 架构**

### Debian/Ubuntu 用户

首先信任 GitLab 的 GPG 公钥:

```
curl https://packages.gitlab.com/gpg.key 2> /dev/null | sudo apt-key add - &>/dev/null
```

再选择你的 Debian/Ubuntu 版本，文本框中内容写进 `/etc/apt/sources.list.d/gitlab-ce.list`

<form class="form-inline">
<div class="form-group">
	<label>你的Debian/Ubuntu版本: </label>
	<select class="form-control release-select" data-template="#apt-template" data-target="#apt-content">
		<option data-os="debian" data-release="jessie">Debian 8 (Jessie)</option>
		<option data-os="debian" data-release="stretch">Debian 9 (Stretch)</option>
		<option data-os="debian" data-release="buster" selected>Debian 10 (Buster)</option>
		<option data-os="ubuntu" data-release="trusty">Ubuntu 14.04 LTS</option>
		<option data-os="ubuntu" data-release="xenial">Ubuntu 16.04 LTS</option>
		<option data-os="ubuntu" data-release="bionic">Ubuntu 18.04 LTS</option>
</select>
</div>
</form>

<p></p>
<pre>
<code id="apt-content">
</code>
</pre>


安装 gitlab-ce:

```
sudo apt-get update
sudo apt-get install gitlab-ce
```

{% raw %}
<script id="apt-template" type="x-tmpl-markup">
deb {{if os_name|equals>ubuntu}}https{{else}}http{{/if}}://{%endraw%}{{ site.hostname }}{%raw%}/gitlab-ce/{{os_name}} {{release_name}} main
</script>
{%endraw%}


### RHEL/CentOS 用户


新建 `/etc/yum.repos.d/gitlab-ce.repo`，内容为

```
[gitlab-ce]
name=Gitlab CE Repository
baseurl=https://{{ site.hostname }}/gitlab-ce/yum/el$releasever/
gpgcheck=0
enabled=1
```

再执行

```
sudo yum makecache
sudo yum install gitlab-ce
```
