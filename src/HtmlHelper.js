class HtmlHelper {

    cutString(string, n) {
        return (string && n) ? string.split(' ').slice(0, n).join(' ') + '...' : '';
    }

    clearContainer(container) {
        return (container) ? container.innerHTML = '' : null;
    }

    /**
     * Return first n-count elements from certain sequence
     *
     * @params {source} some sequence 
     * @params {n} amount of elements
     * 
     * @return first n-count elements from certain sequence
    **/
    getFirstNElements(source, n) {
        return (source && n) ? source.slice(0, n) : null;
    }

    clearValue(element) {
        return (element) ? element.value = "" : null;
    }

}

const HTML_HELPER = (() => ({ HtmlHelper }))();