class HtmlHelper {

    /**
     * Cut off string by {n} chars
     *
     * @params {string} some string
     * @params {n} amount of chars
     * 
     * @return cutting string
    **/
    cutString(string, n) {
        return (string && n) ? string.split(' ').slice(0, n).join(' ') + '...' : '';
    }

    /**
     * Clear innerHtml property of certain container 
     *
     * @params {container} some container
     * 
     * @return container with empty innerHtml property
    **/
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

    /**
     * Clear value property of element
     *
     * @params {element} certain element
     * 
     * @return element with with empty value
    **/
    clearValue(element) {
        return (element) ? element.value = "" : null;
    }

}

const HTML_HELPER = (() => ({ HtmlHelper }))();