# TUNA mirrors 主页

## 运行 Demo

### 直接编译

本站使用 Jekyll 编写，并使用 babel 编译 ECMAScript6，因此必须安装 ruby >= 2.0 和 nodejs.

### For Centos
1.安装 nodejs
```
yum install nodejs
```
2.安装 ruby 2.2.4 and rubygems

Step 1: Install Required Packages
```
yum install gcc-c++ patch readline readline-devel zlib zlib-devel
yum install libyaml-devel libffi-devel openssl-devel make
yum install bzip2 autoconf automake libtool bison iconv-devel sqlite-devel
```
Step 2: Compile ruby 2.2.4 source code
```
wget -c https://cache.ruby-lang.org/pub/ruby/2.2/ruby-2.2.4.tar.gz
```
Step 3: Install rubygems
```
wget -c https://rubygems.org/rubygems/rubygems-2.4.8.tgz
ruby setup.rb
```
3. 安装 bundle 和 build
```
gem install bundle
gem install build
```
4. Fork mirrors source code

```
bundle install
jekyll build
```

### Build In Docker
```
cd mirror-web
docker build -t builden -f Dockerfile.build .
docker run -it -v /path/to/mirror-web/:/data builden
```

为正常运行，一些动态数据文件需要下载

```
wget https://mirrors.tuna.tsinghua.edu.cn/static/tunasync.json -O static/tunasync.json
wget https://mirrors.tuna.tsinghua.edu.cn/static/tunet.json -O static/tunet.json
mkdir -p static/status
wget https://mirrors.tuna.tsinghua.edu.cn/static/status/isoinfo.json -O static/status/isoinfo.json
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
例如 <http://mirrors.tuna.tsinghua.edu.cn/help/tensorflow/> 中，通过表单选择操作系统和版本号，建议直接使用 Vue.js
