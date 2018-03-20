angular.module('createToDo')
    .component('createToDo', {
        templateUrl: 'app/components/createToDo/createToDo.html',
        controller: function ($location, $scope, ToDo) {
            $scope.create = (isValid) => {
                if (isValid) {
                    ToDo.create($scope.todoData)
                        .then(data => {
                            $location.path('/todos');
                        });
                }
            };
        }
    });