import * as types from '../actions/actionTypes';
import { handleActions } from 'redux-actions';

const initialState = [];

export default handleActions(
  {
    [types.ASSUMPTION_CRUD.READ]: (state, action) =>
      Object.assign({}, state, {
        monthly: [...action.payload],
      }),
    [types.OVERALL_ASSUMPTIONS_CRUD.READ]: (state, action) =>
      Object.assign({}, state, {
        overall: [...action.payload],
      }),
    [types.ASSUMPTION_CRUD.CREATE]: (state, action) => {
      return Object.assign({}, state, {
        monthly: state.monthly.concat({ ...action.payload }),
      });
    },
    [types.ASSUMPTION_TYPES_DRAG.READ]: (state, action) => {
      return Object.assign({}, state, {
        types: [...action.payload],
      });
    },
    [types.ASSUMPTION_TYPES_DRAG.REDUCE]: (state, action) => {
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
