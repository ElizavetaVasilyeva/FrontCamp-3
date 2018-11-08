describe('Blogs factory', function () {
    var Blog, $httpBackend;

    beforeEach(angular.mock.module('blogsService'));

    beforeEach(inject(function (_Blog_, _$httpBackend_) {
        Blog = _Blog_;
        $httpBackend = _$httpBackend_;
    }));

    it('get all blogs', function () {
        $httpBackend.whenGET('/api/blogs')
            .respond(200, [
                { title: 'Title1', body: 'body1' },
                { title: 'Title2', body: 'body2' }
            ]);

        Blog.allblogs().then(function (data) {
            expect(data.status).toBe(200);
            expect(data.data.length).toEqual(2);
            expect(data.data).toContain({ title: 'Title1', body: 'body1' });
        });

        $httpBackend.flush();
    });

    it('get blog by id', function () {
        const id = 1;
        $httpBackend.whenGET(`/api/blogs/${id}`)
            .respond(200, [
                { id: id, title: 'Title1', body: 'body1' }
            ]);

        Blog.getBlogById(id).then(function (data) {
            expect(data.status).toBe(200);
            expect(data.data.length).toEqual(1);
            expect(data.data).toContain({ id: id, title: 'Title1', body: 'body1' });
        });

        $httpBackend.flush();
    });

    it('create blog', function () {
        const newBlog = {
            title: 'test',
            author: 'test',
            date: new Date(new Date().toISOString()),
        };

        $httpBackend.whenPOST(`/api/blogs`)
            .respond(200, { message: 'Blog was created!' }
            );

        Blog.create(newBlog).then(function (data) {
            expect(data.status).toBe(200);
            expect(data.data.message).toBe('Blog was created!');
        });

        $httpBackend.flush();
    });

    it('edit blog', function () {
        const id = 1;
        const blog = {
            title: 'test2',
            author: 'test',
            date: new Date(new Date().toISOString()),
        };
        $httpBackend.whenPUT(`/api/blogs/${id}`)
            .respond(200, { message: 'Blog was updated!' }
            );

        Blog.edit(id, blog).then(function (data) {
            expect(data.status).toBe(200);
            expect(data.data.message).toBe('Blog was updated!');
        });

        $httpBackend.flush();
    });

    it('delete blog', function () {
        const id = 1;

        $httpBackend.whenDELETE(`/api/blogs/${id}`)
            .respond(200, { message: 'Blog was deleted!' }
            );

        Blog.delete(id).then(function (data) {
            expect(data.status).toBe(200);
            expect(data.data.message).toBe('Blog was deleted!');
        });

        $httpBackend.flush();
    });
});