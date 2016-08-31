app.controller('dataEntrySyllabiCtrl', function($scope, pageService) {
  
  $scope.data = !_.isEmpty($scope.data_entry.syllabi.data) ? $scope.data_entry.syllabi.data : [];
  $scope.filter = {};
  $scope.currentDataRow = null;
  $scope.form = {};
  $scope.action = null;
  $scope.loading = false;

  // Set Page Title
  pageService.setPageTitle('Syllabi', 'fa fa-book icon');

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
        $(this).prev('#awg-panel-data-entry-syllabi').show();
        $scope.currentDataRow = null;
        $scope.action = null;
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
        description: $scope.form.description,
        status: $scope.form.status,
        subjects: _.map(_.filter($scope.form.dataSubjects, {selected: true}), 'subject_id')
      };

      if(_.isEqual($scope.action, 'edit')) {
        // Add syllabus_id on update
        params.id = $scope.currentDataRow.syllabus_id;

        pageService.request('PATCH', 'api/syllabi', params, function(error, data) {
          if(_.isNull(error)) {
            var _data = _.clone($scope.data),
              index = _.findIndex(_data, _.first(_.filter(_data, {syllabus_id: $scope.currentDataRow.syllabus_id})));
            
            // Update data
            $scope.currentDataRow.description = $scope.form.description;
            $scope.currentDataRow.status = $scope.form.status;
            $scope.currentDataRow.num_subjects = params.subjects.length;

            $scope.data[index].description = $scope.form.description;
            $scope.data[index].status = +$scope.form.status;
            $scope.data[index].num_subjects = params.subjects.length;

            $scope.data_entry.syllabi.data = $scope.data;

            // Notify
            pageService.notify('Success!', 'Successfully updated data.', 'success');
          }

          // Enable Buttons
          $(buttons).removeClass('disabled');
        });
      }
      else if(_.isEqual($scope.action, 'add')) {
        pageService.request('POST', 'api/syllabi', params, function(error, data) {
          if(_.isNull(error)) {
            // Reload Data
            $scope.getData();

            // Initialize Add form
            $scope.addData();

            // Notify
            pageService.notify('Success!', 'Successfully added data.', 'success');
          }

          // Enable Buttons
          $(buttons).removeClass('disabled');
        });
      }
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
    pageService.request('GET', 'api/syllabi', {}, function(error, data) {
      if(_.isNull(error)) {
        $scope.data = _.concat($scope.data, data);
        $scope.data_entry.syllabi.data = $scope.data;
      }
      $scope.loading = false;
    });
  };

  /**
   * Get Data Subjects
   * 
   */
  $scope.getDataSubjects = function() {
    $scope.form.dataSubjects = [];
    $scope.form.loading = true;

    async.parallel([
      function(callback) {
        var params = {
          fields: 'description,status'
        };
        pageService.request('GET', 'api/subject', params, function(error, data) {
          if(_.isNull(error)) {
            callback(null, data);
          }
          else {
            callback(error, null);
          }
        });
      },
      function(callback) {
        if(_.isEqual($scope.action, 'edit')) {
          var params = {
            fields: 'description,status',
            syllabi_id: $scope.currentDataRow.syllabus_id
          };
          pageService.request('GET', 'api/subject', params, function(error, data) {
            if(_.isNull(error)) {
              callback(null, data);
            }
            else {
              callback(error, null);
            }
          });
        }
        else {
          callback(null, []);
        }
      }
    ],
    function(err, results) {
      $scope.form.loading = false;

      if(err) {
        console.log(err);
        return;
      }

      // Set Subject selected
      var subjectSelected = _.map(results[1], function(value) {
          return +value.subject_id;
        }), 
        subjectList = _.map(results[0], function(value) {
          value.subject_id = +value.subject_id;
          value.selected = _.indexOf(subjectSelected, value.subject_id) != -1 ? true : false;
          return value;
        });

      $scope.form.dataSubjects = subjectList;
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
   * Filter Data from Subject list by form.status
   * 
   * @param string    status
   */
  $scope.filterFormStatus = function(status) {
    $scope.form.filter.status = status;
  };

  /**
   * Filter Data from Subject list by form.selected
   * 
   * @param string    selected
   */
  $scope.filterFormSelected = function(selected) {
    $scope.form.filter.selected = selected;
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
    pageService.request('PATCH', 'api/syllabi', params, function(error, data) {
      if(_.isNull(error)) {
        var _data = _.clone($scope.data),
          index = _.findIndex(_data, _.first(_.filter(_data, {syllabus_id: id})));
        
        // Update data
        $scope.data[index].status = status;
        $scope.data_entry.syllabi.data = $scope.data;
      }
    });
  };

  /**
   * Initialize Edit form
   * 
   * @param object    dataRow
   */
  $scope.editData = function(dataRow) {
    $scope.action = 'edit';
    $scope.currentDataRow = dataRow;
    $scope.form.description = dataRow.description;
    $scope.form.status = dataRow.status.toString();
    $scope.form.dataSubjects = [];
    $scope.form.query = '';
    $scope.form.filter = {};
    $scope.form.loading = false;
    $('#awg-panel-data-entry-syllabi').fadeOut('fast', function() {
      var form = $('section.awg-panel-edit form');

      // Reset Form
      form.parsley().reset();

      $(this).next('section.awg-panel-edit').show();

      // Get Data Subjects
      $scope.getDataSubjects();
    });
  };

  /**
   * Initialize Add form
   * 
   */
  $scope.addData = function() {
    $scope.action = 'add';
    $scope.form.description = '';
    $scope.form.status = '';
    $scope.form.dataSubjects = [];
    $scope.form.query = '';
    $scope.form.filter = {};
    $scope.form.loading = false;
    $('#awg-panel-data-entry-syllabi').fadeOut('fast', function() {
      var form = $('section.awg-panel-edit form');

      // Reset Form
      form.parsley().reset();

      $(this).next('section.awg-panel-edit').show();

      // Get Data Subjects
      $scope.getDataSubjects();
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

  /**
   * Check/Uncheck Subject
   * 
   * @param number    subjectId
   */
  $scope.check = function(subjectId) {
    var _data = _.clone($scope.form.dataSubjects),
      index = _.findIndex(_data, _.first(_.filter(_data, {subject_id: subjectId}))),
      selected = $scope.form.dataSubjects[index].selected;

    $scope.form.dataSubjects[index].selected = !selected;
  };

  /**
   * Check/Uncheck All Subjects
   * 
   * @param number    action[1 = Check All, 0 = Uncheck All]
   */
  $scope.checkAll = function(action) {
    _.each($scope.form.dataSubjects, function(value, key) {
      value.selected = action ? true : false;
    });
  };
});