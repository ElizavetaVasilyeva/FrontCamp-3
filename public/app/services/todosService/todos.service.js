angular.module('todosService')
    .factory('ToDo', function ($http) {
        var todoFactory = {};

        todoFactory.alltodos = () => {
            return $http.get('/api/todos');
        };

        todoFactory.getTodoById = (id) => {
            return $http.get('/api/todos/' + id);
        };

        todoFactory.create = (todoData) => {
            return $http.post('/api/todos', todoData);
        };

        todoFactory.edit = (id, todoData) => {
            return $http.put('/api/todos/' + id, todoData);
        };

        todoFactory.delete = (id) => {
            return $http.delete('/api/todos/' + id);
        };

        return todoFactory;
    })