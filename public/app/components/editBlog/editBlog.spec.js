describe('Edit blog component', function () {
    var $q, $scope, $componentController, $location;
    var Blog, deferred, deferred2, ctrl;
    var mockRouteParams = { id: 1 };

    beforeEach(angular.mock.module('editBlog'));

    beforeEach(inject(function (_$componentController_, _$rootScope_, _$location_, _$q_, _Blog_) {
        $q = _$q_;
        $scope = _$rootScope_.$new();
        $location = _$location_;
        $componentController = _$componentController_;
        Blog = _Blog_;
        deferred = _$q_.defer();
        deferred2 = _$q_.defer();

        spyOn(Blog, 'getBlogById').and.returnValue(deferred2.promise);
        spyOn(Blog, 'edit').and.returnValue(deferred.promise);

        ctrl = $componentController('editBlog', {
            $scope: $scope,
            $routeParams: mockRouteParams,
            $location: $location,
            Blog: Blog
        });
    }));

    it('activate controller', function () {
        deferred2.resolve({ data: 'blog' });

        $scope.$apply();

        expect(ctrl.id).toBeDefined();
        expect(ctrl.editBlog).toBeDefined();
        expect(Blog.getBlogById).toHaveBeenCalledWith(1);
        expect(ctrl.blog).toBe('blog');
    });

    it('edit blog', function () {
        ctrl.blog = [];
        deferred.resolve($location.path(`/blogs/1`));

        ctrl.editBlog();

        expect(Blog.edit).toHaveBeenCalledWith(1, []);
        expect($location.path()).toBe("/blogs/1");
    });

});
