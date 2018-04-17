import * as types from '../actions/actionTypes';
import { handleActions } from 'redux-actions';

const initialState = [];

export default handleActions(
  {
    [types.OPEN_SIDENAV]: (state, action) =>
      Object.assign({}, state, { isOpen: action.payload.isOpen }),
  },
  initialState,
);
