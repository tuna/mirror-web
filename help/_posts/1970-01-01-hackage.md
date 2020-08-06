---
category: help
layout: help
mirrorid: hackage
---

# hackage 镜像使用帮助

## 在`cabal`中初次使用

先执行

```
cabal update
```

待生成`~/.cabal/config`配置文件之后`Ctrl+C`, 然后进行下一步。（注：在 Windows 平台上的配置文件是 `%APPDATA%\cabal\config`）

### Cabal ≥ 1.2.4 (GHC 8.0)

修改 `~/.cabal/config`，加入

```
repository {{ site.hostname }}
  url: http://{{ site.hostname }}/hackage
```

为了访问速度，可以选择把官方仓库注释掉:

```
repository hackage.haskell.org
  url: http://hackage.haskell.org/
  -- secure: False
  -- root-keys:
  -- key-threshold:
```

### Cabal < 1.2.4

修改`~/.cabal/config`, 将此行

```
remote-repo: hackage.haskell.org:http://hackage.haskell.org/packages/archive
```
注释掉，改为

```
remote-repo: {{ site.hostname }}:http://{{ site.hostname }}/hackage
-- remote-repo: hackage.haskell.org:http://hackage.haskell.org/packages/archive
```

注意，此处的注释是两条短线`--`.

再执行`cabal update`, 即可使用`cabal`安装包了。

## 在 [`stack`](https://github.com/commercialhaskell/stack) 中使用

### stack >= v2.1.1

修改`~/.stack/config.yaml`, 加上:

```yaml
package-indices:
  - download-prefix: http://{{ site.hostname }}/hackage/
    hackage-security:
        keyids:
        - 0a5c7ea47cd1b15f01f5f51a33adda7e655bc0f0b0615baa8e271f4c3351e21d
        - 1ea9ba32c526d1cc91ab5e5bd364ec5e9e8cb67179a471872f6e26f0ae773d42
        - 280b10153a522681163658cb49f632cde3f38d768b736ddbc901d99a1a772833
        - 2a96b1889dc221c17296fcc2bb34b908ca9734376f0f361660200935916ef201
        - 2c6c3627bd6c982990239487f1abd02e08a02e6cf16edb105a8012d444d870c3
        - 51f0161b906011b52c6613376b1ae937670da69322113a246a09f807c62f6921
        - 772e9f4c7db33d251d5c6e357199c819e569d130857dc225549b40845ff0890d
        - aa315286e6ad281ad61182235533c41e806e5a787e0b6d1e7eef3f09d137d2e9
        - fe331502606802feac15e514d9b9ea83fee8b6ffef71335479a2e68d84adc6b0
        key-threshold: 3 # number of keys required

        # ignore expiration date, see https://github.com/commercialhaskell/stack/pull/4614
        ignore-expiry: no
```

### stack < v2.1.1

修改`~/.stack/config.yaml`, 加上:

```yaml
package-indices:
  - name: Tsinghua
    download-prefix: http://{{ site.hostname }}/hackage/package/
    http: http://{{ site.hostname }}/hackage/00-index.tar.gz
```
