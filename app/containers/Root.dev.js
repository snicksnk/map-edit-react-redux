import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Routes from '../routes';

export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <div>
          <BrowserRouter history={history} >
            <Routes />
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
