describe('BlogsList component', function () {
    var $scope, $componentController;
    var ctrl;

    beforeEach(angular.mock.module('blogsList'));

    beforeEach(inject(function (_$componentController_, _$rootScope_) {
        $scope = _$rootScope_.$new();
        $componentController = _$componentController_;

        var bindings = {blogs: [{title: 'test', body: 'test'}], query: 'te', order: '-date'};

        ctrl = $componentController('blogsList', {
            $scope: $scope
        }, bindings);
    }));

    it('activate controller', function () {

        $scope.$apply();

        expect(ctrl.numberOfPages).toBeDefined();
        expect(ctrl.curPage).toBe(0);
        expect(ctrl.pageSize).toBe(3);
        expect(ctrl.query).toBe('te');
        expect(ctrl.blogs).toBeDefined();
        expect(ctrl.order).toBe('-date');
    });

    it('numberOfPages method', function () {
        ctrl.filtered = [{title: 'test', body: 'test'}];

        var res = ctrl.numberOfPages();

        expect(res).toBe(1);
    });

    it('testing $watch query', function () {
        ctrl.curPage = 1;
        ctrl.query = 'new';
        
        $scope.$digest();
  
        expect(ctrl.curPage).toEqual(0);
    });

});
