---
mirrorid: docker-ce
layout: help
category: help
---

## Docker Community Edition 镜像使用帮助

**注意: 本镜像只提供 Debian/Ubuntu/Fedora/CentOS/RHEL 的 docker 软件包，非 dockerhub**


### Debian/Ubuntu 用户

以下内容根据 [官方文档](https://docs.docker.com/engine/installation/linux/docker-ce/debian/) 修改而来。

如果你过去安装过 docker，先删掉:

```bash
sudo apt-get remove docker docker-engine docker.io
```

首先安装依赖:

```bash
sudo apt-get install apt-transport-https ca-certificates curl gnupg2 software-properties-common
```
<form class="form-inline">
<div class="form-group">
	<label>根据你的发行版，下面的内容有所不同。你使用的发行版： </label>
	<select class="form-control" v-model="deb_release">
	  <option value="debian" selected>Debian</option>
	  <option value="ubuntu">Ubuntu</option>
	</select>
</div>
</form>


信任 Docker 的 GPG 公钥:

{% raw %}
<p></p>
<pre>
<code id="deb-gpg-content">curl -fsSL https://download.docker.com/linux/{{ deb_release }}/gpg | sudo apt-key add -</code>
</pre>
{% endraw %}


对于 amd64 架构的计算机，添加软件仓库:

{% raw %}
<p></p>
<pre>
<code class="language-bash" id="deb-amd64-content">sudo add-apt-repository \
   "deb [arch=amd64] https://{%endraw%}{{ site.hostname }}{%raw%}/docker-ce/linux/{{deb_release}} \
   $(lsb_release -cs) \
   stable"</code>
</pre>
{% endraw %}


如果你是树莓派或其它ARM架构计算机，请运行:

{% raw %}
<p></p>
<pre>
<code id="deb-arm-content">echo "deb [arch=armhf] https://{%endraw%}{{ site.hostname }}{%raw%}/docker-ce/linux/{{deb_release}} \
     $(lsb_release -cs) stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list</code>
</pre>
{% endraw %}

最后安装

```bash
sudo apt-get update
sudo apt-get install docker-ce
```

### Fedora/CentOS/RHEL

以下内容根据 [官方文档](https://docs.docker.com/engine/installation/linux/docker-ce/centos/) 修改而来。

如果你之前安装过 docker，请先删掉

```bash
sudo yum remove docker docker-common docker-selinux docker-engine
```

安装一些依赖

```bash
sudo yum install -y yum-utils device-mapper-persistent-data lvm2
```

<form class="form-inline">
<div class="form-group">
	<label>根据你的发行版下载repo文件: </label>
	<select class="form-control" v-model="yum_release">
	  <option value="centos" selected>CentOS/RHEL</option>
	  <option value="fedora">Fedora</option>
	</select>
</div>
</form>

{% raw %}
<p></p>
<pre>
<code id="yum-content">wget -O /etc/yum.repos.d/docker-ce.repo https://download.docker.com/linux/{{ yum_release }}/docker-ce.repo</code>
</pre>
{% endraw %}

把软件仓库地址替换为 TUNA:

```bash
sudo sed -i 's+download.docker.com+{{ site.hostname }}/docker-ce+' /etc/yum.repos.d/docker-ce.repo
```

最后安装:

```bash
sudo yum makecache fast
sudo yum install docker-ce
```

{% raw %}
<script>
var vue = new Vue({
    el: "#help-content",
    data: {
        deb_release: 'debian',
        yum_release: 'centos'
    },
    computed: {

    }
});
</script>
{% endraw %}
