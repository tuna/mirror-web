## Android 镜像使用帮助

参考 Google 教程 <https://source.android.com/source/downloading.html>，
将 `https://android.googlesource.com/` 全部使用 `git://aosp.tuna.tsinghua.edu.cn/android/` 代替即可。

**本站资源有限，每个 IP 限制并发数为 4，请勿使用 `repo sync -j8`
这样的方式同步。**

**注意: 本镜像是 AOSP 镜像，Android SDK因版权原因，我们不能提供镜像服务。**

### 替换已有的 AOSP 源代码的 remote

如果你之前已经通过某种途径获得了 AOSP 的源码(或者你只是 init 这一步完成后)，
你希望以后通过 TUNA 同步 AOSP 部分的代码，只需要将
`.repo/manifest.xml` 把其中的 aosp 这个 remote 的 fetch 从
https://android.googlesource.com 改为 git://aosp.tuna.tsinghua.edu.cn/android/
```diff
<manifest>

   <remote  name="aosp"
-           fetch="https://android.googlesource.com"
+           fetch="git://aosp.tuna.tsinghua.edu.cn/android/"
            review="android-review.googlesource.com" />

   <remote  name="github"
```

**这个方法也可以用来在同步 Cyanogenmod 代码的时候从 TUNA 同步部分代码**

### FAQ

1. 镜像的是什么？

   - 是按照 google 指南建立的镜像 git 仓库。

2. 为何不能通过浏览器访问？

   - 暂时没有 gitweb, 而且反正是 git bare 仓库，没有可以直接看到的内容。

3. 出现 `curl: (22) The requested URL returned error: 404 Not Found
Server does not provide clone.bundle; ignoring.` 怎么办？

   - 无视即可。
