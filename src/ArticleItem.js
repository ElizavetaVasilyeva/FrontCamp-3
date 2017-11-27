class ArticleItem {
    constructor(article) {
        this.article = article;
    }

    getTemplate() {
        let date = (new Date(this.article.publishedAt)).toLocaleDateString();
        let { title, author, url, description } = this.article;

        let div = htmlHelper.createElement('div'),
            span = htmlHelper.createElement('span'),
            span2 = htmlHelper.createElement('span'),
            p = htmlHelper.createElement('p'),
            link = htmlHelper.createElement('a');

        htmlHelper.addClass(div, 'card');
        span.innerHTML = title;
        link.href = url;
        p.innerHTML = `${author} - ${date}`;
        span2.innerHTML = htmlHelper.cutString(description, 30);
        htmlHelper.addClass(span2, 'description');
        htmlHelper.appendElement(link, span);
        htmlHelper.appendElement(div, link);
        htmlHelper.appendElement(div, p);
        htmlHelper.appendElement(div, span2);

        return div;
    }
}