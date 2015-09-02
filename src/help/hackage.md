## hackage 镜像使用帮助

### 初次使用

先执行

```
cabal update
```

待生成`~/.cabal/config`之后`Ctrl+C`, 然后进行下一步。

### 已经存在`config`

修改`~/.cabal/config`, 将此行

```
remote-repo: hackage.haskell.org:http://hackage.haskell.org/packages/archive
```
注释掉，改为

```
remote-repo: mirrors.tuna.tsinghua.edu.cn:http://mirrors.tuna.tsinghua.edu.cn/hackage
-- remote-repo: hackage.haskell.org:http://hackage.haskell.org/packages/archive
```

注意，此处的注释是两条短线`--`.

再执行`cabal update`, 即可使用`cabal`安装包了。
