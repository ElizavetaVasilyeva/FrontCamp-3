describe('Blog component', function () {
    var $q, $scope, $componentController, $location;
    var Blog, Auth, deferred, deferred2, ctrl;
    var mockRouteParams = { id: 1 };

    beforeEach(angular.mock.module('blog'));

    beforeEach(inject(function (_$componentController_, _$rootScope_, _$location_, _$q_, _Blog_, _Auth_) {
        $q = _$q_;
        $scope = _$rootScope_.$new();
        $location = _$location_;
        $componentController = _$componentController_;
        Blog = _Blog_;
        Auth = _Auth_;
        deferred = _$q_.defer();
        deferred2 = _$q_.defer();

        spyOn(Auth, 'getUser').and.returnValue(deferred.promise);
        spyOn(Blog, 'getBlogById').and.returnValue(deferred2.promise);
        spyOn(Blog, 'delete').and.returnValue(deferred.promise);

        ctrl = $componentController('blog', {
            $scope: $scope,
            $routeParams: mockRouteParams,
            $location: $location,
            Blog: Blog,
            Auth: Auth
        });
    }));

    it('activate controller', function () {
        deferred.resolve({ data: 'user' });
        deferred2.resolve({ data: 'blog' });

        $scope.$apply();

        expect(ctrl.id).toBeDefined();
        expect(ctrl.deleteBlog).toBeDefined();
        expect(Auth.getUser).toHaveBeenCalledWith();
        expect(ctrl.user).toBe('user');
        expect(Blog.getBlogById).toHaveBeenCalledWith(1);
        expect(ctrl.blog).toBe('blog');
    });

    it('delete blog', function () {
        deferred.resolve($location.path('/blogs'));
        ctrl.deleteBlog();

        expect(Blog.delete).toHaveBeenCalledWith(1);
        expect($location.path()).toBe("/blogs");
    });

});
