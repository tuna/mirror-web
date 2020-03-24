---
category: help
layout: help
mirrorid: homebrew
---

## Homebrew/Linuxbrew 镜像使用帮助

**注:该镜像是 Homebrew/Linuxbrew 的 formula 索引的镜像（即 `brew update` 时所更新内容）。本镜像站同时提供相应的二进制预编译包的镜像，请参考 [Homebrew bottles 镜像使用帮助](https://{{ site.hostname }}/help/homebrew-bottles/) 和 [Linuxbrew bottles 镜像使用帮助](https://{{ site.hostname }}/help/linuxbrew-bottles/)。**

### 替换现有上游

```
# brew 程序本身，Homebrew/Linuxbrew 相同
git -C "$(brew --repo)" remote set-url origin https://{{ site.hostname }}/git/homebrew/brew.git

# 以下针对 mac OS 系统上的 Homebrew
git -C "$(brew --repo homebrew/core)" remote set-url origin https://{{ site.hostname }}/git/homebrew/homebrew-core.git
git -C "$(brew --repo homebrew/cask)" remote set-url origin https://{{ site.hostname }}/git/homebrew/homebrew-cask.git
git -C "$(brew --repo homebrew/cask-fonts)" remote set-url origin https://{{ site.hostname }}/git/homebrew/homebrew-cask-fonts.git
git -C "$(brew --repo homebrew/cask-drivers)" remote set-url origin https://{{ site.hostname }}/git/homebrew/homebrew-cask-drivers.git

# 以下针对 Linux 系统上的 Linuxbrew
git -C "$(brew --repo homebrew/core)" remote set-url origin https://{{ site.hostname }}/git/homebrew/linuxbrew-core.git

# 更换后测试工作是否正常
brew update
```

### 复原

_(感谢Snowonion Lee提供说明)_

```
# brew 程序本身，Homebrew/Linuxbrew 相同
git -C "$(brew --repo)" remote set-url origin https://github.com/Homebrew/brew.git

# 以下针对 mac OS 系统上的 Homebrew
git -C "$(brew --repo homebrew/core)" remote set-url origin https://github.com/Homebrew/homebrew-core.git
git -C "$(brew --repo homebrew/cask)" remote set-url origin https://github.com/Homebrew/homebrew-cask.git
git -C "$(brew --repo homebrew/cask-fonts)" remote set-url origin https://github.com/Homebrew/homebrew-cask-fonts.git
git -C "$(brew --repo homebrew/cask-drivers)" remote set-url origin https://github.com/Homebrew/homebrew-cask-drivers.git

# 以下针对 Linux 系统上的 Linuxbrew
git -C "$(brew --repo homebrew/core)" remote set-url origin https://github.com/Homebrew/linuxbrew-core.git

# 更换后测试工作是否正常
brew update
```

### 安装 Linuxbrew 时使用 tuna 镜像 (可用 `sudo`)

```
0. 安装 git
1. 下载 https://raw.githubusercontent.com/Linuxbrew/install/master/install-ruby
2. 将其中 https://homebrew.bintray.com/bottles-portable-ruby/ 换为 https://{{ site.hostname }}/homebrew-bottles/bottles-portable-ruby/
3. 运行 ./install-ruby 安装 portable ruby
4. export PATH=/home/linuxbrew/.linuxbrew/Homebrew/Library/Homebrew/vendor/portable-ruby/current/bin:$PATH # ==> Add Ruby to your PATH
5. 下载 https://raw.githubusercontent.com/Linuxbrew/install/master/install
6. 将其中 https://github.com/Homebrew/brew 换为 https://{{ site.hostname }}/git/homebrew/brew.git
7. 运行 ./install 安装 brew
8. 执行到 “==> Tapping homebrew/core” 时 Ctrl-C
9. export PATH=/home/linuxbrew/.linuxbrew/Homebrew/bin:$PATH # 将 brew 添加到 PATH
10. git clone https://{{ site.hostname }}/git/homebrew/linuxbrew-core.git "$(brew --repo homebrew/core)"
11. 再次运行 ./install 即可到达安装成功结果
```
