(function () {
  angular.module('blogsService')
    .factory('Blog', blog);

  function blog($http) {
    var blogFactory = {
      allblogs: allblogs,
      getBlogById: getBlogById,
      create: create,
      delete: deleteBlog,
      edit: edit
    };

    return blogFactory;

    function allblogs() {
      return $http.get('/api/blogs');
    };

    function getBlogById(id) {
      return $http.get(`/api/blogs/${id}`);
    };

    function create(blogData) {
      return $http.post('/api/blogs', blogData);
    };

    function edit(id, blogData) {
      return $http.put(`/api/blogs/${id}`, blogData);
    };

    function deleteBlog(id) {
      return $http.delete(`/api/blogs/${id}`);
    };
  }
})();