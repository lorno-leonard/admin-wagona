var app = angular.module('app-admin-wagona', ['ui.router']);
app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider
      .otherwise('/');

    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: 'dashboard.html',
        controller: 'dashboardCtrl'
      })
      .state('data-entry', {
        url: '/data-entry',
        templateUrl: 'data-entry.html',
        controller: 'dateEntryCtrl'
      })
      .state('users', {
        url: '/users',
        templateUrl: 'users.html',
        controller: 'usersCtrl'
      })
      .state('transactions', {
        url: '/transactions',
        templateUrl: 'transactions.html',
        controller: 'transactionsCtrl'
      });
  }
]);
app.run([
  '$rootScope',
  '$state',
  '$stateParams',
  function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }
]);
app.controller('dashboardCtrl', function($scope, pageService) {
  
  // Set Page Title
  pageService.setPageTitle('Dashboard', 'fa fa-dashboard icon');
});
app.controller('dateEntryCtrl', function($scope, pageService) {
  
  // Set Page Title
  pageService.setPageTitle('Date Entry', 'fa fa-list icon');
});
app.controller('mainCtrl', function($scope, $state, pageService) {
  
  $scope._ = _;
  $scope.state = $state;
  $scope.pageService = pageService;

  // Menus
  $scope.menus = [{
    title: 'Dashboard',
    iconClass: 'fa fa-dashboard icon',
    bgClass: 'bg-info',
    'ui-sref': 'dashboard'
  }, {
    title: 'Data Entry',
    iconClass: 'fa fa-list icon',
    bgClass: 'bg-primary',
    'ui-sref': 'data-entry',
    menus: [{
      title: 'Country',
      iconClass: 'fa fa-flag icon'
    }, {
      title: 'Syllabi',
      iconClass: 'fa fa-book icon'
    }, {
      title: 'Subject',
      iconClass: 'fa fa-bookmark icon'
    }, {
      title: 'Topic',
      iconClass: 'fa fa-certificate icon'
    }, {
      title: 'Question',
      iconClass: 'fa fa-question icon'
    }]
  }, {
    title: 'Users',
    iconClass: 'fa fa-users icon',
    bgClass: 'bg-danger',
    'ui-sref': 'users'
  }, {
    title: 'Transactions',
    iconClass: 'fa fa-suitcase icon',
    bgClass: 'bg-warning',
    'ui-sref': 'transactions',
    menus: [{
      title: 'Payments',
      iconClass: 'fa fa-credit-card icon'
    }, {
      title: 'Subscription Prices',
      iconClass: 'fa fa-dollar icon'
    }]
  }];

  /**
   * Get Menu Class of passed menu details object
   * 
   * @param object    menu
   * @return string   'active' or ''
   */
  $scope.getMenuClass = function(menu) {
    return _.has(menu, 'ui-sref') && _.isEqual(menu['ui-sref'], $state.current.name) ? 'active' : '';
  };

  /**
   * Get ui-sref of passed menu details object
   * 
   * @param object    menu
   * @return string   ui-router state or '.'
   */
  $scope.getUiSref = function(menu) {
    return _.has(menu, 'ui-sref') && !_.isEmpty(menu['ui-sref']) ? menu['ui-sref'] : '.';
  };
});
app.controller('transactionsCtrl', function($scope, pageService) {
  
  // Set Page Title
  pageService.setPageTitle('Transactions', 'fa fa-suitcase icon');
});
app.controller('usersCtrl', function($scope, pageService) {
  
  // Set Page Title
  pageService.setPageTitle('Users', 'fa fa-users icon');
});
// prevent defalt action when clicking on <a /> element
// with empty or '#' href

app.directive('a', function() {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
        element.on('click', function(e) {
          e.preventDefault();
        });
      }
    }
  };
});
app.service('pageService', function($state, $sce) {
  var pageTitle = '',
    pageTitleHtml = '';

  // Get Breadcrumbs
  this.getBreadcrumbs = function() {
    return $sce.trustAsHtml('<li><a href="" ui-sref="dashboard"><i class="fa fa-home"></i> Home</a></li><li>' + pageTitle + '</li>');
  };

  // Get Page Title
  this.getPageTitle = function() {
    return $sce.trustAsHtml(pageTitleHtml);
  };

  // Set Page Title
  this.setPageTitle = function(title, iconClass) {
    pageTitle = title;
    pageTitleHtml = (!_.isUndefined(iconClass) ? '<i class="' + iconClass + '"></i> ' : '') + title;
  };
});