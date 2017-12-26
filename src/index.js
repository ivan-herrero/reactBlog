import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import promise from 'redux-promise';
import thunk from 'redux-thunk';

import reducers from './reducers';
import routes from './routes';
import registerServiceWorker from './registerServiceWorker';

import './style/index.css';

// Bootstrap
// import 'bootstrap/dist/css/bootstrap.css';
import 'admin-lte/node_modules/bootstrap/dist/css/bootstrap.min.css';

// AdminLTE
import 'admin-lte/dist/css/AdminLTE.min.css';
import 'admin-lte/dist/css/skins/_all-skins.min.css';

// FontAwesome
import 'font-awesome/css/font-awesome.min.css';

const createStoreWithMiddleware = applyMiddleware(
  promise,
  thunk
)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();