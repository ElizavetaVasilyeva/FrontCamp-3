describe('Register component', function () {
    var $q, $scope, $componentController, $rootScope, $location, $window;
    var User, deferred, ctrl;

    beforeEach(angular.mock.module('register'));

    beforeEach(inject(function (_$componentController_, _$rootScope_, _$q_, _$location_, _$window_, _User_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $location = _$location_;
        $window = _$window_;
        $componentController = _$componentController_;
        User = _User_;
        deferred = _$q_.defer();

        spyOn(User, 'create').and.returnValue(deferred.promise);

        ctrl = $componentController('register', {
            $scope: $scope,
            $location: $location,
            $window: $window,
            User: User
        });
    }));

    it('activate controller', function () {

        $scope.$apply();

        expect(ctrl.registerUser).toBeDefined();
    });

    it('registerUser if valid', function () {
        ctrl.userData = {data: 'data'};
        deferred.resolve({ data: {token: 'token'}});

        ctrl.registerUser(true);
        $rootScope.$apply();

        expect(ctrl.userData).toEqual({});
        expect(User.create).toHaveBeenCalledWith({data: 'data'});
        expect($window.localStorage.getItem('token')).toBe('token');
    });
});
