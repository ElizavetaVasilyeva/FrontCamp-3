(function () {

  var componentConfig = {
    templateUrl: 'app/components/register/register.html',
    controller: 'registerController as vm'
  };

  angular.module('register')
    .component('register', componentConfig)
    .controller('registerController', registerController);

  function registerController(User, $location, $window, $scope) {
    var vm = this;

    vm.registerUser = registerUser;

    function registerUser(isValid) {
      if (isValid) {
        User.create(vm.userData)
          .then(res => {
            vm.userData = {};
            $window.localStorage.setItem('token', res.data.token);
            $location.path('/');
          });
      }
    };
  }
})();