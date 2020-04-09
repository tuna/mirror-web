---
category: help
layout: help
mirrorid: centos
---

## CentOS 镜像使用帮助

建议先备份 CentOS-Base.repo

```
sudo cp /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak
```

然后编辑 /etc/yum.repos.d/CentOS-Base.repo 文件，在 `mirrorlist=` 开头行前面加 `#` 注释掉；并将 `baseurl=` 开头行取消注释（如果被注释的话），把该行内的域名（例如`mirror.centos.org`）替换为 `{{ site.hostname }}`。

或者，你也可以直接使用如下内容覆盖掉 /etc/yum.repos.d/CentOS-Base.repo 文件：（未经充分测试）

<form class="form-inline">
<div class="form-group">
	<label>选择你的 CentOS 版本: </label>
	<select class="form-control release-select" data-template="#repo-template" data-target="#repo-content">
	  <option data-os="" data-security="RPM-GPG-KEY-5" data-release="5">CentOS 5</option>
	  <option data-os="" data-security="RPM-GPG-KEY-6" data-release="6">CentOS 6</option>
	  <option data-os="" data-security="RPM-GPG-KEY-7" data-release="7" selected>CentOS 7</option>
	  <option data-os="os/" data-security="RPM-GPG-KEY-centosofficial" data-release="8">CentOS 8</option>
	</select>
</div>
</form>

{% raw %}
<script id="repo-template" type="x-tmpl-markup">
# CentOS-Base.repo
#
# The mirror system uses the connecting IP address of the client and the
# update status of each mirror to pick mirrors that are updated to and
# geographically close to the client.  You should use this for CentOS updates
# unless you are manually picking other mirrors.
#
# If the mirrorlist= does not work for you, as a fall back you can try the
# remarked out baseurl= line instead.
#
#

{{if release_name|between>5>7}}
[base]
name=CentOS-$releasever - Base
baseurl=https://{%endraw%}{{ site.hostname }}{%raw%}/centos/$releasever/os/$basearch/
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=os
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/{{release_security}}

#released updates
[updates]
name=CentOS-$releasever - Updates
baseurl=https://{%endraw%}{{ site.hostname }}{%raw%}/centos/$releasever/updates/$basearch/
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=updates
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/{{release_security}}
{{/if}}
{{if release_name|equals>8}}
[BaseOS]
name=CentOS-$releasever - Base
baseurl=https://{%endraw%}{{ site.hostname }}{%raw%}/centos/$releasever/BaseOS/$basearch/os/
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=BaseOS&infra=$infra
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/{{release_security}}

[AppStream]
name=CentOS-$releasever - AppStream
baseurl=https://{%endraw%}{{ site.hostname }}{%raw%}/centos/$releasever/AppStream/$basearch/os/
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=AppStream&infra=$infra
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/{{release_security}}

[PowerTools]
name=CentOS-$releasever - PowerTools
baseurl=https://{%endraw%}{{ site.hostname }}{%raw%}/centos/$releasever/PowerTools/$basearch/os/
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=PowerTools&infra=$infra
enabled=0
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/{{release_security}}
{{/if}}

#additional packages that may be useful
[extras]
name=CentOS-$releasever - Extras
baseurl=https://{%endraw%}{{ site.hostname }}{%raw%}/centos/$releasever/extras/$basearch/{{os_name}}
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=extras
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/{{release_security}}

{{if release_name|equals>5}}
#packages used/produced in the build but not released
[addons]
name=CentOS-$releasever - Addons
baseurl=https://{%endraw%}{{ site.hostname }}{%raw%}/centos/$releasever/addons/$basearch/
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=addons
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/{{release_security}}
{{/if}}

#additional packages that extend functionality of existing packages
[centosplus]
name=CentOS-$releasever - Plus
baseurl=https://{%endraw%}{{ site.hostname }}{%raw%}/centos/$releasever/centosplus/$basearch/{{os_name}}
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=centosplus
gpgcheck=1
enabled=0
gpgkey=file:///etc/pki/rpm-gpg/{{release_security}}

{{if release_name|between>5>6}}
#contrib - packages by Centos Users
[contrib]
name=CentOS-$releasever - Contrib
baseurl=https://{%endraw%}{{ site.hostname }}{%raw%}/centos/$releasever/contrib/$basearch/
#mirrorlist=http://mirrorlist.centos.org/?release=$releasever&arch=$basearch&repo=contrib
gpgcheck=1
enabled=0
gpgkey=file:///etc/pki/rpm-gpg/{{release_security}}
{{/if}}
</script>
{% endraw %}

<p></p>

<pre>
<code id="repo-content">
</code>
</pre>

最后，更新软件包缓存

```
sudo yum makecache
```
