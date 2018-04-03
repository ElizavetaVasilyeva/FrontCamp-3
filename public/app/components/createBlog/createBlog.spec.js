describe('Create blog component', function () {
    var $q, $scope, $componentController, $location;
    var Blog, deferred, ctrl;

    beforeEach(angular.mock.module('createBlog'));

    beforeEach(inject(function (_$componentController_, _$rootScope_, _$location_, _$q_, _Blog_) {
        $q = _$q_;
        $scope = _$rootScope_.$new();
        $location = _$location_;
        $componentController = _$componentController_;
        Blog = _Blog_;
        deferred = _$q_.defer();

        spyOn(Blog, 'create').and.returnValue(deferred.promise);

        ctrl = $componentController('createBlog', {
            $scope: $scope,
            $location: $location,
            Blog: Blog
        });
    }));

    it('activate controller', function () {
        $scope.$apply();

        expect(ctrl.create).toBeDefined();
    });

    it('create blog if valid', function () {
        ctrl.blogData = [];
        deferred.resolve($location.path('/blogs'));

        ctrl.create(true);

        expect(Blog.create).toHaveBeenCalledWith([]);
        expect($location.path()).toBe("/blogs");
    });

    it('create blog if not valid', function () {
        ctrl.blogData = [];

        ctrl.create(false);

        expect(Blog.create).not.toHaveBeenCalledWith([]);
    });

});
