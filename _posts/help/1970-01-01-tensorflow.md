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
<option value="35">3.5</option>
<option value="34">3.4</option>
<option value="27">2.7</option>
</template>
<template v-if="form.os == 'mac'">
<option value="3">3</option>
<option value="2">2</option>
</template>
</select>

<label>TensorFlow 版本: </label>
<select v-model="form.tfver" class="form-control">
<option value="0.12.0">0.12.0</option>
<option value="0.11.0">0.11.0</option>
<option value="0.10.0">0.10.0</option>
</select>

</div>
</form>
<p></p>
<pre>
pip install \
  -i https://pypi.tuna.tsinghua.edu.cn/simple/ \
  https://mirrors.tuna.tsinghua.edu.cn/tensorflow/{{form.os}}/{{form.xpu}}/tensorflow-{{form.tfver}}-{{pytag}}.whl
</pre>
</div>

<script>
var vue = new Vue({
	el: "#content-form",
	data: {
		form: {
			xpu: "gpu",
			os: "linux",
			python: "35",
			tfver: "0.12.0"
		}
	},
	computed: {
		pytag: function() {
			if (this.form.os === "linux") {
				if (this.form.python === "27") {
					return "cp" + this.form.python + "-none-linux_x86_64";
				} 
				return "cp" + this.form.python + "-cp"+this.form.python+"m-linux_x86_64";
			} else if (this.form.os === "mac") {
				return "py" + this.form.python + "-none-any";
			}
		}
	},
	watch: {
		"form.os": function (newOS) {
			if (newOS === "linux") {
				this.form.python = "35";
			} else if (newOS === "mac") {
				this.form.python = "3";
			}
		}
	}
});
</script>
{% endraw %}
