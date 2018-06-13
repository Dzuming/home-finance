import * as types from './actionTypes';
import env from '../../environments/config';
import {
  financeFlowToServerMapper,
  financeFlowSpendingToTableMapper,
  financeFlowProfitToTableMapper,
} from '../helpers/Mappers';
import { createAction } from 'redux-actions';

export const fetchCategories = createAction(types.API_REQUEST_GET, () => ({
  url: `${env.api_url}/api/categories`,
  success: setCategories,
}));

export const setCategories = createAction(types.SET_CATEGORIES);

export const fetchSpending = () => (dispatch, getState) => {
  const { id } = getState().user;
  return dispatch({
    type: types.API_REQUEST_GET,
    payload: {
      url: `${env.api_url}/api/spending/user/${id}`,
      success: setSpending,
    },
  });
};

export const fetchProfit = () => (dispatch, getState) => {
  const { id } = getState().user;
  return dispatch({
    type: types.API_REQUEST_GET,
    payload: {
      url: `${env.api_url}/api/profit/user/${id}`,
      success: setProfit,
    },
  });
};

export const setSpending = createAction(types.SPENDING_CRUD.READ);

export const setProfit = createAction(types.PROFIT_CRUD.READ);

export const createSpending = createAction(types.API_REQUEST_POST, data => ({
  url: `${env.api_url}/api/spending`,
  success: addSpending,
  data: financeFlowToServerMapper(data),
}));

export const createProfit = createAction(types.API_REQUEST_POST, data => ({
  url: `${env.api_url}/api/profit`,
  success: addProfit,
  data: financeFlowToServerMapper(data),
}));

export const addSpending = createAction(
  types.SPENDING_CRUD.CREATE,
  ({ spending, message }) => ({
    spending,
    message,
  }),
);

export const addProfit = createAction(
  types.PROFIT_CRUD.CREATE,
  ({ profit, message }) => ({
    profit,
    message,
  }),
);

export const deleteSpending = createAction(types.API_REQUEST_DELETE, id => ({
  url: `${env.api_url}/api/spending/${id}`,
  success: removeSpending,
  id,
}));

export const deleteProfit = createAction(types.API_REQUEST_DELETE, id => ({
  url: `${env.api_url}/api/profit/${id}`,
  success: removeProfit,
  id,
}));

export const removeSpending = createAction(
  types.SPENDING_CRUD.DELETE,
  (message, id) => ({
    message,
    id,
  }),
);

export const removeProfit = createAction(
  types.PROFIT_CRUD.DELETE,
  (message, id) => ({
    message,
    id,
  }),
);

export const putSpending = createAction(types.API_REQUEST_PUT, data => ({
  url: `${env.api_url}/api/spending/${data.id}`,
  success: editSpending,
  id: data.id,
  items: financeFlowToServerMapper(data.items),
}));

export const putProfit = createAction(types.API_REQUEST_PUT, data => ({
  url: `${env.api_url}/api/profit/${data.id}`,
  success: editProfit,
  id: data.id,
  items: financeFlowToServerMapper(data.items),
}));

export const editSpending = createAction(
  types.SPENDING_CRUD.UPDATE,
  (message, id, items) => ({
    message,
    id,
    items: financeFlowSpendingToTableMapper(items.data),
  }),
);

export const editProfit = createAction(
  types.PROFIT_CRUD.UPDATE,
  (message, id, items) => ({
    message,
    id,
    items: financeFlowProfitToTableMapper(items.data),
  }),
);

export const reduceCategories = createAction(
  types.CATEGORIES_DRAG.REDUCE,
  categories => ({
    categories,
  }),
);
