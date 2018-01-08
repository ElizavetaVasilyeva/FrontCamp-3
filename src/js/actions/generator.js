import SingleArticleItem from "../components/single-article-item"
import PluralArticleItem from "../components/plural-article-item"
import HtmlHelper from '../helpers/htmlHelper';
import SourceFactory from '../components/sourceItem';

//Strategy
class Generator {
  constructor(generator) {
    this.generator = generator;
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
        this.container.appendChild(new SourceFactory().createSourceItem(source).generate());
      });
  }
}

export { Generator, ArticleGenerator, SourceGenerator }