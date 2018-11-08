(function () {

  var componentConfig = {
    templateUrl: 'app/components/header/header.html',
    controller: 'headerController as vm'
  };

  angular.module('header')
    .component('header', componentConfig)
    .controller('headerController', headerController);

  function headerController($rootScope, $location, $route, $scope, Auth) {
    var vm = this;

    vm.doLogout = doLogout;

    checkLogin();

    $rootScope.$on('$routeChangeStart', () => {
      checkLogin();
    });

    function doLogout() {
      Auth.logout();
      $route.reload();
    };

    function checkLogin() {
      vm.loggedIn = Auth.isLoggedIn();

      Auth.getUser()
        .then(data => vm.user = data.data)
    }
  }
})();
