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
  },
  initialState,
);
