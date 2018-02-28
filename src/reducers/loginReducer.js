import * as types from '../actions/actionTypes';
import { handleActions } from 'redux-actions';

const initialState = [];

export default handleActions({
  [types.AUTH_USER]: (state) => Object.assign({}, state, {isAuthenticated: true}),
  [types.REQUEST_LOGOUT]: (state) => Object.assign({}, state, {isAuthenticated: true}),
  [types.SUCCESS_LOGOUT]: (state) => Object.assign({}, state, {isAuthenticated: false})
}, initialState);
