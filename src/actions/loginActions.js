import * as types from './actionTypes';
import { setUser } from './userActions';
function requestLogin() {
  return {type: types.REQUEST_LOGIN};
}
function successLogin(data) {
  setStorageToken(data.token);
  
  return {type: types.SUCCESS_LOGIN};
}
function loginError(message) {
  return {type: types.LOGIN_FAILURE,  message};
}
function authUser() {
  return {type: types.AUTH_USER};
}
function authenticateUser(data) {
  const url = 'http://localhost:80/authenticate';
  const credentials = JSON.stringify(data);
  return dispatch => {
    dispatch(requestLogin());
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: credentials
    }).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).then((data) => {
      dispatch(successLogin(data));
      dispatch(authUser());
      dispatch(setUser(data.user));
    }).catch((error => dispatch(loginError(error))));
  };
}
function setStorageToken(token) {
  localStorage.setItem('token', token);
}
export function login(data) {
  // Note that the function also receives getState() which lets you choose what to
  // dispatch next. This is useful for avoiding a network request if a cached
  // value is already available.
  return (dispatch) => {
    // Dispatch a thunk from thunk!
    return dispatch(authenticateUser(data));
  };
}
