import * as types from '../actions/actionTypes';
import { handleActions } from 'redux-actions';

const initialState = [];

export default handleActions(
  {
    [types.ASSUMPTION_CRUD.READ]: (state, action) => action.payload,
  },
  initialState,
);
