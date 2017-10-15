import * as types from '../actions/actionTypes';
export default function logintReducer(state = [], action) {
  switch (action.type) {
    case types.REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticate: false
      });
    case types.SUCCESS_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticate: false,
      });
    default:
      return state;
  }
}
