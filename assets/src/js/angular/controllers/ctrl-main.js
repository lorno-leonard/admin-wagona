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