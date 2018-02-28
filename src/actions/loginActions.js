import * as types from './actionTypes';
import env from '../../environments/config';
import { createAction } from 'redux-actions';

export const authenticateUser = createAction(types.AUTH_USER);

export const login = ({email, password}) => {
  let formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('client_id', env.client_id);
  formData.append('client_secret', env.client_secret);
  formData.append('username', email);
  formData.append('password', password);
  formData.append('scope', '*');
  return {
    type: types.AUTH_REQUEST,
    payload: {
      url: `${env.api_url}/oauth/token`,
      success: authenticateUser,
      data: formData

    }
  };
};

export const requestLogout = createAction(types.REQUEST_LOGOUT);

export const receiveLogout = createAction(types.SUCCESS_LOGOUT);

export function logout () {
  return (dispatch, getState) => {
    return new Promise(function (resolve) {
      dispatch(requestLogout());
      //TODO: ADD logout to state management
      localStorage.removeItem('token');
      dispatch(receiveLogout());
      resolve(getState());
    });
  };
}
