import * as types from './actionTypes';
import env from '../../environments/config';

function setStorageUser (user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUser (email, accessToken) {
  const url = `${env.api_url}/api/user/${email}`;
  return dispatch => {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    }).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).then((data) => {
      dispatch(setUser(data));
    }).catch((error => error));
  };
}

export function setUser (user) {
  const newUser = {
    id: user.id,
    name: user.name,
  };
  setStorageUser(newUser);
  return {type: types.SET_USER, newUser};
}
