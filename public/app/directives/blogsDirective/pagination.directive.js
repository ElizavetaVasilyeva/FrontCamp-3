(function () {
  angular.module('blogsDirectives')
    .filter('pagination', pagination);

  function pagination() {
    return function (input, start) {
      if (input && start) {
        start = +start;
        return input.slice(start);
      } else {
        return input;
      }
    };
  }
})();