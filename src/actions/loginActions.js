import * as types from './actionTypes';
import env from '../../environments/config';

export const authenticateUser = () => ({
  type: types.AUTH_USER
});

export const login = ({email, password}) => {
  let formData = new FormData();
  formData.append('grant_type', 'password');
  formData.append('client_id', '1');
  formData.append('client_secret', 'PiYsiEQQDfFvJTRkJKz0cOOZUh68rwLaUQcVQTuj');
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
}

function requestLogout() {
  return {type: types.REQUEST_LOGOUT};
}
function receiveLogout() {
  return {type: types.SUCCESS_LOGOUT};
}
export function logout() {
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
