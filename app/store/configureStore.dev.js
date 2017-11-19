import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';
import Immutable from 'immutable';

import { rootReducer, rootEpic } from '../reducers/modules/';

const emptyMap = Immutable.Map();

const epicMiddleware = createEpicMiddleware(rootEpic);

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
/* eslint-enable */

export default function configureStore(initialState = emptyMap) {
  const logger = createLogger();

  const store = createStore(
        rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(epicMiddleware, logger))
    );

  return store;
}
