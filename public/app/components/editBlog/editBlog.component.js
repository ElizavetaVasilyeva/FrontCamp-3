(function () {

  var componentConfig = {
    templateUrl: 'app/components/editBlog/editBlog.html',
    controller: 'editBlogController as vm'
  }

  angular.module('editBlog')
    .component('editBlog', componentConfig)
    .controller('editBlogController', editBlogController);

  function editBlogController($scope, $routeParams, $location, Blog) {
    var vm = this;

    vm.editBlog = editBlog;
    vm.id = $routeParams.id;

    activate();

    function activate() {
      Blog.getBlogById($routeParams.id)
        .then(data => vm.blog = data.data);
    }

    function editBlog() {
      Blog.edit($routeParams.id, vm.blog)
        .then(data => {
          $location.path(`/blogs/${$routeParams.id}`);
        });
    };
  }
})();


