import * as types from '../actions/actionTypes';
import { setAuthToken } from '../helpers/LocalStorage';
import { getUser } from '../actions/userActions';

export const authMiddleware = ({dispatch}) => (next) => (action) => {

  if (action.type === types.AUTH_REQUEST) {
    dispatch({type: types.API_REQUEST.PENDING});
    const {url, data, success} = action.payload;
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    }).then(response => response.json())
      .then(response => {
        const accessToken = response.token;
        setAuthToken(accessToken);
        dispatch(getUser(data.email));
        dispatch(success());
      }).then(() => {
        dispatch({type: types.API_REQUEST.SUCCESS});
      });

  }
  return next(action);
};
