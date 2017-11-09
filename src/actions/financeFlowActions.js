import * as types from './actionTypes';
import env from '../../environments/config';

function successFinanceFlow(data) {
  return { type: types.SUCCESS_FINANCE_FLOW, data };
}

function fetchFinanceFlow(userId, selectedDate) {
  const url = `${env.api_url}/Spending/${userId}/${selectedDate}`;
  return dispatch => {
    return fetch(url, { method: 'GET' }).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).then((data) => {
      dispatch(successFinanceFlow(data));
    }).catch((error => error));
  };
}

function postFinanceFlow(data) {
  const url = `${env.api_url}/Spending`;
  return dispatch => {
    return fetch(url, {
      method: 'POST', headers: {
        'Content-Type': 'application/json',
      }, body: JSON.stringify(...data)
    }).then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    }).then((data) => {
      dispatch(successFinanceFlow(data));
    }).catch((error => error));
  };
}
export function getFinanceFlow() {
  return (dispatch, getState) => {

    const userId = getState().user.id;
    const selectedDate = getState().financeFlow.selectedDate;
    return dispatch(fetchFinanceFlow(userId, selectedDate));
  };
}
export function setFinanceFlow(data) {
  return (dispatch) => {
    return dispatch(postFinanceFlow(data));
  };
}
export function setDate(date) {
  return { type: types.SET_DATE, date };
}
