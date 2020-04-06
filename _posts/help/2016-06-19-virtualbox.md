---
category: help
layout: help
mirrorid: virtualbox
---

# VirtualBox 镜像使用帮助

[Oracle Virtualbox](https://www.virtualbox.org/) VirtualBox 是一款开源虚拟机软件。由德国 Innotek 公司开发，Sun Microsystems 公司出品。使用Qt编写，在 Sun 被 Oracle 收购后正式更名成 Oracle VM VirtualBox。采用 GPL 协议开源。

## Microsoft Windows

[点击下载 Windows 最新版](https://{{ site.hostname }}/virtualbox/virtualbox-Win-latest.exe)


## Macintosh OS X

[点击下载 OS X 最新版](https://{{ site.hostname }}/virtualbox/virtualbox-osx-latest.dmg)

# Linux

## 通过编译好的二进制包安装

访问该镜像下最新的目录（例如`5.0.24`），找到名为<发行版名称>~<发行代号>~<架构> 的文件。
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

```shell
wget -q https://www.virtualbox.org/download/oracle_vbox_2016.asc -O- | sudo apt-key add -
```

其他版本

```shell
wget -q https://www.virtualbox.org/download/oracle_vbox.asc -O- | sudo apt-key add -
```

再选择你的 Debian/Ubuntu 版本，将文本框中内容写进`/etc/apt/sources.list.d/virtualbox.list`

<form class="form-inline">
<div class="form-group">
  <label>你的Debian/Ubuntu版本: </label>
  <select class="form-control release-select" data-template="#apt-template" data-target="#apt-content">
	  <option data-os="debian" data-release="buster" selected>Debian 10 (Buster)</option>
    <option data-os="debian" data-release="stretch">Debian 9 (Stretch)</option>
    <option data-os="debian" data-release="jessie">Debian 8 (Jessie)</option>
	  <option data-os="ubuntu" data-release="bionic">Ubuntu 18.04 LTS</option>
    <option data-os="ubuntu" data-release="xenial">Ubuntu 16.04 LTS</option>
    <option data-os="ubuntu" data-release="trusty">Ubuntu 14.04 LTS</option>
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
deb {{if os_name|equals>ubuntu}}https{{else}}http{{/if}}://{%endraw%}{{ site.hostname }}{%raw%}/virtualbox/apt/ {{release_name}} contrib
</script>
{% endraw %}

安装 VirtualBox:

```
sudo apt-get update
sudo apt-get install virtualbox-5.0
```

### RHEL/CentOS 用户


新建 `/etc/yum.repos.d/virtualbox.repo`，内容为

```
[virtualbox]
name=Virtualbox Repository
baseurl=https://{{ site.hostname }}/virtualbox/rpm/el$releasever/
gpgcheck=0
enabled=1
```

刷新缓存并安装 `virtualbox` 即可。

```
sudo yum makecache
sudo yum install VirtualBox-5.1
```
