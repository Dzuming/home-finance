import * as types from './actionTypes';
import env from '../../environments/config';
import { createAction } from 'redux-actions';

export const fetchCategories = createAction(types.API_REQUEST_GET, () =>  ({
  url: `${env.api_url}/api/categories`,
  success: setCategories,
}));

export const setCategories = createAction(types.SET_CATEGORIES);

export const reduceCategories = createAction(
  types.CATEGORIES_DRAG.SELECT,
  categories => ({
    categories,
  }),
);

export const resetDraggedCategories = createAction(
  types.CATEGORIES_DRAG.RESET,
  categories => ({
    categories,
  }),
);
