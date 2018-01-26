import * as types from './actionTypes';
import { getUser } from './userActions';
import env from '../../environments/config';

function requestLogin () {
  return {type: types.REQUEST_LOGIN};
}

function successLogin (accessToken) {
  setStorageToken(accessToken);
  return {type: types.SUCCESS_LOGIN};
}

function loginError (message) {
  return {type: types.LOGIN_FAILURE, message};
}

function authUser () {
  return {type: types.AUTH_USER};
}

function authenticateUser (credentials) {
  const user = credentials;
  let formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('client_id', '2');
  formData.append('client_secret', 'tbvtGeM45Jnk8IFRTVXFiBJrySgtU7pgDehuZoKG');
  formData.append('username', user.email);
  formData.append('password', user.password);
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
      const accessToken = data.access_token;
      dispatch(successLogin(accessToken));
      dispatch(authUser());
      dispatch(getUser(user.email, accessToken));
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
