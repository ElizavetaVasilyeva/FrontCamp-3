angular.module('todo')
    .component('todo', {
        templateUrl: 'app/components/todo/todo.html',
        controller: function ($scope, $routeParams, $location, ToDo) {
            $scope.id = $routeParams.id;

            ToDo.getTodoById($routeParams.id)
                .then(data => $scope.todo = data.data);

            $scope.deleteToDo = () => {
                ToDo.delete($routeParams.id)
                    .then(data => {
                        $location.path('/todos');
                    });
            };
        }
    });