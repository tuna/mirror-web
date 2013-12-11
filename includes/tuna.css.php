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
  color: #444;
}
a, a:visited {
  color: <?= $tunablue ?>;
  text-decoration: none;
}
a:hover {
  color: <?= $light_blue ?>;
}
h1, h2, h3, h4 {
  color: <?= $thupurple ?>;
}

.aside {
  border: 1px solid #777777;
  background-color: #e6e6e6;
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
  background-color: #FFFFFF;
}


@media screen and (min-width: 1130px) {
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
  
  #wrapper {
    margin: 0 5% 0 5%;
    width: auto;
  }

}


@media screen and (max-width: 1129px) {
  .padding-1-lr {
    padding-left: 1%;
    padding-right: 1%;
  }
  
  .padding-2-lr {
    padding-left: 2%;
    padding-right: 2%;
  }
  #wrapper {
    width: 100%;
  }
}

#header {
  margin-bottom: 1em;
  background-color: <?= $thupurple ?>;
}

#header h1 {
  color: white;
  font-weight: normal;
}

#header .tagline {
  margin-bottom: 1.2em;
  color: <?= $light_purple ?>;
}

#header .pure-menu {
  background-color: transparent;
}

#header .pure-menu li {
  background-color: <?= $thupurple ?>;
  height: 100%;
}

#header .pure-menu li.pure-menu-selected, #header .pure-menu li.pure-menu-selected:hover {
  background-color: white;
}

#header .pure-menu li.pure-menu-selected a, #header .pure-menu li.pure-menu-selected a:hover, #header .pure-menu li.pure-menu-selected:hover a, #header .pure-menu li.pure-menu-selected:hover a:hover {
  font-weight: bold;
  color: <?= $thupurple ?>;
}

#header .pure-menu li a {
  color: white;
}

#header .pure-menu li a:hover {
  background-color: transparent !important;
  color: <?= $thupurple ?>;
}

#header .pure-menu li:hover {
  background-color: white;
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
  border-bottom: 1px solid #DDD;
}

#mirrorlist tbody > tr:nth-child(even) {
  background-color: <?= $very_light_purple ?>;
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
