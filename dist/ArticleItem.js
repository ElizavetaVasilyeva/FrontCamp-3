'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ArticleItem = function () {
    function ArticleItem(article) {
        _classCallCheck(this, ArticleItem);

        this.article = article;
    }

    _createClass(ArticleItem, [{
        key: 'getTemplate',
        value: function getTemplate() {
            var date = new Date(this.article.publishedAt).toLocaleDateString();
            var _article = this.article,
                title = _article.title,
                author = _article.author,
                url = _article.url,
                description = _article.description;


            var div = document.createElement('div'),
                span = document.createElement('span'),
                span2 = document.createElement('span'),
                p = document.createElement('p'),
                link = document.createElement('a');

            div.classList.add('card');
            span.innerHTML = title;
            link.href = url;
            p.innerHTML = author + ' - ' + date;
            span2.innerHTML = htmlHelper.cutString(description, 30);
            span2.classList.add('description');
            link.appendChild(span);
            div.appendChild(link);
            div.appendChild(p);
            div.appendChild(span2);

            return div;
        }
    }]);

    return ArticleItem;
}();