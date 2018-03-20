angular.module('login')
    .component('login', {
        templateUrl: 'app/components/login/login.html',
        controller: function ($location, $scope, Auth) {

            $scope.doLogin = (isValid) => {
                if (isValid) {

                    $scope.error = '';

                    Auth.login($scope.loginData.username, $scope.loginData.password)
                        .then(data => {
                            if (!data.success) {
                                $scope.error = data.message;
                            } else {
                                Auth.getUser()
                                    .then(data => $scope.user = data.data);

                                $location.path('/');
                            }
                        });
                }
            };

        }
    })

