import * as types from './actionTypes';

export const apiRequestPending = () => ({
  type: types.API_REQUEST.PENDING,
});
export const apiRequestSuccess = () => ({
  type: types.API_REQUEST.SUCCESS,
});
