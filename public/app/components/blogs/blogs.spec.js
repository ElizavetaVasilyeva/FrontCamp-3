describe('Blogs component', function () {
    var $q, $scope, $componentController;
    var Blog, deferred, ctrl;

    beforeEach(angular.mock.module('blogs'));

    beforeEach(inject(function (_$componentController_, _$rootScope_, _$q_, _Blog_) {
        $q = _$q_;
        $scope = _$rootScope_.$new();
        $componentController = _$componentController_;
        Blog = _Blog_;
        deferred = _$q_.defer();

        spyOn(Blog, 'allblogs').and.returnValue(deferred.promise);

        ctrl = $componentController('blogs', {
            $scope: $scope,
            Blog: Blog,
        });
    }));

    it('activate controller', function () {
        const data = [{title: 'test', body: 'test'}];
        deferred.resolve({ data:  data});

        $scope.$apply();

        expect(ctrl.order).toBe('-date');
        expect(Blog.allblogs).toHaveBeenCalledWith();
        expect(ctrl.blogs).toBe(data);
    });
});
