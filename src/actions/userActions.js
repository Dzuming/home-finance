import * as types from './actionTypes';
import env from '../../environments/config';

function setStorageUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUser(email) {
  const url = `${env.api_url}/user/${email}`;
  return dispatch => {
    return fetch(url, { method: 'GET' }).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).then((data) => {
      dispatch(setUser(data.user));
    }).catch((error => error));
  };
}

export function setUser(user) {
  setStorageUser(user);
  return {type: types.SET_USER, user};
}
