angular.module('authService')
    .factory("Auth", function ($http, $q, AuthToken) {

        var authFactory = {};

        authFactory.login = (username, password) => {
            return $http.post('/api/users/login', {
                username: username,
                password: password
            })
                .then(res => {
                    AuthToken.setToken(res.data.token);
                    return res.data;
                });
        }

        authFactory.logout = () => {
            AuthToken.setToken();
        }

        authFactory.isLoggedIn = () => {
            if (AuthToken.getToken()) {
                return true;
            }
            else {
                return false
            }
        }

        authFactory.getUser = () => {
            if (AuthToken.getToken()) {
                return $http.get('/api/users/me');
            } else {
                return $q.reject({ message: "User has no token" });
            }
        }

        return authFactory;
    })

    .factory('AuthToken', function ($window) {
        var authTokenFActory = {};

        authTokenFActory.getToken = () => {
            return $window.localStorage.getItem('token');
        }

        authTokenFActory.setToken = (token) => {
            if (token) {
                $window.localStorage.setItem('token', token);
            } else {
                $window.localStorage.removeItem('token');
            }
        }

        return authTokenFActory;
    })

    .factory('AuthInterceptor', function ($q, $location, AuthToken) {
        var authInterceptorFactory = {};

        authInterceptorFactory.request = (config) => {
            var token = AuthToken.getToken();

            if (token) {
                config.headers['x-access-token'] = token;
            }

            return config;
        }


        authInterceptorFactory.responseError = (response) => {
            if (response.status == 403)
                $location.path('./login');

            return $q.reject(response);
        }

        return authInterceptorFactory;

    })