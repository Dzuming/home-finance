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
        draggedCategories: state.categories.filter(function(category) {
          return this.indexOf(category.id) < 0;
        }, action.payload.categories.map(category => category.id))
      });
    },
    [types.CATEGORIES_DRAG.RESET]: state => {
      return Object.assign({}, state, {
        draggedCategories: state.categories
      });
    }
  },
  initialState
);
