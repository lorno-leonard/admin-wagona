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