---
category: help
layout: help
mirrorid: repoforge
---

# Repoforge (原Rpmforge) 镜像使用帮助

[Repoforge](http://repoforge.org/) 是 RHEL 系统下的软件仓库，拥有 10000 多个软件包，被认为是最安全、最稳定的一个软件仓库。

## 添加 Repoforge 仓库

1. 运行 `cat /etc/redhat-release` 获取 EL 版本号（如 EL6, EL7 等）
2. 向系统中添加 Repoforge 的 GPG 公钥：
```
rpm —import http://apt.sw.be/RPM-GPG-KEY.dag.txt
```
3. 运行下列命令：

<form class="form-inline">
<div class="form-group">
	<label>选择你的 EL 版本: </label>
	<select class="form-control release-select" data-template="#yum-template" data-target="#yum-content">
	  <option data-release="el7" selected>EL7</option>
	  <option data-release="el6">EL6</option>
	  <option data-release="el5">EL5</option>
    <option data-release="el4">EL4</option>
    <option data-release="el3">EL3</option>
	</select>
</div>
</form>

{% raw %}
<script id="yum-template" type="x-tmpl-markup">
sudo cat > /etc/yum.repos.d/rpmforge.repo << EOF
[rpmforge]
name = RHEL $releasever - RPMforge.net - dag
baseurl = https://mirrors.tuna.tsinghua.edu.cn/repoforge/redhat/{{release_name}}/en/$basearch/rpmforge
mirrorlist = http://mirrorlist.repoforge.org/{{release_name}}/mirrors-rpmforge
enabled = 1
protect = 0
gpgkey = file:///etc/pki/rpm-gpg/RPM-GPG-KEY-rpmforge-dag
gpgcheck = 1

[rpmforge-extras]
name = RHEL $releasever - RPMforge.net - extras
baseurl = https://mirrors.tuna.tsinghua.edu.cn/repoforge/redhat/{{release_name}}/en/$basearch/extras
mirrorlist = http://mirrorlist.repoforge.org/{{release_name}}/mirrors-rpmforge-extras
enabled = 0
protect = 0
gpgkey = file:///etc/pki/rpm-gpg/RPM-GPG-KEY-rpmforge-dag
gpgcheck = 1

[rpmforge-testing]
name = RHEL $releasever - RPMforge.net - testing
baseurl = https://mirrors.tuna.tsinghua.edu.cn/repoforge/redhat/{{release_name}}/en/$basearch/testing
mirrorlist = http://mirrorlist.repoforge.org/{{release_name}}/mirrors-rpmforge-testing
enabled = 0  
protect = 0
gpgkey = file:///etc/pki/rpm-gpg/RPM-GPG-KEY-rpmforge-dag
gpgcheck = 1
EOF
</script>
{% endraw %}

<p></p>

<pre>
<code id="yum-content">
</code>
</pre>

## 更新软件包缓存

```
sudo yum makecache
```
