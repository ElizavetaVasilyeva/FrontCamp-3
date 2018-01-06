import { CONSTANTS, ELEMENTS } from './helpers/constants';
import Service from './actions/service';
import HtmlHelper from './helpers/htmlHelper';
import EventObserver from './actions/eventObserver';
import Builder from './actions/builder'
import Generator from './actions/generator';
import { store } from './redux/store';
import { actions } from './redux/actions';

const service = new Service();

export default async () => {
  await loadSources();
  await bindAutocomplete();
  await addNavListeners();
  await updateDom();
}

const addNavListeners = () => {
  const searchBtnObserver = new EventObserver();
  searchBtnObserver.subscribe(() => {
    const sourceId = ELEMENTS.searchId.value;
    const action = () => service.GetAllSourceArticles(sourceId, onErrorCallback, onNotExistCallback);
    const generator = new Generator('Article', ELEMENTS.container);
    new Builder(action, generator).Build();
    store.dispatch(actions.articles(sourceId));
  });

  document
    .getElementById('searchBtn')
    .addEventListener('click', () => { searchBtnObserver.broadcast(); });

  const sourceBtnObserver = new EventObserver();
  sourceBtnObserver.subscribe(source => {
    const sourceId = source.getAttribute('source-id')
    const action = () => service.GetAllSourceArticles(sourceId, onErrorCallback, onNotExistCallback);
    const generator = new Generator('Article', ELEMENTS.container);
    new Builder(action, generator).Build();
    store.dispatch(actions.articles(sourceId));
  });

  const sourceArray = document.getElementsByClassName('albumItem');
  [...sourceArray].
    forEach(source => source.addEventListener('click', () => {
      sourceBtnObserver.broadcast(source);
    }));
}

const updateDom = () => {
  HtmlHelper.hideDiv(document.getElementById('infoContainer'));
  HtmlHelper.showDiv(document.getElementById('container'));
}

const loadSources = () => {
  const action = () => service.GetAllSources(onErrorCallback);
  const generator = new Generator('Source', ELEMENTS.container);
  new Builder(action, generator).Build();
}

const onErrorCallback = () => {
  alert(CONSTANTS.COMMON_ERROR);
  console.log(CONSTANTS.COMMON_ERROR);
}

const onNotExistCallback = () => {
  alert(CONSTANTS.NOTEXIST_ERROR);
  console.log(CONSTANTS.NOTEXIST_ERROR);
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