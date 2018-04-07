import * as types from './actionTypes';
import env from '../../environments/config';
import { setStorageUserPromise } from '../helpers/LocalStorage';
import { createAction } from 'redux-actions';
import history from '../helpers/history';

export const getUser = createAction(
  types.API_REQUEST_GET,
  email => ({
    url: `${env.api_url}/api/user/${email}`,
    success: setUser
  }));

export const setUser = data => {
  const user = {
    id: data.id,
    name: data.name,
  };
  //TODO REMOVE SIDE effect
  setStorageUserPromise(user).then(() => {
    history.push('Spending');
  });
  return {
    type: types.SET_USER,
    payload: {
      data
    }
  };
};
