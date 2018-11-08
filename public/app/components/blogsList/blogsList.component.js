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

  function blogsListController($scope, Data) {
    var vm = this;

    vm.numberOfPages = numberOfPages;
    vm.curPage = Data.curPage;
    vm.pageSize = Data.pageSize;


    function numberOfPages() {
      if (vm.filtered) {
        return Math.ceil(vm.filtered.length / vm.pageSize);
      }
    };

    $scope.$watch('vm.query', function (newVal, oldVal) {
      vm.curPage = Data.curPage;
    }, true);
  }
})();