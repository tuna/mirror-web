---
category: help
layout: help
mirrorid: ros
---

## ROS 镜像使用帮助


新建 `/etc/apt/sources.list.d/ros-latest.list`，内容为：

<form class="form-inline">
<div class="form-group">
	<label>你的Debian/Ubuntu版本: </label>
	<select class="form-control release-select" data-template="#apt-template" data-target="#apt-content">
		<option data-os="debian" data-release="jessie">Debian 8 (Jessie)</option>
		<option data-os="debian" data-release="stretch">Debian 9 (Stretch)</option>
		<option data-os="ubuntu" data-release="trusty">Ubuntu 14.04 LTS</option>
		<option data-os="ubuntu" data-release="xenial">Ubuntu 16.04 LTS</option>
		<option data-os="ubuntu" data-release="bionic" selected>Ubuntu 18.04 LTS</option>		
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
deb https://{%endraw%}{{ site.hostname }}{%raw%}/ros/ubuntu/ {{release_name}} main
</script>
{%endraw%}

然后再输入如下命令，信任ROS的GPG Key，并更新索引：

```
sudo apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
sudo apt update
```
