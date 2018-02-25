import * as types from '../actions/actionTypes';
import { setAuthToken } from '../helpers/LocalStorage';
import { getUser } from '../actions/userActions';
import history from '../helpers/history';

export const authMiddleware = ({dispatch}) => (next) => (action) => {

  if (action.type === types.AUTH_REQUEST) {
    dispatch({type: types.API_REQUEST.PENDING});
    const {url, data, success} = action.payload;
    fetch(url, {
      method: 'POST',
      body: data
    }).then(response => response.json())
      .then(response => {
        const accessToken = response.access_token;
        setAuthToken(accessToken);
        dispatch(getUser(data.get('username')));
        dispatch(success());
      }).then(() => {
        history.push('Spending');
        dispatch({type: types.API_REQUEST.SUCCESS});
      });

  }
  return next(action);
};
