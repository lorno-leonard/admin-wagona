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
  <section id="awg-panel-data-entry-country" class="panel panel-default animated fadeIn" ng-init="init()">
    <header class="panel-heading">
      <span>Country list</span>
      <button class="btn btn-xs btn-info pull-right" ng-click="getData()">Reload</button>
    </header>
    <div class="row wrapper">
      <div class="col-sm-9 m-b-xs">
        <div class="m-b-xs">Status: </div>
        <div class="btn-group" data-toggle="buttons">
          <label class="btn btn-sm btn-default active" ng-click="filterStatus('')">
            <input type="radio" ng-model="status"> <span>All</span>
          </label>
          <label class="btn btn-sm btn-default" ng-click="filterStatus(1)">
            <input type="radio" ng-model="status"> <span class="text-primary">Active</span>
          </label>
          <label class="btn btn-sm btn-default" ng-click="filterStatus(0)">
            <input type="radio" ng-model="status"> <span class="text-danger">Inactive</span>
          </label>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="input-group">
          <input type="text" class="input-sm form-control" placeholder="Search" ng-model="query">
          <span class="input-group-btn">
            <button class="btn btn-sm btn-icon" type="button"><i class="fa fa-search icon"></i></button>
          </span>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table id="awg-table-data-entry-country" class="table table-striped m-b-none">
        <thead>
          <tr>
            <th class="col-sm-2">Country ID</th>
            <th class="col-sm-8">Country</th>
            <th class="col-sm-1">Status</th>
            <th class="col-sm-1"></th>
          </tr>
        </thead>
        <tbody>
          <tr ng-if="loading" class="animated fadeIn">
            <td colspan="4">Loading records...</td>
          </tr>
          <tr ng-if="!loading && data.length > 0" ng-repeat="row in filtered_data = (data | filter : query | filter : filter)" class="animated fadeIn">
            <td>{{row.country_id}}</td>
            <td>{{row.description}}</td>
            <td><span ng-class="+row.status ? 'text-primary' : 'text-danger'">{{+row.status ? 'Active' : 'Inactive'}}</span></td>
            <td>
              <a href="" ng-click="updateStatus((+row.status ? 0 : 1), row.country_id)">
                <i class="fa fa-lg icon" ng-class="+row.status ? 'fa-times text-danger' : 'fa-check text-primary'"></i>
              </a>
              <a href="" class="m-l-sm" ng-click="editData(row)">
                <i class="fa fa-lg fa-pencil icon text-info"></i>
              </a>
            </td>
          </tr>
          <tr ng-if="!loading && filtered_data.length == 0" class="animated fadeIn">
            <td colspan="4">No record found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <section class="awg-panel-edit panel panel-default col-sm-4 col-sm-offset-8 no-padder animated fadeInRight" style="display: none;">
    <header class="panel-heading">Edit Country - {{currentDataRow.description}}</header>
    <div class="panel-body">
      <form role="form" data-validate="parsley">
        <div class="form-group">
          <label>Country ID</label>
          <input type="text" class="form-control" ng-model="form.country_id" readonly>
        </div>
        <div class="form-group">
          <label>Country Description</label>
          <input type="text" class="form-control" ng-model="form.description" data-required="true">
        </div>
        <div class="form-group">
          <label>Status</label>
          <select type="text" class="form-control" ng-model="form.status" data-required="true">
            <option value="">- Select Status -</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        <button type="submit" class="awg-form-button btn btn-sm btn-primary" ng-click="saveData()">Save</button>
        <a href="" class="awg-form-button btn btn-sm btn-danger pull-right" ng-click="closeEditData()">Close</a>
      </form>
    </div>
  </section>
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
  <section id="awg-panel-data-entry-subject" class="panel panel-default animated fadeIn" ng-init="init()">
    <header class="panel-heading">
      <span>Subject list</span>
      <div class="pull-right">
        <button class="btn btn-xs btn-primary" ng-click="addData()"><i class="fa fa-plus icon"></i> Add Subject</button>
        <button class="btn btn-xs btn-info" ng-click="getData()">Reload</button>
      </div>
    </header>
    <div class="row wrapper">
      <div class="col-sm-9 m-b-xs">
        <div class="m-b-xs">Status: </div>
        <div class="btn-group" data-toggle="buttons">
          <label class="btn btn-sm btn-default active" ng-click="filterStatus('')">
            <input type="radio" ng-model="status"> <span>All</span>
          </label>
          <label class="btn btn-sm btn-default" ng-click="filterStatus(1)">
            <input type="radio" ng-model="status"> <span class="text-primary">Active</span>
          </label>
          <label class="btn btn-sm btn-default" ng-click="filterStatus(0)">
            <input type="radio" ng-model="status"> <span class="text-danger">Inactive</span>
          </label>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="input-group">
          <input type="text" class="input-sm form-control" placeholder="Search" ng-model="query">
          <span class="input-group-btn">
            <button class="btn btn-sm btn-icon" type="button"><i class="fa fa-search icon"></i></button>
          </span>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table id="awg-table-data-entry-subject" class="table table-striped m-b-none">
        <thead>
          <tr>
            <th class="col-sm-8">Subject</th>
            <th class="col-sm-2"># of Topics</th>
            <th class="col-sm-1">Status</th>
            <th class="col-sm-1"></th>
          </tr>
        </thead>
        <tbody>
          <tr ng-if="loading" class="animated fadeIn">
            <td colspan="4">Loading records...</td>
          </tr>
          <tr ng-if="!loading && data.length > 0" ng-repeat="row in filtered_data = (data | filter : query | filter : filter)" class="animated fadeIn">
            <td>{{row.description}}</td>
            <td>{{row.num_topics}}</td>
            <td><span ng-class="+row.status ? 'text-primary' : 'text-danger'">{{+row.status ? 'Active' : 'Inactive'}}</span></td>
            <td>
              <a href="" ng-click="updateStatus((+row.status ? 0 : 1), row.subject_id)">
                <i class="fa fa-lg icon" ng-class="+row.status ? 'fa-times text-danger' : 'fa-check text-primary'"></i>
              </a>
              <a href="" class="m-l-sm" ng-click="editData(row)">
                <i class="fa fa-lg fa-pencil icon text-info"></i>
              </a>
            </td>
          </tr>
          <tr ng-if="!loading && filtered_data.length == 0" class="animated fadeIn">
            <td colspan="4">No record found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <section class="awg-panel-edit panel panel-default col-sm-12 no-padder animated fadeInRight" style="display: none;">
    <header class="panel-heading">{{_.isEqual(action, 'edit') ? 'Edit Subject - ' + currentDataRow.description : 'Add Subject'}}</header>
    <div class="panel-body">
      <form role="form" data-validate="parsley">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label>Description</label>
              <input type="text" class="form-control" ng-model="form.description" data-required="true">
            </div>
            <div class="form-group">
              <label>Status</label>
              <select type="text" class="form-control" ng-model="form.status" data-required="true">
                <option value="">- Select Status -</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>
          <div class="col-sm-8">
            <section class="panel panel-default">
              <header class="panel-heading">
                <span>Select Topic(s)</span>
                <div class="pull-right">
                  <a href="" class="btn btn-xs btn-info" ng-click="getDataTopics()">Reload</a>
                </div>
              </header>
              <div class="row wrapper">
                <div class="col-sm-2 m-b-xs">
                  <div class="m-b-xs">Filter: </div>
                  <div class="btn-group" data-toggle="buttons">
                    <label class="btn btn-xs btn-default active" ng-click="filterFormSelected('')">
                      <input type="radio" ng-model="form.selected"> <span>All</span>
                    </label>
                    <label class="btn btn-xs btn-default" ng-click="filterFormSelected(true)">
                      <input type="radio" ng-model="form.selected"> <span><i class="fa fa-check icon"></i></span>
                    </label>
                    <label class="btn btn-xs btn-default" ng-click="filterFormSelected(false)">
                      <input type="radio" ng-model="form.selected"> <span><i class="fa fa-square-o icon"></i></span>
                    </label>
                  </div>
                </div>
                <div class="col-sm-3 m-b-xs">
                  <div class="m-b-xs">Status: </div>
                  <div class="btn-group" data-toggle="buttons">
                    <label class="btn btn-xs btn-default active" ng-click="filterFormStatus('')">
                      <input type="radio" ng-model="status"> <span>All</span>
                    </label>
                    <label class="btn btn-xs btn-default" ng-click="filterFormStatus(1)">
                      <input type="radio" ng-model="status"> <span class="text-primary">Active</span>
                    </label>
                    <label class="btn btn-xs btn-default" ng-click="filterFormStatus(0)">
                      <input type="radio" ng-model="status"> <span class="text-danger">Inactive</span>
                    </label>
                  </div>
                </div>
                <div class="col-sm-2 m-b-xs">
                  <div class="btn-group">
                    <a href="" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">Action <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                      <li><a href="" ng-click="checkAll(1)"><i class="fa fa-check icon"></i> Check All</a></li>
                      <li><a href="" ng-click="checkAll(0)"><i class="fa fa-square-o icon"></i> UnCheck All</a></li>
                    </ul>
                  </div>
                </div>
                <div class="col-sm-5">
                  <div class="input-group">
                    <input type="text" class="input-sm form-control" placeholder="Search" ng-model="form.query">
                    <span class="input-group-btn">
                      <button class="btn btn-sm btn-icon" type="button"><i class="fa fa-search icon"></i></button>
                    </span>
                  </div>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-striped m-b-none">
                  <tbody>
                    <tr ng-if="form.loading" class="animated fadeIn">
                      <td colspan="2">Loading records...</td>
                    </tr>
                    <tr ng-if="!form.loading && form.dataTopics.length > 0" ng-repeat="row in filtered_data = (form.dataTopics | filter : form.query | filter : form.filter)" ng-click="check(row.topic_id)" class="awg-cursor-pointer animated fadeIn">
                      <td class="col-xs-1" ng-if="row.selected"><i class="fa fa-check icon text-primary"></i></td>
                      <td class="col-xs-1" ng-if="!row.selected"></td>
                      <td class="col-xs-7">{{row.description}}</td>
                      <td class="col-xs-1"><span ng-class="+row.is_paid ? 'text-warning' : 'text-info'">{{+row.is_paid ? 'PAID' : 'FREE'}}</span></td>
                      <td class="col-xs-2"><span ng-class="+row.status ? 'text-primary' : 'text-danger'">{{+row.status ? 'Active' : 'Inactive'}}</span></td>
                    </tr>
                    <tr ng-if="!form.loading && filtered_data.length == 0" class="animated fadeIn">
                      <td colspan="2">No record found</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <button type="submit" class="awg-form-button btn btn-sm btn-primary" ng-click="saveData()">Save</button>
            <a href="" class="awg-form-button btn btn-sm btn-danger pull-right" ng-click="closeEditData()">Close</a>
          </div>
        </div>
      </form>
    </div>
  </section>
  </script>
  <!-- /Data Entry - Subject Template -->
  
  <!-- Data Entry - Syllabi Template -->
  <script type="text/ng-template" id="data-entry.syllabi.html">
  <section id="awg-panel-data-entry-syllabi" class="panel panel-default animated fadeIn" ng-init="init()">
    <header class="panel-heading">
      <span>Syllabi list</span>
      <div class="pull-right">
        <button class="btn btn-xs btn-primary" ng-click="addData()"><i class="fa fa-plus icon"></i> Add Syllabi</button>
        <button class="btn btn-xs btn-info" ng-click="getData()">Reload</button>
      </div>
    </header>
    <div class="row wrapper">
      <div class="col-sm-9 m-b-xs">
        <div class="m-b-xs">Status: </div>
        <div class="btn-group" data-toggle="buttons">
          <label class="btn btn-sm btn-default active" ng-click="filterStatus('')">
            <input type="radio" ng-model="status"> <span>All</span>
          </label>
          <label class="btn btn-sm btn-default" ng-click="filterStatus(1)">
            <input type="radio" ng-model="status"> <span class="text-primary">Active</span>
          </label>
          <label class="btn btn-sm btn-default" ng-click="filterStatus(0)">
            <input type="radio" ng-model="status"> <span class="text-danger">Inactive</span>
          </label>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="input-group">
          <input type="text" class="input-sm form-control" placeholder="Search" ng-model="query">
          <span class="input-group-btn">
            <button class="btn btn-sm btn-icon" type="button"><i class="fa fa-search icon"></i></button>
          </span>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table id="awg-table-data-entry-syllabi" class="table table-striped m-b-none">
        <thead>
          <tr>
            <th class="col-sm-8">Syllabi</th>
            <th class="col-sm-2"># of Subjects</th>
            <th class="col-sm-1">Status</th>
            <th class="col-sm-1"></th>
          </tr>
        </thead>
        <tbody>
          <tr ng-if="loading" class="animated fadeIn">
            <td colspan="4">Loading records...</td>
          </tr>
          <tr ng-if="!loading && data.length > 0" ng-repeat="row in filtered_data = (data | filter : query | filter : filter)" class="animated fadeIn">
            <td>{{row.description}}</td>
            <td>{{row.num_subjects}}</td>
            <td><span ng-class="+row.status ? 'text-primary' : 'text-danger'">{{+row.status ? 'Active' : 'Inactive'}}</span></td>
            <td>
              <a href="" ng-click="updateStatus((+row.status ? 0 : 1), row.syllabus_id)">
                <i class="fa fa-lg icon" ng-class="+row.status ? 'fa-times text-danger' : 'fa-check text-primary'"></i>
              </a>
              <a href="" class="m-l-sm" ng-click="editData(row)">
                <i class="fa fa-lg fa-pencil icon text-info"></i>
              </a>
            </td>
          </tr>
          <tr ng-if="!loading && filtered_data.length == 0" class="animated fadeIn">
            <td colspan="4">No record found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <section class="awg-panel-edit panel panel-default col-sm-12 no-padder animated fadeInRight" style="display: none;">
    <header class="panel-heading">{{_.isEqual(action, 'edit') ? 'Edit Syllabi - ' + currentDataRow.description : 'Add Syllabi'}}</header>
    <div class="panel-body">
      <form role="form" data-validate="parsley">
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label>Description</label>
              <input type="text" class="form-control" ng-model="form.description" data-required="true">
            </div>
            <div class="form-group">
              <label>Status</label>
              <select type="text" class="form-control" ng-model="form.status" data-required="true">
                <option value="">- Select Status -</option>
                <option value="1">Active</option>
                <option value="0">Inactive</option>
              </select>
            </div>
          </div>
          <div class="col-sm-8">
            <section class="panel panel-default">
              <header class="panel-heading">
                <span>Select Subject(s)</span>
                <div class="pull-right">
                  <a href="" class="btn btn-xs btn-info" ng-click="getDataSubjects()">Reload</a>
                </div>
              </header>
              <div class="row wrapper">
                <div class="col-sm-2 m-b-xs">
                  <div class="m-b-xs">Filter: </div>
                  <div class="btn-group" data-toggle="buttons">
                    <label class="btn btn-xs btn-default active" ng-click="filterFormSelected('')">
                      <input type="radio" ng-model="form.selected"> <span>All</span>
                    </label>
                    <label class="btn btn-xs btn-default" ng-click="filterFormSelected(true)">
                      <input type="radio" ng-model="form.selected"> <span><i class="fa fa-check icon"></i></span>
                    </label>
                    <label class="btn btn-xs btn-default" ng-click="filterFormSelected(false)">
                      <input type="radio" ng-model="form.selected"> <span><i class="fa fa-square-o icon"></i></span>
                    </label>
                  </div>
                </div>
                <div class="col-sm-3 m-b-xs">
                  <div class="m-b-xs">Status: </div>
                  <div class="btn-group" data-toggle="buttons">
                    <label class="btn btn-xs btn-default active" ng-click="filterFormStatus('')">
                      <input type="radio" ng-model="status"> <span>All</span>
                    </label>
                    <label class="btn btn-xs btn-default" ng-click="filterFormStatus(1)">
                      <input type="radio" ng-model="status"> <span class="text-primary">Active</span>
                    </label>
                    <label class="btn btn-xs btn-default" ng-click="filterFormStatus(0)">
                      <input type="radio" ng-model="status"> <span class="text-danger">Inactive</span>
                    </label>
                  </div>
                </div>
                <div class="col-sm-2 m-b-xs">
                  <div class="btn-group">
                    <a href="" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown">Action <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                      <li><a href="" ng-click="checkAll(1)"><i class="fa fa-check icon"></i> Check All</a></li>
                      <li><a href="" ng-click="checkAll(0)"><i class="fa fa-square-o icon"></i> UnCheck All</a></li>
                    </ul>
                  </div>
                </div>
                <div class="col-sm-5">
                  <div class="input-group">
                    <input type="text" class="input-sm form-control" placeholder="Search" ng-model="form.query">
                    <span class="input-group-btn">
                      <button class="btn btn-sm btn-icon" type="button"><i class="fa fa-search icon"></i></button>
                    </span>
                  </div>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table table-striped m-b-none">
                  <tbody>
                    <tr ng-if="form.loading" class="animated fadeIn">
                      <td colspan="2">Loading records...</td>
                    </tr>
                    <tr ng-if="!form.loading && form.dataSubjects.length > 0" ng-repeat="row in filtered_data = (form.dataSubjects | filter : form.query | filter : form.filter)" ng-click="check(row.subject_id)" class="awg-cursor-pointer animated fadeIn">
                      <td class="col-xs-1" ng-if="row.selected"><i class="fa fa-check icon text-primary"></i></td>
                      <td class="col-xs-1" ng-if="!row.selected"></td>
                      <td class="col-xs-8">{{row.description}}</td>
                      <td class="col-xs-2"><span ng-class="+row.status ? 'text-primary' : 'text-danger'">{{+row.status ? 'Active' : 'Inactive'}}</span></td>
                    </tr>
                    <tr ng-if="!form.loading && filtered_data.length == 0" class="animated fadeIn">
                      <td colspan="2">No record found</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-4">
            <button type="submit" class="awg-form-button btn btn-sm btn-primary" ng-click="saveData()">Save</button>
            <a href="" class="awg-form-button btn btn-sm btn-danger pull-right" ng-click="closeEditData()">Close</a>
          </div>
        </div>
      </form>
    </div>
  </section>
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
  <section id="awg-panel-users" class="panel panel-default animated fadeIn" ng-init="init()">
    <header class="panel-heading">
      <span>User list</span>
      <button class="btn btn-xs btn-info pull-right" ng-click="getData()">Reload</button>
    </header>
    <div class="row wrapper">
      <div class="col-sm-2 m-b-xs">
        <div class="m-b-xs">Account Type: </div>
        <div class="btn-group" data-toggle="buttons">
          <label class="btn btn-sm btn-default active" ng-click="filterAccountType('')">
            <input type="radio" ng-model="status"> <span>All</span>
          </label>
          <label class="btn btn-sm btn-default" ng-click="filterAccountType('PAID-ACCOUNT')">
            <input type="radio" ng-model="status"> <span class="text-warning">PAID</span>
          </label>
          <label class="btn btn-sm btn-default" ng-click="filterAccountType('FREE-ACCOUNT')">
            <input type="radio" ng-model="status"> <span class="text-info">FREE</span>
          </label>
        </div>
      </div>
      <div class="col-sm-4 m-b-xs">
        <div class="m-b-xs">Payment Status: </div>
        <div class="btn-group" data-toggle="buttons">
          <label class="btn btn-sm btn-default active" ng-click="setFilterPaymentStatus('')">
            <input type="radio" ng-model="status"> <span>All</span>
          </label>
          <label class="btn btn-sm btn-default" ng-click="setFilterPaymentStatus('COMPLETE')">
            <input type="radio" ng-model="status"> <span>COMPLETE</span>
          </label>
          <label class="btn btn-sm btn-default" ng-click="setFilterPaymentStatus('NOT-COMPLETE')">
            <input type="radio" ng-model="status"> <span>INCOMPLETE</span>
          </label>
          <label class="btn btn-sm btn-default" ng-click="setFilterPaymentStatus('WAIVED')">
            <input type="radio" ng-model="status"> <span>WAIVED</span>
          </label>
        </div>
      </div>
      <div class="col-sm-3 m-b-xs">
        <div class="m-b-xs">Status: </div>
        <div class="btn-group" data-toggle="buttons">
          <label class="btn btn-sm btn-default active" ng-click="filterStatus('')">
            <input type="radio" ng-model="status"> <span>All</span>
          </label>
          <label class="btn btn-sm btn-default" ng-click="filterStatus(1)">
            <input type="radio" ng-model="status"> <span class="text-primary">Active</span>
          </label>
          <label class="btn btn-sm btn-default" ng-click="filterStatus(0)">
            <input type="radio" ng-model="status"> <span class="text-danger">Inactive</span>
          </label>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="input-group">
          <input type="text" class="input-sm form-control" placeholder="Search" ng-model="query">
          <span class="input-group-btn">
            <button class="btn btn-sm btn-icon" type="button"><i class="fa fa-search icon"></i></button>
          </span>
        </div>
      </div>
    </div>
    <div class="table-responsive">
      <table id="awg-table-users" class="table table-striped m-b-none">
        <thead>
          <tr>
            <th class="col-sm-3">Firstname</th>
            <th class="col-sm-3">Lastname</th>
            <th class="col-sm-2">Account Type</th>
            <th class="col-sm-2">Payment Status</th>
            <th class="col-sm-1">Status</th>
            <th class="col-sm-1"></th>
          </tr>
        </thead>
        <tbody>
          <tr ng-if="loading" class="animated fadeIn">
            <td colspan="6">Loading records...</td>
          </tr>
          <tr ng-if="!loading && data.length > 0" ng-repeat="row in filtered_data = (data | filter : query | filter : filter | filter : filterPaymentStatus)" class="animated fadeIn">
            <td>{{row.first_name}}</td>
            <td>{{row.surname}}</td>
            <td><span ng-class="_.isEqual(row.account_type, 'PAID-ACCOUNT') ? 'text-warning' : 'text-info'">{{_.isEqual(row.account_type, 'PAID-ACCOUNT') ? 'PAID' : 'FREE'}}</span></td>
            <td>{{_.isEqual(row.payment_status, 'NOT-COMPLETE') ? 'INCOMPLETE' : row.payment_status}}</td>
            <td><span ng-class="+row.status ? 'text-primary' : 'text-danger'">{{+row.status ? 'Active' : 'Inactive'}}</span></td>
            <td>
              <a href="" ng-click="updateStatus((+row.status ? 0 : 1), row.account_id)">
                <i class="fa fa-lg icon" ng-class="+row.status ? 'fa-times text-danger' : 'fa-check text-primary'"></i>
              </a>
              <a href="" class="m-l-sm" ng-click="editData(row)">
                <i class="fa fa-lg fa-pencil icon text-info"></i>
              </a>
            </td>
          </tr>
          <tr ng-if="!loading && filtered_data.length == 0" class="animated fadeIn">
            <td colspan="6">No record found</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
  <section class="awg-panel-edit panel panel-default col-sm-4 col-sm-offset-8 no-padder animated fadeInRight" style="display: none;">
    <header class="panel-heading">Edit User - {{currentDataRow.first_name + ' ' + currentDataRow.surname}}</header>
    <div class="panel-body">
      <form role="form" data-validate="parsley">
        <div class="form-group">
          <label>Firstname</label>
          <input type="text" class="form-control" ng-model="form.first_name" readonly>
        </div>
        <div class="form-group">
          <label>Surname</label>
          <input type="text" class="form-control" ng-model="form.surname" readonly>
        </div>
        <div class="form-group">
          <label>Account Type</label>
          <select type="text" class="form-control" ng-model="form.account_type" data-required="true">
            <option value="">- Select Account Type -</option>
            <option value="PAID-ACCOUNT">PAID</option>
            <option value="FREE-ACCOUNT">FREE</option>
          </select>
        </div>
        <div class="form-group">
          <label>Payment Status</label>
          <select type="text" class="form-control" ng-model="form.payment_status" data-required="true">
            <option value="">- Select Payment Status -</option>
            <option value="COMPLETE">COMPLETE</option>
            <option value="NOT-COMPLETE">INCOMPLETE</option>
            <option value="WAIVED">WAIVED</option>
          </select>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select type="text" class="form-control" ng-model="form.status" data-required="true">
            <option value="">- Select Status -</option>
            <option value="1">Active</option>
            <option value="0">Inactive</option>
          </select>
        </div>
        <button type="submit" class="awg-form-button btn btn-sm btn-primary" ng-click="saveData()">Save</button>
        <a href="" class="awg-form-button btn btn-sm btn-danger pull-right" ng-click="closeEditData()">Close</a>
      </form>
    </div>
  </section>
  </script>
  <!-- /Users Template -->
  
  <button id="awg-btn-scroll-top" class="btn btn-icon btn-info" ng-click="scrollToTop()">
    <i class="fa fa-chevron-up icon"></i>
  </button>

  <!-- Scripts -->
  <script src="assets/dist/js/vendor.min.js"></script>
  <script src="assets/dist/js/app.js"></script>
</body>
</html>