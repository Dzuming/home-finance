import * as types from '../actions/actionTypes';
export default function userReducer(state = [], action) {
  switch (action.type) {
    case types.SET_USER:
      return Object.assign({}, state, {user: action.user});
    default:
      return state;
  }
}