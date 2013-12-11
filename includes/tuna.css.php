@charset "UTF-8";
@font-face {
  font-family: 'Open Sans';
  src: url("files/fonts/Regular/OpenSans-Regular.eot");
  src: url("files/fonts/Regular/OpenSans-Regular.eot?#iefix") format("embedded-opentype"), 
        url("files/fonts/Regular/OpenSans-Regular.woff") format("woff"), 
        url("files/fonts/Regular/OpenSans-Regular.ttf") format("truetype"), 
        url("files/fonts/Regular/OpenSans-Regular.svg#OpenSansLight") format("svg");
  font-weight: normal; 
  font-style: normal;
}
@font-face {
  font-family: 'Open Sans';
  src: url("files/fonts/Semibold/OpenSans-Semibold.eot");
  src: url("files/fonts/Semibold/OpenSans-Semibold.eot?#iefix") format("embedded-opentype"), 
        url("files/fonts/Semibold/OpenSans-Semibold.woff") format("woff"),
        url("files/fonts/Semibold/OpenSans-Semibold.ttf") format("truetype"),
        url("files/fonts/Semibold/OpenSans-Semibold.svg#OpenSansSemibold") format("svg");
  font-weight: 600;
  font-style: normal;
}
body {
  font-size: 16px;
  color: <?= $text_color ?>;
}
a, a:visited {
  color: <?= $link_color ?>;
  text-decoration: none;
}
a:hover {
  color: <?= $link_hover_color ?>;
}
h1, h2, h3, h4 {
  color: <?= $theme_color ?>;
}
ul {
  padding:  0 0 0 20px;
}
.placeholder {
  height: 1em;
  width: 100%;
  display: none;
}

.pull-right {
  float: right;
}
.pull-left {
  float: left;
}
.nospam {
  display: none;
}
.pure-g-r [class*="pure-u"] {
  font-family: "Open Sans", "Ubuntu", "Hiragino Sans GB", "WenQuanYi Micro Hei", "WenQuanYi Zen Hei", "STHeiti", "微软雅黑", sans-serif;
}

#wrapper {
  background-color: <?= $bg_color ?>;
  width: 100%;
}


@media screen and (min-width: 1130px) {

  .container {
    margin: 0 5% 0 5%;
    width: auto;
  }

  .placeholder {
    display: block;
  }

  .padding-1-lr {
    padding-left: 1em;
    padding-right: 1em;
  }
  
  .padding-2-lr {
    padding-left: 2em;
    padding-right: 2em;
  }
  
  #mirrorlist-container {
    margin: 0 1em;
    width: auto;
  }

  
}


@media screen and (max-width: 1129px) {
  .container {
    margin: 0;
    width: 100%;
  }
  
  #mirrorlist-container {
    margin: 0 2%;
    width: auto;
  }

  .padding-1-lr {
    padding-left: 1%;
    padding-right: 1%;
  }
  
  .padding-2-lr {
    padding-left: 2%;
    padding-right: 2%;
  }
}

#header {
  margin-bottom: 1em;
  background-color: <?= $header_bg_color ?>;
}

#header h1 {
  color: <?= $header_fg_color ?>;
  font-weight: normal;
}

#header .tagline {
  margin-bottom: 1.2em;
  color: <?= $header_fg_color_light ?>;
}

#header .pure-menu {
  background-color: transparent;
}

#header .pure-menu li {
  background-color: <?= $menu_inactive_bg_color ?>;
  height: 100%;
}

#header .pure-menu li.pure-menu-selected, #header .pure-menu li.pure-menu-selected:hover {
  background-color: <?= $menu_active_bg_color ?>;
}

#header .pure-menu li.pure-menu-selected a, #header .pure-menu li.pure-menu-selected a:hover, #header .pure-menu li.pure-menu-selected:hover a, #header .pure-menu li.pure-menu-selected:hover a:hover {
  font-weight: bold;
  color: <?= $menu_active_fg_color ?>;
}

#header .pure-menu li a {
  color: <?= $menu_inactive_fg_color ?>;
}

#header .pure-menu li a:hover {
  background-color: transparent !important;
  color: <?= $menu_active_fg_color ?>;
}

#header .pure-menu li:hover {
  background-color: <?= $menu_active_bg_color ?>;
}

#mirrorlist {
  width: 100%;
  border-spacing: 0;
}

#mirrorlist thead, #mirrorlist tbody, #mirrorlist tr {
  width: 100%;
}

#mirrorlist th {
  color: <?= $thupurple ?>;
}

#mirrorlist th, #mirrorlist td {
  text-align: left;
  padding: 4px 0;
  background-color: transparent;
}

#mirrorlist thead > tr {
  border-bottom: 1px solid <?= $border_color ?>;
}

#mirrorlist tbody > tr:nth-child(even) {
  background-color: <?= $strip_color ?>;
}

#mirrorlist .distribution {
  width: 20%;
}
#mirrorlist .description {
  width: 50%;
}
#mirrorlist .update {
  width: 20%;
}
#mirrorlist .help {
  width: 10%;
}

@media screen and (max-width: 768px) {
  #mirrorlist .distribution {
    width: 50%;
  }
  #mirrorlist .description {
    display: none;
  }
  #mirrorlist .update {
    width: 30%;
  }
  #mirrorlist .help {
    width: 20%;
  }
}


#footer {
  border-top: 1px solid <?= $border_color ?>;
  background-color: <?= $footer_bg_color?>;
}

#foot-logo {
  height: 96px;
}
