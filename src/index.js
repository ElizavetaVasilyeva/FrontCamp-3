import '../node_modules/picnic/picnic.min.css';
import './styles/main.scss';
import 'jquery-ui';
import '../node_modules/jquery-ui-dist/jquery-ui.css';
import 'whatwg-fetch';
import EventObserver from './js/actions/eventObserver';
import { store } from './js/redux/store';

const showNewsBtn = document.getElementById('showNews');

const showNewsBtnObserver = new EventObserver();
showNewsBtnObserver.subscribe(() => {
  require.ensure(['./js/common'], (require) => {
    let common = require('./js/common').default;
    common();
    showNewsBtn.remove();
  })
});

showNewsBtn.addEventListener('click', () => showNewsBtnObserver.broadcast());

const renderReduxInfoTitle = () => document.getElementById('reduxInfoTitle').innerText = store.getState().heading;

store.subscribe(renderReduxInfoTitle);

