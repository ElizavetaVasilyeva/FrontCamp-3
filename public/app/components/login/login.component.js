(function () {

  var componentConfig = {
    templateUrl: 'app/components/login/login.html',
    controller: 'loginController as vm'
  };

  angular.module('login')
    .component('login', componentConfig)
    .controller('loginController', loginController);

  function loginController($location, $scope, Auth) {
    var vm = this;

    vm.doLogin = doLogin;

    function doLogin(isValid) {
      if (isValid) {

        vm.error = '';

        Auth.login(vm.loginData)
          .then(data => {
            if (!data.success) {
              vm.error = data.message;
            } else {
              Auth.getUser()
                .then(data => vm.user = data.data);

              $location.path('/');
            }
          });
      }
    };
  }
})();
