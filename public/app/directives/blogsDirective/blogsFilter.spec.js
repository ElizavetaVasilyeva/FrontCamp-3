describe('Blogs filters', function () {
    let filter;
    const items = [{ title: 'test1', body: 'test1' },
    { title: 'test2', body: 'test2' },
    { title: 'test3', body: 'test3' }];

    beforeEach(angular.mock.module('blogsDirectives'));

    beforeEach(inject(function ($filter) {
        filter = $filter("myfilter");
    }));

    it('should return undefined when arguments are undefined', function () {
        expect(filter(undefined, undefined)).toBe(undefined);
    });

    it('should return fyltered by query list of items', function () {
        const query = { body: 'Test1' };
        const res = [{ title: 'test1', body: 'test1' }];

        expect(filter(items, query)).toEqual(res);
    });

    it('should return fyltered by multi query list of items', function () {
        const query = { body: 'Test1', title: 'test1'};
        const res = [{ title: 'test1', body: 'test1' }];

        expect(filter(items, query)).toEqual(res);
    });

    it('shouldn`t return fyltered by multi query list of items', function () {
        const query = { body: 'Test5', title: 'test1'};
        const res = [];

        expect(filter(items, query)).toEqual(res);
    });
});

describe('Pagination filters', function () {
    let filter;
    const input = [{ title: 'test1', body: 'test1' },
    { title: 'test2', body: 'test2' },
    { title: 'test3', body: 'test3' }];

    beforeEach(angular.mock.module('blogsDirectives'));

    beforeEach(inject(function ($filter) {
        filter = $filter("pagination");
    }));

    it('should return undefined when arguments are undefined', function () {
        expect(filter(undefined, undefined)).toBe(undefined);
    });

    it('should return sliced list of items', function () {
        const start = 2;
        const res = [{ title: 'test3', body: 'test3' }];

        expect(filter(input, start)).toEqual(res);
    });

    it('should return empty list of items', function () {
        const start = 3;
        const res = [];

        expect(filter(input, start)).toEqual(res);
    });
});