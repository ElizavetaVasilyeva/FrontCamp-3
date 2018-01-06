import HtmlHelper from "../helpers/htmlHelper";
import placeHolder from "./../../images/placeholder.png";

//Decorator
const preparedData = article => {
  article.title = article.title || 'No title';
  article.author = article.author || 'No author';
  article.url = article.url || '/';
  article.description = article.description || 'No description';
  article.urlToImage = article.urlToImage || placeHolder;
  return article;
};

//Composite
class ArticleItem {
  constructor() {
  }

  getTemplate() {
  }

  Add(ArticleItem) {
  }
}

class SingleArticleItem extends ArticleItem {
  constructor(article) {
    super();
    this.article = preparedData(article);
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
    img.src = urlToImage;
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

class PluralArticleItem extends ArticleItem {
  constructor() {
    super();
    this.children = [];
  }

  Add(item) {
    this.children.push(item);
  }

  getTemplate() {
    let template = '';

    this.children.forEach(element => {
      template += element.getTemplate().outerHTML;
    });

    return template;
  }
}

export { SingleArticleItem, PluralArticleItem }