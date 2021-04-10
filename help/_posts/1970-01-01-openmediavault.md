---
category: help
layout: help
mirrorid: OpenMediaVault
---

## OpenMediaVault 镜像使用帮助

Open Media Vault 是一款基于 Debian 的 NAS 操作系统，本站提供 OpenMediaVault 的镜像，以加快国内访问速度。

以下方法自 5.6.3-1 开始可用（2021-04-07）

### 替换 Open Media Vault 镜像源

登录到已经部署的 Open Media Vault 使用如下命令可以替换 Open Media Vault 镜像源。

```bash
omv-env set OMV_APT_REPOSITORY_URL "https://{{ site.hostname }}/OpenMediaVault/public"
omv-env set OMV_APT_ALT_REPOSITORY_URL "https://{{ site.hostname }}/OpenMediaVault/packages"
omv-env set OMV_APT_KERNEL_BACKPORTS_REPOSITORY_URL "https://{{ site.hostname }}/debian"
omv-env set OMV_APT_SECURITY_REPOSITORY_URL "https://{{ site.hostname }}/debian-security"
# 如果你有安装 omv-extras 则需要运行如下命令更改源
omv-env set OMV_EXTRAS_APT_REPOSITORY_URL "https://{{ site.hostname }}/OpenMediaVault/openmediavault-plugin-developers"
omv-env set OMV_DOCKER_APT_REPOSITORY_URL "https://{{ site.hostname }}/docker-ce/linux/debian"
omv-env set OMV_PROXMOX_APT_REPOSITORY_URL "https://{{ site.hostname }}/proxmox/debian"
# 使得环境变量更改生效
omv-salt stage run all
```

1. 由于 Open Media Vault 自带 kernel backports 因此在 `/etc/apt/source.list` 中配置 backports 源会造成冲突。
2. 由于 Open Media Vault 的公钥分发通过源自己携带完成，因此本身存在被篡改的可能性，故在换源后用户需要通过其他渠道验证获取的公钥的正确性。

### 首次部署 Open Media Vault

对于首次部署操作步骤以 <https://openmediavault.readthedocs.io/en/latest/installation/on_debian.html> 为准

我们仅对 **Add the package repositories** 段落做出如下调整

```bash
cat <<EOF > /etc/apt/sources.list.d/openmediavault.list
deb https://{{ site.hostname }}/OpenMediaVault/public usul main
deb https://{{ site.hostname }}/OpenMediaVault/packages usul main
## Uncomment the following line to add software from the proposed repository.
# deb https://{{ site.hostname }}/OpenMediaVault/public usul-proposed main
# deb https://{{ site.hostname }}/OpenMediaVault/packages usul-proposed main
## This software is not part of OpenMediaVault, but is offered by third-party
## developers as a service to OpenMediaVault users.
# deb https://{{ site.hostname }}/OpenMediaVault/public usul partner
# deb https://{{ site.hostname }}/OpenMediaVault/packages usul partner
EOF
```

其中 `usul` 为 Open Media Vault 的 codename（本样例代码为 5.x 的 codename）
