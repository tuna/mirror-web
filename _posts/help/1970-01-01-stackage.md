---
category: help
layout: help
mirrorid: stackage
---

## stackage 镜像使用帮助

本镜像推荐与 TUNA 的 [Hackage 镜像](https://{{ site.hostname }}/help/hackage/)配合使用。

### stack >= v2.3.1

修改`~/.stack/config.yaml`（在 Windows 下是 `%APPDATA%\stack\config.yaml`）, 加上:

```yaml
setup-info-locations: ["http://{{ site.hostname }}/stackage/stack-setup.yaml"]
urls:
  latest-snapshot: http://{{ site.hostname }}/stackage/snapshots.json
```

### stack >= v2.1.1

修改`~/.stack/config.yaml`（在 Windows 下是 `%APPDATA%\stack\config.yaml`）, 加上:

```yaml
setup-info: "http://{{ site.hostname }}/stackage/stack-setup.yaml"
urls:
  latest-snapshot: http://{{ site.hostname }}/stackage/snapshots.json
```

### stack < v2.1.1

修改`~/.stack/config.yaml`（在 Windows 下是 `%APPDATA%\stack\config.yaml`）, 加上:

```yaml
setup-info: "http://{{ site.hostname }}/stackage/stack-setup.yaml"
urls:
  latest-snapshot: http://{{ site.hostname }}/stackage/snapshots.json
  lts-build-plans: http://{{ site.hostname }}/stackage/lts-haskell/
  nightly-build-plans: http://{{ site.hostname }}/stackage/stackage-nightly/
```
