angular.module('userService')
    .factory('User', function ($http) {
        var userFactory = {};

        userFactory.create = (userData) => {
            return $http.post('/api/users/register', userData);
        };

        return userFactory;
    });