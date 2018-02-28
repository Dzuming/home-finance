import * as types from './actionTypes';
import env from '../../environments/config';
import { setStorageUser } from '../helpers/LocalStorage';
import { createAction } from 'redux-actions';
//TODO: Remove user on logout

export const getUser = createAction(
  types.OPEN_SIDENAV,
  email => ({
    url: `${env.api_url}/api/user/${email}`,
    success: setUser
  }));

export const setUser = data => {
  const newUser = {
    id: data.id,
    name: data.name,
  };
  setStorageUser(newUser);
  return {
    type: types.SET_USER,
    payload: {
      data
    }
  };
};
