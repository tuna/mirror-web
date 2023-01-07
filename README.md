# TUNA mirrors 主页

注意：如果使用本项目搭建开源镜像站，**必须**：

* 移除所有与清华大学和 TUNA 相关的内容，包括且不限于站名、logo 和各种文档中出现的所有文本和图形；
* 在网站首页恰当标注项目来源（`tuna/mirror-web`）；
* 遵循 GPLv2 协议开放修改后的源代码；

## 运行 Demo

### 直接编译

本站使用 Jekyll 编写，并使用 babel 编译 ECMAScript6，因此必须安装 ruby >= 2.0 和 nodejs.

### Build In Docker

```
cd mirror-web
docker build -t builden -f Dockerfile.build .
docker run -it -v /path/to/mirror-web/:/data builden
```

为正常运行，一些动态数据文件需要下载

```
wget https://mirrors.tuna.tsinghua.edu.cn/static/tunasync.json -O static/tunasync.json
mkdir -p static/status
wget https://mirrors.tuna.tsinghua.edu.cn/static/status/isoinfo.json -O static/status/isoinfo.json
```

之后 `jekyll serve` 即可运行 demo.

## 贡献文档

### 基本步骤

1. Fork 本项目并 clone
2. 创建分支 `git checkout -b foo-doc`
3. 在 `help/_post` 中建立文档文件，文件名格式为 `年-月-日-名称.md`
4. 用 markdown 语法编写文档
5. 提交并推送代码
6. 发送 Pull Request

### 写作规范

1. 对于相对不知名的镜像项目，首先用一两句话介绍该项目
2. 写明使用方法, 使用 Github Flavored Markdown 格式
3. 中英文字符间应留一个空格

### 特殊用法

#### 表单选择
例如 <http://mirrors.tuna.tsinghua.edu.cn/help/mongodb/> 中，通过表单选择操作系统和版本号，建议直接使用 Vue.js

