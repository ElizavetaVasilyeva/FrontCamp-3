import { CONSTANTS } from '../helpers/constants';
import { fetchData } from './fetchData'

let request = null;

class Service {
  constructor() {

    if (!request) {
      request = this;
    }

    return request;
  }

  GetAllSources(onErrorCallback) {
    const query = `${CONSTANTS.SERVICE_URL_SOURCES}?apiKey=${CONSTANTS.API_KEY}`;

    return fetchData(query)
      .then(data => data.sources)
      .catch(error => {
        onErrorCallback && onErrorCallback();
      });
  }

  GetAllSourceArticles(sourceId, onErrorCallback, onNotExistCallback) {
    const query = CONSTANTS.SERVICE_URL_ARTICLES + '?sources=' + sourceId + '&apiKey=' + CONSTANTS.API_KEY;

    if (sourceId) {
      return fetchData(query)
        .then(data => data.articles
        )
        .catch(error => {
          onErrorCallback && onErrorCallback();
        });
    } else {
      onNotExistCallback && onNotExistCallback();
    }
  }
}

export default Service