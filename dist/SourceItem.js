'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SourceItem = function () {
    function SourceItem(source) {
        _classCallCheck(this, SourceItem);

        this.source = source;
    }

    _createClass(SourceItem, [{
        key: 'getTemplate',
        value: function getTemplate() {
            var _source = this.source,
                id = _source.id,
                name = _source.name,
                url = _source.url;


            var div = document.createElement('div'),
                span = document.createElement('span'),
                url2 = document.createElement('a');

            div.classList.add('card');
            span.innerHTML = name;
            span.addEventListener('click', function () {
                LoadArticles(id);
            });
            url2.href = url;
            div.appendChild(span);
            div.appendChild(url2);

            return div;
        }
    }]);

    return SourceItem;
}();