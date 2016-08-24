app.service('pageService', function($state, $sce) {
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
});