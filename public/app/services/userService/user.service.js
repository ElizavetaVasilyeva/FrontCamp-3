(function () {
  angular.module('userService')
    .factory('User', user);

  function user($http) {
    var userFactory = {
      create: create
    };

    return userFactory;

    function create(userData) {
      return $http.post('/api/users/register', userData);
    };
  }
})();