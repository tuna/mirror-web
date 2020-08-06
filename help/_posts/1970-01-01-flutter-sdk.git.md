---
category: help
layout: help
mirrorid: flutter-sdk.git
---

## Flutter SDK 源码镜像使用帮助

Flutter SDK 默认从 Github 获取更新，如您访问 Github 速度慢，可以在 Flutter 目录下运行命令：

```
git remote set-url origin https://{{ site.hostname }}/git/flutter-sdk.git
```

将上游设置为 TUNA 镜像。

或者通过下面的命令，直接从 Master 构建渠道检出 Flutter 的 SDK： 

```
git clone -b master https://{{ site.hostname }}/git/flutter-sdk.git
./flutter-sdk/bin/flutter --version
```

Flutter 镜像使用方法参见 [Flutter 镜像安装帮助](../flutter)。