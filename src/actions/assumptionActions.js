import * as types from './actionTypes';
import { createAction } from 'redux-actions';
import env from '../../environments/config';

export const fetchAssumptions = period => (dispatch, getState) => {
  const { id } = getState().user;
  return dispatch({
    type: types.API_REQUEST_GET,
    payload: {
      url: `${env.api_url}/api/assumptions/${id}/${period}`,
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

export const fetchAssumptionTypes = period => (dispatch, getState) => {
  const { id } = getState().user;
  return dispatch({
    type: types.API_REQUEST_GET,
    payload: {
      url: `${env.api_url}/api/assumptionTypes/${id}/${period}`,
      success: setAssumptionTypes,
    },
  });
};

export const setAssumption = createAction(types.ASSUMPTION_CRUD.READ);

export const setOverallAssumptions = createAction(
  types.OVERALL_ASSUMPTIONS_CRUD.READ,
);

export const setAssumptionTypes = createAction(
  types.ASSUMPTION_TYPES.READ,
);

export const createAssumption = createAction(types.API_REQUEST_POST, data => ({
  url: `${env.api_url}/api/assumptions`,
  success: addAssumption,
  data,
}));

export const addAssumption = createAction(
  types.ASSUMPTION_CRUD.CREATE,
  assumption => ({
    assumption,
  }),
);

export const selectAssumptionTypes = createAction(
  types.ASSUMPTION_TYPES.SELECT,
  type =>  ({
    type,
  }),
);

export const resetSelectedAssumptionTypes = createAction(
  types.ASSUMPTION_TYPES.RESET,
);

export const removeSelectedAssumptionType = createAction(
  types.ASSUMPTION_TYPES.REMOVE,
  assumptionId => ({
    assumptionId,
  }),
);
