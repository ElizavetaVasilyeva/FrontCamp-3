class SourceItem {
    constructor(source) {
        this.source = source;
    }

    getTemplate() {
        let { id, name, url } = this.source;
        let div = htmlHelper.createElement('div'),
            span = htmlHelper.createElement('span');
        url = htmlHelper.createElement('a');

        htmlHelper.addClass(div, 'card');
        span.innerHTML = name;
        span.addEventListener('click', function () {
            LoadArticles(id);
        });
        url.href = url;
        htmlHelper.appendElement(div, span);
        htmlHelper.appendElement(div, url);
        return div;
    }
}