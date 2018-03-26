(function () {
  angular.module('blogsDirectives')
    .filter('myfilter', myfilter);

  function myfilter() {
    return (items, text) => {
      let filtered = items;

      if (items && text) {
        Object.keys(text).forEach(key => {
          filtered = filtered.filter(item => item[key].toLowerCase().startsWith(text[key].toLowerCase()));
        })
      }

      return filtered;
    }
  }
})();