describe('Header component', function () {
    var $q, $scope, $route, $rootScope, $location, $componentController;
    var Auth, deferred, ctrl;

    beforeEach(angular.mock.module('ngRoute'));

    beforeEach(angular.mock.module('header'));

    beforeEach(inject(function (_$componentController_, _$rootScope_, _$q_, _$route_, _$location_, _Auth_) {
        $rootScope = _$rootScope_,
        $scope = $rootScope.$new();
        $componentController = _$componentController_;
        $q = _$q_;
        $route = _$route_;
        $location = _$location_;
        Auth = _Auth_;
        deferred = _$q_.defer();
        deferred2 = _$q_.defer();

        spyOn(Auth, 'isLoggedIn').and.returnValue(true);
        spyOn(Auth, 'getUser').and.returnValue(deferred.promise);
        spyOn(Auth, 'logout');
        spyOn($route, 'reload');

        ctrl = $componentController('header', {
            $scope: $scope,
            $route: $route,
            $location: $location,
            Auth: Auth
        });
    }));

    it('activate controller', function () {
        deferred.resolve({ data: 'user' });

        $scope.$apply();

        expect(ctrl.doLogout).toBeDefined();
        expect(ctrl.loggedIn).toBe(true);
        expect(ctrl.user).toBe('user');
        expect(Auth.getUser).toHaveBeenCalledWith();
    });

    it('do logout method', function () {
        ctrl.doLogout();

        expect(Auth.logout).toHaveBeenCalledWith();
        expect($route.reload.calls.count()).toEqual(1);
    });

    it("should test the $routeChangeStart listener", function() {
        deferred.resolve({ data: 'user' });

        $rootScope.$broadcast("$routeChangeStart");
        $rootScope.$apply();
        
        expect(ctrl.loggedIn).toBe(true);
        expect(Auth.getUser).toHaveBeenCalledWith();
        expect(ctrl.user).toBe('user');
    });

});
