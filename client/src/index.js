import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import storeFactory from './store/index'
import registerServiceWorker from './registerServiceWorker';
import App from './components/app/App';

const store_ = storeFactory();

ReactDOM.hydrate(
  <Provider store={store_}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
