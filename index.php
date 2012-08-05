<?php
include "includes/bydistro.php";
?>
<!doctype html>
<html>
<head>
	<meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
	<link href="files/mirrors.tuna.css" rel="stylesheet" type="text/css" />
	<script type="text/javascript" src="files/jquery-latest.js"></script>
	<script type="text/javascript" src="files/jquery.tablesorter.min.js"></script>
	<script type="text/javascript" src="files/sort-status-table.js"></script>
	<title>清华大学开源镜像站</title>
</head>
<body>
<div id="wrapper">
<div id="header">
<h1>清华大学开源镜像站</h1>
<div class="tagline">
Portal of Tsinghua University Open Source Software Mirror Sites
</div>
</div> <!-- end of header div -->

<div id="content">
<h2>简介</h2>
<p>
欢迎来到清华大学开源镜像网站，它由清华大学开源镜像站管理团队维护管理。
</p>

<p>本站可以在校内外通过 IPv4/IPv6 使用。本站域名有：</p>
<ul>
<li><a href="http://mirrors.tuna.tsinghua.edu.cn/">http://mirrors.tuna.tsinghua.edu.cn/</a> 支持 IPv4/IPv6</li>
<li><a href="http://mirrors.6.tuna.tsinghua.edu.cn/">http://mirrors.6.tuna.tsinghua.edu.cn/</a> 只解析 IPv6</li>
<li><a href="http://mirrors.4.tuna.tsinghua.edu.cn/">http://mirrors.4.tuna.tsinghua.edu.cn/</a> 只解析 IPv4</li>
</ul>

<p><strong>镜像使用所需配置参见 <a href="http://wiki.tuna.tsinghua.edu.cn/MirrorUseHowto">Wiki</a></strong>。</p>

<p>如果您有任何问题或建议，请在我们的 <a href="http://issues.tuna.tsinghua.edu.cn">issue tracker</a>
 上提交 bug，或者访问我们的<a
 href="https://groups.google.com/forum/#%21forum/thu-opensource-mirror-admin">Google
Groups</a>，或直接向 Google Groups 的邮件列表 thu-opensource-mirror-admin <span class="nospam">[SPAM]</span> AT googlegroups <span class="nospam">[SPAM]</span> DOT com 寄信。
</p>

<?php
date_default_timezone_set('Asia/Shanghai');
$status = initialize_status(array(
	'/home/mirror/log/status.txt',
	'http://ftp3.tsinghua.edu.cn/newstatus.txt'));
$specs = array(
	//第四个（下标3）表示是否为官方源，N表示不是，A表示是（并且官方分配了另外的域名）
	//B表示是（但是没有官方的域名），U表示不知道
	array('apache', 'apache software foundation的软件', 'fqj1994', array('N')),
	array('archlinux', '滚动更新的 Linux 发行版，极简主义哲学。', 'xiaq', array('N')),
	array('archlinuxarm', 'Archlinux ARM port.', 'xiaq', array('A', 'url' => 'cn.mirror.archlinuxarm.org')),
	array('centos', '由社区维护的与 RHEL 完全兼容的发行版。', 'alick', array('B')),
	array('chakra', '基于 KDE SC、无 Gtk 的桌面环境。前身是 Archlinux 的 [kde-mod]。', 'xiaq', array('N')),
	array('CPAN', 'Comprehensive Perl Archive Network。', 'fqj1994', array('N')),
	array('CRAN', 'Comprehensive Rerl Archive Network。', 'ray', array('N')),
	array('CTAN', 'Comprehensive TeX Archive Network。', 'MichaelChou', array('N')),
	array('cygwin', 'Windows 平台下的类 Unix环境.', 'BYVoid', array('N')),
	array('debian', '一个完全由社区维护的 Linux 发行版。', 'heroxbd', array('N')),
	array('debian-backports', 'Debian Stable 上用的 Testing/Unstable 扩展包。', 'heroxbd', array('N')),
	array('debian-cd', 'Debian CD 镜像。', 'fqj1994', array('N')),
	array('debian-multimedia', 'Debian 非官方多媒体套件。', 'heroxbd', array('N')),
	array('debian-security', 'Debian 安全情报', 'heroxbd', array('N')),
	array('debian-weekly-builds', 'Debian CD 镜像每周构建。', 'fqj1994', array('N')),
	array('deepin', '基于 Ubuntu 的面向中文桌面用户的发行版。', 'xiaq', array('B')),
	array('deepin-releases', 'Deepin 稳定版的 CD 镜像。', 'xiaq', array('B')),
	array('epel', 'Fedora 社区为 RHEL 等提供的额外软件包。', 'BYVoid', array('N')),
	array('fedora', '自由友爱杰出前卫的 Linux 发行版，Red Hat 公司赞助的社区项目。', 'BYVoid', array('N')),
	array('freebsd', '拥有辉煌历史的 BSD 的一个重要分支。', 'xiaq', array('N')),
	array('gentoo', '一个快速的元发行版，软件包系统使用源代码。', 'cuckoo', array('N')),
	array('gentoo-portage', 'Gentoo 的 ports collection。', 'cuckoo', array('N')),
	array('gentoo-portage-prefix', 'Gentoo on a different level', 'heroxbd', array('A', 'url' => 'rsync.cn.prefix.freens.org')),
	array('gnu', 'GNU/Linux 的基础软件。', 'MichaelChou', array('N')),
	array('kernel', 'Linux 内核。', 'BYVoid', array('N')),
	array('linuxmint', '基于Ubuntu的发行版', 'fqj1994', array('N')),
	array('linuxmint-cd', 'LinuxMint的CD/DVD镜像', 'fqj1994', array('N')),
	array('macports', 'Mac OS X 与 Darwin 的包管理软件，GUI与CLI的结合。', 'VuryLeo', array('N')),
	array('opensuse', '由 Novell 支持的 Linux 发行版。', 'xiaq', array('N')),
	array('pypi', 'Python Package Index', 'fqj1994', array('A', 'url' => 'e.pypi.python.org/')),
	array('rpmfusion', '一个用于 Fedora 和 RHEL 等的第三方软件仓库。', 'alick', array('N')),
	array('scientific', '由美国费米实验室维护的与 RHEL 兼容的发行版。', 'BYVoid', array('N')),
	array('slackware', '最有资历的 Linux 发行版。', 'BYVoid', array('N')),
	array('ubuntu', '基于 Debian 的以桌面应用为主的 Linux 发行版。', 'BYVoid', array('B')),
	array('ubuntu-releases', 'Ubuntu CD 镜像。', 'MichaelChou', array('B')),
);

function maintainer($name)
{
	$mters = array(
		'BYVoid' => 'http://www.byvoid.com/',
		'xiaq' => 'http://wiki.tuna.tsinghua.edu.cn/xiaq',
		'MichaelChou' => 'http://michael.yuespot.org/',
		'heroxbd' => 'http://www.awa.tohoku.ac.jp/~benda/',
		'alick' => 'http://wiki.tuna.tsinghua.edu.cn/alick',
		'ray' => 'http://wiki.tuna.tsinghua.edu.cn/ray',
		'VuryLeo' => 'http://www.vuryleo.com/',
		'fqj1994' => 'http://www.fqj1994.com',
	);
	if (isset($mters[$name]))
		return "<a href='{$mters[$name]}' target='_blank'>{$name}</a>";
	else
		return $name;
}

function initialize_status($status_files)
{
	$status = array();
	$context = stream_context_create(array(
		'http' => array(
			'timeout' => 3
		)
	));
	foreach ($status_files as $file_idx => $status_file)
	{
		$lines = file($status_file, FILE_IGNORE_NEW_LINES, $context);
		foreach ($lines as $line)
		{
			$sec = explode(",", $line);
			if (count($sec) < 2)
				continue;
			$mirror = array();
			$fields = array(
				'name', 'current',
				'stamp', 'files_count', 'files_transferred_count',
				'size', 'size_transferred', 'literal', 'matched',
				'file_list_size', 'file_list_generate_time',
				'file_list_transfer_time', 'bytes_sent', 'bytes_received'
			);
			for ($i = 0; $i < count($sec); $i++)
			{
				$mirror[$fields[$i]] = $sec[$i];
			}
			$status[$mirror['name']] = $mirror;
		}
	}
	return $status;
}

function format_size($size)
{
	return str_replace(' bytes', 'B', $size);
}
?>

<div class="mirrors-stat">
<h2>状态统计</h2>
<div id="status-table">
<h3>各镜像状态表<a href="#status-table-footnote" title="到表尾脚注">↓</a></h3>
<table class="tablesorter" id="status-main-table">
	<thead>
	<tr>
		<th><img height="16" width="16" src="files/official-header.png"
				alt="Is an official mirror?"/></th>
		<th>名称</th>
		<th>维护者</th>
		<th>状态</th>
		<th>大小</th>
		<th>文件总数</th>
		<th>同步完成时间</th>
		<th>请求次数</th>
		<th>请求数据量</th>
	</tr>
	</thead>
	<tbody>
<?php foreach ($specs as $spec): ?>
	<?php $info = $status[$spec[0]] ?>
	<tr>
	<td class="official"><?php
switch ($spec[3][0]) {
case 'A':
	echo '<a href="http://', $spec[3]['url'] ,'" target="_blank"><img height="16" width="16" src="files/official.png" alt="official"/></a>';
	break;
case 'B':
	echo '<img height="16" width="16" src="files/official.png" alt="official"/>';
	break;
case 'N':
	echo '<img height="16" width="16" src="files/non-official.png" alt="non-official"/>';
	break;
case 'U':
	echo '<img height="16" width="16" src="files/unknown.png" alt="unknown"/>';
	break;
}
?></td>

		<td>
		<a href="<?php echo $spec[0] ?>/" title="<?php echo $spec[1] ?>">
				<?php echo $spec[0] ?>
			</a>
		</td>
		<td><?php echo maintainer($spec[2]) ?></td>
		<?php if ($info['current'] == 'success'): ?>
			<td class="sync-state sync-ed">同步完成</td>
		<?php elseif ($info['current'] == 'syncing'): ?>
			<td class="sync-state sync-ing">正在同步</td>
		<?php elseif ($info['current'] == 'failed'): ?>
			<td class="sync-state sync-fail">同步失败</td>
		<?php elseif ($info['current'] == 'checking'): ?>
			<td class="sync-state sync-fail">人工维护</font></td>
		<?php else: ?>
			<td class="sync-state sync-unknown">未知</td>
		<?php endif ?>

		<td class="size"><?php echo format_size($info['size']) ?></td>
		<td class="files_count"><?php echo $info['files_count'] ?></td>
		<td><?php echo $info['stamp'] ? date('Y-m-d H:i', $info['stamp']) : '' ?></td>
		<?php $stat = stat_by_distro_get($spec[0], 'week'); ?>
		<td class="req_files_count"><?php echo $stat[0]; ?></td>
		<td class="req_size"><?php echo convert_byte_to_text($stat[1]);?></td>
	</tr>
<?php endforeach ?>
	</tbody>
</table> <!-- id="status-main-table" -->
<div id="status-table-footnote">
<ul>
<li>第一列显示是否为发行版/项目的官方软件源。</li>
<li>对于正在同步和同步失败的镜像，大小、文件总数、同步完成时间等信息取自最近一次成功同步时的日志。</li>
<li>请求次数/数据量取自最近七日的 HTTP 请求。</li>
</ul>
</div> <!-- end of status-table-footnote div -->
</div> <!-- end of status-table div -->
<h3><a href="http://mirrors.tuna.tsinghua.edu.cn/awffull/index.html">HTTP统计</a></h3>
<div id="flux-stat">
<h3><a href="http://solar.tuna.tsinghua.edu.cn:8000">流量统计</a></h3>
<p>最近24小时流量图</p>
<img src="http://solar.tuna.tsinghua.edu.cn:8000/eth0-day.png" alt="eth0-day" />
<img src="http://solar.tuna.tsinghua.edu.cn:8000/eth1-day.png" alt="eth1-day" />
</div> <!-- end of flux-stat div -->
</div> <!-- end of mirrors-stat div -->
</div> <!-- end of content div -->

<div id="footer">
<div class="tuna-logo">
<p>Powered by <a href="http://tuna.tsinghua.edu.cn/">
<img src="http://tuna.tsinghua.edu.cn/files/logo-01.png" alt="TUNA" /></a>
</p>
</div>
<div class="ack">
<p>本站的网络和硬件由清华大学网络工程研究中心提供支持。</p>
</div>
</div> <!-- end of footer div -->

</div> <!-- end of div wrapper -->
</body>
</html>
<!-- vi: se noet ts=4: -->
