import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import Routes from '../routes';

export default class Root extends Component {
  render() {
    const { store, history, location, context } = this.props;
    return (
      <Provider store={store}>
        <StaticRouter history={history} location={location} context={context}>
          <Routes />
        </StaticRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
