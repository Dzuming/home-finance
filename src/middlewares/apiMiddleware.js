import * as types from '../actions/actionTypes';
import { getAuthToken } from '../helpers/LocalStorage';
import { memoizedServerRequest } from '../helpers/memoizedServerRequest';

export const apiMiddleware = ({ getState, dispatch }) => next => action => {
  if (action.type === types.API_REQUEST_GET) {
    dispatch({ type: types.API_REQUEST.PENDING });
    const { url, success } = action.payload;
    if (memoizedServerRequest(success().type, getState())) {
      return dispatch({ type: types.API_REQUEST.SUCCESS });
    }
    fetch(url, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        dispatch(success(response));
      })
      .then(() => {
        dispatch({ type: types.API_REQUEST.SUCCESS });
      });
  } else if (action.type === types.API_REQUEST_POST) {
    dispatch({ type: types.API_REQUEST.PENDING });
    const { url, success, data } = action.payload;
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: '*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(response => {
        dispatch(success(response));
      })
      .then(() => {
        dispatch({ type: types.API_REQUEST.SUCCESS });
      });
  } else if (action.type === types.API_REQUEST_DELETE) {
    dispatch({ type: types.API_REQUEST.PENDING });
    const { url, success, id } = action.payload;
    return fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: '*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
      .then(response => response.json())
      .then(response => {
        dispatch(success(response, id));
      })
      .then(() => {
        dispatch({ type: types.API_REQUEST.SUCCESS });
      });
  } else if (action.type === types.API_REQUEST_PUT) {
    dispatch({ type: types.API_REQUEST.PENDING });
    const { url, success, id, items } = action.payload;
    return fetch(url, {
      method: 'PUT',
      headers: {
        Accept: '*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(items),
    })
      .then(response => response.json())
      .then(response => {
        dispatch(
          success(response, id, {
            data: {
              ...items,
              category: getState().financeFlow.categories.find(
                category => items.categoryId === category.id,
              ),
            },
          }),
        );
      })
      .then(() => {
        dispatch({ type: types.API_REQUEST.SUCCESS });
      });
  }
  return next(action);
};
