---
category: help
layout: help
mirrorid: tensorflow
---

# TensorFlow 镜像使用帮助

请先安装 python 环境，科学计算用途建议安装 [anaconda](/help/anaconda/)。
TensorFlow 安装方法请参考 <https://www.tensorflow.org/get_started>，把 `https://storage.googleapis.com/` 替换为 `https://mirrors.tuna.tsinghua.edu.cn/`
即可。

或直接运行下列命令，一步完成整个安装过程。


{% raw %}
<div id="content-form">
<form class="form-inline">
<div class="form-group">
<label>计算单元: </label>
<select v-model="form.xpu" class="form-control">
<option value="gpu">GPU</option>
<option value="cpu">CPU</option>
</select>

<label>操作系统: </label>
<select v-model="form.os" class="form-control">
<option value="linux">Linux</option>
<option value="mac">Mac OS X</option>
</select>

<label>Python 版本: </label>
<select v-model="form.python" class="form-control">
<template v-if="form.os === 'linux'">
<option :value="py" v-for="py in fileindex.pythons.linux">{{py}}</option>
</template>
<template v-if="form.os == 'mac'">
<option :value="py" v-for="py in fileindex.pythons.mac">{{py}}</option>
</template>
</select>

<label>TensorFlow 版本: </label>
<select v-model="form.tfver" class="form-control">
<option :value="tfver" v-for="tfver in fileindex.versions">{{tfver}}</option>
</select>

</div>
</form>
<p></p>
<pre>
pip install \
  -i https://pypi.tuna.tsinghua.edu.cn/simple/ \
  https://mirrors.tuna.tsinghua.edu.cn/tensorflow/{{form.os}}/{{form.xpu}}/{{tensorflow}}
</pre>
</div>

<script>
var vue = new Vue({
	el: "#content-form",
	data: {
		form: {
			xpu: "gpu",
			os: "linux",
			python: "",
			tfver: ""
		},
		fileindex: {
			pkglist: [],
			versions: [],
			pythons: {
				linux: [],
				mac: [],
			},
		},
	},
	computed: {
		tensorflow () {
			var os=this.form.os, xpu=this.form.xpu,
				py=this.form.python, tfver=this.form.tfver;

			for (var i in this.fileindex.pkglist) {
				var pkg = this.fileindex.pkglist[i];
				if (pkg.os == os && pkg.xpu == xpu && pkg.python == py && pkg.version == tfver) {
					return pkg.filename;
				}
			}
		}
	},
	watch: {
		"form.os": function (newOS) {
			var pythons = this.fileindex.pythons[this.form.os];
			this.form.python = pythons[0];
		},
		"fileindex": function (newIdx) {
			var pythons = this.fileindex.pythons[this.form.os];
			this.form.python = pythons[0];
			this.form.tfver = this.fileindex.versions[0];
		}
	},
	created: function() {
		var self = this;
		$.getJSON('/tensorflow/releases.json', function(data) {
			self.fileindex = data;
		});
	}
});
</script>
{% endraw %}
