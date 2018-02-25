import * as types from '../actions/actionTypes';

export default function loginReducer (state = [], action) {
  switch (action.type) {
    case types.AUTH_USER:
      return Object.assign({}, state, {isAuthenticated: true});
    case types.REQUEST_LOGOUT:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: true
      });
    case types.SUCCESS_LOGOUT:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false
      });
    default:
      return state;
  }
}
