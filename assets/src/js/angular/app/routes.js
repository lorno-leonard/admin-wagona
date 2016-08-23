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