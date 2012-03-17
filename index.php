<!doctype html>
<html>
<head>
	<meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
	<link href="mirrors.tuna.css" rel="stylesheet" type="text/css" />
	<title>清华大学开源镜像站</title>
</head>
<body>
<h1>清华大学开源镜像站</h1>
<h2>Portal of Tsinghua University Open Source Software Mirror Sites</h2>

<p>
我们是清华大学开源镜像站管理团队，这是正在建设中的清华大学开源镜像网站。
</p>

<p>如果你有任何问题或建议，请在我们的 <a href="http://issues.tuna.tsinghua.edu.cn">issue tracker</a>
 上提交 bug，或者访问我们的<a
 href="https://groups.google.com/forum/#%21forum/thu-opensource-mirror-admin">Google
Groups</a>，或直接向 Google Groups 的邮件列表 thu-opensource-mirror-admin [SPAM] googlegroups [SPAM] com 寄信</a>。
</p>
<p><strong>本站公开测试中，欢迎大家使用。请通过本站域名访问</strong>:</p>
<ul>
<li><a href="http://mirrors.tuna.tsinghua.edu.cn/">http://mirrors.tuna.tsinghua.edu.cn/</a></li>
<li><a href="http://mirrors.6.tuna.tsinghua.edu.cn/">http://mirrors.6.tuna.tsinghua.edu.cn/</a>(IPv6 only)</li>
<li><a href="http://mirrors.4.tuna.tsinghua.edu.cn/">http://mirrors.4.tuna.tsinghua.edu.cn/</a>(IPv4 only)</li>
</ul>

<?php
date_default_timezone_set('Asia/Shanghai');
$status = initialize_status(array(
	'/home/ftp/log/newstatus.txt',
	'http://ftp3.tsinghua.edu.cn/newstatus.txt'));
$specs = array(
	array('archlinux', '滚动更新的 Linux 发行版，极简主义哲学。', 'xiaq'),
	array('centos', '由社区维护的与 RHEL 完全兼容的发行版。', 'alick'),
	array('chakra', '基于 KDE SC、无 Gtk 的桌面环境。前身是 Archlinux 的 [kde-mod]。', 'xiaq'),
	array('cygwin', 'Windows 平台下的类 Unix环境.', 'BYVoid'),
	array('CTAN', 'Comprehensive TeX Archive Network。', 'MichaelChou'),
	array('debian', '一个完全由社区维护的 Linux 发行版。', 'heroxbd'),
	array('debian-backports', 'Debian Stable 上用的 Testing/Unstable 扩展包。', 'heroxbd'),
	array('debian-cd', 'Debian CD 镜像。', 'heroxbd'),
	array('debian-multimedia', 'Debian 非官方多媒体套件。', 'heroxbd'),
	array('debian-security', 'Debian 安全情报', 'heroxbd'),
	array('debian-weekly-builds', 'Debian CD 镜像每周构建。', 'heroxbd'),
	array('deepin', '基于 Ubuntu 的面向中文桌面用户的发行版。', 'xiaq'),
	array('deepin-releases', 'Deepin 稳定版的 CD 镜像。', 'xiaq'),
	array('epel', 'Fedora 社区为 RHEL 等提供的额外软件包。', 'BYVoid'),
	array('fedora', '自由友爱杰出前卫的 Linux 发行版，Red Hat 公司赞助的社区项目。', 'BYVoid'),
	array('freebsd', '拥有辉煌历史的 BSD 的一个重要分支。', 'xiaq'),
	array('frugalware', 'Slackware 和 Archlinux 哲学的混血，独特的半滚动发行模式。', 'xiaq'),
	array('gentoo', '一个快速的元发行版，软件包系统使用源代码。', 'cuckoo'),
	array('gentoo-portage', 'Gentoo 的 ports collection。', 'cuckoo'),
	array('gentoo-portage-prefix', 'Gentoo on a different level', 'heroxbd'),
	array('gnu', 'GNU/Linux 的基础软件。', 'MichaelChou'),
	array('kernel', 'Linux 内核。', 'BYVoid'),
	array('opensuse', '由 Novell 支持的 Linux 发行版。', 'xiaq'),
	array('rpmfusion', '一个用于 Fedora 和 RHEL 等的第三方软件仓库。', 'alick'),
	array('scientific', '由美国费米实验室维护的与 RHEL 兼容的发行版。', 'BYVoid'),
	array('slackware', '最有资历的 Linux 发行版。', 'BYVoid'),
	array('ubuntu', '基于 Debian 的以桌面应用为主的 Linux 发行版。', 'BYVoid'),
	array('ubuntu-releases', 'Ubuntu CD 镜像。', 'MichaelChou'),
);

function maintainer($name)
{
	$mters = array(
		'BYVoid' => 'http://www.byvoid.com/',
		'xiaq' => 'http://linuxtoy.org/archives/author/cheer_xiao',
		'MichaelChou' => 'http://michael.yuespot.org/',
		'heroxbd' => 'http://www.awa.tohoku.ac.jp/~benda/',
		'alick' => 'http://wiki.tuna.tsinghua.edu.cn/alick',
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
<table>
	<thead>
	<tr>
		<td>名称</td>
		<td>维护者</td>
		<td>状态</td>
		<td>大小</td>
		<td>文件总数</td>
		<td>同步完成时间</td>
		<td>描述</td>
	</tr>
	</thead>
	<tbody>
<?php foreach ($specs as $spec): ?>
	<?php $info = $status[$spec[0]] ?>
	<tr>
		<td>
			<a href="<?php echo $spec[0] ?>/">
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
		<?php else: ?>
			<!--<td class="sync-state sync-unknown">未知</td>-->
			<td class="sync-state sync-unknown"><?php echo $info['current']?></td>
		<?php endif ?>

		<td><?php echo format_size($info['size']) ?></td>
		<td><?php echo $info['files_count'] ?></td>
		<td><?php echo $info['stamp'] ? date('Y-m-d H:i:s', $info['stamp']) : '' ?></td>
		<td class="description"><?php echo $spec[1] ?></td>
	</tr>
<?php endforeach ?>
	</tbody>
</table>
</div>
<p><!--<a href="http://mirrors.tuna.tsinghua.edu.cn:3000">流量统计</a> --><a href="http://mirrors.tuna.tsinghua.edu.cn/awffull/index.html">HTTP统计</a></p>

<div class="tuna-logo">
<p>Powered by <a href="http://tuna.tsinghua.edu.cn/">
<img src="http://tuna.tsinghua.edu.cn/files/logo-01.png" alt="TUNA" /></a>
</p>
<p>本站的网络和硬件由清华大学网络工程研究中心提供支持。</p>
</div>

</body>
</html>
<!-- vi: se noet ts=4: -->
