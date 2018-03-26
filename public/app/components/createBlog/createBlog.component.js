(function () {

  var componentConfig = {
    templateUrl: 'app/components/createBlog/createBlog.html',
    controller: 'createBlogController as vm'
  };

  angular.module('createBlog')
    .component('createBlog', componentConfig)
    .controller('createBlogController', createBlogController);

  function createBlogController($location, $scope, Blog) {
    var vm = this;

    vm.create = create;

    function create(isValid) {
      if (isValid) {
        Blog.create(vm.blogData)
          .then(data => {
            $location.path('/blogs');
          });
      }
    };
  }
})();