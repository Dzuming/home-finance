import * as types from '../actions/actionTypes';
import { handleActions } from 'redux-actions';
import { financeFlowSpendingToTableMapper } from '../helpers/Mappers';

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
      console.log(action);
      return Object.assign({}, state, {
        monthly: state.monthly.concat({ ...action.payload }),
      });
    },
  },
  initialState,
);
