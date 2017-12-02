'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HtmlHelper = function () {
    function HtmlHelper() {
        _classCallCheck(this, HtmlHelper);
    }

    _createClass(HtmlHelper, [{
        key: 'cutString',
        value: function cutString(string, n) {
            return string && n ? string.split(' ').slice(0, n).join(' ') + '...' : '';
        }
    }, {
        key: 'clearContainer',
        value: function clearContainer(container) {
            return container ? container.innerHTML = '' : null;
        }

        /**
         * Return first n-count elements from certain sequence
         *
         * @params {source} some sequence 
         * @params {n} amount of elements
         * 
         * @return first n-count elements from certain sequence
        **/

    }, {
        key: 'getFirstNElements',
        value: function getFirstNElements(source, n) {
            return source && n ? source.slice(0, n) : null;
        }
    }, {
        key: 'clearValue',
        value: function clearValue(element) {
            return element ? element.value = "" : null;
        }
    }]);

    return HtmlHelper;
}();

var HTML_HELPER = function () {
    return { HtmlHelper: HtmlHelper };
}();