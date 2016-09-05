app.controller('transactionsSubscriptionPricesCtrl', function($scope, pageService) {
  
  $scope.data = !_.isEmpty($scope.transactions.prices.data) ? $scope.transactions.prices.data : [];
  $scope.currentDataRow = null;
  $scope.form = {};
  $scope.loading = false;

  // Set Page Title
  pageService.setPageTitle('Subscription Prices', 'fa fa-dollar icon');

  /**
   ****************************
   * DEBOUNCED FUNCTIONS
   ****************************
   */

  /**
   * Debounced - Close Edit form
   * 
   */
  $scope.debCloseEditData = _.debounce(
    function() {
      $('section.awg-panel-edit').fadeOut('fast', function() {
        $scope.currentDataRow = null;
      });
    }, 
    $scope.debDuration,
    $scope.debOptions 
  );

  /**
   * Debounced - Save Data
   * 
   */
  $scope.debSaveData = _.debounce(
    function() {
      var form = $('section.awg-panel-edit form'),
        buttons = form.find('.awg-form-button');

      // Validate
      form.parsley().validate();

      // Check if not Valid
      if(!form.parsley().isValid()) {
        return;
      }

      // Disable Buttons
      $(buttons).addClass('disabled');

      var params = {
        id: $scope.currentDataRow.type_id,
        description: $scope.form.description,
        price: $scope.form.price
      };
      pageService.request('PATCH', 'api/prices', params, function(error, data) {
        if(_.isNull(error)) {
          var _data = _.clone($scope.data),
            index = _.findIndex(_data, _.first(_.filter(_data, {type_id: $scope.currentDataRow.type_id})));
          
          // Update data
          $scope.currentDataRow.description = $scope.form.description;
          $scope.currentDataRow.price = $scope.form.price;

          $scope.data[index].description = $scope.form.description;
          $scope.data[index].price = +$scope.form.price;

          $scope.transactions.prices.data = $scope.data;

          // Notify
          pageService.notify('Success!', 'Successfully updated data.', 'success');
        }

        // Enable Buttons
        $(buttons).removeClass('disabled');
      });
    }, 
    $scope.debDuration,
    $scope.debOptions 
  );


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
    pageService.request('GET', 'api/prices', {}, function(error, data) {
      if(_.isNull(error)) {
        $scope.data = _.concat($scope.data, data);
        $scope.transactions.prices.data = $scope.data;
      }
      $scope.loading = false;
    });
  };

  /**
   * Initialize Edit form
   * 
   * @param object    dataRow
   */
  $scope.editData = function(dataRow) {
    $scope.currentDataRow = dataRow;
    $scope.form.type_id = dataRow.type_id;
    $scope.form.payer = _.isEqual(dataRow.payer, 'I') ? 'Individual' : 'School';
    $scope.form.description = dataRow.description;
    $scope.form.price = +dataRow.price;
    
    var form = $('section.awg-panel-edit form');

    // Reset Form
    form.parsley().reset();

    $('section.awg-panel-edit').show();
  };

  /**
   * Close Edit form
   * 
   */
  $scope.closeEditData = function() {
    $scope.debCloseEditData();
  };

  /**
   * Save Data
   * 
   */
  $scope.saveData = function() {
    $scope.debSaveData();
  };
});