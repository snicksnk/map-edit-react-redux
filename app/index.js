import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { createBrowserHistory } from 'history';
import { syncHistoryWithStore } from 'react-router-redux';

import { AppContainer } from 'react-hot-loader';

import 'bootstrap/dist/css/bootstrap.min.css';
import configureStore from './store/configureStore';
import Root from './containers/Root';

const store = configureStore();
const history = syncHistoryWithStore(createBrowserHistory(), store, {
  selectLocationState(state) {
    console.log('----', state.get('routing').toJS());
    return state.get('routing').toJS();
  }
});

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NewRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store} history={history} />
      </AppContainer>,
            document.getElementById('root')
        );
  });
}
