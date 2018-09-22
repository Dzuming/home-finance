import * as types from '../actions/actionTypes';
import { handleActions } from 'redux-actions';

const initialState = [];

export default handleActions(
  {
    [types.SET_CATEGORIES]: (state, action) =>
      Object.assign({}, state, {
        types: [...action.payload]
      }),
    [types.CATEGORIES_DRAG.SELECT]: (state, action) => {
      return Object.assign({}, state, {
        selectedTypes: state.types.filter(function(type) {
          return this.indexOf(type.id) < 0;
        }, action.payload.type.map(type => type.id))
      });
    },
    [types.CATEGORIES_DRAG.RESET]: state => {
      return Object.assign({}, state, {
        selectedTypes: state.types
      });
    }
  },
  initialState
);
