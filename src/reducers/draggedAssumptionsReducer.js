import * as types from '../actions/actionTypes';
import { handleActions } from 'redux-actions';

const initialState = [];

export default handleActions(
  {
    [types.ASSUMPTION_TYPES_DRAG.READ]: (state, action) => {
      return Object.assign({}, state, {
        types: [...action.payload],
      });
    },

    [types.ASSUMPTION_TYPES_DRAG.REDUCE]: (state, action) =>  {
      return Object.assign({}, state, {
        draggedTypes: state.types.filter(
          type => type.name !== action.payload.type.name,
        ),
      });
    },
    [types.ASSUMPTION_TYPES_DRAG.RESET]: state => {
      return Object.assign({}, state, {
        draggedTypes: state.types,
      });
    },
  },
  initialState,
);
