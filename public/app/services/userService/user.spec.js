describe('User factory', function () {
    var User, $httpBackend;

    beforeEach(angular.mock.module('userService'));

    beforeEach(inject(function (_User_, _$httpBackend_) {
        User = _User_;
        $httpBackend = _$httpBackend_;
    }));

    it('create user', function () {
        const newUser = {
            name: 'test',
            email: 'test@email.ru',
            password: 'test'
        };

        $httpBackend.whenPOST(`/api/users/register`)
            .respond(200, { message: 'User was created!' }
            );

        User.create(newUser).then(function (data) {
            expect(data.status).toBe(200);
            expect(data.data.message).toBe('User was created!');
        });

        $httpBackend.flush();
    });
});