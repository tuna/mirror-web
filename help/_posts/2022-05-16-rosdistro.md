---
category: help
layout: help
mirrorid: rosdistro
---

## rosdistro 镜像使用帮助

在 rosdep 使用流程中，我们会有如下两个步骤

```bash
sudo rosdep init
rosdep update
```

我们替换为以下步骤

```bash
# 手动模拟 rosdep init
sudo mkdir -p /etc/ros/rosdep/sources.list.d/
sudo curl -o /etc/ros/rosdep/sources.list.d/20-default.list https://{{ site.hostname }}/github-raw/ros/rosdistro/master/rosdep/sources.list.d/20-default.list
# 为 rosdep update 换源
export ROSDISTRO_INDEX_URL=https://{{ site.hostname }}/rosdistro/index-v4.yaml
rosdep update

# 每次 rosdep update 之前，均需要增加该环境变量
# 为了持久化该设定，可以将其写入 .bashrc 中，例如
echo 'export ROSDISTRO_INDEX_URL=https://{{ site.hostname }}/rosdistro/index-v4.yaml' >> ~/.bashrc
```
