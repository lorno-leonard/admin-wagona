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
        controller: 'dataEntryCtrl'
      })
        .state('data-entry-country', {
          url: '/data-entry-country',
          templateUrl: 'data-entry.country.html',
          controller: 'dataEntryCountryCtrl',
          data: {
            parentState: 'data-entry',
            parentStateTitle: 'Data Entry'
          }
        })
        .state('data-entry-syllabi', {
          url: '/data-entry-syllabi',
          templateUrl: 'data-entry.syllabi.html',
          controller: 'dataEntrySyllabiCtrl',
          data: {
            parentState: 'data-entry',
            parentStateTitle: 'Data Entry'
          }
        })
        .state('data-entry-subject', {
          url: '/data-entry-subject',
          templateUrl: 'data-entry.subject.html',
          controller: 'dataEntrySubjectCtrl',
          data: {
            parentState: 'data-entry',
            parentStateTitle: 'Data Entry'
          }
        })
        .state('data-entry-topic', {
          url: '/data-entry-topic',
          templateUrl: 'data-entry.topic.html',
          controller: 'dataEntryTopicCtrl',
          data: {
            parentState: 'data-entry',
            parentStateTitle: 'Data Entry'
          }
        })
        .state('data-entry-question', {
          url: '/data-entry-question',
          templateUrl: 'data-entry.question.html',
          controller: 'dataEntryQuestionCtrl',
          data: {
            parentState: 'data-entry',
            parentStateTitle: 'Data Entry'
          }
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
      })
        .state('transactions-payments', {
          url: '/transactions-payments',
          templateUrl: 'transactions.payments.html',
          controller: 'transactionsPaymentsCtrl',
          data: {
            parentState: 'transactions',
            parentStateTitle: 'Transactions'
          }
        })
        .state('transactions-subscription-prices', {
          url: '/transactions-subscription-prices',
          templateUrl: 'transactions.subscription-prices.html',
          controller: 'transactionsSubscriptionPricesCtrl',
          data: {
            parentState: 'transactions',
            parentStateTitle: 'Transactions'
          }
        })
      ;
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
app.controller('dataEntryCountryCtrl', function($scope, pageService) {
  
  // Set Page Title
  pageService.setPageTitle('Country', 'fa fa-flag icon');
});
app.controller('dataEntryCtrl', function($scope, pageService) {

  $scope.data_entry.country = {};
  $scope.data_entry.syllabi = {};
  $scope.data_entry.subject = {};
  $scope.data_entry.topic = {};
  $scope.data_entry.question = {};
  
  // Set Page Title
  pageService.setPageTitle('Data Entry', 'fa fa-list icon');
  
  // Data Entry Menus
  $scope.data_entry.menus = _.first(_.filter($scope.menus, {'ui-sref': 'data-entry'})).menus;
});
app.controller('dataEntryQuestionCtrl', function($scope, pageService) {
  
  // Set Page Title
  pageService.setPageTitle('Question', 'fa fa-question icon');
});
app.controller('dataEntrySubjectCtrl', function($scope, pageService) {
  
  // Set Page Title
  pageService.setPageTitle('Subject', 'fa fa-bookmark icon');
});
app.controller('dataEntrySyllabiCtrl', function($scope, pageService) {
  
  // Set Page Title
  pageService.setPageTitle('Syllabi', 'fa fa-book icon');
});
app.controller('dataEntryTopicCtrl', function($scope, pageService) {
  
  // Set Page Title
  pageService.setPageTitle('Topic', 'fa fa-certificate icon');
});
app.controller('mainCtrl', function($scope, $state, pageService) {
  
  $scope._ = _;
  $scope.state = $state;
  $scope.pageService = pageService;
  $scope.dashboard = {};
  $scope.data_entry = {};
  $scope.users = {};
  $scope.transactions = {};

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
      iconClass: 'fa fa-flag icon',
      'ui-sref': 'data-entry-country'
    }, {
      title: 'Syllabi',
      iconClass: 'fa fa-book icon',
      'ui-sref': 'data-entry-syllabi'
    }, {
      title: 'Subject',
      iconClass: 'fa fa-bookmark icon',
      'ui-sref': 'data-entry-subject'
    }, {
      title: 'Topic',
      iconClass: 'fa fa-certificate icon',
      'ui-sref': 'data-entry-topic'
    }, {
      title: 'Question',
      iconClass: 'fa fa-question icon',
      'ui-sref': 'data-entry-question'
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
      iconClass: 'fa fa-credit-card icon',
      'ui-sref': 'transactions-payments'
    }, {
      title: 'Subscription Prices',
      iconClass: 'fa fa-dollar icon',
      'ui-sref': 'transactions-subscription-prices'
    }]
  }];

  /**
   * Get Menu Class of passed menu details object
   * 
   * @param object    menu
   * @return string   'active' or ''
   */
  $scope.getMenuClass = function(menu) {
    return _.has(menu, 'ui-sref') && (_.isEqual(menu['ui-sref'], $state.current.name) || $state.current.name.indexOf(menu['ui-sref']) != -1) ? 'active' : '';
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

  // Data Entry Menus
  $scope.transactions.menus = _.first(_.filter($scope.menus, {'ui-sref': 'transactions'})).menus;
});
app.controller('transactionsPaymentsCtrl', function($scope, pageService) {
  
  // Set Page Title
  pageService.setPageTitle('Payments', 'fa fa-credit-card icon');
});
app.controller('transactionsSubscriptionPricesCtrl', function($scope, pageService) {
  
  // Set Page Title
  pageService.setPageTitle('Subscription Prices', 'fa fa-dollar icon');
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

  /**
   * Get Breadcrumbs
   * 
   * @return string   HTML string
   */
  this.getBreadcrumbs = function() {
    var hasParent = true,
      parentList = [],
      currentState = $state.current;

    // Getting parent states recursively
    while(_.has(currentState, 'data')) {
      var parentState = $state.get(currentState.data.parentState);
      parentList.push({
        title: currentState.data.parentStateTitle,
        'ui-sref': parentState.name
      })
      currentState = parentState;
    }

    // Reverse parentList
    _.reverse(parentList);

    // Generate HTML for breadrumbs
    var html = '';
    html += '<li><a href="" ui-sref="dashboard"><i class="fa fa-home"></i> Home</a></li>';
    _.each(parentList, function(value) {
      html += '<li><a href="#/' + value['ui-sref'] + '">' + value.title + '</a></li>';
    });
    html += '<li>' + pageTitle + '</li>';

    return $sce.trustAsHtml(html);
  };

  /**
   * Get Page Title
   * 
   * @return string   pageTitleHtml
   */
  this.getPageTitle = function() {
    return $sce.trustAsHtml(pageTitleHtml);
  };

  /**
   * Set Page Title and also an HTML string for rendering the Page Title
   * 
   */
  this.setPageTitle = function(title, iconClass) {
    pageTitle = title;
    pageTitleHtml = (!_.isUndefined(iconClass) ? '<i class="' + iconClass + '"></i> ' : '') + title;
  };
});