import * as types from '../actions/actionTypes';
import { handleActions } from 'redux-actions';

const initialState = [];

export default handleActions(
  {
    [types.REVENUE_CRUD.READ]: (state, action) => action.payload.revenue,
  },
  initialState,
);
