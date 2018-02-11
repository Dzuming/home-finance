import * as types from '../actions/actionTypes';
import { getAuthToken } from '../helpers/LocalStorage';

export const apiMiddleware = ({dispatch}) => (next) => (action) => {
  if (action.type === types.API_REQUEST) {
    const {url, success} = action.payload;
    fetch(url, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      }
    })
      .then(response => response.json())
      .then(response => {
        dispatch(success(response))
      })

    // dispatch({type: action.payload.next.PENDING});
  }
  return next(action);
};
