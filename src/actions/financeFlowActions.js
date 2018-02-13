import * as types from './actionTypes';
import {
  editFinanceSpendingFromServer
} from '../restApi/financeFlow';
import env from '../../environments/config';

function putFinanceFlow (data) {
  return {type: types.EDIT_FINANCE_FLOW, data};
}

function editFinanceFlow (editedValue) {
  return dispatch => {
    return editFinanceSpendingFromServer(editedValue).then((response) => {
      dispatch(putFinanceFlow({message: response.message, editedValue}));
    }).catch((error => error));
  };
}

export function editFinanceFlowById (editedValue) {
  return (dispatch) => {
    return dispatch(editFinanceFlow(editedValue));
  };
}

export const fetchCategories = () => ({
  type: types.API_REQUEST,
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
    type: types.API_REQUEST,
    payload:
      {
        url: `${env.api_url}/api/spending/${id}/${selectedDate}`,
        success: setSpending
      }
  });
};

export const setSpending = (data) => ({
  type: types.SET_SPENDING,
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

export const addSpending = ({spending, message}) => ({
  type: types.ADD_SPENDING,
  payload: {
    spending,
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

export const removeSpending = (message, id) => ({
  type: types.REMOVE_SPENDING,
  payload: {
    message,
    id
  }
});

export function setDate (date) {
  return {type: types.SET_DATE, date};
}
