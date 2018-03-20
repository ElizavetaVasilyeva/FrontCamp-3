angular.module('header')
    .component('header', {
        templateUrl: 'app/components/header/header.html',
        controller: function ($rootScope, $location, $route, $scope, Auth) {
            checkLogin();

            $rootScope.$on('$routeChangeStart', () => {
                checkLogin();
            });

            $scope.doLogout = () => {
                Auth.logout();
                $route.reload();
            };

            function checkLogin() {
                $scope.loggedIn = Auth.isLoggedIn();

                Auth.getUser()
                    .then(data => $scope.user = data.data)
            }
        }
    })
