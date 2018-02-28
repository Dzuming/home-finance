import * as types from '../actions/actionTypes';
import { handleActions } from 'redux-actions';

const initialState = [];

export default handleActions({
  [types.API_REQUEST.PENDING]: (state) => Object.assign({}, state, {loading: state.loading + 1}),
  [types.API_REQUEST.SUCCESS]: (state) => Object.assign({}, state, {loading: state.loading - 1}),
}, initialState);
