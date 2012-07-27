<?php
$statbydistro = array(
	'yesterday' => array(),
	'7days' => array(),
);
function stat_by_distro_init($filename, $mark) {
	global $statbydistro;
	$f = fopen($filename, 'r');
	if ($f) {
		while (!feof($f)) {
			$line = fgets($f);
			$t = explode(',', $line);
			if (count($t) == 2) {
				list($distro, $c) = $t;
				$d = 0;
			} else if (count($t) == 3) {
				list($distro, $c, $d) = $t;
			}
			$statbydistro[$mark][$distro] = array($c, $d);
		}
	}
}


function stat_by_distro_get($distro, $mark) {
	global $statbydistro;
	return (isset($statbydistro[$mark][$distro]) ? $statbydistro[$mark][$distro] : 0);
}


function convert_byte_to_text($byte) {
	$dw = array('B', 'KB', 'MB', 'GB', 'TB');
	$cur = 0;
	$num = (double)$byte;
	while ($num > 1000) {
		$num /= 1000;
		$cur++;
	}
	return sprintf("%0.2lf%s", $num, $dw[$cur]);
}


stat_by_distro_init('/home/mirror/log/_http/bydistro/yesterday.csv', 'yesterday');
stat_by_distro_init('/home/mirror/log/_http/bydistro/week.csv', 'week');
