---
category: help
layout: help
mirrorid: rpmfusion
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# RPMFusion 软件仓库镜像使用帮助

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



### 安装基础包

首先安装提供基础配置文件和 GPG 密钥的 `rpmfusion-*.rpm`。

#### Fedora 用户



{% raw %}
<script id="template-0" type="x-tmpl-markup">
{{sudo}}yum install --nogpgcheck http://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm http://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-shell" data-template="#template-0" data-select="#http-select,#sudo-select">
</code>
</pre>


或者如下直接用镜像中的 rpm 包：



{% raw %}
<script id="template-1" type="x-tmpl-markup">
{{sudo}}yum install --nogpgcheck {{http_protocol}}{{mirror}}/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm {{http_protocol}}{{mirror}}/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-1" class="language-plaintext" data-template="#template-1" data-select="#http-select,#sudo-select">
</code>
</pre>


#### CentOS/RHEL 用户



<form class="form-inline">
<div class="form-group">
  <label>发行版：</label>
    <select id="select-2-0" class="form-control content-select" data-target="#content-2">
      <option data-version="7" selected>CentOS/RHEL 7</option>
      <option data-version="6">CentOS/RHEL 6</option>
      <option data-version="8">CentOS/RHEL 8</option>
      <option data-version="9">CentOS/RHEL 9</option>
    </select>
</div>
</form>

{% raw %}
<script id="template-2" type="x-tmpl-markup">
{{sudo}}yum localinstall --nogpgcheck {{http_protocol}}{{mirror}}/free/el/rpmfusion-free-release-{{version}}.noarch.rpm {{http_protocol}}{{mirror}}/nonfree/el/rpmfusion-nonfree-release-{{version}}.noarch.rpm
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-2" class="language-plaintext" data-template="#template-2" data-select="#http-select,#sudo-select,#select-2-0">
</code>
</pre>


注意：没有将当前用户设为管理员的用户，需要将 `sudo CMD` 替换为 `su -c 'CMD'`，并输入 root 密码。

### 修改链接指向镜像站

安装成功后，修改 `/etc/yum.repos.d/` 目录下以 `rpmfusion` 开头，以 `.repo` 结尾的文件。具体而言，需要将文件中的 `baseurl=` 开头的行等号后面链接中的 `http://download1.rpmfusion.org/` 替换为



{% raw %}
<script id="template-3" type="x-tmpl-markup">
{{http_protocol}}{{mirror}}/
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-3" class="language-plaintext" data-template="#template-3" data-select="#http-select,#sudo-select">
</code>
</pre>


替换后的文件类似如下：



{% raw %}
<script id="template-4" type="x-tmpl-markup">
[rpmfusion-free]
name=RPM Fusion for Fedora $releasever - Free
baseurl={{http_protocol}}{{mirror}}/free/fedora/releases/$releasever/Everything/$basearch/os/
mirrorlist=http://mirrors.rpmfusion.org/mirrorlist?repo=free-fedora-$releasever&arch=$basearch
enabled=1
metadata_expire=7d
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-rpmfusion-free-fedora-$releasever-$basearch

[rpmfusion-free-debuginfo]
name=RPM Fusion for Fedora $releasever - Free - Debug
mirrorlist=http://mirrors.rpmfusion.org/mirrorlist?repo=free-fedora-debug-$releasever&arch=$basearch
enabled=0
metadata_expire=7d
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-rpmfusion-free-fedora-$releasever-$basearch

[rpmfusion-free-source]
name=RPM Fusion for Fedora $releasever - Free - Source
baseurl={{http_protocol}}{{mirror}}/free/fedora/releases/$releasever/Everything/source/SRPMS/
mirrorlist=http://mirrors.rpmfusion.org/mirrorlist?repo=free-fedora-source-$releasever&arch=$basearch
enabled=0
metadata_expire=7d
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-rpmfusion-free-fedora-$releasever-$basearch
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-4" class="language-ini" data-template="#template-4" data-select="#http-select,#sudo-select">
</code>
</pre>


### 更多

RHEL/CentOS 用户请参考 [RPMFusion 官方指南](http://rpmfusion.org/Configuration)。

