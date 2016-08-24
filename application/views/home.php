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
                    <li ng-repeat="menu in menus" ng-class="getMenuClass(menu)">
                      <a href="" ng-class="getMenuClass(menu)" ui-sref="{{getUiSref(menu)}}">
                        <i ng-class="menu.iconClass">
                          <b ng-class="menu.bgClass"></b>
                        </i>
                        <span class="pull-right" ng-if="_.has(menu, 'menus')">
                          <i class="fa fa-angle-down text"></i>
                          <i class="fa fa-angle-up text-active"></i>
                        </span>
                        <span>{{menu.title}}</span>
                      </a>
                      <ul class="nav lt" ng-if="_.has(menu, 'menus')">
                        <li ng-repeat="submenu in menu.menus" ng-class="getMenuClass(submenu)">
                          <a href="" ng-class="getMenuClass(submenu)" ui-sref="{{getUiSref(submenu)}}">
                            <i ng-class="submenu.iconClass"></i>
                            <span>{{submenu.title}}</span>
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
  
  <!-- Data Entry - Country Template -->
  <script type="text/ng-template" id="data-entry.country.html">

  </script>
  <!-- /Data Entry - Country Template -->
  
  <!-- Data Entry Template -->
  <script type="text/ng-template" id="data-entry.html">
  <div class="row">
    <div ng-repeat="menu in data_entry.menus" class="col-sm-6 col-md-3 col-lg-2">
      <a href="" ui-sref="{{getUiSref(menu)}}" title="{{menu.title}}">
        <section class="panel panel-default">
          <header class="panel-heading bg-primary lt no-border">
            <h4 class="text-center m-n text-ellipsis text-white">{{menu.title}}</h4>
          </header>
          <div class="panel-body">
            <div class="clearfix text-center m-t m-b">
              <div class="inline">
                <div class="h1"><i ng-class="menu.iconClass"></i></div>
              </div>
            </div>
          </div>
        </section>
      </a>
    </div>
  </div>
  </script>
  <!-- /Data Entry Template -->
  
  <!-- Data Entry - Question Template -->
  <script type="text/ng-template" id="data-entry.question.html">

  </script>
  <!-- /Data Entry - Question Template -->
  
  <!-- Data Entry - Subject Template -->
  <script type="text/ng-template" id="data-entry.subject.html">

  </script>
  <!-- /Data Entry - Subject Template -->
  
  <!-- Data Entry - Syllabi Template -->
  <script type="text/ng-template" id="data-entry.syllabi.html">

  </script>
  <!-- /Data Entry - Syllabi Template -->
  
  <!-- Data Entry - Topic Template -->
  <script type="text/ng-template" id="data-entry.topic.html">

  </script>
  <!-- /Data Entry - Topic Template -->
  
  <!-- Transactions Template -->
  <script type="text/ng-template" id="transactions.html">
    <div class="row">
    <div ng-repeat="menu in transactions.menus" class="col-sm-6 col-md-3 col-lg-2">
      <a href="" ui-sref="{{getUiSref(menu)}}" title="{{menu.title}}">
        <section class="panel panel-default">
          <header class="panel-heading bg-warning lt no-border">
            <h4 class="text-center m-n text-ellipsis text-white">{{menu.title}}</h4>
          </header>
          <div class="panel-body">
            <div class="clearfix text-center m-t m-b">
              <div class="inline">
                <div class="h1"><i ng-class="menu.iconClass"></i></div>
              </div>
            </div>
          </div>
        </section>
      </a>
    </div>
  </div>
  </script>
  <!-- /Transactions Template -->
  
  <!-- Transactions - Payments Template -->
  <script type="text/ng-template" id="transactions.payments.html">

  </script>
  <!-- /Transactions - Payments Template -->
  
  <!-- Transactions - Subscription Prices Template -->
  <script type="text/ng-template" id="transactions.subscription-prices.html">

  </script>
  <!-- /Transactions - Subscription Prices Template -->
  
  <!-- Users Template -->
  <script type="text/ng-template" id="users.html">
  
  </script>
  <!-- /Users Template -->
  
  <!-- Scripts -->
  <script src="assets/dist/js/vendor.min.js"></script>
  <script src="assets/dist/js/app.js"></script>
</body>
</html>