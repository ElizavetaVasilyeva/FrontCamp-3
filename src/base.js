import "babel-polyfill";
import "whatwg-fetch"

import './style/bootstrap.min.css'
import './style/base.scss'

import CONSTANTS from './js/constants';
import { Service } from './js/Service';

const query = `${CONSTANTS.SERVICE_URL_SOURCES}?apiKey=${CONSTANTS.API_KEY}`;
const service = new Service();
const sources = service
  .GetAllItems(query)
  .then(data => { return data.sources; });

window.onload = () => {
  BindAutocomplete(sources);
  addEventListeners();
};

const addEventListeners = () => {
  document
    .getElementById('showNews')
    .addEventListener('click', () => {
      require.ensure(['./js/ShowNews'], (require) => {
        let news = require('./js/ShowNews').default;
        news(query);
      })
    });

  document
    .getElementById('searchBtn')
    .addEventListener('click', () => { service.LoadArticles(CONSTANTS.searchId.value); });

  document
    .getElementById('mainPage')
    .addEventListener('click', () => { service.LoadMainPage(query); });
};

function BindAutocomplete(sources) {
  sources.then(data => {
    $("#search").autocomplete({
      source: data.map(s => {
        return { value: s.id, label: s.name };
      }),
      select: (event, ui) => {
        $("#search").val(ui.item.label);
        $("#searchId").val(ui.item.value);
        return false;
      },
      selectFirst: true,
      change: (event, ui) => {
        if (ui.item == null) {
          $("#searchId").val("");
        }
      }
    });
  });
}