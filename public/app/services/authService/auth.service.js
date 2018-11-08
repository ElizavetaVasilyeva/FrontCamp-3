(function () {
  angular.module('authService')
    .factory("Auth", auth);

  function auth($http, $q, AuthToken) {

    var authFactory = {
      login: login,
      logout: logout,
      isLoggedIn: isLoggedIn,
      getUser: getUser
    };

    return authFactory;

    function login({ username, password }) {
      return $http.post('/api/users/login', {
        username,
        password
      })
        .then(res => {
          AuthToken.setToken(res.data.token);
          return res.data;
        });
    }

    function logout() {
      AuthToken.setToken();
    }

    function isLoggedIn() {
      return AuthToken.getToken() ? true : false;
    }

    function getUser() {
      if (AuthToken.getToken()) {
        return $http.get('/api/users/me');
      } else {
        return $q.reject({ message: "User has no token" });
      }
    }
  }
})();