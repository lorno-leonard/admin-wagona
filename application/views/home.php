<!DOCTYPE html>
<html class="app" ng-app="app-admin-wagona" ng-controller="mainCtrl">
<head>
  <meta charset="utf-8">
  <title>Admin - Wagona.com</title>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <link rel="stylesheet" href="assets/dist/css/app.min.css" type="text/css">
  <!--[if lt IE 9]>
    <script src="assets/dist/js/ie/html5shiv.js"></script>
    <script src="assets/dist/js/ie/respond.min.js"></script>
    <script src="assets/dist/js/ie/excanvas.js"></script>
  <![endif]-->
</head>
<body class="">
  <!-- section.vbox -->
  <section class="vbox">

    <!-- header.navbar -->
    <header class="bg-dark lt header navbar navbar-fixed-top-xs">
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
    <!-- /header.navbar -->

    <section>
      <!-- section.hbox.stretch -->
      <section class="hbox stretch">

        <!-- aside#nav -->
        <aside class="bg-dark lter aside-md hidden-print hidden-xs" id="nav">          
          <section class="vbox">
            <section class="w-f scrollable">
              <div class="slim-scroll" data-height="auto" data-disable-fade-out="true" data-distance="0" data-size="5px" data-color="#333333">
                
                <!-- nav -->
                <nav class="nav-primary hidden-xs">
                  <ul class="nav">
                    <li class="active">
                      <a href="" class="active" ui-sref="dashboard">
                        <i class="fa fa-dashboard icon">
                          <b class="bg-info"></b>
                        </i>
                        <span>Dashboard</span>
                      </a>
                    </li>
                    <li>
                      <a href="" ui-sref="data-entry">
                        <i class="fa fa-list icon">
                          <b class="bg-primary"></b>
                        </i>
                        <span class="pull-right">
                          <i class="fa fa-angle-down text"></i>
                          <i class="fa fa-angle-up text-active"></i>
                        </span>
                        <span>Data Entry</span>
                      </a>
                      <ul class="nav lt">
                        <li>
                          <a href="">                                                        
                            <i class="fa fa-flag"></i>
                            <span>Country</span>
                          </a>
                        </li>
                        <li>
                          <a href="" >                                                        
                            <i class="fa fa-book"></i>
                            <span>Syllabi</span>
                          </a>
                        </li>
                        <li>
                          <a href="" >                                                        
                            <i class="fa fa-bookmark"></i>
                            <span>Subject</span>
                          </a>
                        </li>
                        <li>
                          <a href="" >                                                        
                            <i class="fa fa-certificate"></i>
                            <span>Topic</span>
                          </a>
                        </li>
                        <li>
                          <a href="" >                                                        
                            <i class="fa fa-question"></i>
                            <span>Question</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="" ui-sref="users">
                        <i class="fa fa-users icon">
                          <b class="bg-danger"></b>
                        </i>
                        <span>Users</span>
                      </a>
                    </li>
                    <li>
                      <a href="" ui-sref="transactions">
                        <i class="fa fa-suitcase icon">
                          <b class="bg-warning"></b>
                        </i>
                        <span class="pull-right">
                          <i class="fa fa-angle-down text"></i>
                          <i class="fa fa-angle-up text-active"></i>
                        </span>
                        <span>Transactions</span>
                      </a>
                      <ul class="nav lt">
                        <li>
                          <a href="">                                                        
                            <i class="fa fa-credit-card"></i>
                            <span>Payments</span>
                          </a>
                        </li>
                        <li>
                          <a href="" >                                                        
                            <i class="fa fa-dollar"></i>
                            <span>Subscription Prices</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </nav>
                <!-- /nav -->

              </div>
            </section>
          </section>
        </aside>
        <!-- aside#nav -->

        <!-- section#content -->
        <section id="content">
          <section class="vbox">
            <section class="scrollable padder">
              <ul id="awg-breadcrumbs" class="breadcrumb no-border no-radius b-b b-light pull-in" ng-bind-html="pageService.getBreadcrumbs()"></ul>
              <div class="m-b-md">
                <h3 class="m-b-none" ng-bind-html="pageService.getPageTitle()"></h3>
              </div>
              <section id="awg-content" ui-view></section>
            </section>
          </section>
        </section>
        <!-- /section#content -->

      </section>
      <!-- /section.hbox.stretch -->
    </section>

  </section>
  <!-- /section.vbox -->

  <!-- Dashboard Template -->
  <script type="text/ng-template" id="dashboard.html">
  
  </script>
  <!-- /Dashboard Template -->
  
  <!-- Dashboard Template -->
  <script type="text/ng-template" id="data-entry.html">
  
  </script>
  <!-- /Dashboard Template -->
  
  <!-- Transactions Template -->
  <script type="text/ng-template" id="transactions.html">
  
  </script>
  <!-- /Transactions Template -->
  
  <!-- Users Template -->
  <script type="text/ng-template" id="users.html">
  
  </script>
  <!-- /Users Template -->
  
  <!-- Scripts -->
  <script src="assets/dist/js/vendor.min.js"></script>
  <script src="assets/dist/js/app.js"></script>
</body>
</html>