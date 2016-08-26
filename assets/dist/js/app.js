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
app.controller('dataEntryCountryCtrl', function($scope, $timeout, pageService) {

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

      var data = {
        id: $scope.currentDataRow.country_id,
        description: $scope.form.description,
        status: $scope.form.status
      };
      pageService.request('PATCH', 'api/country', data, function(error, data) {
        if(_.isNull(error)) {
          var _data = _.clone($scope.data),
            index = _.findIndex(_data, _.first(_.filter(_data, {country_id: $scope.currentDataRow.country_id})));
          
          // Update data
          $scope.currentDataRow.description = $scope.form.description;
          $scope.currentDataRow.status = $scope.form.status;

          $scope.data[index].description = $scope.form.description;
          $scope.data[index].status = +$scope.form.status;

          $scope.data_entry.country.data = $scope.data;

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
    pageService.request('GET', 'api/country', {}, function(error, data) {
      if(_.isNull(error)) {
        $scope.data = _.concat($scope.data, data);
        $scope.data_entry.country.data = $scope.data;
      }
      else {
        console.log(error);
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
    var data = {
      id: id,
      status: status
    };
    pageService.request('PATCH', 'api/country', data, function(error, data) {
      if(_.isNull(error)) {
        var _data = _.clone($scope.data),
          index = _.findIndex(_data, _.first(_.filter(_data, {country_id: id})));
        
        // Update data
        $scope.data[index].status = status;
        $scope.data_entry.country.data = $scope.data;
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
  
  // Set Page Title
  pageService.setPageTitle('Subject', 'fa fa-bookmark icon');
});
app.controller('dataEntrySyllabiCtrl', function($scope, pageService) {
  
  $scope.data = !_.isEmpty($scope.data_entry.syllabi.data) ? $scope.data_entry.syllabi.data : [];
  $scope.filter = {};
  $scope.currentDataRow = null;
  $scope.form = {};
  $scope.loading = false;

  // Set Page Title
  pageService.setPageTitle('Syllabi', 'fa fa-book icon');

  /**
   ****************************
   * DEBOUNCED FUNCTIONS
   ****************************
   */


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
      else {
        console.log(error);
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
    var data = {
      id: id,
      status: status
    };
    pageService.request('PATCH', 'api/syllabi', data, function(error, data) {
      if(_.isNull(error)) {
        var _data = _.clone($scope.data),
          index = _.findIndex(_data, _.first(_.filter(_data, {syllabus_id: id})));
        
        // Update data
        $scope.data[index].status = status;
        $scope.data_entry.syllabi.data = $scope.data;
      }
      else {
        console.log(error);
      }
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
    subject: {},
    topic: {},
    question: {}
  };
  $scope.users = {
    data: []
  };
  $scope.transactions = {};

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
      iconClass: 'fa fa-credit-card icon',
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
  
  // Set Page Title
  pageService.setPageTitle('Payments', 'fa fa-credit-card icon');
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
      data = _.isUndefined(data) ? {} : data;

    if($.inArray(_.toUpper(method), methodVerbs) != -1) {
      $http[_.toLower(method)](url, data)
        .success(function(response) {
          callback(null, response);
        })
        .error(function(errorResponse) {
          callback(errorResponse, null);
        });
    }
    else {
      callback({
        status: false,
        error: {
          message: 'Passed method is not a valid HTTP method.'
        }
      }, null);
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
      type: type
    })
  };
});