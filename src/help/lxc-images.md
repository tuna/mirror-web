## LXC Images 镜像帮助

LXC 1.0 以上版本增加了 `download` 模版，支持下载定义好的系统镜像。

欲使用 TUNA 镜像进行下载加速，可以在 `lxc-create -t download` 的选项部分，
增加 `--server mirrors.tuna.tsinghua.edu.cn/lxc-images` 即可，例如:

```
# lxc-create -t download -n my-container -- --server mirrors.tuna.tsinghua.edu.cn/lxc-images
```
