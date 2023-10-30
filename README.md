# TUNA mirrors 主页

注意：如果使用本项目搭建开源镜像站，**必须**：

* 移除所有与清华大学和 TUNA 相关的内容，包括且不限于站名、logo 和各种文档中出现的所有文本和图形；
* 在网站首页恰当标注项目来源（`tuna/mirror-web`）；
* 遵循 GPLv2 协议开放修改后的源代码；

## 运行 Demo

由于本站部分文档使用 Submodule 方式嵌入仓库，clone 后构建前请运行：

```bash
git submodule update --init
```

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

目前文档分为两部分维护，一部分是通用文档（helpz 目录），从 [mirrorz-org/mirrorz-docs](https://github.com/mirrorz-org/mirrorz-docs) 生成，在 TUNA 本地化维护在 [tuna/mirrorz-help-ng](https://github.com/tuna/mirrorz-help-ng) ，最终以 submodule 方式引入本仓库。如果您的改动是镜像站通用的，可以向前者贡献内容；如果是 TUNA 特有的，可以向后者 PR 。

另一部分维护在本仓库内（help 目录），需要向本仓库 PR 。mirror-web 会逐渐迁移到使用通用文档。

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

该功能实现在 mirrorz-org/mirrorz-help 中，需要让相应文档迁移到使用通用文档以该功能。

即将推出（TODO）：快速配置、拷贝命令、线路选择……
