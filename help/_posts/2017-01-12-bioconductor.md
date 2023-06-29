---
category: help
layout: help
mirrorid: bioconductor
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# Bioconductor 软件仓库镜像使用帮助

<form class="form-inline">
<div class="form-group">
	<label>是否使用 HTTPS</label>
	<select id="http-select" class="form-control content-select" data-target="#content-0,#content-1">
	  <option data-http_protocol="https://" selected>是</option>
	  <option data-http_protocol="http://">否</option>
	</select>
</div>
</form>


<form class="form-inline">
<div class="form-group">
	<label>是否使用 sudo</label>
	<select id="sudo-select" class="form-control content-select" data-target="#content-0,#content-1">
	  <option data-sudo="sudo " data-sudoE="sudo -E " selected>是</option>
	  <option data-sudo="" data-sudoE="">否</option>
	</select>
</div>
</form>



Bioconductor 为高通量基因组数据的分析和可视化提供开源工具。Bioconductor 多数软件包采用 R 统计编程语言开发。Bioconductor 每年释出两个版本，并有活跃的用户社区。

使用方法：[Bioconductor](https://www.bioconductor.org) 镜像源配置文件之一是 `.Rprofile`（linux 下位于 `~/.Rprofile`, Windows 下位于 `~\library\base\R\Rprofile`）。

在文末添加如下语句或在R/RStudio终端下键入：



{% raw %}
<script id="template-0" type="x-tmpl-markup">
options(BioC_mirror="{{http_protocol}}{{mirror}}")
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-r" data-template="#template-0" data-select="#http-select,#sudo-select">
</code>
</pre>


即可使用该 Bioconductor 镜像源安装 Bioconductor 软件包。命令如下：



{% raw %}
<script id="template-1" type="x-tmpl-markup">
if (!requireNamespace("BiocManager", quietly = TRUE))
    install.packages("BiocManager")
BiocManager::install("$package_name")
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-1" class="language-r" data-template="#template-1" data-select="#http-select,#sudo-select">
</code>
</pre>



### 离线使用

如果您只能访问内网镜像站，在完成下列步骤后，依然可以正常使用 Bioconductor 镜像。
1. 确保 BiocManager 的版本不低于 `1.30.12`。
2. 使用一台可以访问公网的设备，访问 [https://bioconductor.org/config.yaml](https://bioconductor.org/config.yaml) 下载 `config.yaml`，并将该文件拷贝到 BiocManager 所在的内网设备上。然后，在 `~/.Rprofile` 添加如下配置：

```r
options(
    BIOCONDUCTOR_CONFIG_FILE = "file:///path/to/config.yaml"  # config.yaml 所在的路径
)
```

