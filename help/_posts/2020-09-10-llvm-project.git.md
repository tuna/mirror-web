---
category: help
layout: help
mirrorid: llvm-project.git
---

<!-- 本 markdown 从 mirrorz-org/mirrorz-help 自动生成，如需修改，请修改 mirrorz-org/mirrorz-help 的对应部分 -->

# LLVM Project Git 镜像使用帮助

<form class="form-inline">
<div class="form-group">
	<label>是否使用 HTTPS</label>
	<select id="http-select" class="form-control content-select" data-target="#content-0,#content-1,#content-2">
	  <option data-http_protocol="https://" selected>是</option>
	  <option data-http_protocol="http://">否</option>
	</select>
</div>
</form>


<form class="form-inline">
<div class="form-group">
	<label>是否使用 sudo</label>
	<select id="sudo-select" class="form-control content-select" data-target="#content-0,#content-1,#content-2">
	  <option data-sudo="sudo " data-sudoE="sudo -E " selected>是</option>
	  <option data-sudo="" data-sudoE="">否</option>
	</select>
</div>
</form>



本镜像镜像了如下仓库：

```
https://github.com/llvm/llvm-project.git
```

如需克隆代码，使用



{% raw %}
<script id="template-0" type="x-tmpl-markup">
git clone {{http_protocol}}{{mirror}}
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-0" class="language-plaintext" data-template="#template-0" data-select="#http-select,#sudo-select">
</code>
</pre>


由于仓库体积均较大，执行`git clone`可能需要较长时间，并且没有进度提示，请耐心等候。

若要将 mirror 加入已有代码库，可在已有仓库中运行



{% raw %}
<script id="template-1" type="x-tmpl-markup">
git remote add mirror {{http_protocol}}{{mirror}}
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-1" class="language-plaintext" data-template="#template-1" data-select="#http-select,#sudo-select">
</code>
</pre>


或运行



{% raw %}
<script id="template-2" type="x-tmpl-markup">
git remote set-url origin {{http_protocol}}{{mirror}}
</script>
{% endraw %}

<p></p>

<pre>
<code id="content-2" class="language-plaintext" data-template="#template-2" data-select="#http-select,#sudo-select">
</code>
</pre>


将默认上游设置为镜像站

注：如需要各个子项目的发布版本代码，请至 [GitHub Release 镜像](/help/github-release) 中 llvm-project 一节。

