---
category: help
layout: help
mirrorid: pypi
---

## pypi 镜像使用帮助

pypi 镜像每 5 分钟同步一次。

### 临时使用

```
pip install -i https://{{ site.pypi }}/simple some-package
```

注意，`simple` 不能少, 是 `https` 而不是 `http`

### 设为默认

升级 pip 到最新的版本 (>=10.0.0) 后进行配置：

```
pip install pip -U
pip config set global.index-url https://{{ site.pypi }}/simple
```

如果您到 pip 默认源的网络连接较差，临时使用本镜像站来升级 pip：

```
pip install -i https://{{ site.pypi }}/simple pip -U
```
