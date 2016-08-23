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