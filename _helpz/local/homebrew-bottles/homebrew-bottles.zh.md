**注：该镜像是 Homebrew 二进制预编译包的镜像。镜像站同时提供 Homebrew 的 formula 索引的镜像（即 `brew update` 时所更新内容），请参考 [Homebrew 镜像使用帮助](../homebrew/)。**

### 临时替换

<tmpl z-lang="bash">
export HOMEBREW_API_DOMAIN="{{endpoint}}/api"
export HOMEBREW_BOTTLE_DOMAIN="{{endpoint}}"
</tmpl>

### 长期替换

如果你使用 bash：

<tmpl z-lang="bash">
echo 'export HOMEBREW_API_DOMAIN="{{endpoint}}/api"' >> ~/.bash_profile
echo 'export HOMEBREW_BOTTLE_DOMAIN="{{endpoint}}"' >> ~/.bash_profile
export HOMEBREW_API_DOMAIN="{{endpoint}}/api"
export HOMEBREW_BOTTLE_DOMAIN="{{endpoint}}"
</tmpl>

如果你使用 zsh：

<tmpl z-lang="bash">
echo 'export HOMEBREW_API_DOMAIN="{{endpoint}}/api"' >> ~/.zprofile
echo 'export HOMEBREW_BOTTLE_DOMAIN="{{endpoint}}"' >> ~/.zprofile
export HOMEBREW_API_DOMAIN="{{endpoint}}/api"
export HOMEBREW_BOTTLE_DOMAIN="{{endpoint}}"
</tmpl>

**注：Linuxbrew 核心仓库（`linuxbrew-core`）自 2021 年 10 月 25 日（`brew` 版本 3.3.0 起）被弃用，Linuxbrew 用户应迁移至 `homebrew-core`。Linuxbrew 用户请依本镜像说明重新设置镜像。**
