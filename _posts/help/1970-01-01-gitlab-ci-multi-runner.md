---
category: help
layout: help
mirrorid: gitlab-ci-multi-runner
---

## Gitlab CI Multi Runner 镜像使用帮助

**注意: gitlab-ci-multi-runner 镜像仅支持 x86-64 架构**

### Debian/Ubuntu 用户

首先信任 GitLab 的 GPG 公钥:

```
curl https://packages.gitlab.com/gpg.key 2> /dev/null | sudo apt-key add - &>/dev/null
```

再选择你的 Debian/Ubuntu 版本，文本框中内容写进 `/etc/apt/sources.list.d/gitlab-ci-multi-runner.list`

<form class="form-inline">
<div class="form-group">
	<label>你的Debian/Ubuntu版本: </label>
	<select class="form-control release-select" data-template="#apt-template" data-target="#apt-content">
		<option data-os="debian" data-release="wheezy">Debian 7 (Wheezy)</option>
		<option data-os="debian" data-release="jessie" selected>Debian 8 (Jessie)</option>
		<option data-os="ubuntu" data-release="trusty">Ubuntu 14.04 LTS</option>
		<option data-os="ubuntu" data-release="xenial">Ubuntu 16.04 LTS</option>
	</select>
</div>
</form>

<p></p>
<pre>
<code id="apt-content">
</code>
</pre>


安装 gitlab-ci-multi-runner:

```
sudo apt-get update
sudo apt-get install gitlab-ci-multi-runner
```

{% raw %}
<script id="apt-template" type="x-tmpl-markup">
deb https://mirrors.tuna.tsinghua.edu.cn/gitlab-ci-multi-runner/{{os_name}} {{release_name}} main
</script>
{%endraw%}

### CentOS/RHEL

新建 `/etc/yum.repos.d/gitlab-ci-multi-runner.repo`，内容为

<form class="form-inline">
<div class="form-group">
	<label>你的CentOS/RHEL版本: </label>
	<select class="form-control release-select" data-template="#yum-template" data-target="#yum-content">
		<option data-release="el6">CentOS 6</option>
		<option data-release="el7" selected>CentOS 7</option>
		<option data-release="el6">RHEL 6</option>
		<option data-release="el7">RHEL 7</option>
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
sudo yum install gitlab-ci-multi-runner
```

{% raw %}
<script id="yum-template" type="x-tmpl-markup">
[gitlab-ci-multi-runner]
name=gitlab-ci-multi-runner
baseurl=http://mirrors.tuna.tsinghua.edu.cn/gitlab-ci-multi-runner/yum/{{release_name}}
repo_gpgcheck=0
gpgcheck=0
enabled=1
gpgkey=https://packages.gitlab.com/gpg.key
</script>
{% endraw %}
