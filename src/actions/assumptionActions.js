import * as types from './actionTypes';
import { createAction } from 'redux-actions';
import env from '../../environments/config';

export const fetchAssumptions = () => (dispatch, getState) => {
  const { id } = getState().user;
  return dispatch({
    type: types.API_REQUEST_GET,
    payload: {
      url: `${env.api_url}/api/assumptions/${id}/2018-04`,
      success: setAssumption,
    },
  });
};

export const setAssumption = createAction(types.ASSUMPTION_CRUD.READ);
