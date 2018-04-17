import * as types from './actionTypes';
import { createAction } from 'redux-actions';
import env from '../../environments/config';

export const fetchBudget = () => (dispatch, getState) => {
  const { id } = getState().user;
  return dispatch({
    type: types.API_REQUEST_GET,
    payload: {
      url: `${env.api_url}/api/budget/${id}`,
      success: setBudget,
    },
  });
};

export const setBudget = createAction(types.BUDGET_CRUD.READ);
