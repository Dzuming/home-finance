import * as types from './actionTypes';
import { createAction } from 'redux-actions';

export const apiRequestPending = createAction(types.API_REQUEST.PENDING);
export const apiRequestSuccess = createAction(types.API_REQUEST.SUCCESS);
