<?php
$statbydistro = array(
	'yesterday' => array(),
	'7days' => array(),
);
function stat_by_distro_init($filename, $mark) {
	global $statbydistro;
	$f = fopen($filename, 'r');
	while (!feof($f)) {
		$line = fgets($f);
		$t = explode(',', $line);
		if (count($t) == 2) {
			list($distro, $c) = $t;
		}
		$statbydistro[$mark][$distro] = $c;
	}
}


function stat_by_distro_get($distro, $mark) {
	global $statbydistro;
	return (isset($statbydistro[$mark][$distro]) ? $statbydistro[$mark][$distro] : 0);
}


stat_by_distro_init('/home/ftp/log/_http/bydistro/yesterday.csv', 'yesterday');
stat_by_distro_init('/home/ftp/log/_http/bydistro/week.csv', 'week');
