import ArticleItem from "./article-item";

class PluralArticleItem extends ArticleItem {
  constructor() {
    super();
    this.children = [];
  }

  Add(item) {
    this.children.push(item);
  }

  getTemplate() {
    return this.children.map(element => {
      return element.getTemplate().outerHTML;
    }).join('');
  }
}

export default PluralArticleItem