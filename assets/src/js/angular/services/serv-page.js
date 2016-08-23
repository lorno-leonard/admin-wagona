app.service('pageService', function($state, $sce) {
  var pageTitle = '',
    pageTitleHtml = '';

  // Get Breadcrumbs
  this.getBreadcrumbs = function() {
    return $sce.trustAsHtml('<li><a href="" ui-sref="dashboard"><i class="fa fa-home"></i> Home</a></li><li>' + pageTitle + '</li>');
  };

  // Get Page Title
  this.getPageTitle = function() {
    return $sce.trustAsHtml(pageTitleHtml);
  };

  // Set Page Title
  this.setPageTitle = function(title, iconClass) {
    pageTitle = title;
    pageTitleHtml = (!_.isUndefined(iconClass) ? '<i class="' + iconClass + '"></i> ' : '') + title;
  };
});