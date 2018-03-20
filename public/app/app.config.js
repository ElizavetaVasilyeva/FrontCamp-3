angular.module('ToDoApp')
    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptor');
    })
    .config(function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

        $routeProvider
            .when('/', {
                templateUrl: 'app/components/home/home.html',
            })
            .when('/login', {
                template: '<login></login>'
            })
            .when('/register', {
                template: '<register></register>'
            })
            .when('/todos', {
                template: '<todos></todos>'
            })
            .when('/createtodo', {
                template: '<create-to-do></create-to-do>'
            })
            .when('/todos/:id', {
                template: '<todo></todo>'
            })
            .when('/editToDo/:id', {
                template: '<edit-to-do></edit-to-do>'
            });
    });