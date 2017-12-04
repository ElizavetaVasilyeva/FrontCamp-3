class ArticleItem {
    constructor(article) {
        this.article = article;
    }

    getTemplate() {
        const date = (new Date(this.article.publishedAt)).toLocaleDateString();
        const { title, author, url, description } = this.article;
        const div = document.createElement('div'),
            span = document.createElement('span'),
            span2 = document.createElement('span'),
            p = document.createElement('p'),
            link = document.createElement('a');

        div.classList.add('card');
        span.innerHTML = title;
        link.setAttribute('href', url);
        p.innerHTML = `${author} - ${date}`;
        span2.innerHTML = htmlHelper.cutString(description, 30);
        span2.classList.add('description');
        link.appendChild(span);
        div.appendChild(link);
        div.appendChild(p);
        div.appendChild(span2);

        return div;
    }
}