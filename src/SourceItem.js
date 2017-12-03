class SourceItem {
    constructor(source) {
        this.source = source;
    }

    getTemplate() {
        const { id, name, url } = this.source;

        const div = document.createElement('div'),
              span = document.createElement('span'),
              url2 = document.createElement('a');

        div.classList.add('card');
        span.innerHTML = name;
        span.addEventListener('click', () => { LoadArticles(id); })
        url2.href = url;
        div.appendChild(span);
        div.appendChild(url2);

        return div;
    }
}