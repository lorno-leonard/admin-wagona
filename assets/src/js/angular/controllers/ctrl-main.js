app.controller('mainCtrl', function($scope, $state, pageService) {
  
  $scope._ = _;
  $scope.state = $state;
  $scope.pageService = pageService;
  $scope.dashboard = {};
  $scope.data_entry = {
    country: {
      data: []
    },
    syllabi: {
      data: []
    },
    subject: {
      data: []
    },
    topic: {},
    question: {}
  };
  $scope.users = {
    data: []
  };
  $scope.transactions = {
    payments: {
      data: []
    },
    prices: {
      data: []
    }
  };

  // Debounce variables
  $scope.debDuration = 500;
  $scope.debOptions = {
    leading: true,
    trailing: false
  };
  
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
      iconClass: 'fa fa-cc-paypal icon',
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

  /**
   * Scroll to Top
   * 
   */
  $scope.scrollToTop = function() {
    
  };
});