angular.module('register')
    .component('register', {
        templateUrl: 'app/components/register/register.html',
        controller: function (User, $location, $window, $scope) {
            $scope.registerUser = (isValid) => {
                if (isValid) {
                    User.create($scope.userData)
                        .then(res => {
                            $scope.userData = {};
                            $window.localStorage.setItem('token', res.data.token);
                            $location.path('/');
                        });
                }
            };
        }
    }
    );