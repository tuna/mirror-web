---
category: help
layout: help
mirrorid: dart-pub
---

# Pub 镜像安装帮助

[Pub](https://pub.dartlang.org/) 是 Dart 官方的包管理器。跨平台的前端应开发
框架 [Flutter](https://flutter.dev/) 也基于 Dart 并且可以使用大部分 Pub 中的
库。

如果希望通过 TUNA 的 pub 镜像安装软件，只需要设置 [PUB_HOSTED_URL](https://www.dartlang.org/tools/pub/environment-variables)
这个环境变量指向 https://{{ site.hostname }}/dart-pub 即可。

以 bash 为例，临时使用 TUNA 的镜像来安装依赖：

```bash
export PUB_HOSTED_URL="https://{{ site.hostname }}/dart-pub" # pub: pub get 
export PUB_HOSTED_URL="https://{{ site.hostname }}/dart-pub" # flutter: flutter packages get 
```

若希望长期使用 TUNA 镜像：

```bash
echo 'export PUB_HOSTED_URL="https://{{ site.hostname }}/dart-pub"' >> ~/.bashrc
```

Flutter 镜像使用方法参见 [Flutter 镜像安装帮助](../flutter)。