import * as types from './actionTypes';
import env from '../../environments/config';
import { createAction } from 'redux-actions';
import { removeAuthToken, removeStorageUser } from '../helpers/LocalStorage';

export const authenticateUser = createAction(types.AUTH_USER);

export const login = createAction(types.AUTH_REQUEST, data => ({
  url: `${env.api_url}/api/authenticate`,
  success: authenticateUser,
  data,
}));

export const requestLogout = createAction(types.REQUEST_LOGOUT);

export const receiveLogout = createAction(types.SUCCESS_LOGOUT);

export function logout() {
  return (dispatch, getState) => {
    return new Promise(function(resolve) {
      dispatch(requestLogout());
      //TODO: ADD logout to state management
      // TODO: Remove side effects from actions
      removeAuthToken();
      removeStorageUser();
      dispatch(receiveLogout());
      resolve(getState());
    });
  };
}
