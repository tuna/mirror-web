---
layout: help
category: help
mirrorid: CocoaPods
---

## CocoaPods 镜像使用帮助

CocoaPods 是一个 Cocoa 和 Cocoa Touch 框架的依赖管理器，具体原理和 Homebrew 有点类似，都是从 GitHub 下载索引，然后根据索引下载依赖的源代码。

对于旧版的 CocoaPods 可以使用如下方法使用 tuna 的镜像：

```
$ pod repo remove master
$ pod repo add master https://{{ site.hostname }}/git/CocoaPods/Specs.git
$ pod repo update
```

新版的 CocoaPods 不允许用`pod repo add`直接添加master库了，但是依然可以：

```
$ cd ~/.cocoapods/repos 
$ pod repo remove master
$ git clone https://{{ site.hostname }}/git/CocoaPods/Specs.git master
```

最后进入自己的工程，在自己工程的`podFile`第一行加上：

```
source 'https://{{ site.hostname }}/git/CocoaPods/Specs.git'
```
