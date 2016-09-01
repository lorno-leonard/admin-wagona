app.controller('transactionsPaymentsCtrl', function($scope, pageService) {
  
  $scope.data = !_.isEmpty($scope.transactions.payments.data) ? $scope.transactions.payments.data : [];
  $scope.filter = {};
  $scope.loading = false;

  // Set Page Title
  pageService.setPageTitle('Payments', 'fa fa-credit-card icon');

  /**
   ****************************
   * ANGULAR FUNCTIONS
   ****************************
   */

  /**
   * Initialize Controller
   * 
   */
  $scope.init = function() {
    if($scope.data.length == 0) {
      $scope.getData();
    }
  };

  /**
   * Get Data
   * 
   */
  $scope.getData = function() {
    $scope.data = [];
    $scope.loading = true;
    pageService.request('GET', 'api/payments', {}, function(error, data) {
      if(_.isNull(error)) {
        $scope.data = _.concat($scope.data, data);
        $scope.transactions.payments.data = $scope.data;
      }
      $scope.loading = false;
    });
  };

  /**
   * Filter Data by payer
   * 
   * @param string    payer
   */
  $scope.filterPayer = function(payer) {
    $scope.filter.item_name = payer;
  };
});