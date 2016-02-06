# TUNA mirrors 主页

## 运行 Demo 

本站使用 Jekyll 编写

```
bundle
jekyll build
```

为正常运行，一些动态数据文件需要下载

```
wget https://mirrors.tuna.tsinghua.edu.cn/static/tunasync.json -O static/tunasync.json
wget https://mirrors.tuna.tsinghua.edu.cn/static/tunet.json -O static/tunet.json
```

之后 `jekyll serve` 即可运行 demo.
