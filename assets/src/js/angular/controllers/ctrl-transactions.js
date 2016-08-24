app.controller('transactionsCtrl', function($scope, pageService) {
  
  // Set Page Title
  pageService.setPageTitle('Transactions', 'fa fa-suitcase icon');

  // Data Entry Menus
  $scope.transactions.menus = _.first(_.filter($scope.menus, {'ui-sref': 'transactions'})).menus;
});