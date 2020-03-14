---
category: help
layout: help
mirrorid: kuberntes
---

kubernetes 镜像使用帮助
===================

Kubernetes 是用于自动部署，扩展和管理容器化应用程序的开源系统。详情可见 [官方介绍](https://kubernetes.io/zh/)。

在命令行中执行：

```
curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
cat <<EOF | sudo tee /etc/apt/sources.list.d/kubernetes.list
deb https://mirrors.tuna.tsinghua.edu.cn/kubernetes/apt kubernetes-xenial main
EOF
```

即可永久更改镜像源。
