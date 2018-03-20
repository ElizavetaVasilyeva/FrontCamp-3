angular.module('editToDo')
    .component('editToDo', {
        templateUrl: 'app/components/editToDo/editToDo.html',
        controller: function ($scope, $routeParams, $location, ToDo) {

            $scope.id = $routeParams.id;

            ToDo.getTodoById($routeParams.id)
                .then(data => $scope.todo = data.data);

            $scope.editToDo = () => {
                ToDo.edit($routeParams.id, $scope.todo)
                    .then(data => {
                        $location.path('/todos/' + $routeParams.id);
                    });
            };
        }
    })


