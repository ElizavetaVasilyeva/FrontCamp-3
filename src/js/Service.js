import CONSTANTS from './constants';
import { ArticleItem } from './ArticleItem';
import { SourceItem } from './SourceItem';
import { HtmlHelper } from './HtmlHelper';

export class Service {
  constructor() {
    this.htmlHelper = new HtmlHelper();
    this.container = CONSTANTS.container;
    this.errorBlock = CONSTANTS.modalBody;
    this.COMMON_ERROR = 'An error occurred during getting information!';
    this.NOTEXIST_ERROR = 'Current source does not exist!';
  }

  async GetAllItems(url) {
    let response = await fetch(url);
    const data = await response.json();
    return data;
  }

  LoadMainPage(query) {
    this.
      GetAllItems(query)
      .then(data => data.sources)
      .then(data => {
        this.htmlHelper.clearContainer(this.container);
        const top10sources = this.htmlHelper.getFirstNElements(data, 10);
        Array.from(top10sources)
          .forEach(source => {
            const sourceItem = new SourceItem(source);
            this.container.appendChild(sourceItem.getTemplate());
          });
      })
      .catch(error => {
        this.errorBlock.innerHTML = this.COMMON_ERROR;
        //console.log(error.get_message()); //test plugin
        $('#dialog').modal('show');
      });
  }

  LoadArticles(sourceId) {
    const query = CONSTANTS.SERVICE_URL_ARTICLES + '?sources=' + sourceId + '&apiKey=' + CONSTANTS.API_KEY;
    if (sourceId) {
      this.GetAllItems(query)
        .then(data => {
          this.htmlHelper.clearContainer(this.container);
          const { articles } = data;
          Array.from(articles)
            .forEach(article => {
              const articleItem = new ArticleItem(article);
              this.container.appendChild(articleItem.getTemplate());
            });
        }).catch(error => {
          this.errorBlock.innerHTML = this.COMMON_ERROR;
          $('#dialog').modal('show');
        });
    } else {
      this.errorBlock.innerHTML = this.NOTEXIST_ERROR;
      $('#dialog').modal('show');
    }
  }
}