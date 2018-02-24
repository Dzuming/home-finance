import * as types from './actionTypes';
import env from '../../environments/config';
import {
  financeFlowToServerMapper,
  financeFlowSpendingToTableMapper
} from '../helpers/Mappers';

export const fetchCategories = () => ({
  type: types.API_REQUEST_GET,
  payload:
    {
      url: `${env.api_url}/api/categories`,
      success: setCategories
    }
});

export const setCategories = (data) => ({
  type: types.SET_CATEGORIES,
  payload: data
});

export const fetchSpending = () => (dispatch, getState) => {
  const {id} = getState().user;
  const {selectedDate} = getState().financeFlow;
  return dispatch({
    type: types.API_REQUEST_GET,
    payload:
      {
        url: `${env.api_url}/api/spending/${id}/${selectedDate}`,
        success: setSpending
      }
  });
};

export const fetchProfit = () => (dispatch, getState) => {
  const {id} = getState().user;
  const {selectedDate} = getState().financeFlow;
  return dispatch({
    type: types.API_REQUEST_GET,
    payload:
      {
        url: `${env.api_url}/api/profit/${id}/${selectedDate}`,
        success: setProfit
      }
  });
};

export const setSpending = (data) => ({
  type: types.SPENDING_CRUD.READ,
  payload: data
});

export const setProfit = (data) => ({
  type: types.PROFIT_CRUD.READ,
  payload: data
});

export const createSpending = (data) => ({
  type: types.API_REQUEST_POST,
  payload:
    {
      url: `${env.api_url}/api/spending`,
      success: addSpending,
      data
    }
});

export const createProfit = (data) => ({
  type: types.API_REQUEST_POST,
  payload:
    {
      url: `${env.api_url}/api/profit`,
      success: addProfit,
      data
    }
});

export const addSpending = ({spending, message}) => ({
  type: types.SPENDING_CRUD.CREATE,
  payload: {
    spending,
    message
  }
});

export const addProfit = ({profit, message}) => ({
  type: types.PROFIT_CRUD.CREATE,
  payload: {
    profit,
    message
  }
});

export const deleteSpending = (id) => ({
  type: types.API_REQUEST_DELETE,
  payload:
    {
      url: `${env.api_url}/api/spending/${id}`,
      success: removeSpending,
      id
    }
});

export const deleteProfit = (id) => ({
  type: types.API_REQUEST_DELETE,
  payload:
    {
      url: `${env.api_url}/api/profit/${id}`,
      success: removeProfit,
      id
    }
});

export const removeSpending = (message, id) => ({
  type: types.SPENDING_CRUD.DELETE,
  payload: {
    message,
    id
  }
});

export const removeProfit = (message, id) => ({
  type: types.PROFIT_CRUD.DELETE,
  payload: {
    message,
    id
  }
});

export const putSpending = (data) => ({
  type: types.API_REQUEST_PUT,
  payload:
    {
      url: `${env.api_url}/api/spending/${data.id}`,
      success: editSpending,
      id: data.id,
      items: financeFlowToServerMapper(data.items)
    }
});

export const putProfit = (data) => ({
  type: types.API_REQUEST_PUT,
  payload:
    {
      url: `${env.api_url}/api/profit/${data.id}`,
      success: editProfit,
      id: data.id,
      items: financeFlowToServerMapper(data.items)
    }
});

export const editSpending = (message, id, items) => ({
  type: types.SPENDING_CRUD.UPDATE,
  payload: {
    message,
    id,
    items: financeFlowSpendingToTableMapper(items.data)
  }
});

export const editProfit = (message, id, items) => ({
  type: types.PROFIT_CRUD.UPDATE,
  payload: {
    message,
    id,
    items: financeFlowSpendingToTableMapper(items.data)
  }
});

// export function setDate (date) {
//   return {type: types.SET_DATE, date};
// }
