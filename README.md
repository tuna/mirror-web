# TUNA mirrors 主页

## 运行 Demo 

本站使用 Jekyll 编写，并使用 babel 编译 ECMAScript6，因此必须安装 ruby >= 2.0 和 nodejs.

```
bundle install
jekyll build
```

为正常运行，一些动态数据文件需要下载

```
wget https://mirrors.tuna.tsinghua.edu.cn/static/tunasync.json -O static/tunasync.json
wget https://mirrors.tuna.tsinghua.edu.cn/static/tunet.json -O static/tunet.json
wget https://mirrors.tuna.tsinghua.edu.cn/static/isoinfo.json -O static/isoinfo.json
```

之后 `jekyll serve` 即可运行 demo.

## 贡献文档

### 基本步骤

1. Fork 本项目并 clone
2. 创建分支 `git checkout -b foo-doc`
3. 在 `_posts/help` 中建立文档文件，文件名格式为 `年-月-日-名称.md`
4. 用 markdown 语法编写文档
5. 提交并推送代码
6. 发送 Pull Request

### 写作规范

1. 对于相对不知名的镜像项目，首先用一两句话介绍该项目
2. 写明使用方法, 使用 Github Flavored Markdown 格式
3. 中英文字符间应留一个空格

### 特殊用法

#### 表单选择
例如 <http://mirrors.tuna.tsinghua.edu.cn/help/gitlab-ce/> 中，通过表单选择操作系统和版本号，生成对应配置文件的代码为:

```html
<form class="form-inline">
<div class="form-group">
	<label>你的Debian/Ubuntu版本: </label>
	<select class="form-control release-select" data-template="#apt-template" data-target="#apt-content">
	  <option data-os="debian" data-release="wheezy">Debian 7 (Wheezy)</option>
	  <option data-os="debian" data-release="jessie" selected>Debian 8 (Jessie)</option>
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
deb https://mirrors.tuna.tsinghua.edu.cn/gitlab-ce/{{os_name}} {{release_name}} main
</script>
{% endraw %}
```

`<form>`包含的内容即为表单, `select`标签的`data-template`和`data-target`属性分别指定配置文件模板和 placeholder 的 id，
`option`标签为选项，`data-os` 和 `data-release` 分别指定操作系统名称和版本号。

`code#apt-content`部分是占位符，`{% raw %}{% endraw %}`包含的部分是配置文件模板，通过 `{% raw %}` 标记防止被 jekyll 转义。
模板使用 [Markup.js](https://github.com/adammark/Markup.js/) 语法，可使用 `{{os_name}}` 和 `{{release_name}}` 两个变量，
对应于`option`中的操作系统和版本号设定。



