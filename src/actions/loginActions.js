import * as types from './actionTypes';
import { setUser } from './userActions';
import env from '../../environments/config';

function requestLogin () {
  return {type: types.REQUEST_LOGIN};
}

function successLogin (data) {
  setStorageToken(data.token);
  return {type: types.SUCCESS_LOGIN};
}

function loginError (message) {
  return {type: types.LOGIN_FAILURE, message};
}

function authUser () {
  return {type: types.AUTH_USER};
}

function authenticateUser (data) {
  let formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('client_id', '2');
  formData.append('client_secret', 'tbvtGeM45Jnk8IFRTVXFiBJrySgtU7pgDehuZoKG');
  formData.append('username', data.email);
  formData.append('password', data.password);
  formData.append('scope', '*');
  return dispatch => {
    dispatch(requestLogin());
    return fetch(`${env.api_url}/oauth/token`, {
      method: 'POST',
      body: formData
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

function setStorageToken (token) {
  localStorage.setItem('token', token);
}

export function login (data) {
  // Note that the function also receives getState() which lets you choose what to
  // dispatch next. This is useful for avoiding a network request if a cached
  // value is already available.
  return (dispatch) => {
    // Dispatch a thunk from thunk!
    return dispatch(authenticateUser(data));
  };
}
