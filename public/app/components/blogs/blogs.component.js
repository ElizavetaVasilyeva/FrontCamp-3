(function () {

  var componentConfig = {
    templateUrl: 'app/components/blogs/blogs.html',
    controller: 'blogsController as vm'
  };

  angular.module('blogs')
    .component('blogs', componentConfig)
    .controller('blogsController', blogsController);

  function blogsController($scope, Blog) {
    var vm = this;

    vm.order = '-date'

    activate();

    function activate() {
      Blog.allblogs()
        .then(data => vm.blogs = data.data);
    }
  }
})();