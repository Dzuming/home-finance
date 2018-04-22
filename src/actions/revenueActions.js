import * as types from './actionTypes';
import { createAction } from 'redux-actions';
import env from '../../environments/config';

export const fetchRevenue = () => (dispatch, getState) => {
  const { id } = getState().user;
  const period = getState().period;
  return dispatch({
    type: types.API_REQUEST_GET,
    payload: {
      url: `${env.api_url}/api/revenue/${id}/${period}`,
      success: setRevenue,
    },
  });
};

export const setRevenue = createAction(types.REVENUE_CRUD.READ);
