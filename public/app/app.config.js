angular.module('BlogsApp')
  .config(httpProviderConfig)
  .config(routeConfig);

function httpProviderConfig($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptor');
};

function routeConfig($routeProvider, $locationProvider) {

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
    .when('/blogs', {
      template: '<blogs></blogs>'
    })
    .when('/createBlog', {
      template: '<create-blog></create-blog>'
    })
    .when('/blogs/:id', {
      template: '<blog></blog>'
    })
    .when('/editBlog/:id', {
      template: '<edit-blog></edit-blog>'
    });
};

