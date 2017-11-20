import Immutable, { fromJS } from 'immutable';
import { combineEpics } from 'redux-observable';

const FIGURE_CREATE = 'map-editor/map/FIGURE_CREATE';
const FIGURE_CANCEL = 'map-editor/map/FIGURE_CANCEL';
const FIGURE_POINT_ADD = 'map-editor/map/FIGURE_POINT_ADD';
const FIGURE_SAVE = 'map-editor/map/FIGURE_SAVE';

const emptyFigure = Immutable.fromJS({
  type: null,
  points: [],
  data: {}
});

const initialState = Immutable.fromJS({
  currentFigure: emptyFigure,
  figures: [
  ]
});

export default (state = initialState, action) => {
  switch (action.type) {

  case FIGURE_CREATE: {
    const { type, data } = action.payload;
    return state.setIn(['currentFigure'], fromJS({ type, points: [], data }));
  }

  case FIGURE_POINT_ADD: {
    const { point } = action.payload;
    return state.updateIn(['currentFigure', 'points'], points => points.push(fromJS(point)));
  }

  case FIGURE_SAVE: {
    return state
      .updateIn(['figures'], figures => figures.push(state.get('currentFigure')))
      .setIn(['currentFigure'], emptyFigure);
  }

  case FIGURE_CANCEL: {
    return state.setIn(['currentFigure'], emptyFigure);
  }

  default:
    return state;
  }
};

export const actions = {
  figureCreate(data) {
    return {
      type: FIGURE_CREATE,
      payload: data
    };
  },
  figurePointAdd(data) {
    return {
      type: FIGURE_POINT_ADD,
      payload: data
    };
  },
  figureSave() {
    return {
      type: FIGURE_SAVE,
      payload: {}
    };
  },
  figureCancel() {
    return {
      type: FIGURE_CANCEL,
      payload: {}
    };
  }
};
/*
const signUpEpic = action$ =>
  action$.ofType(AUTH_SIGNUP)
    .mergeMap(action =>
      userApi.post(action.payload)
      .map(response => {
        const { status, body } = response;
        if (status === 200) {
          return actions.signUpSuccess(body);
        } else {
          return actions.signUpFail(body);
        }
      })
    );

const signInEpic = action$ =>
  action$.ofType(AUTH_SIGNIN)
    .mergeMap(action =>
      authApi.post(action.payload)
      .map(response => {
        const { status, body } = response;
        if (status === 200) {
          return actions.signInSuccess(body);
        } else {
          return actions.signInFail(body);
        }
      })
    );
*/
export const epics = combineEpics(
);
