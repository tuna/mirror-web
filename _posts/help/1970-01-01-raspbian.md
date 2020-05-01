---
category: help
layout: help
mirrorid: raspbian
---

## Raspbian 镜像使用帮助

### Raspbian 简介

Raspbian 是专门用于 ARM 卡片式计算机 Raspberry Pi® “树莓派”的操作系统，
其基于 Debian 开发，针对 Raspberry Pi 硬件优化。

Raspbian 由树莓派的开发与维护机构 The Raspberry Pi Foundation
“树莓派基金会” 官方支持，并推荐用作树莓派的首选系统。

### 系统架构与版本

架构：

*  armhf

版本：

*  wheezy
*  jessie
*  stretch
*  buster

注：Raspbian 系统由于从诞生开始就基于（为了armhf，也必须基于）当时还是
testing 版本的 7.0/wheezy，所以 Raspbian 不倾向于使用 stable/testing
表示版本。

### 使用说明


<form class="form-inline">
<div class="form-group">
	<label>选择你的 Raspbian 对应的 Debian 版本: </label>
	<select class="form-control release-select" data-template="#apt-template" data-target="#apt-content">
	  <option data-release="wheezy">Debian 7 (wheezy)</option>
	  <option data-release="jessie">Debian 8 (jessie)</option>
	  <option data-release="stretch">Debian 9 (stretch)</option>
	  <option data-release="buster" selected>Debian 10 (buster)</option>
	</select>
</div>
</form>



{% raw %}
<script id="apt-template" type="x-tmpl-markup">
# 编辑 `/etc/apt/sources.list` 文件，删除原文件所有内容，用以下内容取代：
deb http://{%endraw%}{{ site.hostname }}{%raw%}/raspbian/raspbian/ {{release_name}} main non-free contrib rpi
deb-src http://{%endraw%}{{ site.hostname }}{%raw%}/raspbian/raspbian/ {{release_name}} main non-free contrib rpi

# 编辑 `/etc/apt/sources.list.d/raspi.list` 文件，删除原文件所有内容，用以下内容取代：
deb http://{%endraw%}{{ site.hostname }}{%raw%}/raspberrypi/ {{release_name}} main ui
</script>
{% endraw %}

<p></p>
<pre>
<code id="apt-content">
</code>
</pre>



注意：网址末尾的`raspbian`重复两次是必须的。因为Raspbian的仓库中除了APT软件源还包含其他代码。APT软件源不在仓库的根目录，而在`raspbian/`子目录下。

编辑镜像站后，请使用`sudo apt-get update`命令，更新软件源列表，同时检查您的编辑是否正确。


### 相关链接

#### Raspbian 链接

*  Raspbian 主页: [https://www.raspberrypi.org/downloads/raspbian/](https://www.raspberrypi.org/downloads/raspbian/)
*  文档：[https://www.raspberrypi.org/documentation/raspbian/](https://www.raspberrypi.org/documentation/raspbian/)
*  Bug 反馈：[https://www.raspberrypi.org/forums/viewtopic.php?t=243717](https://www.raspberrypi.org/forums/viewtopic.php?t=243717)
*  镜像列表: [http://www.raspbian.org/RaspbianMirrors](http://www.raspbian.org/RaspbianMirrors)

#### 树莓派链接

*  树莓派基金会主页: [http://www.raspberrypi.org/](http://www.raspberrypi.org/)
*  树莓派基金会论坛Raspbian版块: [http://raspberrypi.org/phpBB3/viewforum.php?f=66](http://raspberrypi.org/phpBB3/viewforum.php?f=66)

### 关于本文档

本文档内容的原始版本由 Raspberry Pi
中文社区“树莓爱好者论坛”提供。按照[知识共享署名-非商业性使用
3.0
中国大陆许可协议](http://creativecommons.org/licenses/by-nc/3.0/cn/)授权清华大学镜像站使用。

TUNA 提供的修改版本同样使用[知识共享署名-非商业性使用
3.0
中国大陆许可协议](http://creativecommons.org/licenses/by-nc/3.0/cn/)。
