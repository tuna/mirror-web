---
category: help
layout: help
mirrorid: virtualbox
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# VirtualBox 软件仓库镜像使用帮助

<form class="form-inline">
<div class="form-group">
	<label>是否使用 HTTPS</label>
	<select id="http-select" class="form-control content-select" data-target="#content-0,#content-1,#content-2,#content-3,#content-4,#content-5,#content-6,#content-7,#content-8">
	  <option data-http_protocol="https://" selected>是</option>
	  <option data-http_protocol="http://">否</option>
	</select>
</div>
</form>


<form class="form-inline">
<div class="form-group">
	<label>是否使用 sudo</label>
	<select id="sudo-select" class="form-control content-select" data-target="#content-0,#content-1,#content-2,#content-3,#content-4,#content-5,#content-6,#content-7,#content-8">
	  <option data-sudo="sudo " data-sudoE="sudo -E " selected>是</option>
	  <option data-sudo="" data-sudoE="">否</option>
	</select>
</div>
</form>



[Oracle Virtualbox](https://www.virtualbox.org/) VirtualBox 是一款开源虚拟机软件。由德国 Innotek 公司开发，Sun Microsystems 公司出品。使用 Qt 编写，在 Sun 被 Oracle 收购后正式更名成 Oracle VM VirtualBox。采用 GPL 协议开源。

## Microsoft Windows



{% raw %}
<script id="template-0" type="x-tmpl-markup">
# Windows 最新版
{{http_protocol}}{{mirror}}/virtualbox-Win-latest.exe
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-bash" data-template="#template-0" data-select="#http-select,#sudo-select">
</code>
</pre>



## Macintosh OS X



{% raw %}
<script id="template-1" type="x-tmpl-markup">
# OS X 最新版
{{http_protocol}}{{mirror}}/virtualbox-osx-latest.dmg
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-1" class="language-bash" data-template="#template-1" data-select="#http-select,#sudo-select">
</code>
</pre>


# Linux

## 通过编译好的二进制包安装



{% raw %}
<script id="template-2" type="x-tmpl-markup">
{{http_protocol}}{{mirror}}
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-2" class="language-plaintext" data-template="#template-2" data-select="#http-select,#sudo-select">
</code>
</pre>


访问该镜像下最新的目录（例如`5.0.24`），找到名为 发行版名称~发行代号~架构 的文件。
如 `virtualbox-5.0_5.0.24-108355~Ubuntu~xenial_i386.deb` 下载安装即可。

目前支持的系统有：

* Ubuntu
* Debian
* Fedora
* openSUSE
* SUSE Linux Enterprise Server
* Oracle Linux / Red Hat Enterprise Linux / CentOS

如果您所使用的发行版不在上述列表之内，请下载通用的`run`文件（例如`VirtualBox-5.0.24-108355-Linux_x86.run`），然后使用 `chmod +x` 给予执行权限后，直接安装即可。

### 通过包管理器安装

#### Debian / Ubuntu 用户

首先信任 Virtualbox 的 GPG 公钥：

对于 Debian 8 和 Ubuntu 16.04 及以上：



{% raw %}
<script id="template-3" type="x-tmpl-markup">
wget -q https://www.virtualbox.org/download/oracle_vbox_2016.asc -O- | {{sudo}}apt-key add -
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-3" class="language-shell" data-template="#template-3" data-select="#http-select,#sudo-select">
</code>
</pre>


其他版本



{% raw %}
<script id="template-4" type="x-tmpl-markup">
wget -q https://www.virtualbox.org/download/oracle_vbox.asc -O- | {{sudo}}apt-key add -
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-4" class="language-shell" data-template="#template-4" data-select="#http-select,#sudo-select">
</code>
</pre>


再选择你的 Debian/Ubuntu 版本，将文本框中内容写进`/etc/apt/sources.list.d/virtualbox.list`



<form class="form-inline">
<div class="form-group">
  <label>发行版：</label>
    <select id="select-5-0" class="form-control content-select" data-target="#content-5">
      <option data-release_name="bullseye" selected>Debian 11 (bullseye)</option>
      <option data-release_name="buster">Debian 10 (buster)</option>
      <option data-release_name="stretch">Debian 9 (stretch)</option>
      <option data-release_name="jessie">Debian 8 (jessie)</option>
      <option data-release_name="jammy">Ubuntu 22.04 LTS</option>
      <option data-release_name="focal">Ubuntu 20.04 LTS</option>
      <option data-release_name="bionic">Ubuntu 18.04 LTS</option>
      <option data-release_name="xenial">Ubuntu 16.04 LTS</option>
      <option data-release_name="trusty">Ubuntu 14.04 LTS</option>
    </select>
</div>
</form>

{% raw %}
<script id="template-5" type="x-tmpl-markup">
deb {{http_protocol}}{{mirror}}/apt/ {{release_name}} contrib
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-5" class="language-bash" data-template="#template-5" data-select="#http-select,#sudo-select,#select-5-0">
</code>
</pre>


安装 VirtualBox:



{% raw %}
<script id="template-6" type="x-tmpl-markup">
{{sudo}}apt-get update
{{sudo}}apt-get install virtualbox
# 此时会列出具体可用版本，选择所需版本安装
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-6" class="language-bash" data-template="#template-6" data-select="#http-select,#sudo-select">
</code>
</pre>


### RHEL/CentOS 用户


新建 `/etc/yum.repos.d/virtualbox.repo`，内容为



{% raw %}
<script id="template-7" type="x-tmpl-markup">
[virtualbox]
name=Virtualbox Repository
baseurl={{http_protocol}}{{mirror}}/rpm/el$releasever/
gpgcheck=0
enabled=1
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-7" class="language-ini" data-template="#template-7" data-select="#http-select,#sudo-select">
</code>
</pre>


刷新缓存并安装 `virtualbox` 即可。



{% raw %}
<script id="template-8" type="x-tmpl-markup">
{{sudo}}yum makecache
{{sudo}}yum search VirtualBox
# 此时会列出具体可用版本，选择所需版本安装即可
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-8" class="language-bash" data-template="#template-8" data-select="#http-select,#sudo-select">
</code>
</pre>


