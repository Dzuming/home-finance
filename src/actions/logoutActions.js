import * as types from './actionTypes';

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
      localStorage.removeItem('token');
      dispatch(receiveLogout());
      resolve(getState())
    })
  }
}
