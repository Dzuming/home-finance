import * as types from '../actions/actionTypes';
import { handleActions } from 'redux-actions';

const initialState = [];

export default handleActions({
  [types.SET_USER]: (state, action) => Object.assign({}, state, {...action.payload.data})
}, initialState);
