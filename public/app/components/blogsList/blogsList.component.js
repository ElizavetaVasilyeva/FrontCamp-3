(function () {

  var componentConfig = {
    templateUrl: 'app/components/blogsList/blogsList.html',
    controller: 'blogsListController as vm',
    bindings: {
      blogs: '=',
      query: '=',
      order: '='
    }
  };

  angular.module('blogsList')
    .component('blogsList', componentConfig)
    .controller('blogsListController', blogsListController);

  function blogsListController($scope) {
    var vm = this;

    vm.numberOfPages = numberOfPages;
    vm.curPage = 0;
    vm.pageSize = 3;


    function numberOfPages() {
      if (vm.filtered) {
        return Math.ceil(vm.filtered.length / vm.pageSize);
      }
    };

    $scope.$watch('vm.query', function (newVal, oldVal) {
      vm.curPage = 0;
    }, true);
  }
})();