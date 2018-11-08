(function () {
    angular.module('dataService')
        .factory('Data', data);

    function data() {
        var defaultData = {
            curPage: 0,
            pageSize: 3
        };

        return defaultData;
    }
})();