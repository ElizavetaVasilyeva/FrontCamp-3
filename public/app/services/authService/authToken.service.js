(function () {
  angular.module('authService')
    .factory('AuthToken', authToken);

  function authToken($window) {
    var authTokenFactory = {
      getToken: getToken,
      setToken: setToken
    };

    return authTokenFactory

    function getToken() {
      return $window.localStorage.getItem('token');
    }

    function setToken(token) {
      if (token) {
        $window.localStorage.setItem('token', token);
      } else {
        $window.localStorage.removeItem('token');
      }
    }
  }
})();