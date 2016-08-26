app.controller('dataEntryCtrl', function($scope, pageService) {
  
  // Set Page Title
  pageService.setPageTitle('Data Entry', 'fa fa-list icon');
  
  // Data Entry Menus
  $scope.data_entry.menus = _.first(_.filter($scope.menus, {'ui-sref': 'data-entry'})).menus;
});