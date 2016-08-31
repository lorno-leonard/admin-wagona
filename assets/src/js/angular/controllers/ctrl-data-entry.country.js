app.controller('dataEntryCountryCtrl', function($scope, pageService) {

  $scope.data = !_.isEmpty($scope.data_entry.country.data) ? $scope.data_entry.country.data : [];
  $scope.filter = {};
  $scope.currentDataRow = null;
  $scope.form = {};
  $scope.loading = false;

  // Set Page Title
  pageService.setPageTitle('Country', 'fa fa-flag icon');

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
        $(this).prev('#awg-panel-data-entry-country').show();
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
        id: $scope.currentDataRow.country_id,
        description: $scope.form.description,
        status: $scope.form.status
      };
      pageService.request('PATCH', 'api/country', params, function(error, data) {
        if(_.isNull(error)) {
          var _data = _.clone($scope.data),
            index = _.findIndex(_data, _.first(_.filter(_data, {country_id: $scope.currentDataRow.country_id})));
          
          // Update data
          $scope.currentDataRow.description = $scope.form.description;
          $scope.currentDataRow.status = $scope.form.status;

          $scope.data[index].description = $scope.form.description;
          $scope.data[index].status = +$scope.form.status;

          $scope.data_entry.country.data = $scope.data;

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
    pageService.request('GET', 'api/country', {}, function(error, data) {
      if(_.isNull(error)) {
        $scope.data = _.concat($scope.data, data);
        $scope.data_entry.country.data = $scope.data;
      }
      $scope.loading = false;
    });
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
   * Update Status
   * 
   * @param string    status
   * @param string    id
   */
  $scope.updateStatus = function(status, id) {
    var params = {
      id: id,
      status: status
    };
    pageService.request('PATCH', 'api/country', params, function(error, data) {
      if(_.isNull(error)) {
        var _data = _.clone($scope.data),
          index = _.findIndex(_data, _.first(_.filter(_data, {country_id: id})));
        
        // Update data
        $scope.data[index].status = status;
        $scope.data_entry.country.data = $scope.data;
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
    $scope.form.country_id = dataRow.country_id;
    $scope.form.description = dataRow.description;
    $scope.form.status = dataRow.status.toString();
    $('#awg-panel-data-entry-country').fadeOut('fast', function() {
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