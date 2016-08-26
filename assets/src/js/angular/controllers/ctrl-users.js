app.controller('usersCtrl', function($scope, pageService) {

  $scope.data = !_.isEmpty($scope.users.data) ? $scope.users.data : [];
  $scope.filter = {};
  $scope.paymentStatus = '';
  $scope.currentDataRow = null;
  $scope.form = {};
  $scope.loading = false;
  
  // Set Page Title
  pageService.setPageTitle('Users', 'fa fa-users icon');

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
        $(this).prev('#awg-panel-users').show();
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

      var data = {
        id: $scope.currentDataRow.account_id,
        account_type: $scope.form.account_type,
        payment_status: $scope.form.payment_status,
        status: $scope.form.status
      };
      pageService.request('PATCH', 'api/users', data, function(error, data) {
        if(_.isNull(error)) {
          var _data = _.clone($scope.data),
            index = _.findIndex(_data, _.first(_.filter(_data, {country_id: $scope.currentDataRow.account_id})));
          
          // Update data
          $scope.currentDataRow.account_type = $scope.form.account_type;
          $scope.currentDataRow.payment_status = $scope.form.payment_status;
          $scope.currentDataRow.status = $scope.form.status;

          $scope.data[index].account_type = $scope.form.account_type;
          $scope.data[index].payment_status = $scope.form.payment_status;
          $scope.data[index].status = +$scope.form.status;

          $scope.users.data = $scope.data;

          // Enable Buttons
          $(buttons).removeClass('disabled');

          // Notify
          pageService.notify('Success!', 'Successfully updated data.', 'success');
        }
        else {
          console.log(error);
        }
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
    pageService.request('GET', 'api/users', {}, function(error, data) {
      if(_.isNull(error)) {
        $scope.data = _.concat($scope.data, data);
        $scope.users.data = $scope.data;
      }
      else {
        console.log(error);
      }
      $scope.loading = false;
    });
  };

  /**
   * Filter Data by Account Type
   * 
   * @param string    accountType
   */
  $scope.filterAccountType = function(accountType) {
    $scope.filter.account_type = accountType;
  };

  /**
   * Filter Data by Payment Status
   * 
   * @param string    paymentStatus
   */
  $scope.filterPaymentStatus = function(data) {
    if(_.isEqual($scope.paymentStatus, '')) {
      return true;
    }
    else {
      return _.isEqual(data.payment_status, $scope.paymentStatus)
    }
  };

  /**
   * Filter Data by status
   * 
   * @param string    status
   */
  $scope.filterStatus = function(status) {
    $scope.filter.status = status;
  };

  /**
   * Set filter Payment Status
   * 
   * @param string    paymentStatus
   */
  $scope.setFilterPaymentStatus = function(paymentStatus) {
    $scope.paymentStatus = paymentStatus;
  };

  /**
   * Update Status
   * 
   * @param string    status
   * @param string    id
   */
  $scope.updateStatus = function(status, id) {
    var data = {
      id: id,
      status: status
    };
    pageService.request('PATCH', 'api/users', data, function(error, data) {
      if(_.isNull(error)) {
        var _data = _.clone($scope.data),
          index = _.findIndex(_data, _.first(_.filter(_data, {account_id: id})));
        
        // Update data
        $scope.data[index].status = status;
        $scope.users.data = $scope.data;
      }
      else {
        console.log(error);
      }
    });
  };

  /**
   * Initialize Edit form
   * 
   * @param object    dataRow
   */
  $scope.editData = function(dataRow) {
    $scope.currentDataRow = dataRow;
    console.log(dataRow);
    $scope.form.account_id = dataRow.account_id;
    $scope.form.first_name = dataRow.first_name;
    $scope.form.surname = dataRow.surname;
    $scope.form.account_type = dataRow.account_type;
    $scope.form.payment_status = dataRow.payment_status;
    $scope.form.status = dataRow.status.toString();
    $('#awg-panel-users').fadeOut('fast', function() {
      var form = $('section.awg-panel-edit form');

      // Reset Form
      form.parsley().reset();

      $(this).next('section.awg-panel-edit').show();
    });
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