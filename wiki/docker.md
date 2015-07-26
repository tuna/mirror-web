## LXC Docker 镜像使用帮助

**注意: 本镜像只提供 Debian/Ubuntu 的 lxc-docker 软件包，非 dockerhub**

请使用 root 权限执行以下命令

```bash
# 添加源
echo deb http://mirrors.tuna.tsinghua.edu.cn/docker docker main > /etc/apt/sources.list.d/docker.list
# 信任公钥
apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 36A1D7869245C8950F966E92D8576A8BA88D21E9
# 安装
apt-get update
apt-get install lxc-docker
```

