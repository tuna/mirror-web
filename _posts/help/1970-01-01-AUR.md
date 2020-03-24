---
mirrorid: AUR
category: help
layout: help
---

# AUR 镜像使用帮助

## yaourt 用户

修改 `/etc/yaourtrc`，去掉 `# AURURL` 的注释，修改为

```
AURURL="https://{{ site.aur }}"
```

## yay 用户

执行以下命令修改 aururl :

```
yay --aururl "https://{{ site.aur }}" --save
```

修改的配置文件位于 `~/.config/yay/config.json` ，还可通过以下命令查看修改过的配置：

```
yay -P -g
```
