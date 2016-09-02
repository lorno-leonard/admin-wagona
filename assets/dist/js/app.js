var app = angular.module('app-admin-wagona', ['ui.router']);
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
app.run([
  '$rootScope',
  '$state',
  '$stateParams',
  function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }
]);
app.controller('dashboardCtrl', function($scope, pageService) {
  
  // Set Page Title
  pageService.setPageTitle('Dashboard', 'fa fa-dashboard icon');
});
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
app.controller('dataEntryCtrl', function($scope, pageService) {
  
  // Set Page Title
  pageService.setPageTitle('Data Entry', 'fa fa-list icon');
  
  // Data Entry Menus
  $scope.data_entry.menus = _.first(_.filter($scope.menus, {'ui-sref': 'data-entry'})).menus;
});
app.controller('dataEntryQuestionCtrl', function($scope, pageService) {
  
  // Set Page Title
  pageService.setPageTitle('Question', 'fa fa-question icon');
});
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
app.controller('dataEntryTopicCtrl', function($scope, pageService) {
  
  // Set Page Title
  pageService.setPageTitle('Topic', 'fa fa-certificate icon');
});
app.controller('mainCtrl', function($scope, $state, pageService) {
  
  $scope._ = _;
  $scope.state = $state;
  $scope.pageService = pageService;
  $scope.dashboard = {};
  $scope.data_entry = {
    country: {
      data: []
    },
    syllabi: {
      data: []
    },
    subject: {
      data: []
    },
    topic: {},
    question: {}
  };
  $scope.users = {
    data: []
  };
  $scope.transactions = {
    payments: {
      data: []
    }
  };

  // Debounce variables
  $scope.debDuration = 500;
  $scope.debOptions = {
    leading: true,
    trailing: false
  };
  
  // Menus
  $scope.menus = [{
    title: 'Dashboard',
    iconClass: 'fa fa-dashboard icon',
    bgClass: 'bg-info',
    'ui-sref': 'dashboard'
  }, {
    title: 'Data Entry',
    iconClass: 'fa fa-list icon',
    bgClass: 'bg-primary',
    'ui-sref': 'data-entry',
    menus: [{
      title: 'Country',
      iconClass: 'fa fa-flag icon',
      'ui-sref': 'data-entry-country'
    }, {
      title: 'Syllabi',
      iconClass: 'fa fa-book icon',
      'ui-sref': 'data-entry-syllabi'
    }, {
      title: 'Subject',
      iconClass: 'fa fa-bookmark icon',
      'ui-sref': 'data-entry-subject'
    }, {
      title: 'Topic',
      iconClass: 'fa fa-certificate icon',
      'ui-sref': 'data-entry-topic'
    }, {
      title: 'Question',
      iconClass: 'fa fa-question icon',
      'ui-sref': 'data-entry-question'
    }]
  }, {
    title: 'Users',
    iconClass: 'fa fa-users icon',
    bgClass: 'bg-danger',
    'ui-sref': 'users'
  }, {
    title: 'Transactions',
    iconClass: 'fa fa-suitcase icon',
    bgClass: 'bg-warning',
    'ui-sref': 'transactions',
    menus: [{
      title: 'Payments',
      iconClass: 'fa fa-cc-paypal icon',
      'ui-sref': 'transactions-payments'
    }, {
      title: 'Subscription Prices',
      iconClass: 'fa fa-dollar icon',
      'ui-sref': 'transactions-subscription-prices'
    }]
  }];

  /**
   * Get Menu Class of passed menu details object
   * 
   * @param object    menu
   * @return string   'active' or ''
   */
  $scope.getMenuClass = function(menu) {
    return _.has(menu, 'ui-sref') && (_.isEqual(menu['ui-sref'], $state.current.name) || $state.current.name.indexOf(menu['ui-sref']) != -1) ? 'active' : '';
  };

  /**
   * Get ui-sref of passed menu details object
   * 
   * @param object    menu
   * @return string   ui-router state or '.'
   */
  $scope.getUiSref = function(menu) {
    return _.has(menu, 'ui-sref') && !_.isEmpty(menu['ui-sref']) ? menu['ui-sref'] : '.';
  };

  /**
   * Scroll to Top
   * 
   */
  $scope.scrollToTop = function() {
    
  };
});
app.controller('transactionsCtrl', function($scope, pageService) {
  
  // Set Page Title
  pageService.setPageTitle('Transactions', 'fa fa-suitcase icon');

  // Data Entry Menus
  $scope.transactions.menus = _.first(_.filter($scope.menus, {'ui-sref': 'transactions'})).menus;
});
app.controller('transactionsPaymentsCtrl', function($scope, pageService) {
  
  $scope.data = !_.isEmpty($scope.transactions.payments.data) ? $scope.transactions.payments.data : [];
  $scope.filter = {};
  $scope.loading = false;

  // Set Page Title
  pageService.setPageTitle('Payments', 'fa fa-cc-paypal icon');

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
app.controller('transactionsSubscriptionPricesCtrl', function($scope, pageService) {
  
  // Set Page Title
  pageService.setPageTitle('Subscription Prices', 'fa fa-dollar icon');
});
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

      var params = {
        id: $scope.currentDataRow.account_id,
        account_type: $scope.form.account_type,
        payment_status: $scope.form.payment_status,
        status: $scope.form.status
      };
      pageService.request('PATCH', 'api/users', params, function(error, data) {
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
    pageService.request('GET', 'api/users', {}, function(error, data) {
      if(_.isNull(error)) {
        $scope.data = _.concat($scope.data, data);
        $scope.users.data = $scope.data;
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
    var params = {
      id: id,
      status: status
    };
    pageService.request('PATCH', 'api/users', params, function(error, data) {
      if(_.isNull(error)) {
        var _data = _.clone($scope.data),
          index = _.findIndex(_data, _.first(_.filter(_data, {account_id: id})));
        
        // Update data
        $scope.data[index].status = status;
        $scope.users.data = $scope.data;
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
// prevent defalt action when clicking on <a /> element
// with empty or '#' href

app.directive('a', function() {
  return {
    restrict: 'E',
    link: function(scope, element, attrs) {
      if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
        element.on('click', function(e) {
          e.preventDefault();
        });
      }
    }
  };
});
app.service('pageService', function($http, $state, $sce) {
  var pageTitle = '',
    pageTitleHtml = '';

  /**
   * Get Breadcrumbs
   * 
   * @return string   HTML string
   */
  this.getBreadcrumbs = function() {
    var hasParent = true,
      parentList = [],
      currentState = $state.current;

    // Getting parent states recursively
    while(_.has(currentState, 'data')) {
      var parentState = $state.get(currentState.data.parentState);
      parentList.push({
        title: currentState.data.parentStateTitle,
        'ui-sref': parentState.name
      })
      currentState = parentState;
    }

    // Reverse parentList
    _.reverse(parentList);

    // Generate HTML for breadrumbs
    var html = '';
    html += '<li><a href="" ui-sref="dashboard"><i class="fa fa-home"></i> Home</a></li>';
    _.each(parentList, function(value) {
      html += '<li><a href="#/' + value['ui-sref'] + '">' + value.title + '</a></li>';
    });
    html += '<li>' + pageTitle + '</li>';

    return $sce.trustAsHtml(html);
  };

  /**
   * Get Page Title
   * 
   * @return string   pageTitleHtml
   */
  this.getPageTitle = function() {
    return $sce.trustAsHtml(pageTitleHtml);
  };

  /**
   * Set Page Title and also an HTML string for rendering the Page Title
   * 
   */
  this.setPageTitle = function(title, iconClass) {
    pageTitle = title;
    pageTitleHtml = (!_.isUndefined(iconClass) ? '<i class="' + iconClass + '"></i> ' : '') + title;
  };

  /**
   * Executes an HTTP request and the callback after
   * 
   * @param string    method
   * @param string    url
   * @param object    data
   * @param function  callback
   */
  this.request = function(method, url, data, callback) {
    var methodVerbs = ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
      data = _.isUndefined(data) ? {} : data,
      _self = this;

    if($.inArray(_.toUpper(method), methodVerbs) != -1) {
      var config = _.isEqual(_.toUpper(method), 'GET') ? {params: data} : data;
      $http[_.toLower(method)](url, config)
        .success(function(response) {
          callback(null, response);
        })
        .error(function(errorResponse) {
          _self.notify('Error!', errorResponse.message, 'danger');
          callback({status: false}, null);
        });
    }
    else {
      this.notify('Error!', 'Passed method is not a valid HTTP method.', 'danger');
      callback({status: false}, null);
    }
  };

  /**
   * Notify
   * 
   * @param string    title
   * @param string    message
   * @param string    type [success, info, danger, warning]
   */
  this.notify = function(title, message, type) {
    var title = !_.isUndefined(title) ? title : 'Notification',
      message = !_.isUndefined(message) ? message : '',
      type = !_.isUndefined(type) && _.indexOf(['success', 'info', 'danger', 'warning'], type) != -1 ? type : 'info';

    $.notify({
      title: '<div><strong>' + title + '</strong></div>',
      message: message
    }, {
      type: type,
      offset: {
        y: 60,
        x: 20
      }
    })
  };
});