import * as types from './actionTypes';

function setStorageUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function setUser(user) {
  setStorageUser(user);
  return {type: types.SET_USER, user};
}
