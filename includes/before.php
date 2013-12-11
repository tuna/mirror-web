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

<style type="text/css">
<?php
include "includes/colors.php";

$bg_color = $white;
$theme_color = $thupurple;

$text_color = $grey;
$link_color = $tunablue;
$link_hover_color = $lightblue;
$border_color = $light_grey;

$header_bg_color = $theme_color;
$header_fg_color = $white;
$header_fg_color_light = $light_purple;

$menu_active_fg_color = $theme_color;
$menu_active_bg_color = $white;
$menu_inactive_fg_color = $white;
$menu_inactive_bg_color = $theme_color;

$strip_color = $very_light_purple;
$footer_bg_color = $very_light_grey;

include "includes/tuna.css.php";?>
</style>

<?php if ($need_jq_ui) {?>
<link rel="stylesheet" href="files/jquery-ui.css"></script>
<?php } ?>

<script type="text/javascript" src="files/jquery-latest.js"></script>
<script type="text/javascript" src="files/humane/humane.js"></script>

<?php if ($need_jq_ui) {?>
<script type="text/javascript" src="files/jquery.tablesorter.min.js"></script>
<script type="text/javascript" src="files/sort-status-table.js"></script>
<script type="text/javascript" src="files/jquery-ui.js"></script>
<?php } ?>

<title>清华大学开源镜像站</title>
</head>

<body>
<div id="wrapper" class="pure-g-r">
  <div id="header" class="pure-u-1">
    <div class="container padding-2-lr">
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
    <!--
    <div class="pull-right pure-hidden-phone">
              <img src="files/logo-w.png" alt="TUNA" /></a>
    </div>
     -->
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
