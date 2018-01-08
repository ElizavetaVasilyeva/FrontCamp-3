import ArticleItem from "./article-item";
import HtmlHelper from "../helpers/htmlHelper"

class SingleArticleItem extends ArticleItem {
  constructor(article) {
    super();
    this.article = HtmlHelper.prepareArticleItem(article);
  }

  getTemplate() {
    const date = (new Date(this.article.publishedAt)).toLocaleDateString();
    const { title, author, url, description, urlToImage } = this.article;
    const div = document.createElement('div'),
      article = document.createElement('article'),
      img = document.createElement('img'),
      section = document.createElement('section'),
      footer = document.createElement('footer'),
      span2 = document.createElement('span'),
      p = document.createElement('p'),
      link = document.createElement('a');

    div.classList.add('card');
    img.setAttribute('src', urlToImage);
    link.innerHTML = title;
    p.innerHTML = `${author} - ${date}`;
    link.setAttribute('href', url);
    span2.innerHTML = HtmlHelper.cutString(description, 30);
    span2.classList.add('description');

    section.appendChild(link);
    footer.appendChild(p);
    footer.appendChild(span2);
    article.appendChild(section);
    article.appendChild(img);
    article.appendChild(footer);
    div.appendChild(article);

    return div;
  }
}

export default SingleArticleItem
