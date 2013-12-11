<?php 
$navActive = 0;
include "includes/before.php";
?>

<div id="content" class="pure-u-1">
  <div class="container pure-g-r">
	<div class="pure-u-5-8">
	  <div id="mirrorlist-container">
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
		<div style="height: 600px;">
		  <h3 style="margin-top: 300px;">我是刷存在感的占位层。</h3>
		</div> 
	  </div>
	</div>
    <div class="pure-u-3-8">
      <div>
		<p> 欢迎来到清华大学开源镜像网站，它由清华大学开源镜像站管理团队维护管理。</p>
        <p>本站可以在校内外通过 IPv4/IPv6 使用。
        <br />本站域名有：</p>
        <ul>
          <li><a href="http://mirrors.tuna.tsinghua.edu.cn/">http://mirrors.tuna.tsinghua.edu.cn/</a> 支持 IPv4/IPv6</li>
          <li><a href="http://mirrors.6.tuna.tsinghua.edu.cn/">http://mirrors.6.tuna.tsinghua.edu.cn/</a> 只解析 IPv6</li>
          <li><a href="http://mirrors.4.tuna.tsinghua.edu.cn/">http://mirrors.4.tuna.tsinghua.edu.cn/</a> 只解析 IPv4</li>
        </ul>

        <p><strong>镜像使用所需配置参见 <a href="http://wiki.tuna.tsinghua.edu.cn/MirrorUseHowto">Wiki</a></strong>。</p>
      </div>

      <div>

        <p>如果您有任何问题或建议，请在我们的 <a href="http://issues.tuna.tsinghua.edu.cn">issue tracker</a>
        上提交 bug，或者访问我们的<a
          href="https://groups.google.com/forum/#%21forum/thu-opensource-mirror-admin">Google
          Groups</a>，或直接向 Google Groups 的邮件列表 thu-opensource-mirror-admin <span class="nospam">[SPAM]</span> AT googlegroups <span class="nospam">[SPAM]</span> DOT com 寄信。
        </p>

      </div>
    </div>
  </div>
</div> <!-- end of content div -->
<?php include("includes/after.php")?>


<!-- vi: se noet ts=4: -->
<!-- vim: se noet ts=4 sts=4 expandtab sw=4-->
