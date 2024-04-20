# TUNA mirrors 主页

注意：如果使用本项目搭建开源镜像站，**必须**：

* 移除所有与清华大学和 TUNA 相关的内容，包括且不限于站名、logo 和各种文档中出现的所有文本和图形；
* 在网站首页恰当标注项目来源（`tuna/mirror-web`）；
* 遵循 GPLv2 协议开放修改后的源代码；

## 注意事项

由于本站部分文档使用 submodule 方式嵌入仓库，clone 后构建前请运行 `git submodule update --init`。

## 编译方式

本站使用 Jekyll 编写，并使用了 Vue、TypeScript、Vite 等前端框架开发。

### 本地开发

为正常运行，一些动态数据文件需要从镜像站下载：

```bash
wget https://mirrors.tuna.tsinghua.edu.cn/static/tunasync.json -O static/tunasync.json
mkdir -p static/status
wget https://mirrors.tuna.tsinghua.edu.cn/static/status/isoinfo.json -O static/status/isoinfo.json
```

编译前，先安装 Ruby (>= 3.0) 和 Node.js (>= 16)，然后执行：

```bash
gem install bundler
bundle install --frozen
npm ci
bundle exec jekyll build # 编译到 `_site/` 目录，或者
bundle exec jekyll serve --livereload # 实时预览
```

在编译时可选的环境变量：

* `JEKYLL_ENV=production`：编译生产版本（启用代码压缩），可能需要较长时间。
* `VISUALIZER=true`：生成 Rollup 编译体积分析文件到 `_stats.html`。

### Docker 部署

仓库中的 `Dockerfile.build` 也可用于编译，推荐在生产环境部署时使用。

可用以下命令构建（如依赖无变化，镜像无需重复构建）：

```bash
docker build -t tunathu/mirror-web -f Dockerfile.build .
docker pull tunathu/mirror-web # 或者直接拉取
```

构建时，仅需将本地目录挂载到容器中：

```bash
docker run --rm -v /path/to/mirror-web:/data tunathu/mirror-web
```

即可在 `/path/to/mirror-web/_site` 中得到编译结果。

### 编译流程

本项目的编译流程较为复杂，涉及多个组件。简要说明如下：

TODO by shanker

### `fancy-index` 部署

本项目使用 NGINX 的 `fancy-index` 模块美化镜像站的文件列表展示。具体配置方法如下：

TODO by shanker

## 贡献文档

目前文档分为两部分维护，一部分是通用文档（`help/_posts/mirrorz-help-ng-transpiled` 目录），从 [mirrorz-org/mirrorz-docs](https://github.com/mirrorz-org/mirrorz-docs) 生成，在 TUNA 本地化维护在 [tuna/mirrorz-help-ng](https://github.com/tuna/mirrorz-help-ng) ，最终以 submodule 方式引入本仓库。如果您的改动是镜像站通用的，可以向前者贡献内容；如果是 TUNA 特有的，可以向后者 PR 。

另一部分维护在本仓库内（`help/_posts/` 目录），需要向本仓库进行 PR 。`mirror-web` 会逐渐迁移到使用通用文档。

### 基本步骤

1. Fork 本项目并 clone
2. 创建分支 `git checkout -b foo-doc`
3. 在 `help/_post` 中建立文档文件，文件名格式为 `年-月-日-名称.md`
4. 用 Markdown 语法编写文档
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
