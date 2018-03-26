(function () {

    var componentConfig = {
        templateUrl: 'app/components/blog/blog.html',
        controller: 'blogController as vm'
    };

    angular.module('blog')
        .component('blog', componentConfig)
        .controller('blogController', blogController);

    function blogController($scope, $routeParams, $location, Blog, Auth) {
        var vm = this;

        vm.deleteBlog = deleteBlog;
        vm.id = $routeParams.id;

        activate();

        function activate() {
            Auth.getUser()
                .then(data => vm.user = data.data);

            Blog.getBlogById($routeParams.id)
                .then(data => vm.blog = data.data);
        }


        function deleteBlog() {
            Blog.delete($routeParams.id)
                .then(data => {
                    $location.path('/blogs');
                });
        };
    }
})();