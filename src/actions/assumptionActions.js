import * as types from './actionTypes';
import { createAction } from 'redux-actions';
import env from '../../environments/config';

export const fetchAssumptions = date => (dispatch, getState) => {
  const { id } = getState().user;
  return dispatch({
    type: types.API_REQUEST_GET,
    payload: {
      url: `${env.api_url}/api/assumptions/${id}/${date}`,
      success: setAssumption,
    },
  });
};

export const fetchOverallAssumptions = () => (dispatch, getState) => {
  const { id } = getState().user;
  return dispatch({
    type: types.API_REQUEST_GET,
    payload: {
      url: `${env.api_url}/api/assumptions/${id}`,
      success: setOverallAssumptions,
    },
  });
};

export const setAssumption = createAction(types.ASSUMPTION_CRUD.READ);

export const setOverallAssumptions = createAction(
  types.OVERALL_ASSUMPTIONS_CRUD.READ,
);
