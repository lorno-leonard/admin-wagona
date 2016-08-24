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