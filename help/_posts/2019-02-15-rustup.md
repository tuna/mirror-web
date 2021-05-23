---
category: help
layout: help
mirrorid: rustup
---

# Rustup 镜像安装帮助

[Rustup](https://rustup.rs/) 是 Rust 官方的跨平台 Rust 安装工具。

TUNA 只会保留一段时间的 nightly，如果在安装时出现错误，请用 `RUSTUP_DIST_SERVER= rustup ...` 来使用官方源。

使用 rustup 安装 rust 时，若要启用 TUNA 源，执行：


```bash
$ # for bash
$ RUSTUP_DIST_SERVER=https://{{ site.hostname }}/rustup rustup install stable # for stable
$ # for fish
$ env RUSTUP_DIST_SERVER=https://{{ site.hostname }}/rustup rustup install stable # for stable
$ # for bash
$ RUSTUP_DIST_SERVER=https://{{ site.hostname }}/rustup rustup install nightly # for nightly
$ # for fish
$ env RUSTUP_DIST_SERVER=https://{{ site.hostname }}/rustup rustup install nightly # for nightly
$ # for bash
$ RUSTUP_DIST_SERVER=https://{{ site.hostname }}/rustup rustup install nightly-YYYY-mm-dd
$ # for fish
$ env RUSTUP_DIST_SERVER=https://{{ site.hostname }}/rustup rustup install nightly-YYYY-mm-dd
```

若要长期启用 TUNA 源，执行：

```bash
$ # for bash
$ echo 'export RUSTUP_UPDATE_ROOT=https://{{ site.hostname }}/rustup/rustup' >> ~/.bash_profile
$ echo 'export RUSTUP_DIST_SERVER=https://{{ site.hostname }}/rustup' >> ~/.bash_profile
$ # for fish
$ echo 'set -x RUSTUP_UPDATE_ROOT https://{{ site.hostname }}/rustup/rustup' >> ~/.config/fish/config.fish
$ echo 'set -x RUSTUP_DIST_SERVER https://{{ site.hostname }}/rustup' >> ~/.config/fish/config.fish
```

注：rustup 在判断是否需要更新时依赖于 toml 的 sha256 ，由于 toml 内容中相关链接被替换为 TUNA 源，第一次切换到 TUNA 源时各个 channel 会被认为需要更新。

