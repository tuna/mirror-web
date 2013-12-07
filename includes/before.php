<?php
ini_set('default_socket_timeout', 3);    
include "includes/bydistro.php";
?>
<!doctype html>
<html>
<head>
	<meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
	<meta name="google-translate-customization" content="275efe018e191117-4ad5760d63e54508-g1acd9273226ae414-1d"></meta>
	<link href="files/mirrors.tuna.css" rel="stylesheet" type="text/css" />
	<link href="files/humane/bigbox.css" rel="stylesheet" type="text/css" />
	<link href="files/pure-0.3.0.min.css" rel="stylesheet" type="text/css" />
	<link rel="stylesheet" href="files/jquery-ui.css"></script>
	<script type="text/javascript" src="files/jquery-latest.js"></script>
	<script type="text/javascript" src="files/jquery.tablesorter.min.js"></script>
	<script type="text/javascript" src="files/sort-status-table.js"></script>
	<script type="text/javascript" src="files/jquery-ui.js"></script>
	<script type="text/javascript" src="files/humane/humane.js"></script>
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
<?php
if (file_exists('notice.html') && filesize('notice.html') != 0) {
?>
	<script type="text/javascript">
		humane.log("<?php echo addslashes(str_replace(array("\r", "\n"), '', file_get_contents('notice.html')));?>",
{timeout: 5000, clickToClose: true});
	</script>
<?php
}
?>
