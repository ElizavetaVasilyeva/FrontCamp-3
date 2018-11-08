describe('Login component', function () {
    var $q, $scope, $componentController, $rootScope, $location;
    var Auth, deferred, deferred2, ctrl;

    beforeEach(angular.mock.module('login'));

    beforeEach(inject(function (_$componentController_, _$rootScope_, _$location_, _$q_, _Auth_) {
        $q = _$q_;
        $rootScope = _$rootScope_;
        $scope = $rootScope.$new();
        $location = _$location_;
        $componentController = _$componentController_;
        Auth = _Auth_;
        deferred = _$q_.defer();
        deferred2 = _$q_.defer();

        spyOn(Auth, 'login').and.returnValue(deferred.promise);
        spyOn(Auth, 'getUser').and.returnValue(deferred2.promise);

        ctrl = $componentController('login', {
            $scope: $scope,
            $location: $location,
            Auth: Auth
        });
    }));

    it('activate controller', function () {

        $scope.$apply();

        expect(ctrl.doLogin).toBeDefined();
    });

    it('do Login if valid and unsuccess', function () {
        ctrl.loginData = {};
        deferred.resolve({ success: false, message: 'error'});

        ctrl.doLogin(true);
        $rootScope.$apply();

        expect(Auth.login).toHaveBeenCalledWith({});
        expect(ctrl.error).toEqual('error');
    });

    it('do Login if valid and success', function () {
        ctrl.loginData = [];
        deferred.resolve({ success: true});
        deferred2.resolve({data:'user'});

        ctrl.doLogin(true);
        $rootScope.$apply();

        expect(ctrl.user).toBe('user');
        expect(Auth.getUser).toHaveBeenCalledWith();
    });

});
