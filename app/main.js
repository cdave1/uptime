import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router';

import configureStore from './redux/store/configureStore';
import getRouter from './routes';

const store = configureStore(window.INITIAL_STATE);

ReactDOM.render(
  <Provider store={store}>
      {getRouter(browserHistory, store)}
  </Provider>,
  document.getElementById('app')
);
