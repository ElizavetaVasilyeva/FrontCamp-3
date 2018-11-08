describe('Auth factory', function () {
    var Auth, AuthToken, $httpBackend, $q;

    beforeEach(angular.mock.module('authService'));

    beforeEach(inject(function (_Auth_, _$httpBackend_, _$q_, _AuthToken_) {
        Auth = _Auth_;
        AuthToken = _AuthToken_;
        $httpBackend = _$httpBackend_;
        $q = _$q_;
    }));

    it('login user', function () {
        const userData = {
            username: 'test',
            password: 'test'
        };
        const data = { message: 'Successfully login', token: '' };

        spyOn(AuthToken, "setToken");

        Auth.login(userData);

        $httpBackend.whenPOST(`/api/users/login`)
            .respond(200, data);

        $httpBackend.flush();

        expect(AuthToken.setToken).toHaveBeenCalledWith(data.token);
    });

    it('logout user', function () {
        spyOn(AuthToken, "setToken");

        Auth.logout();

        expect(AuthToken.setToken).toHaveBeenCalledWith();
    });

    it('is logged in user', function () {
        spyOn(AuthToken, "getToken").and.returnValue(true);

        const result = Auth.isLoggedIn();

        expect(AuthToken.getToken).toHaveBeenCalledWith();
        expect(result).toBe(true);
    });

    it('isn`t logged in user', function () {
        spyOn(AuthToken, "getToken").and.returnValue(false);

        const result = Auth.isLoggedIn();

        expect(AuthToken.getToken).toHaveBeenCalledWith();
        expect(result).toBe(false);
    });

    it('get User if token exists', function () {
        spyOn(AuthToken, "getToken").and.returnValue(true);

        Auth.getUser().then(data => {
            expect(data.data.username).toBe('test')
        });

        $httpBackend.whenGET(`/api/users/me`)
            .respond(200, { username: 'test' });

        $httpBackend.flush();

        expect(AuthToken.getToken).toHaveBeenCalledWith();
    });

    it('get User if token doesn`t exist', function () {
        spyOn(AuthToken, "getToken").and.returnValue(false);
        var result = $q.reject({ message: "User has no token" });

        var res = Auth.getUser();

        expect(res).toEqual(result);
        expect(AuthToken.getToken).toHaveBeenCalledWith();
    });
});