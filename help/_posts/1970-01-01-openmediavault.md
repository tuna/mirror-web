---
category: help
layout: help
mirrorid: OpenMediaVault
---

## OpenMediaVault 镜像使用帮助

Open Media Vault 是一款基于 Debian 的 NAS 操作系统，本站提供 OpenMediaVault 的镜像，以加快国内访问速度。

### 替换 Open Media Vault 镜像源

登录到已经部署的 Open Media Vault 使用如下命令可以替换 Open Media Vault 镜像源。

```bash
cat <<EOF > /etc/apt/sources.list.d/openmediavault.list
deb https://{{ site.hostname }}/OpenMediaVault/public usul main
## Uncomment the following line to add software from the proposed repository.
# deb https://{{ site.hostname }}/OpenMediaVault/public usul-proposed main
## This software is not part of OpenMediaVault, but is offered by third-party
## developers as a service to OpenMediaVault users.
# deb https://{{ site.hostname }}/OpenMediaVault/public usul partner
EOF
```

### 首次部署 OMV

对于首次部署 OMV 来说会遭遇

> The following signatures couldn't be verified because the public key is not available: NO_PUBKEY 7E7A6C592EF35D13 NO_PUBKEY 24863F0C716B980B

这样的错误，请使用如下方法添加公钥

```bash
apt-get install --yes gnupg
wget -O "/etc/apt/trusted.gpg.d/openmediavault-archive-keyring.asc" https://packages.openmediavault.org/public/archive.key
apt-key add "/etc/apt/trusted.gpg.d/openmediavault-archive-keyring.asc"
```

剩余的部分的操作步骤仍然以 <https://openmediavault.readthedocs.io/en/latest/installation/on_debian.html> 为准

### 替换 omvextra 镜像源

对于同时也安装了 <https://wiki.omv-extras.org> 的用户可以使用如下方法替换 omvextra 源

```bash
cat <<EOF > /etc/apt/sources.list.d/omvextras.list
deb https://{{ site.hostname }}/OpenMediaVault/openmediavault-plugin-developers/usul buster main
# deb https://{{ site.hostname }}/OpenMediaVault/openmediavault-plugin-developers/usul-beta buster main
# deb https://{{ site.hostname }}/OpenMediaVault/openmediavault-plugin-developers/usul-extras buster main
# deb https://{{ site.hostname }}/OpenMediaVault/openmediavault-plugin-developers/usul-testing buster main
deb [arch=amd64] https://{{ site.hostname }}/docker-ce/linux/debian buster stable
deb http://linux.teamviewer.com/deb stable main
EOF
```

对于 ARM 用户，请自行修改移除 Docker CE 和 TeamViewer 镜像源。

1. 其中 `buster` 为发行版代号（本样例代码为 Debian 10 的代号）
2. 其中 `usul` 为 Open Media Vault 代号（本样例代码为 OpenMediaVault 5 的代号）
