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