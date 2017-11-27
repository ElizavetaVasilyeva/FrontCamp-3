class HtmlHelper {

    createElement(element) {
        return (element) ? document.createElement(element) : null;
    }

    appendElement(parent, el) {
        return (parent && el) ? parent.appendChild(el) : null;
    }

    cutString(string, n) {
        return (string && n) ? string.split(' ').slice(0, n).join(' ') + '...' : '';
    }

    clearContainer(container) {
        return (container) ? container.innerHTML = '' : null;
    }

    addClass(element, className) {
        return (element && className) ? element.className += className : null;
    }

    getFirstNElements(source, n) {
        return (source && n) ? source.slice(0, n) : null;
    }

    clearValue(element) {
        return (element) ? element.value = "" : null;
    }

}

const HTML_HELPER = (() => ({ HtmlHelper }))();