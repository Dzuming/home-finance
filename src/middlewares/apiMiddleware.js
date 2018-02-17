import * as types from '../actions/actionTypes';
import { getAuthToken } from '../helpers/LocalStorage';
import { financeFlowSpendingToServerMapper } from '../helpers/Mappers';

export const apiMiddleware = ({getState, dispatch}) => (next) => (action) => {
  if (action.type === types.API_REQUEST_GET) {
    const {url, success} = action.payload;
    fetch(url, {
      headers: {
        'Authorization': `Bearer ${getAuthToken()}`,
      }
    })
      .then(response => response.json())
      .then(response => {
        dispatch(success(response));
      });

    // dispatch({type: action.payload.next.PENDING});
  } else if (action.type === types.API_REQUEST_POST) {
    const {url, success, data} = action.payload;
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': '*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(financeFlowSpendingToServerMapper(data))
    })
      .then(response => response.json())
      .then(response => {
        dispatch(success(response));
      });

    // dispatch({type: action.payload.next.PENDING});
  } else if (action.type === types.API_REQUEST_DELETE) {
    const {url, success, id} = action.payload;
    return fetch(url, {
      method: 'DELETE',
      headers: {
        'Accept': '*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      }
    }).then(response => response.json())
      .then(response => {
        dispatch(success(response, id));
      });
  } else if (action.type === types.API_REQUEST_PUT) {
    const {url, success, id, items} = action.payload;

    return fetch(url, {
      method: 'PUT',
      headers: {
        'Accept': '*',
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAuthToken()}`,
      },
      body: JSON.stringify(items)
    }).then(response => response.json())
      .then(response => {

        dispatch(success(response, id, {
          data: {
            ...items,
            category: getState().financeFlow.categories.find(category => items.category_id === category.id)
          }
        }));
      });
  }
  return next(action);
};
