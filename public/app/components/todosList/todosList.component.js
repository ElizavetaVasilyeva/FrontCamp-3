angular.module('todosList')
    .component('todosList', {
        templateUrl: 'app/components/todosList/todosList.html',
        controller: function () {
        },
        bindings: {
            todos: '=',
            query: '=',
            order: '=',
            type: '@',
            title: '@'
        }
    })