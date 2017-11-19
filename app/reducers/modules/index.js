import { combineReducers } from 'redux-immutable';
import { combineEpics } from 'redux-observable';
import map, { epics as mapEpics } from './map';
import routing from './routing';

export const rootReducer = combineReducers({
  routing,
  map
});


export const rootEpic = combineEpics(
  mapEpics
);
