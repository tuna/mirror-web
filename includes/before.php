<?php
ini_set('default_socket_timeout', 3);    
include "includes/bydistro.php";
?>
<!doctype html>
<html>
<head>
<meta content="text/html; charset=UTF-8" http-equiv="Content-Type">
<meta name="google-translate-customization" content="275efe018e191117-4ad5760d63e54508-g1acd9273226ae414-1d"></meta>
<link rel="shortcut icon" href="/files/favicon.png"> 
<link href="files/humane/bigbox.css" rel="stylesheet" type="text/css" />
<link href="files/pure-0.3.0.min.css" rel="stylesheet" type="text/css" />
<link rel="stylesheet" href="files/jquery-ui.css"></script>

<style type="text/css">
<?php
$tunablue = "#2c7edf";
$lightblue = "#7daadf";
$thupurple = "#71337F";
$grey = "#444";
$light_grey = "#DDD";
$light_purple = "#ddb7e1";
$very_light_purple = "#fef5ff";
include "includes/tuna.css.php";?>
</style>
<!-- <link href="files/tuna.css" rel="stylesheet" type="text/css" /> -->

<script type="text/javascript" src="files/jquery-latest.js"></script>
<script type="text/javascript" src="files/jquery.tablesorter.min.js"></script>
<script type="text/javascript" src="files/sort-status-table.js"></script>
<script type="text/javascript" src="files/jquery-ui.js"></script>
<script type="text/javascript" src="files/humane/humane.js"></script>
<title>清华大学开源镜像站</title>
</head>

<body>
<div class="placeholder" ></div>
<div id="wrapper" class="pure-g-r">
  <div id="header" class="pure-u-1">
    <div class="padding-2-lr pull-left">
    <h1>清华大学开源镜像站</h1>
    <div class="tagline pure-hidden-phone">
      Portal of Tsinghua University Open Source Software Mirror Sites
    </div>
    <div class="pure-menu pure-menu-open pure-menu-horizontal pure-u-1">
      <ul>
          <!-- Dirty hack here -->
          <li<?php if($navActive == 0) echo(' class="pure-menu-selected"')?>><a href="#">Home</a></li>
          <li<?php if($navActive == 1) echo(' class="pure-menu-selected"')?>><a href="#">Status</a></li>
          <li<?php if($navActive == 2) echo(' class="pure-menu-selected"')?>><a href="#">Traffic</a></li>
      </ul>
    </div>
    </div>
    <div class="pull-right pure-hidden-phone">
              <img src="files/logo-w.png" alt="TUNA" /></a>
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
