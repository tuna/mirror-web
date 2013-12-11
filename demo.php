<?php 
$navActive = 0;
include "includes/before.php";
?>

<div id="content" class="pure-u-1">
  <div class="padding-1-lr pure-g-r">
    <div class="pure-u-2-3 pure-g-r">
      <div class="pure-u-1 padding-1-lr">
        <h2> 镜像列表 </h2>
        <table id="mirrorlist" border="0" cellspacing="0" cellpadding="0" > 
          <thead>
            <tr>
            <th class="distribution">发行版</th>
            <th class="description">说明</th>
            <th class="update">更新时间</th>
            <th class="help">帮助</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td class="distribution"><a href="/archlinux/">Archlinux</a></td>
            <td class="description">最好的操作系统</td>
            <td class="update">1秒前</td>
            <td class="help"><a href="#">点我</a></td>
          </tr>
          <tr>
            <td class="distribution"><a href="/gentoo/">Gentoo</a></td>
            <td class="description">很好很耗电的操作系统</td>
            <td class="update">1秒前</td>
            <td class="help"><a href="#">点我</a></td>
          </tr>
          <tr>
            <td class="distribution"><a href="/debian/">Debian</a></td>
            <td class="description">非常好的操作系统</td>
            <td class="update">1秒前</td>
            <td class="help"><a href="#">点我</a></td>
          </tr>
          <tr>
            <td class="distribution"><a href="/ubuntu/">Ubuntu</a></td>
            <td class="description">还凑合的操作系统</td>
            <td class="update">1秒前</td>
            <td class="help"><a href="#">点我</a></td>
          </tr>
          <tr>
            <td class="distribution"><a href="/deepin/">Deepin</a></td>
            <td class="description">山寨的操作系统</td>
            <td class="update">1秒前</td>
            <td class="help"><a href="#">点我</a></td>
          </tr>
          </tbody>
        </table>

      </div>
    </div>
    <div class="pure-u-1-3">
      <div class="aside">
        <div class="padding-1-lr">
          <h2>简介</h2>
          <div class="tuna-logo">
            <p>Powered by <a href="http://tuna.tsinghua.edu.cn/">
              <img src="files/logo-01.png" alt="TUNA" /></a>
            </p>
          </div>
          <p> 欢迎来到清华大学开源镜像网站，它由清华大学开源镜像站管理团队维护管理。</p>
        </div>
      </div>


      <div class="pure-u-1">
        <p>本站可以在校内外通过 IPv4/IPv6 使用。
        <br />本站域名有：</p>
        <ul>
          <li><a href="http://mirrors.tuna.tsinghua.edu.cn/">http://mirrors.tuna.tsinghua.edu.cn/</a> 支持 IPv4/IPv6</li>
          <li><a href="http://mirrors.6.tuna.tsinghua.edu.cn/">http://mirrors.6.tuna.tsinghua.edu.cn/</a> 只解析 IPv6</li>
          <li><a href="http://mirrors.4.tuna.tsinghua.edu.cn/">http://mirrors.4.tuna.tsinghua.edu.cn/</a> 只解析 IPv4</li>
        </ul>

        <p><strong>镜像使用所需配置参见 <a href="http://wiki.tuna.tsinghua.edu.cn/MirrorUseHowto">Wiki</a></strong>。</p>
      </div>

      <div class="pure-u-1">

        <p>如果您有任何问题或建议，请在我们的 <a href="http://issues.tuna.tsinghua.edu.cn">issue tracker</a>
        上提交 bug，或者访问我们的<a
          href="https://groups.google.com/forum/#%21forum/thu-opensource-mirror-admin">Google
          Groups</a>，或直接向 Google Groups 的邮件列表 thu-opensource-mirror-admin <span class="nospam">[SPAM]</span> AT googlegroups <span class="nospam">[SPAM]</span> DOT com 寄信。
        </p>

      </div>
    </div>
  </div>
</div> <!-- end of content div -->
<div id="footer" class="pure-u-1">
  <div class="ack">
    <p>本站的网络和硬件由清华大学网络工程研究中心提供支持。</p>
  </div>
</div> <!-- end of footer div -->
<?php include("includes/after.php")?>


<!-- vi: se noet ts=4: -->
<!-- vim: se noet ts=4 sts=4 expandtab sw=4-->
