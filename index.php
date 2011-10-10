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

<p>如果你有任何问题或建议，请在我们的 <a href="http://issues.tuna.tsinghua.edu.cn">issue tracker</a>
 上提交 bug，或者访问我们的<a
 href="https://groups.google.com/forum/#%21forum/thu-opensource-mirror-admin">Google
Groups</a>，或直接向 Google Groups 的邮件列表<a
 href="mailto:thu-opensource-mirror-admin@googlegroups.com">寄信</a>。
</p>
<p><strong>本站公开测试中，欢迎大家使用。请通过本站域名访问</strong>:</p>
<ul>
<li><a href="http://mirrors.tuna.tsinghua.edu.cn/">http://mirrors.tuna.tsinghua.edu.cn/</a></li>
<li><a href="http://mirrors.6.tuna.tsinghua.edu.cn/">http://mirrors.6.tuna.tsinghua.edu.cn/</a>(IPv6 only)</li>
<li><a href="http://mirrors.4.tuna.tsinghua.edu.cn/">http://mirrors.4.tuna.tsinghua.edu.cn/</a>(IPv4 only)</li>
</ul>

<?php
date_default_timezone_set('Asia/Shanghai');
$status_file = '/home/ftp/log/status.txt';
$ftp3_status_file = 'http://ftp3.tsinghua.edu.cn/status.txt';
$status = initialize_status($status_file, $ftp3_status_file);
$mirrors = array(
	array('archlinux', '滚动更新的Linux发行版，极简主义哲学。', 'xiaq'),
	array('centos', '由社区维护的与Redhat企业版Linux完全兼容的发行版。', 'alick'),
	array('chakra', '基于KDE SC、无Gtk的桌面环境。前身是Archlinux的[kde-mod]。', ''),
	array('cygwin', 'Windows平台下的类Unix环境.', 'BYVoid'),
	array('CTAN', 'Comprehensive TeX Archive Network。', 'MichaelChou'),
	array('debian', '一个完全由社区维护的Linux发行版。', 'heroxbd'),
	array('debian-backports', 'Debian Stable 上用的 Testing/Unstable 扩展包。', 'heroxbd'),
	array('debian-cd', 'Debian CD镜像。', 'heroxbd'),
	array('debian-multimedia', 'Debian非官方多媒体套件。', 'heroxbd'),
	array('debian-security', 'Debian安全情报', 'heroxbd'),
	array('debian-weekly-builds', 'Debian CD镜像每周构建。', 'heroxbd'),
	array('epel', 'Redhat企业版Linux额外软件包。', 'BYVoid'),
	array('fedora', '自由前卫的Linux，Redhat公司鼎力赞助。', 'BYVoid'),
	array('freebsd', '拥有辉煌历史的BSD的一个重要分支。', 'xiaq'),
	array('frugalware', 'Slackware和Archlinux哲学的混血，独特的半滚动发行模式。', ''),
	array('gentoo', '一个快速的元发行版，软件包系统使用源代码。', ''),
	array('gentoo-portage', 'Gentoo 的 ports collection。', ''),
	array('gnu', 'GNU/Linux的基础软件。', 'MichaelChou'),
	array('kernel', 'Linux内核。', 'BYVoid'),
	array('opensuse', '由Novell支持的Linux发行版。', 'BYVoid'),
	array('rpmfusion', '一个提供Fedora和RHEL兼容的额外软件包。', 'alick'),
	array('scientific', '由美国费米实验室维护的与Redhat企业版兼容的发行版。', 'BYVoid'),
	array('slackware', '最有资历的Linux发行版。', 'BYVoid'),
	array('ubuntu', '基于Debian的以桌面应用为主的Linux发行版。', 'BYVoid'),
        array('ubuntu-releases', 'Ubuntu CD镜像。', 'MichaelChou'),
);


function initialize_status($status_file, $ftp3_status_file)
{
	$lines = explode("\n", file_get_contents($status_file));
	$status['stamp'] = $lines[0];
	$mirrors = array();
	
	$lines_count = count($lines);
	for ($i = 1; $i < $lines_count; $i++)
	{
		$sec = explode(", ", $lines[$i]);
		if (count($sec) < 3)
			continue;
		$mirror = $sec[0];
		$mirrors[$mirror]['status'] = (int)$sec[1];
		$mirrors[$mirror]['done'] = (int)$sec[2];
		if ($mirrors[$mirror]['status'] && $mirrors[$mirror]['done'])
		{
			$mirrors[$mirror]['stamp'] = $sec[3];
			$mirrors[$mirror]['files_count'] = $sec[4];
			$mirrors[$mirror]['files_transferred_count'] = $sec[5];
			$mirrors[$mirror]['size'] = $sec[6];
			$mirrors[$mirror]['size_transferred'] = $sec[7];
			$mirrors[$mirror]['literal'] = $sec[8];
			$mirrors[$mirror]['matched'] = $sec[9];
			$mirrors[$mirror]['file_list_size'] = $sec[10];
			$mirrors[$mirror]['file_list_generate_time'] = $sec[11];
			$mirrors[$mirror]['file_list_transfer_time'] = $sec[12];
			$mirrors[$mirror]['bytes_sent'] = $sec[13];
			$mirrors[$mirror]['bytes_received'] = $sec[14];
		}
	}

    $lines = explode("\n", file_get_contents($ftp3_status_file));
    $lines_count = count($lines);
	for ($i = 1; $i < $lines_count; $i++)
	{
		$sec = explode(", ", $lines[$i]);
		if (count($sec) < 3)
			continue;
		$mirror = $sec[0];
		$mirrors[$mirror]['status'] = (int)$sec[1];
		$mirrors[$mirror]['done'] = (int)$sec[2];
		if ($mirrors[$mirror]['status'] && $mirrors[$mirror]['done'])
		{
			$mirrors[$mirror]['stamp'] = $sec[3];
			$mirrors[$mirror]['files_count'] = $sec[4];
			$mirrors[$mirror]['files_transferred_count'] = $sec[5];
			$mirrors[$mirror]['size'] = $sec[6];
			#$mirrors[$mirror]['size_transferred'] = $sec[7];
			#$mirrors[$mirror]['literal'] = $sec[8];
			#$mirrors[$mirror]['matched'] = $sec[9];
			#$mirrors[$mirror]['file_list_size'] = $sec[10];
			#$mirrors[$mirror]['file_list_generate_time'] = $sec[11];
			#$mirrors[$mirror]['file_list_transfer_time'] = $sec[12];
			#$mirrors[$mirror]['bytes_sent'] = $sec[13];
			#$mirrors[$mirror]['bytes_received'] = $sec[14];
		}
	}

	
	
	$status['mirrors'] = $mirrors;
	return $status;
}

function format_size($size)
{
	$size = explode(' ', $size);
	$size = (float)$size[0];
	$size /= 1048576;
	if ($size <= 1000)
		return sprintf("%.2f MB", $size);
	$size /= 1024;
	return sprintf("%.2f GB", $size);
}
?>

<p>列表更新时间：<?php echo date('Y-m-d H:i:s', $status['stamp']) ?></p>

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
<?php foreach ($mirrors as $mirrorinfo): ?>
	<?php $info = $status['mirrors'][$mirrorinfo[0]] ?>
	<tr>
		<td>
			<a href="<?php echo $mirrorinfo[0] ?>/">
				<?php echo $mirrorinfo[0] ?>
			</a>
		</td>
		<td><?php echo $mirrorinfo[2] ?></td>
		<?php if ($info['done']): ?>
			<td class="sync-state sync-ed">同步完成</td>
			<td><?php echo format_size($info['size']) ?></td>
			<td><?php echo $info['files_count'] ?></td>
			<td><?php echo date('Y-m-d H:i:s', $info['stamp']) ?></td>
		<?php else: ?>
			<?php if ($info['status']): ?>
				<td class="sync-state sync-ing">正在同步</td>
			<?php else: ?>
				<?php if (!isset($info['status'])): ?>
					<td class="sync-state sync-unknown">未知</td>
				<?php else: ?>
					<td class="sync-state sync-fail">同步失败</td>
				<?php endif ?>
			<?php endif ?>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
			<td>&nbsp;</td>
		<?php endif ?>
		<td class="description"><?php echo $mirrorinfo[1] ?></td>
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
</div>

</body>
</html>
