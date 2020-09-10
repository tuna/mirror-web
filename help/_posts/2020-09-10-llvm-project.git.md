---
category: help
layout: help
mirrorid: llvm-project.git
---

## LLVM Git 源码仓库镜像使用帮助

本镜像镜像了如下仓库：

```
https://github.com/llvm/llvm-project.git
```

可以直接使用 `git clone https://{{ site.hostname }}/git/llvm-project.git` 来克隆。由于仓库体积均较大，执行`git clone`可能需要较长时间，并且没有进度提示，请耐心等候。

若要将 TUNA mirror 加入已有代码库，可在已有仓库中运行：

```
git remote add tuna https://{{ site.hostname }}/git/llvm/llvm-project.git
```

或运行：

```
git remote set-url origin https://{{ site.hostname }}/git/llvm/llvm-project.git
```

将默认上游设置为 TUNA 镜像。


注：如需要 LLVM 合并为 monorepo 前的各个子仓库（已经不再更新），请至 [/help/llvm](这个页面) 查看使用帮助。