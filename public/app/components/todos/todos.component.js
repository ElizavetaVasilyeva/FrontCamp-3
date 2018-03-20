angular.module('todos')
    .component('todos', {
        templateUrl: 'app/components/todos/todos.html',
        controller: function ($location, $scope, ToDo) {

            $scope.order = '-createdDate'

            ToDo.alltodos()
                .then(data => $scope.todos = data.data);
        }
    });