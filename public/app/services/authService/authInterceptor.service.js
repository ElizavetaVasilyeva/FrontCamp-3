(function () {
  angular.module('authService')
    .factory('AuthInterceptor', authInterceptor);

  function authInterceptor($q, $location, AuthToken) {
    var authInterceptorFactory = {
      request,
      responseError
    };

    return authInterceptorFactory;

    function request(config) {
      var token = AuthToken.getToken();

      if (token) {
        config.headers['x-access-token'] = token;
      }

      return config;
    }


    function responseError(response) {
      if (response.status === 403)
        $location.path('./login');

      return $q.reject(response);
    }
  }
})();