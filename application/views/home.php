<!DOCTYPE html>
<html ng-app="app-admin-wagona">
<head>
  <meta charset="utf-8">
  <title>Admin | Wagona.com</title>
  <link rel="stylesheet" href="assets/dist/css/app.min.css" type="text/css">
  <!--[if lt IE 9]>
    <script src="assets/dist/js/ie/html5shiv.js"></script>
    <script src="assets/dist/js/ie/respond.min.js"></script>
    <script src="assets/dist/js/ie/excanvas.js"></script>
  <![endif]-->
</head>
<body>
  <section class="vbox">
    <header class="bg-dark dk header navbar navbar-fixed-top-xs">
      <div class="navbar-header aside-md">
        <a class="btn btn-link visible-xs" data-toggle="class:nav-off-screen,open" data-target="#nav,html">
          <i class="fa fa-bars"></i>
        </a>
        <a href="#" class="navbar-brand" data-toggle="fullscreen"><img src="assets/dist/images/logo.png" class="m-r-sm">Wagona</a>
        <a class="btn btn-link visible-xs" data-toggle="dropdown" data-target=".nav-user">
          <i class="fa fa-cog"></i>
        </a>
      </div>
      <ul class="nav navbar-nav navbar-right m-n hidden-xs nav-user">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">
            Admin <b class="caret"></b>
          </a>
          <ul class="dropdown-menu animated fadeInRight">
            <span class="arrow top"></span>
            <li>
              <a href="#">Logout</a>
            </li>
          </ul>
        </li>
      </ul>      
    </header>
  </section> <!-- end of section.vbox --> 
  
  <!-- Scripts -->
  <script src="assets/dist/js/vendor.min.js"></script>
</body>
</html>