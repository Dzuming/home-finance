import * as types from '../actions/actionTypes';
export default function loginReducer(state = [], action) {
  switch (action.type) {
    case types.REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
    case types.SUCCESS_LOGIN:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true
      });
    case types.LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        message: action.message
      });
    case types.AUTH_USER:
      return Object.assign({}, state, {isAuthenticated: true});
    default:
      return state;
  }
}
