# TUNA 镜像站主页

注意：如果使用本项目搭建开源镜像站，**必须**：

* 移除所有与清华大学和 TUNA 相关的内容，包括且不限于站名、logo 和各种文档中出现的所有相关文本和图形；
* 在网站首页恰当标注项目来源（`tuna/mirror-web`）；
* 遵循 GPLv2 协议开放修改后的源代码；

## 配置修改

除具体页面内容外，可修改的配置还包括：

* `_config.yml`：Jekyll 配置文件，包括站点名称、描述、链接等；请不要轻易改动构建配置。
* `_data/options.yml`：Jekyll 数据文件，主要包括各个镜像的简要描述和部分特殊镜像的配置。请仿照已有的配置进行修改。
* `geninfo/genisolist.ini`：生成直接下载链接的配置文件。具体内容修改请提交到 [mirrorz-org/genisolist](https://github.com/mirrorz-org/genisolist)。

## 编译方式

本站使用 Jekyll 编写，并使用了 Vue、TypeScript、Vite 等前端框架开发。

由于本站部分文档使用 submodule 方式嵌入仓库，clone 后构建前请运行 `git submodule update --init`。

### 本地开发

为正常运行，一些动态数据文件需要从镜像站下载：

```bash
wget https://mirrors.tuna.tsinghua.edu.cn/static/tunasync.json -O static/tunasync.json
mkdir -p static/status
wget https://mirrors.tuna.tsinghua.edu.cn/static/status/isoinfo.json -O static/status/isoinfo.json
```

编译前，先安装 Ruby (>= 3.0) 和 Node.js (>= 18)，然后执行：

```bash
bundle install --deployment
npm install
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

本项目使用 Jekyll 作为唯一入口完成全部的构建流程。其具体流程是：

1. Jekyll 读取 `_config.yml` 和全部需要渲染的页面，并读取 `_data` 中的数据文件；
2. Jekyll 调用 Zhelp 插件（`_plugins/helpz.rb`），生成帮助文档内容。该插件以 `highest` 优先级注册，确保在其他 Generator（包括 Vite）之前执行：
   1. 插件从 `_config.yml` 的 `helpz` 配置中读取语言、集合标签等参数；
   2. 插件通过 `node --import=tsx/esm` 调用 `_helpz/generate.mjs` 脚本，传入输出目录、语言和站点配置；
   3. `generate.mjs` 读取 `_helpz/enabled.yaml`，获取启用的页面列表；
   4. 对每个页面，按照 **local 优先于 global** 的策略加载文件：
      - 从 `_helpz/local/{page}/` 或 `_helpz/global/{page}/` 加载配置文件 `{lang}.yaml`（两者合并，local 覆盖 global）；
      - 按照同样的逻辑从两个目录中加载 Markdown 内容块 `{block}.{lang}.md`；
   5. 使用 markdown-it 配合 MyST 插件解析 Markdown，处理其中的 `ztmpl` Directive 和 Role：
      - 通过 Hogan.js 编译 Mustache 模板；
      - 通过 React SSR（`templates.jsx`）生成交互式表单的 HTML；
      - 通过 highlight.js 完成代码块的语法高亮；
   6. 输出带有 YAML front matter 的 Jekyll 兼容 Markdown 文件到 `.jekyll-cache/helpz/`；
   7. 插件将输出目录注册为 Jekyll 的 `help` 集合，供后续渲染使用；
3. Jekyll 调用 vite 的 Jekyll 插件，将所有的前端代码编译到 `_site/assets` 目录：
  1. 插件将需要传递给 vite 的数据编码为 JSON，并写入临时文件；
  2. 插件执行 vite 命令，根据 `_vite.config.mjs` 中的配置编译前端代码；
     1. `_vite.config.mjs` 读取临时文件，向 vite 流程中注册虚拟导入文件；
     2. vite 中注册的 `vite-plugin-ruby` 插件导入其配置文件；
     3. vite 加载 `_src/entrypoints` 中的代码，并生成依赖树；
     4. vite 中注册的 `vite-plugin-legacy` 插件增加一份输出版本，并增加 legacy 标志；
     5. vite 完成各代码的编译：
        - 对于 Vue 组件，调用 Vue 的 SFC 编译器完成编译；
          - 对于其中模板（`<template>`）使用 Liquid 语法的组件，调用 Liquid 编译器完成编译；
        - 对于 TypeScript 文件，调用 TypeScript 编译器完成编译；
     6. vite 完成代码各输出版本的后处理：
        - 对于 legacy 标志的输出版本，`vite-plugin-legacy` 使用 babel 转译，并记录所需的 polyfill；
        - 对于正常的输出版本，正常编译；
     7. vite 产生编译结果：
        1. `vite-plugin-legacy` 新建一个 vite 流水线，并将所需的 polyfill 作为入口，并将编译结果插入到 legacy 版本的输出中；
        2. 对上述 `vite-plugin-legacy` 产生的 polyfill 代码，再次使用 babel 转译；
        3. 新建一个 vite 流水线，并将 `_src/entrypoints-njs` 中的代码作为入口，编译结果插入到正常版本的输出中；
           - 其中，使用 babel 转译生成的 njs 代码，确保其可以在 NGINX 的 njs 模块中运行；
        4. `vite-plugin-ruby` 对所有输出的文件，生成一个 manifest 文件，用于 Jekyll 插件读取；
     8. vite 输出编译结果到 `.jekyll-cache/vite-dist` 下；
  3. 插件将 vite 的输出文件注册到 Jekyll 的静态文件列表中；
  4. 插件读入 vite 产生的 manifest 文件，备用；
4. Jekyll 完成所有的页面渲染：
   - 对于静态文件，直接拷贝到 `_site` 目录；
   - 对于需要渲染的 html 文件，使用 Liquid 渲染引擎渲染；
     - 其中，需要调用 Jekyll 的 vite 插件注册的 Liquid 指令，生成前端代码的引用，后者根据已经加载的 manifest 文件，生成正确的引用指令。

### `fancy-index` 部署

本项目使用 NGINX 的 `fancy-index` 模块美化镜像站的文件列表展示。具体配置方法如下：

1. 确保 nginx 安装了 `ngx_http_fancyindex_module` 和 `ngx_http_js_module`，并确保后者的版本不低于 0.7.9；
2. 在 `nginx.conf` 对应的 `server` 配置块中添加如下配置：

   ```nginx
   js_path /path/to/build_output/static/njs;

   # 以下设定不能修改，以便与 mirror-web 的前端代码配合
   fancyindex_time_format "%d %b %Y %H:%M:%S +0000";
   fancyindex_show_path on;
   fancyindex_header /fancy-index/before;
   fancyindex_footer /fancy-index/after;

   # 以下设定为推荐设置，fancyindex 的其它设定亦可按需修改
   fancyindex_exact_size off;
   fancyindex_name_length 256;

   location /fancy-index {
     internal;
     root /path/to/build_output;
     subrequest_output_buffer_size 100k;
     js_import fancyIndexRender from fancy_index.njs;

     location = /fancy-index/before {
       js_content fancyIndexRender.fancyIndexBeforeRender;
     }
     location = /fancy-index/after {
       js_content fancyIndexRender.fancyIndexAfterRender;
     }
   }
   ```

3. 然后在需要开启目录浏览的 `location` 配置块中添加：

   ```nginx
   fancyindex on;
   ```

### `genisolist` 部署

本项目使用 [`mirrorz-org/genisolist`](https://github.com/mirrorz-org/genisolist) 生成供前端渲染的 JSON 文件，请查看该项目的文档进行部署和修改。

如果增加了新的配置，不要忘记在 `geninfo/genisolist.ini` 中增加新的 `!include` 指令。

## 贡献文档

帮助文档统一通过 Zhelp 系统管理，源文件位于 `_helpz/` 目录。文档分为两个层级维护：

* **通用文档**（`_helpz/global/`）：以 git submodule 方式引入 [mirrorz-org/mirrorz-docs](https://github.com/mirrorz-org/mirrorz-docs)，包含各镜像站通用的帮助内容。如果您的改动适用于所有 mirrorz 镜像站，请向该上游仓库提交 PR。
* **本地文档**（`_helpz/local/`）：维护在本仓库内，用于存放站点特有的配置覆盖和文档。如果您的改动仅适用于 TUNA 镜像站，请向本仓库提交 PR。

构建时，`_helpz/local/{page}/` 中的同名文件会覆盖 `_helpz/global/{page}/` 中的对应文件，因此本地文档可对通用文档进行定制化调整。

### 帮助页面的目录结构

每个帮助页面对应 `_helpz/global/` 或 `_helpz/local/` 下的一个子目录，其典型结构如下：

```
_helpz/global/{page}/
|
+-- zh.yaml            # 配置文件：定义页面标题、表单输入变量、内容块列表等
+-- index.zh.md        # 默认内容块（Markdown，支持 MyST ztmpl 指令）
```

* `zh.yaml`：页面配置，包含标题（`_` 字段）、输入变量定义（`input`）、内容块列表（`block`，默认为 `["index"]`）等。
* `{block}.{lang}.md`：Markdown 内容文件，支持使用 MyST 的 `ztmpl` 指令嵌入可交互的模板代码块。

要启用一个新的帮助页面，需在 `_helpz/enabled.yaml` 中添加对应的页面名称。

### 基本步骤

1. Fork 本项目并 clone，执行 `git submodule update --init` 拉取通用文档
2. 创建分支 `git checkout -b foo-doc`
3. 根据改动范围，在 `_helpz/local/{page}/` 或 `_helpz/global/{page}/` 中新建或修改文档文件
4. 如为新增页面，在 `_helpz/enabled.yaml` 中添加页面名称
5. 运行 `bundle exec jekyll serve --livereload` 本地预览效果
6. 提交并推送代码，发送 Pull Request

### 写作规范

1. 对于相对不知名的镜像项目，首先用一两句话介绍该项目
2. 写明使用方法，使用 GitHub Flavored Markdown 格式
3. 中英文字符间应留一个空格

### MyST `ztmpl` 指令

帮助文档中可使用 MyST 语法的 `ztmpl` Directive 嵌入动态模板代码块。指令内的内容支持 Mustache 模板语法（`{{variable}}`），构建时由 Hogan.js 编译，前端运行时根据用户的表单选择动态渲染。

可用的指令选项包括：

* `lang`：代码块的语言标识，用于语法高亮
* `input`：空格分隔的输入变量名列表，指定该代码块关联的表单控件
* `global`：标记该指令为全局表单，用于在页面级别注册输入变量
* `path`：用于标记该代码块中的代码可能需要被用户写入的目的路径，以便前端在渲染时提供相应的提示

行内模板可通过 MyST Role 语法 `` {ztmpl}`模板内容` `` 使用，支持的行内选项有：
* `lang`：同上，使用形式为： `` {ztmpl lang=<language>}`模板内容` ``
