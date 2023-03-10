---
category: help
layout: help
mirrorid: nix-channels
---

# Nix Channels 镜像使用帮助

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
	  <option data-sudo="sudo " selected>是</option>
	  <option data-sudo="">否</option>
	</select>
</div>
</form>



### Nixpkgs binary cache

目前并未提供 nix-darwin 的 binary cache，请使用官方源或 SJTUG。

以优先选择镜像，备选源站为例，选择以下配置之一：

- 单独安装的 Nix：编辑配置文件添加或修改如下项（多用户安装修改 `/etc/nix/nix.conf`，单用户安装修改 `~/.config/nix/nix.conf`）：

    

{% raw %}
<script id="template-0" type="x-tmpl-markup">
    substituters = {{http_protocol}}{{mirror}}/store https://cache.nixos.org/
    </script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-plaintext" data-template="#template-0" data-select="#http-select,#sudo-select">
</code>
</pre>


- NixOS 21.11 及之前的版本在 `configuration.nix` 中使用如下配置（https://cache.nixos.org 会被自动添加）

    

{% raw %}
<script id="template-1" type="x-tmpl-markup">
    nix.binaryCaches = [ "{{http_protocol}}{{mirror}}/store" ];
    </script>
{% endraw %}

<p></p>

<pre>
<code id="content-1" class="language-nix" data-template="#template-1" data-select="#http-select,#sudo-select">
</code>
</pre>


- NixOS 22.05 及之后的版本在 `configuration.nix` 中使用如下配置（https://cache.nixos.org 会被自动添加）：

    

{% raw %}
<script id="template-2" type="x-tmpl-markup">
    nix.settings.substituters = [ "{{http_protocol}}{{mirror}}/store" ];
    </script>
{% endraw %}

<p></p>

<pre>
<code id="content-2" class="language-nix" data-template="#template-2" data-select="#http-select,#sudo-select">
</code>
</pre>


### Nixpkgs channel

单独安装的 Nix 替换 `nixpkgs-unstable` 命令如下：



{% raw %}
<script id="template-3" type="x-tmpl-markup">
nix-channel --add {{http_protocol}}{{mirror}}/nixpkgs-unstable nixpkgs
nix-channel --update
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-3" class="language-bash" data-template="#template-3" data-select="#http-select,#sudo-select">
</code>
</pre>


替换 NixOS channel 命令如下（以 root 执行）：



<form class="form-inline">
<div class="form-group">
  <label>系统版本：</label>
    <select id="select-4-0" class="form-control content-select" data-target="#content-4">
      <option data-version="22.11" selected>22.11</option>
      <option data-version="unstable">unstable</option>
      <option data-version="22.05">22.05</option>
      <option data-version="21.11">21.11</option>
    </select>
</div>
</form>

{% raw %}
<script id="template-4" type="x-tmpl-markup">
nix-channel --add {{http_protocol}}{{mirror}}/nixos-{{version}} nixos
nix-channel --update
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-4" class="language-bash" data-template="#template-4" data-select="#http-select,#sudo-select,#select-4-0">
</code>
</pre>


