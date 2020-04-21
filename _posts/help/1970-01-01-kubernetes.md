---
category: help
layout: help
mirrorid: kubernetes
---

## Kubernetes 镜像使用帮助

Kubernetes 是用于自动部署，扩展和管理容器化应用程序的开源系统。详情可见 [官方介绍](https://kubernetes.io/zh/)。

**硬件架构: `x86_64`, `armhfp`, `aarch64`**

### Debian/Ubuntu 用户


新建 `/etc/apt/sources.list.d/kubernetes.list`，内容为


<form class="form-inline">
<div class="form-group">
	<label>你的Debian版本: </label>
	<select class="form-control release-select" data-template="#apt-template" data-target="#apt-content">
		<option data-os="ubuntu" data-release="trusty">Ubuntu 14.04 LTS</option>
		<option data-os="ubuntu" data-release="xenial">Ubuntu 16.04 LTS</option>
		<option data-os="debian" data-release="jessie">Debian 8 (Jessie)</option>
		<option data-os="debian" data-release="stretch" selected>Debian 9 (Stretch)</option>
</select>
</div>
</form>

<p></p>
<pre>
<code id="apt-content">
</code>
</pre>


{% raw %}
<script id="apt-template" type="x-tmpl-markup">
deb https://{%endraw%}{{ site.hostname }}{%raw%}/kubernetes/apt kubernetes-{{release_name}} main
</script>
{%endraw%}


### RHEL/CentOS 用户

新建 `/etc/yum.repos.d/kubernetes.repo`，内容为：

```
[kubernetes]
name=kubernetes
baseurl=https://{{ site.hostname }}/kubernetes/yum/repos/kubernetes-el7-$basearch
enabled=1
```

### Minikube

请到 [minikube 镜像](https://{{ site.hostname }}/github-release/kubernetes/minikube/LatestRelease/) 下载。
