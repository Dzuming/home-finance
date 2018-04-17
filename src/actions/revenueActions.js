import * as types from './actionTypes';
import { createAction } from 'redux-actions';
import env from '../../environments/config';

export const fetchRevenue = date => (dispatch, getState) => {
  const { id } = getState().user;
  return dispatch({
    type: types.API_REQUEST_GET,
    payload: {
      url: `${env.api_url}/api/revenue/${id}/${date}`,
      success: setRevenue,
    },
  });
};

export const setRevenue = createAction(types.REVENUE_CRUD.READ);
