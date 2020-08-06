---
category: help
layout: help
mirrorid: ros2
---

## ROS2 镜像使用帮助


新建 `/etc/apt/sources.list.d/ros2-latest.list`，内容为：

<form class="form-inline">
<div class="form-group">
	<label>你的Debian/Ubuntu版本: </label>
	<select class="form-control release-select" data-template="#apt-template" data-target="#apt-content">
		<option data-os="debian" data-release="stretch">Debian 9 (Stretch)</option>
		<option data-os="debian" data-release="buster">Debian 10 (Buster)</option>
		<option data-os="ubuntu" data-release="xenial">Ubuntu 16.04 LTS</option>
		<option data-os="ubuntu" data-release="bionic" selected>Ubuntu 18.04 LTS</option>		
		<option data-os="ubuntu" data-release="focal">Ubuntu 20.04 LTS</option>
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
deb https://{%endraw%}{{ site.hostname }}{%raw%}/ros2/ubuntu/ {{release_name}} main
</script>
{%endraw%}

然后再输入如下命令，信任 ROS 的 GPG Key，并更新索引：

```
sudo apt install curl gnupg2
curl -s https://raw.githubusercontent.com/ros/rosdistro/master/ros.asc | sudo apt-key add -
sudo apt update
```

Reference: https://index.ros.org/doc/ros2/Installation/Crystal/Linux-Install-Binary/