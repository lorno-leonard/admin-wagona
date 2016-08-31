app.controller('dataEntrySubjectCtrl', function($scope, pageService) {
  
  $scope.data = !_.isEmpty($scope.data_entry.subject.data) ? $scope.data_entry.subject.data : [];
  $scope.filter = {};
  $scope.currentDataRow = null;
  $scope.form = {};
  $scope.action = null;
  $scope.loading = false;

  // Set Page Title
  pageService.setPageTitle('Subject', 'fa fa-bookmark icon');

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
        $(this).prev('#awg-panel-data-entry-subject').show();
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
        topics: _.map(_.filter($scope.form.dataTopics, {selected: true}), 'topic_id')
      };

      if(_.isEqual($scope.action, 'edit')) {
        // Add subject_id on update
        params.id = $scope.currentDataRow.subject_id;

        pageService.request('PATCH', 'api/subject', params, function(error, data) {
          if(_.isNull(error)) {
            var _data = _.clone($scope.data),
              index = _.findIndex(_data, _.first(_.filter(_data, {subject_id: $scope.currentDataRow.subject_id})));
            
            // Update data
            $scope.currentDataRow.description = $scope.form.description;
            $scope.currentDataRow.status = $scope.form.status;
            $scope.currentDataRow.num_topics = params.topics.length;

            $scope.data[index].description = $scope.form.description;
            $scope.data[index].status = +$scope.form.status;
            $scope.data[index].num_topics = params.topics.length;

            $scope.data_entry.subject.data = $scope.data;

            // Notify
            pageService.notify('Success!', 'Successfully updated data.', 'success');
          }

          // Enable Buttons
          $(buttons).removeClass('disabled');
        });
      }
      else if(_.isEqual($scope.action, 'add')) {
        pageService.request('POST', 'api/subject', params, function(error, data) {
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
    pageService.request('GET', 'api/subject', {}, function(error, data) {
      if(_.isNull(error)) {
        $scope.data = _.concat($scope.data, data);
        $scope.data_entry.subject.data = $scope.data;
      }
      $scope.loading = false;
    });
  };

  /**
   * Get Data Topics
   * 
   */
  $scope.getDataTopics = function() {
    $scope.form.dataTopics = [];
    $scope.form.loading = true;

    async.parallel([
      function(callback) {
        var params = {
          fields: 'description,status,is_paid'
        };
        pageService.request('GET', 'api/topic', params, function(error, data) {
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
            fields: 'description,status,is_paid',
            subject_id: $scope.currentDataRow.subject_id
          };
          pageService.request('GET', 'api/topic', params, function(error, data) {
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

      // Set Topic selected
      var topicSelected = _.map(results[1], function(value) {
          return +value.topic_id;
        }), 
        topicList = _.map(results[0], function(value) {
          value.topic_id = +value.topic_id;
          value.selected = _.indexOf(topicSelected, value.topic_id) != -1 ? true : false;
          return value;
        });

      $scope.form.dataTopics = topicList;
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
   * Filter Data from Topic list by form.status
   * 
   * @param string    status
   */
  $scope.filterFormStatus = function(status) {
    $scope.form.filter.status = status;
  };

  /**
   * Filter Data from Topic list by form.selected
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
    pageService.request('PATCH', 'api/subject', params, function(error, data) {
      if(_.isNull(error)) {
        var _data = _.clone($scope.data),
          index = _.findIndex(_data, _.first(_.filter(_data, {subject_id: id})));
        
        // Update data
        $scope.data[index].status = status;
        $scope.data_entry.subject.data = $scope.data;
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
    $scope.form.dataTopics = [];
    $scope.form.query = '';
    $scope.form.filter = {};
    $scope.form.loading = false;
    $('#awg-panel-data-entry-subject').fadeOut('fast', function() {
      var form = $('section.awg-panel-edit form');

      // Reset Form
      form.parsley().reset();

      $(this).next('section.awg-panel-edit').show();

      // Get Data Topics
      $scope.getDataTopics();
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
    $scope.form.dataTopics = [];
    $scope.form.query = '';
    $scope.form.filter = {};
    $scope.form.loading = false;
    $('#awg-panel-data-entry-subject').fadeOut('fast', function() {
      var form = $('section.awg-panel-edit form');

      // Reset Form
      form.parsley().reset();

      $(this).next('section.awg-panel-edit').show();

      // Get Data Topics
      $scope.getDataTopics();
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
   * Check/Uncheck Topic
   * 
   * @param number    topicId
   */
  $scope.check = function(topicId) {
    var _data = _.clone($scope.form.dataTopics),
      index = _.findIndex(_data, _.first(_.filter(_data, {topic_id: topicId}))),
      selected = $scope.form.dataTopics[index].selected;

    $scope.form.dataTopics[index].selected = !selected;
  };

  /**
   * Check/Uncheck All Topics
   * 
   * @param number    action[1 = Check All, 0 = Uncheck All]
   */
  $scope.checkAll = function(action) {
    _.each($scope.form.dataTopics, function(value, key) {
      value.selected = action ? true : false;
    });
  };
});