import * as types from './actionTypes';

function requestLogin() {
  return {type: types.REQUEST_LOGIN};
}
function successLogin(data) {
  return {type: types.SUCCESS_LOGIN, jwt: data};
}
function authenticateUser(data) {
  const url = 'http://localhost:80/authenticate';
  const credentials = JSON.stringify(data)
  return dispatch => {
    dispatch(requestLogin())
    return fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
        body: credentials
      })
      .then(response => response.json())
      .then(data => dispatch(successLogin(data)))
      .catch(error => console.log(error));

  };
}
export function login(subreddit) {
  // Note that the function also receives getState() which lets you choose what to
  // dispatch next. This is useful for avoiding a network request if a cached
  // value is already available.
  return (dispatch) => {
    // Dispatch a thunk from thunk!
    return dispatch(authenticateUser(subreddit))
  }
}
