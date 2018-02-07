import * as types from './actionTypes';
import { fetchFinanceSpendingFromServer, postFinanceSpendingToServer, deleteFinanceSpendingFromServer } from '../restApi/financeFlow';

function successFinanceFlow (data) {
  return {type: types.SUCCESS_FINANCE_FLOW, data};
}

function createFinanceFlow (data) {
  return {type: types.CREATE_FINANCE_FLOW, data};
}
function deleteFinanceFlow (data) {
  return {type: types.REMOVE_FINANCE_FLOW, data};
}

function fetchFinanceFlow (userId, selectedDate) {
  return dispatch => {
    return fetchFinanceSpendingFromServer(userId, selectedDate)
      .then((data) => {
        dispatch(successFinanceFlow(data));
      }).catch((error => error));
  };
}

function postFinanceFlow (data) {
  return dispatch => {
    return postFinanceSpendingToServer(data).then((response) => {
      dispatch(createFinanceFlow(response));
    }).catch((error => error));
  };
}

function removeFinanceFlow(id) {
  return dispatch => {
    return deleteFinanceSpendingFromServer(id).then((response) => {
      dispatch(deleteFinanceFlow({message: response.message, id}));
    }).catch((error => error));
  }
}

export function getFinanceFlow () {
  return (dispatch, getState) => {
    const userId = getState().user.id;
    const selectedDate = getState().financeFlow.selectedDate;
    return dispatch(fetchFinanceFlow(userId, selectedDate));
  };
}

export function setFinanceFlow (data) {
  return (dispatch) => {
    return dispatch(postFinanceFlow(data));
  };
}

export function deleteFinanceFlowById (id) {
  return (dispatch) => {
    return dispatch(removeFinanceFlow(id));
  };
}

export function setDate (date) {
  return {type: types.SET_DATE, date};
}
