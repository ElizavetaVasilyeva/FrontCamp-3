import { SingleArticleItem, PluralArticleItem } from '../components/articleItem';
import HtmlHelper from '../helpers/htmlHelper';
import SourceItemFactory from '../components/sourceItem';

//Strategy
class Generator {
  constructor(itemType, container) {
    switch (itemType) {
      case "Article":
        this.generator = new ArticleGenerator(container)
        break
      case "Source":
        this.generator = new SourceGenerator(container)
        break
      default:
        break
    }
  }

  Run(items) {
    if (!items) {
      return;
    }

    this.generator.RenderItems(items)
  }
}

class BaseGenerator {
  constructor(container) {
    this.container = container;
    HtmlHelper.clearContainer(this.container);
  }

  RenderItems(items) {
  }
}

class ArticleGenerator extends BaseGenerator {
  constructor(container) {
    super(container);
  }

  RenderItems(items) {
    super.RenderItems();
    const articlesArray = new PluralArticleItem();
    Array.from(items)
      .forEach(article => {
        articlesArray.Add(new SingleArticleItem(article));
      });
    this.container.innerHTML = articlesArray.getTemplate();
  }
}

class SourceGenerator extends BaseGenerator {
  constructor(container) {
    super(container);
  }

  RenderItems(items) {
    super.RenderItems();
    const top10sources = HtmlHelper.getFirstNElements(items, 10);
    Array.from(top10sources)
      .forEach(source => {
        this.container.appendChild(new SourceItemFactory(source).generateSourceItem());
      });
  }
}

export default Generator