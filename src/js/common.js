import { COMMON_ERROR, NOT_EXIST_ERROR } from './helpers/constants';
import Service from './actions/service';
import HtmlHelper from './helpers/htmlHelper';
import EventObserver from './actions/eventObserver';
import Builder from './actions/builder'
import { Generator, ArticleGenerator, SourceGenerator } from './actions/generator';
import { store } from './redux/store';
import { setArticlesHeader } from './redux/actions';

import {
  ContainerCreator,
  MainContainerCreator,
  InfoContainerCreator,
  SearchIdCreator
} from './helpers/elements.factory';

const service = new Service();

export default async () => {
  await loadSources();
  await bindAutocomplete();
  await addNavListeners();
  await updateDom();
}

const creators = [
  new ContainerCreator(document),
  new MainContainerCreator(document),
  new InfoContainerCreator(document),
  new SearchIdCreator(document),
];

const elements = {
  'container': creators[0].FactoryMethod().GetElement(),
  'mainContainer': creators[1].FactoryMethod().GetElement(),
  'infoContainer': creators[2].FactoryMethod().GetElement(),
  'searchId': creators[3].FactoryMethod().GetElement(),
};

const addNavListeners = () => {
  const searchBtnObserver = new EventObserver();
  searchBtnObserver.subscribe(() => {
    const sourceId = elements['searchId'].value;
    const action = () => service.GetAllSourceArticles(sourceId, onErrorCallback, onNotExistCallback);
    const generator = new Generator(new ArticleGenerator(elements['container']));
    const builder = new Builder(action, generator);
    builder.Build();
    store.dispatch(setArticlesHeader({ heading: sourceId }));
  });

  document
    .getElementById('searchBtn')
    .addEventListener('click', () => { searchBtnObserver.broadcast(); });

  const sourceBtnObserver = new EventObserver();
  sourceBtnObserver.subscribe(source => {
    const action = () => service.GetAllSourceArticles(source, onErrorCallback, onNotExistCallback);
    const generator = new Generator(new ArticleGenerator(elements['container']));
    const builder = new Builder(action, generator);
    builder.Build();
    store.dispatch(setArticlesHeader({ heading: source }));
  });

  const sourceArray = document.getElementsByClassName('albumItem');
  Array.from(sourceArray).
    forEach(source => source.addEventListener('click', () => {
      sourceBtnObserver.broadcast(source.getAttribute('source-id'));
    }));
}

const updateDom = () => {
  HtmlHelper.hideDiv(elements['infoContainer']);
  HtmlHelper.showDiv(elements['mainContainer']);
}

const loadSources = () => {
  const action = () => service.GetAllSources(onErrorCallback);
  const generator = new Generator(new SourceGenerator(elements['container']));
  const builder = new Builder(action, generator);
  builder.Build();
}

const onErrorCallback = () => {
  alert(COMMON_ERROR);
  console.log(COMMON_ERROR);
}

const onNotExistCallback = () => {
  alert(NOT_EXIST_ERROR);
  console.log(NOT_EXIST_ERROR);
}

const bindAutocomplete = async () => {
  const data = await service.GetAllSources();

  if (data) {
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
  }
}