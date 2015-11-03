NPM 镜像使用帮助
====================

注: TUNA 使用 [sinopia](https://github.com/rlidwka/sinopia/) 提供 npm 访问加速。

临时使用
--------
```
npm install <packagename> --registry https://npm.tuna.tsinghua.edu.cn/
```

默认使用
-------
```
npm set registry https://npm.tuna.tsinghua.edu.cn/
```

或编辑 `~/.npmrc` 添加
```
registry=https://npm.tuna.tsinghua.edu.cn
```
